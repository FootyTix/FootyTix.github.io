$(function () {
    $.ajax({
        type: 'post',
        url: "https://footballtickets-by-gakuseimiler.com/wp-content/themes/stile-child/get-football-data.php",
        data: {arg: 1},
        dataType: 'json'
        }).done (function(data){
        //JSON取得後の処理
        standings_list = data.standings;

        var club_list = {
            "Qatar": "カタール",
            "Germany": "ドイツ",
            "Spain": "スペイン",
            "Portugal": "ポルトガル",
            "England": "イングランド",
            "France": "フランス",
            "Denmark": "デンマーク",
            "Italy": "イタリア",
            "Switzerland": "スイス",
            "Ukraine": "ウクライナ",
            "Poland": "ポーランド",
            "Croatia": "クロアチア",
            "Belgium": "ベルギー",
            "Wales": "ウェールズ",
            "Netherlands": "オランダ",
            "Serbia": "セルビア",
            "Scotland": "スコットランド",
            "Brazil": "ブラジル",
            "Argentina": "アルゼンチン",
            "Uruguay": "ウルグアイ",
            "Ecuador": "エクアドル",
            "Japan": "日本",
            "Saudi Arabia": "サウジアラビア",
            "Iran": "イラン",
            "South Korea": "韓国",
            "Senegal": "セネガル",
            "Morocco": "モロッコ",
            "Cameroon": "カメルーン",
            "Tunisia": "チュニジア",
            "Ghana": "ガーナ",
            "United States": "アメリカ",
            "Mexico": "メキシコ",
            "Canada": "カナダ",
            "Australia": "オーストラリア",
            "Costa Rica": "コスタリカ",
            "Wales": "ウェールズ"
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
                    + '<td><span style="font-size: 60%;">' + '<div style = "text-align: left"><div style="padding: 0px 4px 0 4px; display: table-cell; vertical-align: middle;"><img src="' 
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

