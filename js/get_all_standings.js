$(function () {
    $.when(
        $.ajax({
            type: 'post',
            url: "https://footballtickets-by-gakuseimiler.com/wp-content/themes/stile-child/get-football-data.php",
            data: {arg: 20},
            dataType: 'json'
        }),
        $.ajax({
            type: 'post',
            url: "https://footballtickets-by-gakuseimiler.com/wp-content/themes/stile-child/get-football-data.php",
            data: {arg: 21},
            dataType: 'json'
        }),
        $.ajax({
            type: 'post',
            url: "https://footballtickets-by-gakuseimiler.com/wp-content/themes/stile-child/get-football-data.php",
            data: {arg: 22},
            dataType: 'json'
        }),
        $.ajax({
            type: 'post',
            url: "https://footballtickets-by-gakuseimiler.com/wp-content/themes/stile-child/get-football-data.php",
            data: {arg: 23},
            dataType: 'json'
        }),
        $.ajax({
            type: 'post',
            url: "https://footballtickets-by-gakuseimiler.com/wp-content/themes/stile-child/get-football-data.php",
            data: {arg: 24},
            dataType: 'json'
        })
    )
    .done(function (data_PL, data_BL, data_PD, data_SA, data_FL/*, data_CL*/) {
        //JSON取得後の処理
        //上位4クラブを抽出
        standings_pl = data_PL[0].standings[0].table.slice(0,5);
        standings_bl = data_BL[0].standings[0].table.slice(0,5);
        standings_pd = data_PD[0].standings[0].table.slice(0,5);
        standings_sa = data_SA[0].standings[0].table.slice(0,5);
        standings_fl = data_FL[0].standings[0].table.slice(0,5);
        // standings_cl = data_CL[0].standings[0].table.slice(0,5);
        var club_list_pl = {
            'Liverpool FC': 'リバプール',
            'Manchester City FC': 'マンチェスター・C',
            'Manchester United FC': 'マンチェスター・U',
            'Arsenal FC': 'アーセナル',
            'Tottenham Hotspur FC': 'トッテナム',
            'Chelsea FC': 'チェルシー',
            'Everton FC': 'エバートン',
            'West Ham United FC': 'ウェストハム',
            'Luton Town FC': 'ルートン・タウンFC',
            'Wolverhampton Wanderers FC': 'ウルブス',
            'Aston Villa FC': 'アストン・ヴィラ',
            'Newcastle United FC': 'ニューカッスル',
            'Sheffield United FC': 'シェフィールド・U ',
            'Crystal Palace FC': 'クリスタル・パレス',
            'Brighton & Hove Albion FC': 'ブライトン',
            'Brentford FC': 'ブレントフォード',
            'Nottingham Forest FC': 'N・フォレスト',
            'Fulham FC': 'フラム',
            'AFC Bournemouth': 'ボーンマス',
            'Burnley': 'バーンリー',
        };

        var club_list_pd = {
            'Club Atlético de Madrid': 'アトレティコ',
            'Real Madrid CF': 'レアル・マドリー',
            'FC Barcelona': 'バルセロナ',
            'Real Sociedad de Fútbol': 'レアル・ソシエダ',
            'Villarreal CF': 'ビジャレアル',
            'Cádiz CF': 'カディス',
            'Sevilla FC': 'セビージャ',
            'Athletic Club': 'アスレティック・ビルバオ',
            'UD Las Palmas': 'ラス・パルマス',
            'Rayo Vallecano de Madrid': 'ラージョ・バジェカーノ',
            'Getafe CF': 'ヘタフェ',
            'RC Celta de Vigo': 'セルタ',
            'Valencia CF': 'バレンシア',
            'Real Betis Balompié': 'ベティス',
            'CA Osasuna': 'オサスナ',
            'RCD Mallorca': 'マジョルカ',
            'Girona FC': 'ジローナ',
            'UD Almería': 'アルメリア',
            'Granada CF': 'グラナダ',
            'Deportivo Alavés': 'アラベス'
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
            'SV Darmstadt 98': 'ダルムシュタット',
            'VfL Bochum 1848': 'ボーフム',
            'TSG 1899 Hoffenheim': 'ホッフェンハイム',
            'SC Freiburg': 'フライブルク',
            '1. FC Köln': 'ケルン',
            '1. FSV Mainz 05': 'マインツ',
            'SV Werder Bremen': 'ブレーメン',
            '1. FC Heidenheim 1846': 'ハイデンハイム'
        };

        var club_list_sa = {
            'AC Milan': 'ACミラン',
            'FC Internazionale Milano': 'インテル',
            'Juventus FC': 'ユベントス',
            'US Sassuolo Calcio': 'サッスオーロ',
            'SSC Napoli': 'ナポリ',
            'SS Lazio': 'ラツィオ',
            'AS Roma': 'ローマ',
            'Hellas Verona FC': 'ヴェローナ',
            'Atalanta BC': 'アタランタ',
            'Bologna FC 1909': 'ボローニャ',
            'Cagliari Calcio': 'カリアリ',
            'Frosinone Calcio': 'フロジノーネ',
            'Udinese Calcio': 'ウディネーゼ',
            'US Salernitana 1919': 'サレルニターナ',
            'ACF Fiorentina': 'フィオレンティーナ',
            'Torino FC': 'トリノ',
            'Genoa CFC': 'ジェノア',
            'US Lecce': 'レッチェ',
            'AC Monza': 'モンツァ',
            'Empoli FC': 'エンポリ'
        };

        var club_list_fl = {
            'Paris Saint-Germain FC': 'PSG',
            'Olympique de Marseille': 'マルセイユ',
            'Lille OSC': 'リール',
            'Olympique Lyonnais': 'リヨン',
            'AS Monaco FC': 'モナコ',
            'Montpellier HSC': 'モンペリエ',
            'Racing Club de Lens': 'RCランス',
            'Stade Rennais FC 1901': 'レンヌ',
            'Stade Brestois 29': 'ブレスト',
            'OGC Nice': 'ニース',
            'Le Havre AC': 'ル・アーヴル',
            'FC Nantes': 'ナント',
            'Toulouse FC': 'トゥールーズ',
            'Clermont Foot 63': 'クレルモン',
            'Stade de Reims': 'スタッド・ランス',
            'FC Lorient': 'ロリアン',
            'RC Strasbourg Alsace': 'ストラスブール',
            'FC Metz': 'メス'
        };

        // 順位表作成
        standings_pl.forEach(function (standing) {
            $("#standings-tbl-pl").append(
                '<tr align="center">'
                + '<td><span style="font-size: 60%;">' + standing.position + '</span></td>'
                + '<td><span style="font-size: 60%;">' + '<div style = "text-align: left"><div style="padding: 4px 4px 0 4px; display: table-cell; vertical-align: middle;"><img src="' 
                + standing.team.crest + '" height="24" width="24"></div><div style="display: table-cell; vertical-align: middle;">' 
                + club_list_pl[standing.team.name] + '</div></div></span></td>'
                + '<td><span style="font-size: 60%;">' + standing.playedGames + '</span></td>'
                + '<td><span style="font-size: 60%;">' + standing.won + '</span></td>'
                + '<td><span style="font-size: 60%;">' + standing.draw + '</span></td>'
                + '<td><span style="font-size: 60%;">' + standing.lost + '</span></td>'
                + '<td><span style="font-size: 60%;">' + ['','+'][+(standing.goalDifference > 0)] + standing.goalDifference + '</span></td>'
                + '<td><span style="font-size: 60%;">' + standing.points + '</span></td>'
                + '</tr>'
            )
        });
        $('#loading-gif-pl').remove();

        standings_pd.forEach(function (standing) {
            $("#standings-tbl-pd").append(
                '<tr align="center">'
                + '<td><span style="font-size: 60%;">' + standing.position + '</span></td>'
                + '<td><span style="font-size: 60%;">' + '<div style = "text-align: left"><div style="padding: 4px 4px 0 4px; display: table-cell; vertical-align: middle;"><img src="' 
                + standing.team.crest + '" height="24" width="24"></div><div style="display: table-cell; vertical-align: middle;">' 
                + club_list_pd[standing.team.name] + '</div></div></span></td>'
                + '<td><span style="font-size: 60%;">' + standing.playedGames + '</span></td>'
                + '<td><span style="font-size: 60%;">' + standing.won + '</span></td>'
                + '<td><span style="font-size: 60%;">' + standing.draw + '</span></td>'
                + '<td><span style="font-size: 60%;">' + standing.lost + '</span></td>'
                + '<td><span style="font-size: 60%;">' + ['','+'][+(standing.goalDifference > 0)] + standing.goalDifference + '</span></td>'
                + '<td><span style="font-size: 60%;">' + standing.points + '</span></td>'
                + '</tr>'
            )
        });
        $('#loading-gif-pd').remove();

        standings_bl.forEach(function (standing) {
            $("#standings-tbl-bl").append(
                '<tr align="center">'
                + '<td><span style="font-size: 60%;">' + standing.position + '</span></td>'
                + '<td><span style="font-size: 60%;">' + '<div style = "text-align: left"><div style="padding: 4px 4px 0 4px; display: table-cell; vertical-align: middle;"><img src="' 
                + standing.team.crest + '" height="24" width="24"></div><div style="display: table-cell; vertical-align: middle;">' 
                + club_list_bl[standing.team.name] + '</div></div></span></td>'
                + '<td><span style="font-size: 60%;">' + standing.playedGames + '</span></td>'
                + '<td><span style="font-size: 60%;">' + standing.won + '</span></td>'
                + '<td><span style="font-size: 60%;">' + standing.draw + '</span></td>'
                + '<td><span style="font-size: 60%;">' + standing.lost + '</span></td>'
                + '<td><span style="font-size: 60%;">' + ['','+'][+(standing.goalDifference > 0)] + standing.goalDifference + '</span></td>'
                + '<td><span style="font-size: 60%;">' + standing.points + '</span></td>'
                + '</tr>'
            )
        });
        $('#loading-gif-bl').remove();

        standings_sa.forEach(function (standing) {
            $("#standings-tbl-sa").append(
                '<tr align="center">'
                + '<td><span style="font-size: 60%;">' + standing.position + '</span></td>'
                + '<td><span style="font-size: 60%;">' + '<div style = "text-align: left"><div style="padding: 4px 4px 0 4px; display: table-cell; vertical-align: middle;"><img src="' 
                + standing.team.crest + '" height="24" width="24"></div><div style="display: table-cell; vertical-align: middle;">' 
                + club_list_sa[standing.team.name] + '</div></div></span></td>'
                + '<td><span style="font-size: 60%;">' + standing.playedGames + '</span></td>'
                + '<td><span style="font-size: 60%;">' + standing.won + '</span></td>'
                + '<td><span style="font-size: 60%;">' + standing.draw + '</span></td>'
                + '<td><span style="font-size: 60%;">' + standing.lost + '</span></td>'
                + '<td><span style="font-size: 60%;">' + ['','+'][+(standing.goalDifference > 0)] + standing.goalDifference + '</span></td>'
                + '<td><span style="font-size: 60%;">' + standing.points + '</span></td>'
                + '</tr>'
            )
        });
        $('#loading-gif-sa').remove();
        standings_fl.forEach(function (standing) {
            $("#standings-tbl-fl").append(
                '<tr align="center">'
                + '<td><span style="font-size: 60%;">' + standing.position + '</span></td>'
                + '<td><span style="font-size: 60%;">' + '<div style = "text-align: left"><div style="padding: 4px 4px 0 4px; display: table-cell; vertical-align: middle;"><img src="' 
                + standing.team.crest + '" height="24" width="24"></div><div style="display: table-cell; vertical-align: middle;">' 
                + club_list_fl[standing.team.name] + '</div></div></span></td>'
                + '<td><span style="font-size: 60%;">' + standing.playedGames + '</span></td>'
                + '<td><span style="font-size: 60%;">' + standing.won + '</span></td>'
                + '<td><span style="font-size: 60%;">' + standing.draw + '</span></td>'
                + '<td><span style="font-size: 60%;">' + standing.lost + '</span></td>'
                + '<td><span style="font-size: 60%;">' + ['','+'][+(standing.goalDifference > 0)] + standing.goalDifference + '</span></td>'
                + '<td><span style="font-size: 60%;">' + standing.points + '</span></td>'
                + '</tr>'
            )
        });
        $('#loading-gif-fl').remove();
    })
    .fail(function () {
        // エラーがあった時
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
    });
});