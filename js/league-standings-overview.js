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
        var meta = team && team.name ? (master[team.name] || {}) : {};

        return {
            nameJa: meta.nameJa || (team && (team.shortName || team.name)) || '未定',
            ticketUrl: meta.ticketUrl || null
        };
    }

    function renderClub(standing) {
        var team = standing.team || {};
        var club = getClub(team);
        var label = escapeHtml(club.nameJa);
        var crest = team.crest ? escapeHtml(team.crest) : '';
        var crestHtml = crest
            ? '<img src="' + crest + '" alt="" width="24" height="24" loading="lazy">'
            : '';

        var nameHtml = club.ticketUrl
            ? '<a class="league-team-link" href="' + escapeHtml(club.ticketUrl) + '" aria-label="' + label + 'のチケット購入ガイドを見る">'
                + label
                + '<span class="league-team-link__icon fas fa-chevron-right" aria-hidden="true"></span></a>'
            : '<span class="league-team-name">' + label + '</span>';

        return '<div class="league-standing-club">'
            + crestHtml
            + '<div class="league-standing-club__name">' + nameHtml + '</div>'
            + '</div>';
    }

    function renderRows(table) {
        return table.map(function (standing) {
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
    }

    function renderSectionShell(config) {
        return '<section class="league-overview-section" data-league="' + escapeHtml(config.key) + '">'
            + '<h2>' + escapeHtml(config.nameJa) + '</h2>'
            + '<table class="table-borderd league-overview-table">'
            + '<thead><tr align="center">'
            + '<th><span style="font-size:70%;">順位</span></th>'
            + '<th><span style="font-size:70%;">クラブ</span></th>'
            + '<th><span style="font-size:70%;font-weight:bolder;"><mark class="has-inline-color has-vivid-red-color" style="background-color:rgba(0,0,0,0);">Pts</mark></span></th>'
            + '<th><span style="font-size:70%;">試合</span></th>'
            + '<th><span style="font-size:70%;">勝</span></th>'
            + '<th><span style="font-size:70%;">分</span></th>'
            + '<th><span style="font-size:70%;">負</span></th>'
            + '<th><span style="font-size:70%;">+/-</span></th>'
            + '</tr></thead>'
            + '<tbody id="standings-overview-' + escapeHtml(config.key) + '">'
            + '<tr><td colspan="8" align="center">読み込み中...</td></tr>'
            + '</tbody>'
            + '</table>'
            + '<div class="league-page-links">'
            + '<a class="league-page-link" href="' + escapeHtml(config.standingsPageUrl) + '">'
            + '<span class="fas fa-list-ol" aria-hidden="true"></span>'
            + '<span>' + escapeHtml(config.nameJa) + 'の全順位を見る</span>'
            + '</a>'
            + '<a class="league-page-link" href="' + escapeHtml(config.schedulePageUrl) + '">'
            + '<span class="fas fa-calendar-alt" aria-hidden="true"></span>'
            + '<span>' + escapeHtml(config.nameJa) + 'の日程・結果を見る</span>'
            + '</a>'
            + '</div>'
            + '</section>';
    }

    function loadLeague(config, limit) {
        var body = document.getElementById('standings-overview-' + config.key);
        if (!body) return Promise.resolve();

        return fetch(config.standingsDataUrl)
            .then(function (response) {
                if (!response.ok) throw new Error('HTTP ' + response.status);
                return response.json();
            })
            .then(function (data) {
                var table = data.standings
                    && data.standings[0]
                    && Array.isArray(data.standings[0].table)
                    ? data.standings[0].table.slice(0, limit)
                    : [];

                if (!table.length) {
                    body.innerHTML = '<tr><td colspan="8" align="center">順位表データがありません</td></tr>';
                    return;
                }

                body.innerHTML = renderRows(table);
            })
            .catch(function (error) {
                body.innerHTML = '<tr><td colspan="8" align="center">ページを更新してください</td></tr>';
                console.error(config.nameJa + ' overview standings load error:', error);
            });
    }

    function init(options) {
        options = options || {};

        var container = document.getElementById(options.containerId || 'league-standings-overview');
        var keys = options.keys || ['cl', 'pl', 'pd', 'sa', 'bl', 'fl', 'ppl', 'ded', 'elc'];
        var limit = Number(options.limit || 5);

        if (!container) {
            console.error('FootyTixStandingsOverview: container not found');
            return;
        }

        var configs = keys.map(getConfig).filter(Boolean);

        container.innerHTML = configs.map(renderSectionShell).join('');

        configs.forEach(function (config) {
            loadLeague(config, limit);
        });
    }

    window.FootyTixStandingsOverview = {
        init: init
    };
})(window, document);
