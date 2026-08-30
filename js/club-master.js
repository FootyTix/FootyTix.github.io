(function (window) {
    'use strict';

    window.FootyTixClubMaster = {
        // Premier League / English clubs
        'Liverpool FC': {
            nameJa: 'リヴァプール',
            ticketUrl: 'https://footballtickets-by-gakuseimiler.com/entry/2018/11/14/%E3%80%902018%E5%B9%B4%E6%9C%80%E6%96%B0%E7%89%88%E3%80%91%E3%83%AA%E3%83%90%E3%83%97%E3%83%BC%E3%83%AB%E3%81%AE%E3%83%81%E3%82%B1%E3%83%83%E3%83%88%E3%82%92%E5%AE%9A%E4%BE%A1%E3%81%A7'
        },
        'Manchester City FC': {
            nameJa: 'マンチェスター・C',
            ticketUrl: 'https://footballtickets-by-gakuseimiler.com/entry/2018/01/22/%E3%83%9E%E3%83%B3%E3%83%81%E3%82%A7%E3%82%B9%E3%82%BF%E3%83%BC%E3%83%BB%E3%82%B7%E3%83%86%E3%82%A3%E3%81%AE%E3%83%81%E3%82%B1%E3%83%83%E3%83%88%E3%82%92%E5%AE%9A%E4%BE%A1'
        },
        'Manchester United FC': {
            nameJa: 'マンチェスター・U',
            ticketUrl: 'https://footballtickets-by-gakuseimiler.com/entry/2018/04/01/%E3%83%9E%E3%83%B3%E3%83%81%E3%82%A7%E3%82%B9%E3%82%BF%E3%83%BC%E3%83%BB%E3%83%A6%E3%83%8A%E3%82%A4%E3%83%86%E3%83%83%E3%83%89%E3%81%AE%E3%83%81%E3%82%B1%E3%83%83%E3%83%88'
        },
        'Arsenal FC': {
            nameJa: 'アーセナル',
            ticketUrl: 'https://footballtickets-by-gakuseimiler.com/entry/2018/04/27/%E3%80%902018%E5%B9%B4%E6%9C%80%E6%96%B0%E7%89%88%E3%80%91%E3%82%A2%E3%83%BC%E3%82%BB%E3%83%8A%E3%83%AB%E3%81%AE%E3%83%81%E3%82%B1%E3%83%83%E3%83%88%E3%82%92%E5%AE%9A%E4%BE%A1'
        },
        'Tottenham Hotspur FC': {
            nameJa: 'トッテナム',
            ticketUrl: 'https://footballtickets-by-gakuseimiler.com/entry/2018/11/02/%E3%80%902018%E5%B9%B4%E6%9C%80%E6%96%B0%E7%89%88%E3%80%91%E3%83%88%E3%83%83%E3%83%86%E3%83%8A%E3%83%A0%E3%81%AE%E3%83%81%E3%82%B1%E3%83%83%E3%83%88%E3%82%92%E5%AE%9A%E4%BE%A1%E3%81%A7'
        },
        'Chelsea FC': {
            nameJa: 'チェルシー',
            ticketUrl: 'https://footballtickets-by-gakuseimiler.com/entry/2018/08/27/%E3%80%902018%E5%B9%B4%E6%9C%80%E6%96%B0%E7%89%88%E3%80%91%E3%83%81%E3%82%A7%E3%83%AB%E3%82%B7%E3%83%BC%E3%81%AE%E3%83%81%E3%82%B1%E3%83%83%E3%83%88%E3%82%92%E5%AE%9A%E4%BE%A1%E3%81%A7'
        },
        'Everton FC': { nameJa: 'エバートン' },
        'Aston Villa FC': { nameJa: 'アストン・ヴィラ' },
        'Newcastle United FC': { nameJa: 'ニューカッスル' },
        'Crystal Palace FC': { nameJa: 'クリスタル・パレス' },
        'Brighton & Hove Albion FC': { nameJa: 'ブライトン' },
        'Brentford FC': { nameJa: 'ブレントフォード' },
        'Nottingham Forest FC': { nameJa: 'N・フォレスト' },
        'Fulham FC': { nameJa: 'フラム' },
        'AFC Bournemouth': { nameJa: 'ボーンマス' },
        'Leeds United FC': { nameJa: 'リーズ' },
        'Sunderland AFC': { nameJa: 'サンダーランド' },
        'Coventry City FC': { nameJa: 'コヴェントリー' },
        'Hull City AFC': { nameJa: 'ハル・シティ' },
        'Ipswich Town FC': { nameJa: 'イプスウィッチ' },

        // La Liga / Spanish clubs
        'Club Atlético de Madrid': {
            nameJa: 'アトレティコ',
            ticketUrl: 'https://footballtickets-by-gakuseimiler.com/entry/2018/02/04/%E3%82%A2%E3%83%88%E3%83%AC%E3%83%86%E3%82%A3%E3%82%B3%E3%83%BB%E3%83%9E%E3%83%89%E3%83%AA%E3%83%BC%E3%83%89%E3%81%AE%E3%83%81%E3%82%B1%E3%83%83%E3%83%88%E3%82%92%E5%AE%9A'
        },
        'Real Madrid CF': {
            nameJa: 'レアル・マドリー',
            ticketUrl: 'https://footballtickets-by-gakuseimiler.com/entry/realmadrid-how-to-buy-tickets'
        },
        'FC Barcelona': {
            nameJa: 'バルセロナ',
            ticketUrl: 'https://footballtickets-by-gakuseimiler.com/entry/fcbarcelona-how-to-buy-ticket'
        },
        'Sevilla FC': { nameJa: 'セビージャ' },
        'Real Sociedad de Fútbol': { nameJa: 'レアル・ソシエダ' },
        'Villarreal CF': { nameJa: 'ビジャレアル' },
        'Deportivo Alavés': { nameJa: 'アラベス' },
        'Athletic Club': { nameJa: 'アスレティック・ビルバオ' },
        'Rayo Vallecano de Madrid': { nameJa: 'ラージョ・バジェカーノ' },
        'Getafe CF': { nameJa: 'ヘタフェ' },
        'RC Celta de Vigo': { nameJa: 'セルタ' },
        'Valencia CF': { nameJa: 'バレンシア' },
        'Real Betis Balompié': { nameJa: 'ベティス' },
        'CA Osasuna': { nameJa: 'オサスナ' },
        'RCD Espanyol de Barcelona': { nameJa: 'エスパニョール' },
        'Elche CF': { nameJa: 'エルチェ' },
        'Levante UD': { nameJa: 'レバンテ' },
        'Real Racing Club de Santander': { nameJa: 'ラシン・サンタンデール' },
        'RC Deportivo La Coruña': { nameJa: 'デポルティーボ・ラ・コルーニャ' },
        'Málaga CF': { nameJa: 'マラガ' },

        // Bundesliga / German clubs
        'FC Bayern München': {
            nameJa: 'バイエルン',
            ticketUrl: 'https://footballtickets-by-gakuseimiler.com/entry/2018/01/23/%E3%83%90%E3%82%A4%E3%82%A8%E3%83%AB%E3%83%B3%E3%83%9F%E3%83%A5%E3%83%B3%E3%83%98%E3%83%B3%E3%81%AE%E3%83%81%E3%82%B1%E3%83%83%E3%83%88%E3%82%92%E5%AE%9A%E4%BE%A1'
        },
        'RB Leipzig': { nameJa: 'ライプツィヒ' },
        'Borussia Dortmund': {
            nameJa: 'ドルトムント',
            ticketUrl: 'https://footballtickets-by-gakuseimiler.com/entry/2018/05/08/2018%E5%B9%B4%E6%9C%80%E6%96%B0%E7%89%88%E3%83%9C%E3%83%AB%E3%82%B7%E3%82%A2%E3%83%89%E3%83%AB%E3%83%88%E3%83%A0%E3%83%B3%E3%83%88%E3%81%AE%E3%83%81'
        },
        'Bayer 04 Leverkusen': { nameJa: 'レヴァークーゼン' },
        '1. FC Union Berlin': { nameJa: 'ウニオン・ベルリン' },
        'Borussia Mönchengladbach': { nameJa: 'ボルシアMG' },
        'Eintracht Frankfurt': { nameJa: 'フランクフルト' },
        'FC Augsburg': { nameJa: 'アウクスブルク' },
        'VfB Stuttgart': { nameJa: 'シュトゥットガルト' },
        'TSG 1899 Hoffenheim': { nameJa: 'ホッフェンハイム' },
        'SC Freiburg': { nameJa: 'フライブルク' },
        '1. FSV Mainz 05': { nameJa: 'マインツ' },
        'SV Werder Bremen': { nameJa: 'ブレーメン' },
        '1. FC Köln': { nameJa: 'ケルン' },
        'Hamburger SV': { nameJa: 'ハンブルガーSV' },
        'SC Paderborn 07': { nameJa: 'パーダーボルン' },
        'SV 07 Elversberg': { nameJa: 'エルフェアスベルク' },
        'FC Schalke 04': { nameJa: 'シャルケ' }
    };
})(window);
