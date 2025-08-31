$(function () {
    // $.when(
    //     $.ajax({
    //         type: 'post',
    //         url: "https://footballtickets-by-gakuseimiler.com/wp-content/themes/stile-child/get-football-data.php",
    //         data: {arg: 20},
    //         dataType: 'json'
    //     }),
    //     $.ajax({
    //         type: 'post',
    //         url: "https://footballtickets-by-gakuseimiler.com/wp-content/themes/stile-child/get-football-data.php",
    //         data: {arg: 21},
    //         dataType: 'json'
    //     }),
    //     $.ajax({
    //         type: 'post',
    //         url: "https://footballtickets-by-gakuseimiler.com/wp-content/themes/stile-child/get-football-data.php",
    //         data: {arg: 22},
    //         dataType: 'json'
    //     }),
    //     $.ajax({
    //         type: 'post',
    //         url: "https://footballtickets-by-gakuseimiler.com/wp-content/themes/stile-child/get-football-data.php",
    //         data: {arg: 23},
    //         dataType: 'json'
    //     }),
    //     $.ajax({
    //         type: 'post',
    //         url: "https://footballtickets-by-gakuseimiler.com/wp-content/themes/stile-child/get-football-data.php",
    //         data: {arg: 24},
    //         dataType: 'json'
    //     }),
    //     $.ajax({
    //         type: 'post',
    //         url: "https://footballtickets-by-gakuseimiler.com/wp-content/themes/stile-child/get-football-data.php",
    //         data: {arg: 28},
    //         dataType: 'json'
    //     }),
    //     $.ajax({
    //         type: 'post',
    //         url: "https://footballtickets-by-gakuseimiler.com/wp-content/themes/stile-child/get-football-data.php",
    //         data: {arg: 30},
    //         dataType: 'json'
    //     }),
    //     $.ajax({
    //         type: 'post',
    //         url: "https://footballtickets-by-gakuseimiler.com/wp-content/themes/stile-child/get-football-data.php",
    //         data: {arg: 32},
    //         dataType: 'json'
    //     }),
    //     $.ajax({
    //         type: 'post',
    //         url: "https://footballtickets-by-gakuseimiler.com/wp-content/themes/stile-child/get-football-data.php",
    //         data: {arg: 10},
    //         dataType: 'json'
    //     })
    // )
    // .done(function (data_PL, data_BL, data_PD, data_SA, data_FL, data_PPL, data_DED, data_ELC, data_CL) {
    Promise.all([
    fetch('https://footballtickets-by-gakuseimiler.com/wp-content/football-data/json/pl_matches.json').then(res => res.json()),
    fetch('https://footballtickets-by-gakuseimiler.com/wp-content/football-data/json/bl1_matches.json').then(res => res.json()),
    fetch('https://footballtickets-by-gakuseimiler.com/wp-content/football-data/json/pd_matches.json').then(res => res.json()),
    fetch('https://footballtickets-by-gakuseimiler.com/wp-content/football-data/json/sa_matches.json').then(res => res.json()),
    fetch('https://footballtickets-by-gakuseimiler.com/wp-content/football-data/json/fl1_matches.json').then(res => res.json()),
    fetch('https://footballtickets-by-gakuseimiler.com/wp-content/football-data/json/ppl_matches.json').then(res => res.json()),
    fetch('https://footballtickets-by-gakuseimiler.com/wp-content/football-data/json/ded_matches.json').then(res => res.json()),
    fetch('https://footballtickets-by-gakuseimiler.com/wp-content/football-data/json/elc_matches.json').then(res => res.json()),
    fetch('https://footballtickets-by-gakuseimiler.com/wp-content/football-data/json/cl_matches.json').then(res => res.json())
    ])
    .then(([data_PL, data_BL, data_PD, data_SA, data_FL, data_PPL, data_DED, data_ELC, data_CL]) => {
            //JSON取得後の処理
        //上位4クラブを抽出
        standings_pl = data_PL[0].standings[0].table.slice(0,5);
        standings_bl = data_BL[0].standings[0].table.slice(0,5);
        standings_pd = data_PD[0].standings[0].table.slice(0,5);
        standings_sa = data_SA[0].standings[0].table.slice(0,5);
        standings_fl = data_FL[0].standings[0].table.slice(0,5);
        standings_ppl = data_PPL[0].standings[0].table.slice(0,5);
        standings_ded = data_DED[0].standings[0].table.slice(0,5);
        standings_elc = data_ELC[0].standings[0].table.slice(0,5);
        standings_cl = data_CL[0].standings[0].table.slice(0,5);
        var club_list_pl = {
            'Liverpool FC': 'リヴァプール',
            'Manchester City FC': 'マンチェスター・C',
            'Manchester United FC': 'マンチェスター・U',
            'Arsenal FC': 'アーセナル',
            'Tottenham Hotspur FC': 'トッテナム',
            'Chelsea FC': 'チェルシー',
            'Everton FC': 'エバートン',
            'West Ham United FC': 'ウェストハム',
            'Wolverhampton Wanderers FC': 'ウルブス',
            'Aston Villa FC': 'アストン・ヴィラ',
            'Newcastle United FC': 'ニューカッスル',
            'Crystal Palace FC': 'クリスタル・パレス',
            'Brighton & Hove Albion FC': 'ブライトン',
            'Brentford FC': 'ブレントフォード',
            'Nottingham Forest FC': 'N・フォレスト',
            'Fulham FC': 'フラム',
            'AFC Bournemouth': 'ボーンマス',
            'Burnley FC': 'バーンリー',
            'Leeds United FC': 'リーズ',
            'Sunderland AFC': 'サンダーランド'
        };

        var club_list_pd = {
            'Club Atlético de Madrid': 'アトレティコ',
            'Real Madrid CF': 'レアル・マドリー',
            'FC Barcelona': 'バルセロナ',
            'Sevilla FC': 'セビージャ',
            'Real Sociedad de Fútbol': 'レアル・ソシエダ',
            'Villarreal CF': 'ビジャレアル',
            'Deportivo Alavés': 'アラベス',
            'Athletic Club': 'アスレティック・ビルバオ',
            'Rayo Vallecano de Madrid': 'ラージョ・バジェカーノ',
            'Getafe CF': 'ヘタフェ',
            'RC Celta de Vigo': 'セルタ',
            'Valencia CF': 'バレンシア',
            'Real Betis Balompié': 'ベティス',
            'CA Osasuna': 'オサスナ',
            'RCD Mallorca': 'マジョルカ',
            'Girona FC': 'ジローナ',
            'RCD Espanyol de Barcelona': 'エスパニョール',
            'Elche CF': 'エルチェ',
            'Levante UD': 'レバンテ',
            'Real Oviedo': 'レアル・オビエド'
        };
        
        var club_list_bl = {
            'FC Bayern München': 'バイエルン',
            'RB Leipzig': 'ライプツィヒ',
            'Borussia Dortmund': 'ドルトムント',
            'Bayer 04 Leverkusen': 'レヴァークーゼン',
            'VfL Wolfsburg': 'ヴォルフスブルク',
            '1. FC Union Berlin': 'ウニオン・ベルリン',
            'Borussia Mönchengladbach': 'ボルシアMG',
            'Eintracht Frankfurt': 'フランクフルト',
            'FC Augsburg': 'アウクスブルク',
            'VfB Stuttgart': 'シュトゥットガルト',
            'FC St. Pauli 1910': 'ザンクト・パウリ',
            'TSG 1899 Hoffenheim': 'ホッフェンハイム',
            'SC Freiburg': 'フライブルク',
            '1. FSV Mainz 05': 'マインツ',
            'SV Werder Bremen': 'ブレーメン',
            '1. FC Heidenheim 1846': 'ハイデンハイム',
            '1. FC Köln': 'ケルン',
            'Hamburger SV': 'ハンブルガーSV'
        };

        var club_list_sa = {
            'AC Milan': 'ACミラン',
            'FC Internazionale Milano': 'インテル',
            'Juventus FC': 'ユベントス',
            'Parma Calcio 1913': 'パルマ',
            'SSC Napoli': 'ナポリ',
            'SS Lazio': 'ラツィオ',
            'AS Roma': 'ローマ',
            'Hellas Verona FC': 'ヴェローナ',
            'Atalanta BC': 'アタランタ',
            'Bologna FC 1909': 'ボローニャ',
            'Cagliari Calcio': 'カリアリ',
            'Como 1907': 'コモ',
            'Udinese Calcio': 'ウディネーゼ',
            'ACF Fiorentina': 'フィオレンティーナ',
            'Torino FC': 'トリノ',
            'Genoa CFC': 'ジェノア',
            'US Lecce': 'レッチェ',
            'AC Pisa 1909': 'ピサ',
            'US Sassuolo Calcio': 'サッスオーロ',
            'US Cremonese': 'クレモネーゼ'
        };

        var club_list_fl = {
            'Paris Saint-Germain FC': 'PSG',
            'Olympique de Marseille': 'マルセイユ',
            'Lille OSC': 'リール',
            'Olympique Lyonnais': 'リヨン',
            'AS Monaco FC': 'モナコ',
            'Racing Club de Lens': 'RCランス',
            'Stade Rennais FC 1901': 'レンヌ',
            'Stade Brestois 29': 'ブレスト',
            'OGC Nice': 'ニース',
            'Le Havre AC': 'ル・アーヴル',
            'FC Nantes': 'ナント',
            'Toulouse FC': 'トゥールーズ',
            'RC Strasbourg Alsace': 'ストラスブール',
            'Angers SCO': 'アンジェ',
            'AJ Auxerre': 'オセール',
            'FC Lorient': 'ロリアン',
            'FC Metz': 'メス',
            'Paris FC': 'パリFC'
        };

        var club_list_ppl = {
            'FC Famalicão': 'ファマリカン',
            'Sporting Clube de Braga': 'ブラガ',
            'FC Arouca': 'アロウカ',
            'Gil Vicente FC': 'ジル・ヴィセンテ',
            'Sporting Clube de Portugal': 'スポルティングCP',
            'Moreirense FC': 'モレイレンセ',
            'CF Estrela da Amadora': 'エストレラ・ダ・アマドーラ',
            'FC Porto': 'ポルト',
            'GD Estoril Praia': 'エストリル・プライア',
            'Rio Ave FC': 'リオ・アヴェ',
            'Sport Lisboa e Benfica': 'ベンフィカ',
            'Vitória SC': 'ヴィトーリアSC',
            'FC Alverca': 'アルヴェルカ',
            'AVS': 'AVS',
            'Casa Pia AC': 'カーザ・ピア',
            'CD Nacional': 'CDナシオナル',
            'CD Santa Clara': 'サンタクララ',
            'CD Tondela': 'トンデラ'
        };

        var club_list_ded = {
            'PSV': 'PSV',
            'NEC': 'NEC',
            'FC Utrecht': 'ユトレヒト',
            'AZ': 'AZ',
            'AFC Ajax': 'アヤックス',
            'Feyenoord Rotterdam': 'フェイエノールト',
            'PEC Zwolle': 'ズウォレ',
            'Fortuna Sittard': 'シッタート',
            'Go Ahead Eagles': 'ゴー・アヘッド・イーグルス',
            'SC Heerenveen': 'ヘーレンフェーン',
            "FC Twente '65": 'トゥウェンテ',
            'NAC Breda': 'NACブレダ',
            'FC Groningen': 'フローニンゲン',
            'Heracles Almelo': 'ヘラクレス・アルメロ',
            'Sparta Rotterdam': 'スパルタ・ロッテルダム',
            'FC Volendam': 'フォレンダム',
            'Telstar 1963': 'テルスター',
            'SBV Excelsior': 'エクセルシオール'
        };

        var club_list_elc = {
            'Bristol City FC': 'ブリストル',
            'Stoke City FC': 'ストーク',
            'Leicester City FC': 'レスター',
            'Millwall FC': 'ミルウォール',
            'Southampton FC': 'サウサンプトン',
            'Charlton Athletic FC': 'チャールトン',
            'Middlesbrough FC': 'ミドルズブラ',
            'Portsmouth FC': 'ポーツマス',
            'West Bromwich Albion FC': 'WBA',
            'Birmingham City FC': 'バーミンガム',
            'Ipswich Town FC': 'イプスウィッチ',
            'Preston North End FC': 'プレストン',
            'Queens Park Rangers FC': 'QPR',
            'Coventry City FC': 'コヴェントリー',
            'Hull City AFC': 'ハル・シティ',
            'Norwich City FC': 'ノリッジ',
            'Sheffield Wednesday FC': 'シェフィールド・ウェンズデイ',
            'Wrexham AFC': 'レクサム',
            'Blackburn Rovers FC': 'ブラックバーン',
            'Oxford United FC': 'オックスフォード',
            'Swansea City AFC': 'スウォンジー',
            'Watford FC': 'ワトフォード',
            'Derby County FC': 'ダービー',
            'Sheffield United FC': 'シェフィールド・U'
        };
        
        var club_list_cl = {
            'AFC Ajax': 'アヤックス',
            'Arsenal FC': 'アーセナル',
            'AS Monaco FC': 'モナコ',
            'Atalanta BC': 'アタランタ',
            'Athletic Club': 'アスレティック・ビルバオ',
            'Club Atlético de Madrid': 'アトレティコ・マドリード',
            'Bayer 04 Leverkusen': 'レヴァークーゼン',
            'FC Bayern München': 'バイエルン',
            'Borussia Dortmund': 'ドルトムント',
            'Chelsea FC': 'チェルシー',
            'Club Brugge KV': 'クラブ・ブルッヘ',
            'Eintracht Frankfurt': 'フランクフルト',
            'FC Barcelona': 'バルセロナ',
            'FC København': 'コペンハーゲン',
            'FK Bodø/Glimt': 'ボーデ／グリムト',
            'FK Kairat': 'カイラト',
            'Galatasaray SK': 'ガラタサライ',
            'FC Internazionale Milano': 'インテル',
            'Juventus FC': 'ユヴェントス',
            'Liverpool FC': 'リヴァプール',
            'Manchester City FC': 'マンチェスター・C',
            'Newcastle United FC': 'ニューカッスル',
            'PAE Olympiakos SFP': 'オリンピアコス',
            'Olympique de Marseille': 'マルセイユ',
            'Paphos FC': 'パフォス',
            'Paris Saint-Germain FC': 'PSG',
            'PSV': 'PSV',
            'Qarabağ Ağdam FK': 'カラバフ',
            'Real Madrid CF': 'レアル・マドリード',
            'Sport Lisboa e Benfica': 'ベンフィカ',
            'SK Slavia Praha': 'スラヴィア・プラハ',
            'Sporting Clube de Portugal': 'スポルティング',
            'SSC Napoli': 'ナポリ',
            'Tottenham Hotspur FC': 'トッテナム',
            'Royale Union Saint-Gilloise': 'ユニオンSG',
            'Villarreal CF': 'ビジャレアル'
        };
        // 順位表作成
        standings_cl.forEach(function (standing) {
            $("#standings-tbl-cl").append(
                '<tr align="center">'
                + '<td><span style="font-size: 70%;">' + standing.position + '</span></td>'
                + '<td style="padding: 4px;"><span style="font-size: 70%;">' + '<div style = "text-align: left"><div style="padding: 4px 4px 0 4px; display: table-cell; vertical-align: middle;"><img src="'                 + standing.team.crest + '" height="24" width="24"></div><div style="display: table-cell; vertical-align: middle;">' 
                + club_list_cl[standing.team.name] + '</div></div></span></td>'
                + '<td><span style="font-size: 70%; font-weight: bolder;"><mark style="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-vivid-red-color">' + standing.points + '</mark></span></td>'
                + '<td><span style="font-size: 70%;">' + standing.playedGames + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.won + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.draw + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.lost + '</span></td>'
                + '<td><span style="font-size: 70%;">' + ['','+'][+(standing.goalDifference > 0)] + standing.goalDifference + '</span></td>'
                + '</tr>'
            )
        });
        $('#loading-gif-cl').remove();

        standings_pl.forEach(function (standing) {
            $("#standings-tbl-pl").append(
                '<tr align="center">'
                + '<td><span style="font-size: 70%;">' + standing.position + '</span></td>'
                + '<td style="padding: 4px;"><span style="font-size: 70%;">' + '<div style = "text-align: left"><div style="padding: 4px 4px 0 4px; display: table-cell; vertical-align: middle;"><img src="'                 + standing.team.crest + '" height="24" width="24"></div><div style="display: table-cell; vertical-align: middle;">' 
                + club_list_pl[standing.team.name] + '</div></div></span></td>'
                + '<td><span style="font-size: 70%; font-weight: bolder;"><mark style="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-vivid-red-color">' + standing.points + '</mark></span></td>'
                + '<td><span style="font-size: 70%;">' + standing.playedGames + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.won + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.draw + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.lost + '</span></td>'
                + '<td><span style="font-size: 70%;">' + ['','+'][+(standing.goalDifference > 0)] + standing.goalDifference + '</span></td>'
                + '</tr>'
            )
        });
        $('#loading-gif-pl').remove();

        standings_pd.forEach(function (standing) {
            $("#standings-tbl-pd").append(
                '<tr align="center">'
                + '<td><span style="font-size: 70%;">' + standing.position + '</span></td>'
                + '<td style="padding: 4px;"><span style="font-size: 70%;">' + '<div style = "text-align: left"><div style="padding: 4px 4px 0 4px; display: table-cell; vertical-align: middle;"><img src="'                 + standing.team.crest + '" height="24" width="24"></div><div style="display: table-cell; vertical-align: middle;">' 
                + club_list_pd[standing.team.name] + '</div></div></span></td>'
                + '<td><span style="font-size: 70%; font-weight: bolder;"><mark style="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-vivid-red-color">' + standing.points + '</mark></span></td>'
                + '<td><span style="font-size: 70%;">' + standing.playedGames + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.won + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.draw + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.lost + '</span></td>'
                + '<td><span style="font-size: 70%;">' + ['','+'][+(standing.goalDifference > 0)] + standing.goalDifference + '</span></td>'
                + '</tr>'
            )
        });
        $('#loading-gif-pd').remove();

        standings_bl.forEach(function (standing) {
            $("#standings-tbl-bl").append(
                '<tr align="center">'
                + '<td><span style="font-size: 70%;">' + standing.position + '</span></td>'
                + '<td style="padding: 4px;"><span style="font-size: 70%;">' + '<div style = "text-align: left"><div style="padding: 4px 4px 0 4px; display: table-cell; vertical-align: middle;"><img src="'                 + standing.team.crest + '" height="24" width="24"></div><div style="display: table-cell; vertical-align: middle;">' 
                + club_list_bl[standing.team.name] + '</div></div></span></td>'
                + '<td><span style="font-size: 70%; font-weight: bolder;"><mark style="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-vivid-red-color">' + standing.points + '</mark></span></td>'
                + '<td><span style="font-size: 70%;">' + standing.playedGames + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.won + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.draw + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.lost + '</span></td>'
                + '<td><span style="font-size: 70%;">' + ['','+'][+(standing.goalDifference > 0)] + standing.goalDifference + '</span></td>'
                + '</tr>'
            )
        });
        $('#loading-gif-bl').remove();

        standings_sa.forEach(function (standing) {
            $("#standings-tbl-sa").append(
                '<tr align="center">'
                + '<td><span style="font-size: 70%;">' + standing.position + '</span></td>'
                + '<td style="padding: 4px;"><span style="font-size: 70%;">' + '<div style = "text-align: left"><div style="padding: 4px 4px 0 4px; display: table-cell; vertical-align: middle;"><img src="'                 + standing.team.crest + '" height="24" width="24"></div><div style="display: table-cell; vertical-align: middle;">' 
                + club_list_sa[standing.team.name] + '</div></div></span></td>'
                + '<td><span style="font-size: 70%; font-weight: bolder;"><mark style="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-vivid-red-color">' + standing.points + '</mark></span></td>'
                + '<td><span style="font-size: 70%;">' + standing.playedGames + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.won + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.draw + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.lost + '</span></td>'
                + '<td><span style="font-size: 70%;">' + ['','+'][+(standing.goalDifference > 0)] + standing.goalDifference + '</span></td>'
                + '</tr>'
            )
        });
        $('#loading-gif-sa').remove();
        standings_fl.forEach(function (standing) {
            $("#standings-tbl-fl").append(
                '<tr align="center">'
                + '<td><span style="font-size: 70%;">' + standing.position + '</span></td>'
                + '<td style="padding: 4px;"><span style="font-size: 70%;">' + '<div style = "text-align: left"><div style="padding: 4px 4px 0 4px; display: table-cell; vertical-align: middle;"><img src="'                 + standing.team.crest + '" height="24" width="24"></div><div style="display: table-cell; vertical-align: middle;">' 
                + club_list_fl[standing.team.name] + '</div></div></span></td>'
                + '<td><span style="font-size: 70%; font-weight: bolder;"><mark style="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-vivid-red-color">' + standing.points + '</mark></span></td>'
                + '<td><span style="font-size: 70%;">' + standing.playedGames + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.won + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.draw + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.lost + '</span></td>'
                + '<td><span style="font-size: 70%;">' + ['','+'][+(standing.goalDifference > 0)] + standing.goalDifference + '</span></td>'
                + '</tr>'
            )
        });
        $('#loading-gif-fl').remove();
        standings_ppl.forEach(function (standing) {
            $("#standings-tbl-ppl").append(
                '<tr align="center">'
                + '<td><span style="font-size: 70%;">' + standing.position + '</span></td>'
                + '<td style="padding: 4px;"><span style="font-size: 70%;">' + '<div style = "text-align: left"><div style="padding: 4px 4px 0 4px; display: table-cell; vertical-align: middle;"><img src="'                 + standing.team.crest + '" height="24" width="24"></div><div style="display: table-cell; vertical-align: middle;">' 
                + club_list_ppl[standing.team.name] + '</div></div></span></td>'
                + '<td><span style="font-size: 70%; font-weight: bolder;"><mark style="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-vivid-red-color">' + standing.points + '</mark></span></td>'
                + '<td><span style="font-size: 70%;">' + standing.playedGames + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.won + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.draw + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.lost + '</span></td>'
                + '<td><span style="font-size: 70%;">' + ['','+'][+(standing.goalDifference > 0)] + standing.goalDifference + '</span></td>'
                + '</tr>'
            )
        });
        $('#loading-gif-ppl').remove();
        standings_ded.forEach(function (standing) {
            $("#standings-tbl-ded").append(
                '<tr align="center">'
                + '<td><span style="font-size: 70%;">' + standing.position + '</span></td>'
                + '<td style="padding: 4px;"><span style="font-size: 70%;">' + '<div style = "text-align: left"><div style="padding: 4px 4px 0 4px; display: table-cell; vertical-align: middle;"><img src="'                 + standing.team.crest + '" height="24" width="24"></div><div style="display: table-cell; vertical-align: middle;">' 
                + club_list_ded[standing.team.name] + '</div></div></span></td>'
                + '<td><span style="font-size: 70%; font-weight: bolder;"><mark style="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-vivid-red-color">' + standing.points + '</mark></span></td>'
                + '<td><span style="font-size: 70%;">' + standing.playedGames + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.won + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.draw + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.lost + '</span></td>'
                + '<td><span style="font-size: 70%;">' + ['','+'][+(standing.goalDifference > 0)] + standing.goalDifference + '</span></td>'
                + '</tr>'
            )
        });
        $('#loading-gif-ded').remove();
        standings_elc.forEach(function (standing) {
            $("#standings-tbl-elc").append(
                '<tr align="center">'
                + '<td><span style="font-size: 70%;">' + standing.position + '</span></td>'
                + '<td style="padding: 4px;"><span style="font-size: 70%;">' + '<div style = "text-align: left"><div style="padding: 4px 4px 0 4px; display: table-cell; vertical-align: middle;"><img src="'                 + standing.team.crest + '" height="24" width="24"></div><div style="display: table-cell; vertical-align: middle;">' 
                + club_list_elc[standing.team.name] + '</div></div></span></td>'
                + '<td><span style="font-size: 70%; font-weight: bolder;"><mark style="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-vivid-red-color">' + standing.points + '</mark></span></td>'
                + '<td><span style="font-size: 70%;">' + standing.playedGames + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.won + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.draw + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.lost + '</span></td>'
                + '<td><span style="font-size: 70%;">' + ['','+'][+(standing.goalDifference > 0)] + standing.goalDifference + '</span></td>'
                + '</tr>'
            )
        });
        $('#loading-gif-elc').remove();
    })
    .fail(function () {
        // エラーがあった時
        $('#loading-gif-cl').children().remove();
        $('#loading-gif-cl').append('ページを更新してください');
        $('#loading-gif-pl').children().remove();
        $('#loading-gif-pl').append('ページを更新してください');
        $('#loading-gif-pd').children().remove();
        $('#loading-gif-pd').append('ページを更新してください');
        $('#loading-gif-bl').children().remove();
        $('#loading-gif-bl').append('ページを更新してください');
        $('#loading-gif-sa').children().remove();
        $('#loading-gif-sa').append('ページを更新してください');
        $('#loading-gif-fl').children().remove();
        $('#loading-gif-fl').append('ページを更新してください');
        $('#loading-gif-ppl').children().remove();
        $('#loading-gif-ppl').append('ページを更新してください');
        $('#loading-gif-ded').children().remove();
        $('#loading-gif-ded').append('ページを更新してください');
        $('#loading-gif-elc').children().remove();
        $('#loading-gif-elc').append('ページを更新してください');
    });
});