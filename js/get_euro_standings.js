$(function () {
    $.ajaxSetup({
        headers: { "X-Auth-Token": "87623518926c49a6aaed4d2f79bfd1a1" }
    });
    $.getJSON('https://api.football-data.org/v2/competitions/EC/standings?standingType=TOTAL', function (data) {
        //JSON取得後の処理
        standings_list = data.standings;

        var club_list = {
            "Germany": "ドイツ",
            "Spain": "スペイン",
            "Portugal": "ポルトガル",
            "Slovakia": "スロヴァキア",
            "England": "イングランド",
            "France": "フランス",
            "Denmark": "デンマーク",
            "Italy": "イタリア",
            "Switzerland": "スイス",
            "Ukraine": "ウクライナ",
            "Sweden": "スウェーデン",
            "Poland": "ポーランド",
            "Czech Republic": "チェコ",
            "Croatia": "クロアチア",
            "Turkey": "トルコ",
            "Belgium": "ベルギー",
            "Russia": "ロシア",
            "Austria": "オーストリア",
            "Hungary": "ハンガリー",
            "Wales": "ウェールズ",
            "Finland": "フィンランド",
            "North Macedonia": "北マケドニア",
            "Netherlands": "北アイルランド",
            "Scotland": "スコットランド",
        };
        
        var clone_tbl = document.getElementById("standings-tbl");
        var i = 1;
        // 順位表作成
        standings_list.forEach(function (group) {
            var standings = group.table;
            var tbl_id = "#standings-tbl" + i;
            standings.forEach(function (standing) {
                $(tbl_id).append(
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
            })
            i++;
        });
        $('.loading-gif').remove();
    })
    .error(function () {
        // エラーがあった時
        $('.loading-gif').children().remove();
        $('.loading-gif').append('ページを更新してください');
    });
});