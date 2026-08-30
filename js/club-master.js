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
        'FC Schalke 04': { nameJa: 'シャルケ' },

        // Serie A / Italian clubs
        'AC Monza': { nameJa: 'モンツァ' },
        'Torino FC': { nameJa: 'トリノ' },
        'AC Milan': {
            nameJa: 'ACミラン',
            ticketUrl: 'https://footballtickets-by-gakuseimiler.com/entry/2018/04/20/%E3%80%902018%E5%B9%B4%E6%9C%80%E6%96%B0%E7%89%88%E3%80%91ac%E3%83%9F%E3%83%A9%E3%83%B3%E3%81%AE%E3%83%81%E3%82%B1%E3%83%83%E3%83%88%E3%82%92%E5%AE%9A%E4%BE%A1%E3%81%A7%E8%B2%B7'
        },
        'Udinese Calcio': { nameJa: 'ウディネーゼ' },
        'Como 1907': { nameJa: 'コモ' },
        'Genoa CFC': { nameJa: 'ジェノア' },
        'Bologna FC 1909': { nameJa: 'ボローニャ' },
        'Parma Calcio 1913': { nameJa: 'パルマ' },
        'Cagliari Calcio': { nameJa: 'カリアリ' },
        'AS Roma': {
            nameJa: 'ローマ',
            ticketUrl: 'https://footballtickets-by-gakuseimiler.com/entry/2018/10/13/2018%E5%B9%B4%E6%9C%80%E6%96%B0%E7%89%88as%E3%83%AD%E3%83%BC%E3%83%9E%E3%81%AE%E3%83%81%E3%82%B1%E3%83%83%E3%83%88%E3%82%92%E5%AE%9A%E4%BE%A1%E3%81%A7%E8%B2%B7'
        },
        'US Lecce': { nameJa: 'レッチェ' },
        'Venezia FC': { nameJa: 'ヴェネツィア' },
        'US Sassuolo Calcio': { nameJa: 'サッスオーロ' },
        'FC Internazionale Milano': {
            nameJa: 'インテル',
            ticketUrl: 'https://footballtickets-by-gakuseimiler.com/entry/2018/10/08/2018%E5%B9%B4%E6%9C%80%E6%96%B0%E7%89%88%E3%82%A4%E3%83%B3%E3%83%86%E3%83%AB%E3%81%AE%E3%83%81%E3%82%B1%E3%83%83%E3%83%88%E3%82%92%E5%AE%9A%E4%BE%A1%E3%81%A7%E8%B2%B7'
        },
        'SSC Napoli': {
            nameJa: 'ナポリ',
            ticketUrl: 'https://footballtickets-by-gakuseimiler.com/entry/napoli_how-to-buy-ticket'
        },
        'Atalanta BC': { nameJa: 'アタランタ' },
        'Juventus FC': { nameJa: 'ユベントス' },
        'Frosinone Calcio': { nameJa: 'フロジノーネ' },
        'SS Lazio': { nameJa: 'ラツィオ' },
        'ACF Fiorentina': { nameJa: 'フィオレンティーナ' },

        // Ligue 1 / French clubs
        'Lille OSC': { nameJa: 'リール' },
        'Le Mans FC': { nameJa: 'ル・マン' },
        'Olympique de Marseille': { nameJa: 'マルセイユ' },
        'FC Lorient': { nameJa: 'ロリアン' },
        'Stade Brestois 29': { nameJa: 'ブレスト' },
        'Racing Club de Lens': { nameJa: 'RCランス' },
        'Stade Rennais FC 1901': { nameJa: 'レンヌ' },
        'Angers SCO': { nameJa: 'アンジェ' },
        'AJ Auxerre': { nameJa: 'オセール' },
        'Le Havre AC': { nameJa: 'ル・アーヴル' },
        'RC Strasbourg Alsace': { nameJa: 'ストラスブール' },
        'OGC Nice': { nameJa: 'ニース' },
        'Paris Saint-Germain FC': {
            nameJa: 'PSG',
            ticketUrl: 'https://footballtickets-by-gakuseimiler.com/entry/2018/08/23/%E3%80%902018%E5%B9%B4%E6%9C%80%E6%96%B0%E7%89%88%E3%80%91%E3%83%91%E3%83%AA%E3%83%BB%E3%82%B5%E3%83%B3%E3%82%B8%E3%82%A7%E3%83%AB%E3%83%9E%E3%83%B3%E3%81%AE%E3%83%81%E3%82%B1%E3%83%83'
        },
        'Toulouse FC': { nameJa: 'トゥールーズ' },
        'Olympique Lyonnais': { nameJa: 'リヨン' },
        'Paris FC': { nameJa: 'パリFC' },
        'AS Monaco FC': { nameJa: 'モナコ' },
        'ES Troyes AC': { nameJa: 'トロワ' },

        // Eredivisie / Dutch clubs
        'Telstar 1963': { nameJa: 'テルスター' },
        'SBV Excelsior': { nameJa: 'エクセルシオール' },
        'Feyenoord Rotterdam': { nameJa: 'フェイエノールト' },
        'FC Groningen': { nameJa: 'フローニンゲン' },
        'PEC Zwolle': { nameJa: 'ズウォレ' },
        "FC Twente '65": { nameJa: 'トゥウェンテ' },
        'SC Cambuur-Leeuwarden': { nameJa: 'カンブール' },
        'AFC Ajax': { nameJa: 'アヤックス' },
        'NEC': { nameJa: 'NEC' },
        'FC Utrecht': { nameJa: 'ユトレヒト' },
        'Sparta Rotterdam': { nameJa: 'スパルタ・ロッテルダム' },
        'Fortuna Sittard': { nameJa: 'シッタート' },
        'SC Heerenveen': { nameJa: 'ヘーレンフェーン' },
        'PSV': { nameJa: 'PSV' },
        'Willem II Tilburg': { nameJa: 'ヴィレムII' },
        'Go Ahead Eagles': { nameJa: 'ゴー・アヘッド・イーグルス' },
        'ADO Den Haag': { nameJa: 'ADOデン・ハーグ' },
        'AZ': { nameJa: 'AZ' },

        // Primeira Liga / Portuguese clubs
        'FC Famalicão': { nameJa: 'ファマリカン' },
        'Sporting Clube de Braga': { nameJa: 'ブラガ' },
        'FC Arouca': { nameJa: 'アロウカ' },
        'Gil Vicente FC': { nameJa: 'ジル・ヴィセンテ' },
        'Sporting Clube de Portugal': { nameJa: 'スポルティングCP' },
        'Moreirense FC': { nameJa: 'モレイレンセ' },
        'CF Estrela da Amadora': { nameJa: 'エストレラ・ダ・アマドーラ' },
        'FC Porto': { nameJa: 'ポルト' },
        'GD Estoril Praia': { nameJa: 'エストリル・プライア' },
        'Rio Ave FC': { nameJa: 'リオ・アヴェ' },
        'Sport Lisboa e Benfica': { nameJa: 'ベンフィカ' },
        'Vitória SC': { nameJa: 'ヴィトーリアSC' },
        'FC Alverca': { nameJa: 'アルヴェルカ' },
        'Casa Pia AC': { nameJa: 'カーザ・ピア' },
        'CD Nacional': { nameJa: 'CDナシオナル' },
        'CD Santa Clara': { nameJa: 'サンタクララ' },
        'CS Marítimo': { nameJa: 'マリティモ' },
        'Académico de Viseu FC': { nameJa: 'アカデミコ・デ・ヴィゼウ' },

        // EFL Championship / English clubs
        'Swansea City AFC': { nameJa: 'スウォンジー' },
        'Middlesbrough FC': { nameJa: 'ミドルズブラ' },
        'Queens Park Rangers FC': { nameJa: 'QPR' },
        'Norwich City FC': { nameJa: 'ノリッジ' },
        'Birmingham City FC': { nameJa: 'バーミンガム' },
        'Burnley FC': { nameJa: 'バーンリー' },
        'Derby County FC': { nameJa: 'ダービー' },
        'Wolverhampton Wanderers FC': { nameJa: 'ウルブス' },
        'Preston North End FC': { nameJa: 'プレストン' },
        'Cardiff City FC': { nameJa: 'カーディフ' },
        'West Ham United FC': { nameJa: 'ウェストハム' },
        'Portsmouth FC': { nameJa: 'ポーツマス' },
        'West Bromwich Albion FC': { nameJa: 'WBA' },
        'Bolton Wanderers FC': { nameJa: 'ボルトン' },
        'Southampton FC': { nameJa: 'サウサンプトン' },
        'Sheffield United FC': { nameJa: 'シェフィールド・U' },
        'Blackburn Rovers FC': { nameJa: 'ブラックバーン' },
        'Watford FC': { nameJa: 'ワトフォード' },
        'Lincoln City FC': { nameJa: 'リンカーン' },
        'Charlton Athletic FC': { nameJa: 'チャールトン' },
        'Wrexham AFC': { nameJa: 'レクサム' },
        'Bristol City FC': { nameJa: 'ブリストル' },
        'Millwall FC': { nameJa: 'ミルウォール' },
        'Stoke City FC': { nameJa: 'ストーク' }
    };
})(window);
