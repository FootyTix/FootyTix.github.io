$(function () {
    $.ajaxSetup({
        headers: { "X-Auth-Token": "1abff80c306f4f21addbe7bd1268eb3f" }
    });
    $.getJSON('https://api.football-data.org/v2/competitions/BL1/standings?standingType=TOTAL', function (data) {
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
            'Hertha BSC': 'ヘルタ・ベルリン',
            'SV Werder Bremen': 'ブレーメン',
            'TSG 1899 Hoffenheim': 'ホッフェンハイム',
            'SC Freiburg': 'フライブルク',
            '1. FC Köln': 'ケルン',
            'Arminia Bielefeld': 'ビーレフェルト',
            '1. FSV Mainz 05': 'マインツ',
            'FC Schalke 04': 'シャルケ'
        };
        // 順位表作成
        standings.forEach(function (standing) {
            $("#standings-tbl").append(
                '<tr align="center">'
                + '<td><span style="font-size: 60%;">' + standing.position + '</span></td>'
                + '<td><span style="font-size: 60%;">' + '<div style = "text-align: left"><div style="padding: 4px 4px 0 4px; display: table-cell; vertical-align: middle;"><img src="' 
                + standing.team.crestUrl + '" height="24" width="24"></div><div style="display: table-cell; vertical-align: middle;">' 
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
    .error(function () {
        // エラーがあった時
        $('#loading-gif').children().remove();
        $('#loading-gif').append('ページを更新してください');
    });
});