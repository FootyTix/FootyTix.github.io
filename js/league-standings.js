(function (window, document) {
    'use strict';

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

    function buildFootyboxUrl(config) {
        var separator = config.footyboxCompetitionUrl.indexOf('?') === -1 ? '?' : '&';

        return config.footyboxCompetitionUrl
            + separator
            + 'utm_source=footytix&utm_medium=referral&utm_campaign='
            + encodeURIComponent(config.utmCampaign || (config.key + '_schedule'))
            + '&utm_content=standings_footer';
    }

    function renderClub(standing) {
        var team = standing.team;
        var club = getClub(team);
        var label = escapeHtml(club.nameJa);
        var nameHtml = club.ticketUrl
            ? '<a class="league-team-link" href="' + escapeHtml(club.ticketUrl) + '" aria-label="' + label + 'のチケット購入ガイドを見る">' + label + '<span class="league-team-link__icon fas fa-chevron-right" aria-hidden="true"></span></a>'
            : '<span class="league-team-name">' + label + '</span>';

        return '<div class="league-standing-club">'
            + '<img src="' + escapeHtml(team.crest || '') + '" alt="" width="24" height="24" loading="lazy">'
            + '<div class="league-standing-club__name">' + nameHtml + '</div>'
            + '</div>';
    }

    function addFooterLinks(table, config) {
        if (!table || document.querySelector('.league-page-footer[data-league="' + config.key + '"]')) return;

        var url = buildFootyboxUrl(config);
        var imageUrl = 'https://footballtickets-by-gakuseimiler.com/wp-content/uploads/2026/08/signup-prompt-mypage-v2-1024x655.webp';

        var links = '<div class="league-page-links league-page-links--standings">'
            + '<a class="league-page-link" href="' + escapeHtml(config.schedulePageUrl) + '">'
            + '<span class="fas fa-calendar-alt" aria-hidden="true"></span>'
            + '<span>' + escapeHtml(config.nameJa) + 'の日程・結果を見る</span></a>';

        if (config.ticketGuideUrl) {
            links += '<a class="league-page-link" href="' + escapeHtml(config.ticketGuideUrl) + '">'
                + '<span class="fas fa-ticket-alt" aria-hidden="true"></span>'
                + '<span>' + escapeHtml(config.nameJa) + 'のチケット購入方法</span></a>';
        }

        if (config.broadcastUrl) {
            links += '<a class="league-page-link" href="' + escapeHtml(config.broadcastUrl) + '">'
                + '<span class="fas fa-tv" aria-hidden="true"></span>'
                + '<span>' + escapeHtml(config.nameJa) + 'の視聴方法</span></a>';
        }

        links += '</div>';

        var footyboxCta = '<div class="footybox-schedule-cta" data-league="' + escapeHtml(config.key) + '">'
            + '<a class="footybox-schedule-cta__link " href="' + escapeHtml(url) + '" target="_blank" rel="noopener" data-link-type="footybox_page_cta" data-destination="footybox">'
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
            + links
            + footyboxCta
            + '</div>';

        table.insertAdjacentHTML('afterend', html);
    }

    function init(key) {
        var config = getConfig(key);
        var body = document.getElementById('standings-tbl');

        if (!config) {
            console.error('FootyTixLeagueStandings: unknown league key:', key);
            return;
        }
        if (!body) {
            console.error('FootyTixLeagueStandings: #standings-tbl not found');
            return;
        }

        fetch(config.standingsDataUrl)
            .then(function (response) {
                if (!response.ok) throw new Error('HTTP ' + response.status);
                return response.json();
            })
            .then(function (data) {
                var table = data.standings && data.standings[0] && Array.isArray(data.standings[0].table)
                    ? data.standings[0].table
                    : [];

                var html = table.map(function (standing) {
                    var diff = Number(standing.goalDifference);
                    var diffText = (diff > 0 ? '+' : '') + diff;

                    return '<tr align="center">'
                        + '<td><span style="font-size:70%;">' + escapeHtml(standing.position) + '</span></td>'
                        + '<td style="padding:4px;"><span style="font-size:70%;">' + renderClub(standing) + '</span></td>'
                        + '<td><span style="font-size:70%;font-weight:bolder;"><mark style="background-color:rgba(0,0,0,0)" class="has-inline-color has-vivid-red-color">' + escapeHtml(standing.points) + '</mark></span></td>'
                        + '<td><span style="font-size:70%;">' + escapeHtml(standing.playedGames) + '</span></td>'
                        + '<td><span style="font-size:70%;">' + escapeHtml(standing.won) + '</span></td>'
                        + '<td><span style="font-size:70%;">' + escapeHtml(standing.draw) + '</span></td>'
                        + '<td><span style="font-size:70%;">' + escapeHtml(standing.lost) + '</span></td>'
                        + '<td><span style="font-size:70%;">' + escapeHtml(diffText) + '</span></td>'
                        + '</tr>';
                }).join('');

                body.innerHTML = html;
                addFooterLinks(body.closest('table'), config);
            })
            .catch(function (error) {
                body.innerHTML = '<tr><td colspan="8" align="center">ページを更新してください</td></tr>';
                console.error(config.nameJa + ' standings load error:', error);
            });
    }

    window.FootyTixLeagueStandings = { init: init };
})(window, document);
