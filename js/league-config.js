(function (window) {
    'use strict';

    var ROOT = 'https://footballtickets-by-gakuseimiler.com';
    var DATA_ROOT = ROOT + '/wp-content/football-data/json';

    window.FootyTixLeagueConfig = {
        pl: {
            key: 'pl',
            nameJa: 'プレミアリーグ',
            matchesDataUrl: DATA_ROOT + '/pl_matches.json',
            standingsDataUrl: DATA_ROOT + '/pl_standings.json',
            ticketGuideUrl: ROOT + '/entry/2018/11/26/%E3%80%902018%E5%B9%B4%E6%9C%80%E6%96%B0%E7%89%88%E3%80%91%E3%83%97%E3%83%AC%E3%83%9F%E3%82%A2%E3%83%AA%E3%83%BC%E3%82%B0%E3%81%AE%E3%83%81%E3%82%B1%E3%83%83%E3%83%88%E3%82%92%E5%AE%9A',
            broadcastUrl: ROOT + '/entry/premier-league-broadcast',
            schedulePageUrl: ROOT + '/fixtures/premier-league',
            standingsPageUrl: ROOT + '/standings/premier-league',
            footyboxCompetitionUrl: 'https://footybox-app.com/ja/competitions/premier-league',
            utmCampaign: 'premier_league_schedule',
            featured: {
                mode: 'teams',
                teams: [
                    'Liverpool FC',
                    'Manchester City FC',
                    'Manchester United FC',
                    'Arsenal FC',
                    'Tottenham Hotspur FC',
                    'Chelsea FC',
                    'Aston Villa FC',
                    'Brighton & Hove Albion FC'
                ],
                label: '注目カード',
                iconClass: 'fas fa-fire',
                url: ROOT + '/entry/bigmatch-fixtures'
            }
        },

        pd: {
            key: 'pd',
            nameJa: 'ラ・リーガ',
            matchesDataUrl: DATA_ROOT + '/pd_matches.json',
            standingsDataUrl: DATA_ROOT + '/pd_standings.json',
            ticketGuideUrl: ROOT + '/entry/2018/12/14/%E3%80%902018%E5%B9%B4%E6%9C%80%E6%96%B0%E7%89%88%E3%80%91%E3%83%AA%E3%83%BC%E3%82%AC%E3%83%BB%E3%82%A8%E3%82%B9%E3%83%91%E3%83%8B%E3%83%A7%E3%83%BC%E3%83%A9%E3%81%AE%E3%83%81%E3%82%B1',
            broadcastUrl: ROOT + '/entry/la-liga-broadcast',
            schedulePageUrl: ROOT + '/fixtures/la-liga',
            standingsPageUrl: ROOT + '/standings/la-liga',
            footyboxCompetitionUrl: 'https://footybox-app.com/ja/competitions/la-liga',
            utmCampaign: 'la_liga_schedule',
            featured: {
                mode: 'teams',
                teams: [
                    'Real Madrid CF',
                    'FC Barcelona',
                    'Club Atlético de Madrid'
                ],
                label: '注目カード',
                iconClass: 'fas fa-fire',
                url: ROOT + '/entry/bigmatch-fixtures'
            }

        },

        bl: {
            key: 'bl',
            nameJa: 'ブンデスリーガ',
            matchesDataUrl: DATA_ROOT + '/bl1_matches.json',
            standingsDataUrl: DATA_ROOT + '/bl1_standings.json',
            ticketGuideUrl: ROOT + '/entry/2018/12/06/2018%E5%B9%B4%E6%9C%80%E6%96%B0%E7%89%88%E3%83%96%E3%83%B3%E3%83%87%E3%82%B9%E3%83%AA%E3%83%BC%E3%82%AC%E3%81%AE%E3%83%81%E3%82%B1%E3%83%83%E3%83%88%E3%82%92%E5%AE%9A',
            broadcastUrl: ROOT + '/entry/bundesliga-broadcast',
            schedulePageUrl: ROOT + '/fixtures/bundesliga',
            standingsPageUrl: ROOT + '/standings/bundesliga',
            footyboxCompetitionUrl: 'https://footybox-app.com/ja/competitions/bundesliga',
            utmCampaign: 'bundesliga_schedule',
            featured: {
                mode: 'teams',
                teams: [
                    'FC Bayern München',
                    'Borussia Dortmund',
                    'RB Leipzig',
                    'Bayer 04 Leverkusen'
                ],
                label: '注目カード',
                iconClass: 'fas fa-fire',
                url: ROOT + '/entry/bigmatch-fixtures'
            }
        }
    };
})(window);
