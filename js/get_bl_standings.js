$(function () {
    $.ajax({
        type: 'post',
        url: "https://footballtickets-by-gakuseimiler.com/wp-content/themes/stile-child/get-football-data.php",
        data: {arg: 12},
        dataType: 'json'
        }).done (function(data){
        //JSON取得後の処理
        standings = data.standings[0].table;

        var club_list = {
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
            'VfL Bochum 1848': 'ボーフム',
            'TSG 1899 Hoffenheim': 'ホッフェンハイム',
            'SC Freiburg': 'フライブルク',
            'Holstein Kiel': 'キール',
            '1. FSV Mainz 05': 'マインツ',
            'SV Werder Bremen': 'ブレーメン',
            '1. FC Heidenheim 1846': 'ハイデンハイム'
        };
        // 順位表作成
        standings.forEach(function (standing) {
            $("#standings-tbl").append(
                '<tr align="center">'
                + '<td><span style="font-size: 60%;">' + standing.position + '</span></td>'
                + '<td><span style="font-size: 60%;">' + '<div style = "text-align: left"><div style="padding: 4px 4px 0 4px; display: table-cell; vertical-align: middle;"><img src="' 
                + standing.team.crest + '" height="24" width="24"></div><div style="display: table-cell; vertical-align: middle;">' 
                + club_list[standing.team.name] + '</div></div></span></td>'
                + '<td><span style="font-size: 60%;">' + standing.playedGames + '</span></td>'
                + '<td><span style="font-size: 60%;">' + standing.won + '</span></td>'
                + '<td><span style="font-size: 60%;">' + standing.draw + '</span></td>'
                + '<td><span style="font-size: 60%;">' + standing.lost + '</span></td>'
                + '<td><span style="font-size: 60%;">' + ['','+'][+(standing.goalDifference > 0)] + standing.goalDifference + '</span></td>'
                + '<td><span style="font-size: 60%;">' + standing.points + '</span></td>'
                + '</tr>'
            )
        });
        $('#loading-gif').remove();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        // エラーがあった時
        $('#loading-gif').children().remove();
        $('#loading-gif').append('ページを更新してください');
        console.log("jqXHR          : " + jqXHR.status); // HTTPステータスが取得
        console.log("textStatus     : " + textStatus);    // タイムアウト、パースエラー
        console.log("errorThrown    : " + errorThrown); // 例外情報
    });
});