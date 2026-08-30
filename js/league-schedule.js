(function (window, document) {
    'use strict';

    var weekdays = ['日', '月', '火', '水', '木', '金', '土'];

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function getConfig(key) {
        return window.FootyTixLeagueConfig && window.FootyTixLeagueConfig[key];
    }

    function getClub(team) {
        var master = window.FootyTixClubMaster || {};
        var meta = master[team.name] || {};
        return {
            nameJa: meta.nameJa || team.shortName || team.name,
            ticketUrl: meta.ticketUrl || null
        };
    }

    function getJstDateInfo(utcDate) {
        var date = new Date(utcDate);
        var parts = new Intl.DateTimeFormat('ja-JP', {
            timeZone: 'Asia/Tokyo',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).formatToParts(date);

        var values = {};
        parts.forEach(function (part) {
            if (part.type !== 'literal') values[part.type] = part.value;
        });

        var jstDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
        var timeUndecided = date.getUTCHours() === 0 && date.getUTCMinutes() === 0;

        return {
            month: Number(values.month),
            day: Number(values.day),
            weekday: weekdays[jstDate.getDay()],
            time: timeUndecided ? '未定' : values.hour + ':' + values.minute
        };
    }

    function isFeatured(game, config) {
        var featured = config.featured;
        if (!featured) return false;

        if (featured.mode === 'matches' && Array.isArray(featured.matches)) {
            return featured.matches.some(function (pair) {
                if (!Array.isArray(pair) || pair.length !== 2) return false;
                return (pair[0] === game.homeTeam.name && pair[1] === game.awayTeam.name)
                    || (pair[1] === game.homeTeam.name && pair[0] === game.awayTeam.name);
            });
        }

        if (Array.isArray(featured.teams)) {
            return featured.teams.indexOf(game.homeTeam.name) !== -1
                && featured.teams.indexOf(game.awayTeam.name) !== -1;
        }

        return false;
    }

    function renderTeamCell(team) {
        var club = getClub(team);
        var crest = escapeHtml(team.crest || ('https://crests.football-data.org/' + team.id + '.png'));
        var label = escapeHtml(club.nameJa);
        var nameHtml = club.ticketUrl
            ? '<a class="league-team-link js-league-link" href="' + escapeHtml(club.ticketUrl) + '" data-link-type="club_ticket" data-destination="footytix" aria-label="' + label + 'のチケット購入ガイドを見る">' + label + '<span class="league-team-link__icon fas fa-chevron-right" aria-hidden="true"></span></a>'
            : '<span class="league-team-name">' + label + '</span>';

        return '<td class="league-team-cell">'
            + '<img class="league-team-crest" src="' + crest + '" alt="" width="24" height="24" loading="lazy">'
            + '<br><span class="league-team-label">' + nameHtml + '</span>'
            + '</td>';
    }

    function getScoreValue(score, team) {
        if (score && score.duration === 'PENALTY_SHOOTOUT' && score.penalties) {
            var regular = score.regularTime || {};
            return (team === 'home' ? regular.home : regular.away)
                + '(' + (team === 'home' ? score.penalties.home : score.penalties.away) + ')';
        }
        var fullTime = score && score.fullTime ? score.fullTime : {};
        return team === 'home' ? fullTime.home : fullTime.away;
    }

    function getScoreCell(game) {
        var homeNumeric = game.score && game.score.fullTime ? game.score.fullTime.home : null;
        var awayNumeric = game.score && game.score.fullTime ? game.score.fullTime.away : null;
        var home = getScoreValue(game.score, 'home');
        var away = getScoreValue(game.score, 'away');
        var homeClass = homeNumeric > awayNumeric ? ' league-score--winner' : '';
        var awayClass = homeNumeric < awayNumeric ? ' league-score--winner' : '';

        return '<td class="league-score-cell">'
            + '<span class="league-score' + homeClass + '">' + escapeHtml(home) + '</span>'
            + '<span class="league-score-separator"> - </span>'
            + '<span class="league-score' + awayClass + '">' + escapeHtml(away) + '</span>'
            + '</td>';
    }

    function getDateCell(game, config) {
        var dateInfo = getJstDateInfo(game.utcDate);
        var featured = '';
        if (isFeatured(game, config)) {
            featured = '<br><a class="league-featured-badge js-league-link" href="' + escapeHtml(config.featured.url) + '" data-link-type="featured_match" data-destination="footytix">'
                + '<span class="' + escapeHtml(config.featured.iconClass || 'fas fa-fire') + '" aria-hidden="true"></span>'
                + '<span>' + escapeHtml(config.featured.label || '注目カード') + '</span>'
                + '</a>';
        }

        return '<td class="league-date-cell">'
            + '<span class="league-date-text">' + dateInfo.month + '/' + dateInfo.day + '(' + dateInfo.weekday + ')<br>' + dateInfo.time + '</span>'
            + featured
            + '<span class="league-detail-hint" aria-hidden="true">詳細 ▾</span>'
            + '</td>';
    }

    function buildFootyboxUrl(config, content) {
        var campaign = config.utmCampaign || (config.key + '_schedule');
        var separator = config.footyboxCompetitionUrl.indexOf('?') === -1 ? '?' : '&';

        return config.footyboxCompetitionUrl
            + separator
            + 'utm_source=footytix&utm_medium=referral&utm_campaign='
            + encodeURIComponent(campaign)
            + (content ? '&utm_content=' + encodeURIComponent(content) : '');
    }

    function getDetailRow(game, config) {
        var detailId = 'league-match-detail-' + config.key + '-' + game.id;
        var club = getClub(game.homeTeam);
        var ticketUrl = club.ticketUrl || config.ticketGuideUrl || null;
        var ticketLabel = club.ticketUrl
            ? club.nameJa + 'のチケット購入方法'
            : config.nameJa + 'のチケット購入方法';
        var footyboxUrl = buildFootyboxUrl(config, 'match_' + game.id);
        var actions = '';

        if (ticketUrl) {
            actions += '<a class="league-match-action js-league-link" href="' + escapeHtml(ticketUrl) + '" data-link-type="match_ticket" data-destination="footytix">'
                + '<span class="league-match-action__icon fas fa-ticket-alt" aria-hidden="true"></span><span>' + escapeHtml(ticketLabel) + '</span></a>';
        }

        if (config.broadcastUrl) {
            actions += '<a class="league-match-action js-league-link" href="' + escapeHtml(config.broadcastUrl) + '" data-link-type="broadcast" data-destination="footytix">'
                + '<span class="league-match-action__icon fas fa-tv" aria-hidden="true"></span><span>' + escapeHtml(config.nameJa) + 'の視聴方法</span></a>';
        }

        actions += '<a class="league-match-action league-match-action--footybox js-league-link" href="' + escapeHtml(footyboxUrl) + '" target="_blank" rel="noopener" data-link-type="footybox_schedule" data-destination="footybox">'
            + '<span class="league-match-action__icon fas fa-search" aria-hidden="true"></span><span>FootyBoxで' + escapeHtml(config.nameJa) + 'を調べる</span>'
            + '<span class="fas fa-external-link-alt" aria-hidden="true" style="font-size:9px;"></span></a>';

        return '<tr id="' + detailId + '" class="league-match-detail-row" data-match-id="' + escapeHtml(game.id) + '" hidden>'
            + '<td colspan="3"><div class="league-match-actions">' + actions + '</div></td></tr>';
    }

    function renderScheduleFooter(config) {
        if (document.querySelector('.league-page-footer[data-league="' + config.key + '"]')) return;

        var url = buildFootyboxUrl(config, 'page_cta');
        var imageUrl = 'https://footballtickets-by-gakuseimiler.com/wp-content/uploads/2026/08/signup-prompt-mypage-v2-1024x655.webp';

        var relatedLinks = '<div class="league-page-links">'
            + '<a class="league-page-link js-league-link" href="' + escapeHtml(config.standingsPageUrl) + '" data-link-type="standings" data-destination="footytix">'
            + '<span class="fas fa-list-ol" aria-hidden="true"></span>'
            + '<span>' + escapeHtml(config.nameJa) + 'の順位表を見る</span>'
            + '</a></div>';

        var footyboxCta = '<div class="footybox-schedule-cta" data-league="' + escapeHtml(config.key) + '">'
            + '<a class="footybox-schedule-cta__link js-league-link" href="' + escapeHtml(url) + '" target="_blank" rel="noopener" data-link-type="footybox_page_cta" data-destination="footybox">'
            + '<span class="footybox-schedule-cta__image"><img src="' + imageUrl + '" alt="FootyBoxのマイページ画面" loading="lazy"></span>'
            + '<span class="footybox-schedule-cta__body">'
            + '<span class="footybox-schedule-cta__eyebrow">FOOTYBOX</span>'
            + '<span class="footybox-schedule-cta__title">サッカー観戦をもっと便利に。自分だけの観戦記録も作れる。</span>'
            + '<span class="footybox-schedule-cta__description">観戦予定や観戦ノートを記録できるFootyBoxで、' + escapeHtml(config.nameJa) + 'の試合スケジュールやスタジアム情報を詳しく調べる。</span>'
            + '<span class="footybox-schedule-cta__button">'
            + '<span class="footybox-schedule-cta__button-label"><span class="fas fa-search" aria-hidden="true"></span><span>FootyBoxで' + escapeHtml(config.nameJa) + 'を調べる</span></span>'
            + '<span class="fas fa-chevron-right" aria-hidden="true"></span>'
            + '</span>'
            + '</span></a></div>';

        var html = '<div class="league-page-footer" data-league="' + escapeHtml(config.key) + '">'
            + relatedLinks
            + footyboxCta
            + '</div>';

        var resultsBody = document.getElementById('results-tbl');
        var matchesBody = document.getElementById('matches-tbl');
        var tabContainer = resultsBody && resultsBody.closest ? resultsBody.closest('.tab-container') : null;
        var insertAfter = tabContainer;

        if (!insertAfter && resultsBody) insertAfter = resultsBody.closest('table');
        if (!insertAfter && matchesBody) insertAfter = matchesBody.closest('table');

        if (insertAfter) {
            insertAfter.insertAdjacentHTML('afterend', html);
        }
    }

    function trackNavigation(config, options, link, game) {
        if (options && options.testMode) return;
        if (typeof window.gtag !== 'function') return;

        window.gtag('event', 'schedule_navigation_click', {
            league: config.key,
            link_type: link.getAttribute('data-link-type') || 'unknown',
            destination: link.getAttribute('data-destination') || '',
            match_id: game ? String(game.id) : ''
        });
    }

    function wireInteractions(config, options, matchById) {
        document.addEventListener('click', function (event) {
            var link = event.target.closest && event.target.closest('.js-league-link');
            if (link) {
                var row = link.closest('[data-match-id]');
                var game = row ? matchById[String(row.getAttribute('data-match-id'))] : null;
                trackNavigation(config, options, link, game);
                event.stopPropagation();
                return;
            }

            var matchRow = event.target.closest && event.target.closest('.league-match-row');
            if (!matchRow) return;

            toggleRow(matchRow);
        });

        document.addEventListener('keydown', function (event) {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            var row = event.target.closest && event.target.closest('.league-match-row');
            if (!row || event.target.closest('a')) return;
            event.preventDefault();
            toggleRow(row);
        });

        function toggleRow(row) {
            var matchId = row.getAttribute('data-match-id');
            var detailId = row.getAttribute('aria-controls');
            var detail = document.getElementById(detailId);
            var isOpen = row.getAttribute('aria-expanded') === 'true';

            document.querySelectorAll('.league-match-row[aria-expanded="true"]').forEach(function (openRow) {
                if (openRow === row) return;
                openRow.setAttribute('aria-expanded', 'false');
                var openDetail = document.getElementById(openRow.getAttribute('aria-controls'));
                if (openDetail) openDetail.hidden = true;
            });

            row.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
            if (detail) detail.hidden = isOpen;
        }
    }

    function groupMatches(matches, finished) {
        var filtered = matches.filter(function (game) {
            return finished ? game.status === 'FINISHED' : game.status !== 'FINISHED';
        });

        var groups = [];
        var byMatchday = {};

        filtered.forEach(function (game) {
            var key = String(game.matchday == null ? 'other' : game.matchday);
            if (!byMatchday[key]) {
                byMatchday[key] = [];
                groups.push({ key: key, matchday: game.matchday, games: byMatchday[key] });
            }
            byMatchday[key].push(game);
        });

        groups.sort(function (a, b) {
            var av = a.matchday == null ? 9999 : Number(a.matchday);
            var bv = b.matchday == null ? 9999 : Number(b.matchday);
            return finished ? bv - av : av - bv;
        });

        groups.forEach(function (group) {
            group.games.sort(function (a, b) {
                return new Date(a.utcDate) - new Date(b.utcDate);
            });
        });

        return groups;
    }

    function renderGroups(target, groups, config, finished) {
        var html = '';

        groups.forEach(function (group) {
            if (group.matchday != null) {
                html += '<tr class="league-matchday-row"><td colspan="3" align="center"><span>第' + escapeHtml(group.matchday) + '節</span></td></tr>';
            }

            group.games.forEach(function (game) {
                if (finished) {
                    html += '<tr class="league-result-row" align="center" data-match-id="' + escapeHtml(game.id) + '">'
                        + renderTeamCell(game.homeTeam)
                        + getScoreCell(game)
                        + renderTeamCell(game.awayTeam)
                        + '</tr>';
                } else {
                    var detailId = 'league-match-detail-' + config.key + '-' + game.id;
                    html += '<tr class="league-match-row" align="center" tabindex="0" role="button" aria-expanded="false" aria-controls="' + detailId + '" data-match-id="' + escapeHtml(game.id) + '">'
                        + renderTeamCell(game.homeTeam)
                        + getDateCell(game, config)
                        + renderTeamCell(game.awayTeam)
                        + '</tr>'
                        + getDetailRow(game, config);
                }
            });
        });

        target.innerHTML = html;
    }

    function init(key, options) {
        options = options || {};
        var config = getConfig(key);
        var matchesBody = document.getElementById('matches-tbl');
        var resultsBody = document.getElementById('results-tbl');

        if (!config) {
            console.error('FootyTixLeagueSchedule: unknown league key:', key);
            return;
        }
        if (!matchesBody || !resultsBody) {
            console.error('FootyTixLeagueSchedule: #matches-tbl / #results-tbl not found');
            return;
        }

        fetch(config.matchesDataUrl)
            .then(function (response) {
                if (!response.ok) throw new Error('HTTP ' + response.status);
                return response.json();
            })
            .then(function (data) {
                var matches = Array.isArray(data.matches) ? data.matches : [];
                var matchById = {};

                matches.forEach(function (game) {
                    matchById[String(game.id)] = game;
                });

                renderGroups(matchesBody, groupMatches(matches, false), config, false);
                renderGroups(resultsBody, groupMatches(matches, true), config, true);
                renderScheduleFooter(config);
                wireInteractions(config, options, matchById);
            })
            .catch(function (error) {
                matchesBody.innerHTML = '<tr><td colspan="3" align="center">ページを更新してください</td></tr>';
                resultsBody.innerHTML = '<tr><td colspan="3" align="center">ページを更新してください</td></tr>';
                console.error(config.nameJa + ' schedule load error:', error);
            });
    }

    window.FootyTixLeagueSchedule = { init: init };
})(window, document);
