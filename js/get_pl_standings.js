$(function () {
    $.ajaxSetup({
        headers: { "X-Auth-Token": "8d515051437f466083d82551328ba830" }
    });
    $.getJSON('https://api.football-data.org/v2/competitions/PL/standings?standingType=TOTAL', function (data_PL) {
        //JSON取得後の処理
        standings = data_PL.standings[0].table;
        // 順位表作成
        standings.forEach(function (standing) {
            $("#matches-tbl").append(
                '<tr align="center">'
                + '<td><span style="font-size: 80%;">' + standing.position + '</span></td>'
                + '<td><span style="font-size: 80%;">' + '<div style = "text-align: left"><div style="padding: 4px 4px 0 4px; display: table-cell; vertical-align: middle;"><img src="' 
                + standing.team.crestUrl + '" height="24" width="24"></div><div style="display: table-cell; vertical-align: middle;">' 
                + standing.team.name + '</div></div></span></td>'
                + '<td><span style="font-size: 80%;">' + standing.playedGames + '</span></td>'
                + '<td><span style="font-size: 80%;">' + standing.won + '</span></td>'
                + '<td><span style="font-size: 80%;">' + standing.draw + '</span></td>'
                + '<td><span style="font-size: 80%;">' + standing.lost + '</span></td>'
                + '<td><span style="font-size: 80%;">' + standing.points + '</span></td>'
                + '</tr>'
            )
        });
    });
});

