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

        },

        sa: {
            key: 'sa',
            nameJa: 'セリエA',
            matchesDataUrl: DATA_ROOT + '/sa_matches.json',
            standingsDataUrl: DATA_ROOT + '/sa_standings.json',
            ticketGuideUrl: 'https://footballtickets-by-gakuseimiler.com/entry/2018/12/14/%E3%80%902018%E5%B9%B4%E6%9C%80%E6%96%B0%E7%89%88%E3%80%91%E3%82%BB%E3%83%AA%E3%82%A8A%E3%81%AE%E3%83%81%E3%82%B1%E3%83%83%E3%83%88%E3%82%92%E5%AE%9A%E4%BE%A1%E3%81%A7%E8%B2%B7',
            broadcastUrl: ROOT + '/entry/serie-a-broadcast',
            schedulePageUrl: ROOT + '/fixtures/serie-a',
            standingsPageUrl: ROOT + '/standings/serie-a',
            footyboxCompetitionUrl: 'https://footybox-app.com/ja/competitions/serie-a',
            utmCampaign: 'serie_a_schedule',
            featured: {
                mode: 'teams',
                teams: [
                    'Juventus FC',
                    'SSC Napoli',
                    'AS Roma',
                    'FC Internazionale Milano',
                    'AC Milan',
                    'Atalanta BC'
                ],
                label: '注目カード',
                iconClass: 'fas fa-fire',
                url: ROOT + '/entry/bigmatch-fixtures'
            }
        },

        fl: {
            key: 'fl',
            nameJa: 'リーグ・アン',
            matchesDataUrl: DATA_ROOT + '/fl1_matches.json',
            standingsDataUrl: DATA_ROOT + '/fl1_standings.json',
            ticketGuideUrl: 'https://footballtickets-by-gakuseimiler.com/entry/2018/08/05/%E3%80%902018%E6%9C%80%E6%96%B0%E7%89%88%E3%80%91%E6%B5%B7%E5%A4%96%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC%E3%81%AE%E3%83%81%E3%82%B1%E3%83%83%E3%83%88%E3%81%AE%E8%B2%B7%E3%81%84%E6%96%B9',
            broadcastUrl: ROOT + '/entry/ligue1-broadcast',
            schedulePageUrl: ROOT + '/fixtures/ligue-1',
            standingsPageUrl: ROOT + '/standings/ligue-1',
            footyboxCompetitionUrl: 'https://footybox-app.com/ja/competitions/ligue-1',
            utmCampaign: 'ligue_1_schedule',
            featured: {
                mode: 'teams',
                teams: [
                    'Paris Saint-Germain FC',
                    'Olympique de Marseille',
                    'AS Monaco FC'
                ],
                label: '注目カード',
                iconClass: 'fas fa-fire',
                url: ROOT + '/entry/bigmatch-fixtures'
            }
        },

        ded: {
            key: 'ded',
            nameJa: 'エールディヴィジ',
            matchesDataUrl: DATA_ROOT + '/ded_matches.json',
            standingsDataUrl: DATA_ROOT + '/ded_standings.json',
            ticketGuideUrl: 'https://footballtickets-by-gakuseimiler.com/entry/2018/08/05/%E3%80%902018%E6%9C%80%E6%96%B0%E7%89%88%E3%80%91%E6%B5%B7%E5%A4%96%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC%E3%81%AE%E3%83%81%E3%82%B1%E3%83%83%E3%83%88%E3%81%AE%E8%B2%B7%E3%81%84%E6%96%B9',
            broadcastUrl: ROOT + '/entry/eredivisie-broadcast',
            schedulePageUrl: ROOT + '/fixtures/eredivisie',
            standingsPageUrl: ROOT + '/standings/eredivisie',
            footyboxCompetitionUrl: 'https://footybox-app.com/ja/competitions/eredivisie',
            utmCampaign: 'eredivisie_schedule'
        },

        ppl: {
            key: 'ppl',
            nameJa: 'プリメイラ・リーガ',
            matchesDataUrl: DATA_ROOT + '/ppl_matches.json',
            standingsDataUrl: DATA_ROOT + '/ppl_standings.json',
            ticketGuideUrl: 'https://footballtickets-by-gakuseimiler.com/entry/2018/08/05/%E3%80%902018%E6%9C%80%E6%96%B0%E7%89%88%E3%80%91%E6%B5%B7%E5%A4%96%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC%E3%81%AE%E3%83%81%E3%82%B1%E3%83%83%E3%83%88%E3%81%AE%E8%B2%B7%E3%81%84%E6%96%B9',
            broadcastUrl: ROOT + '/entry/european-football-broadcast',
            schedulePageUrl: ROOT + '/fixtures/primeira-liga',
            standingsPageUrl: ROOT + '/standings/primeira-liga',
            footyboxCompetitionUrl: 'https://footybox-app.com/ja/competitions/primeira-liga',
            utmCampaign: 'primeira_liga_schedule'
        },

        elc: {
            key: 'elc',
            nameJa: 'EFLチャンピオンシップ',
            matchesDataUrl: DATA_ROOT + '/elc_matches.json',
            standingsDataUrl: DATA_ROOT + '/elc_standings.json',
            ticketGuideUrl: 'https://footballtickets-by-gakuseimiler.com/entry/2018/08/05/%E3%80%902018%E6%9C%80%E6%96%B0%E7%89%88%E3%80%91%E6%B5%B7%E5%A4%96%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC%E3%81%AE%E3%83%81%E3%82%B1%E3%83%83%E3%83%88%E3%81%AE%E8%B2%B7%E3%81%84%E6%96%B9',
            broadcastUrl: ROOT + '/entry/european-football-broadcast',
            schedulePageUrl: ROOT + '/fixtures/efl-championship',
            standingsPageUrl: ROOT + '/standings/efl-championship',
            footyboxCompetitionUrl: 'https://footybox-app.com/ja/competitions/efl-championship',
            utmCampaign: 'efl_championship_schedule'
        }
    };
})(window);
