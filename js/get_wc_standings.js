$(function () {
    // $.ajax({
    //     type: 'post',
    //     url: "https://footballtickets-by-gakuseimiler.com/wp-content/themes/stile-child/get-football-data.php",
    //     data: {arg: 1},
    //     dataType: 'json'
    //     }).done (function(data){
    fetch('https://footballtickets-by-gakuseimiler.com/wp-content/football-data/json/wc_standings.json')
    .then(response => response.json())
    .then(data => {
        //JSON取得後の処理
        standings_list = data.standings;

        var club_list = {
            "Mexico": "メキシコ",
            "South Africa": "南アフリカ",
            "South Korea": "韓国",
            "Canada": "カナダ",
            "Qatar": "カタール",
            "Switzerland": "スイス",
            "Brazil": "ブラジル",
            "Morocco": "モロッコ",
            "Haiti": "ハイチ",
            "Scotland": "スコットランド",
            "United States": "アメリカ",
            "Paraguay": "パラグアイ",
            "Australia": "オーストラリア",
            "Germany": "ドイツ",
            "Curaçao": "キュラソー",
            "Côte d'Ivoire": "コートジボワール",
            "Ecuador": "エクアドル",
            "Netherlands": "オランダ",
            "Japan": "日本",
            "Tunisia": "チュニジア",
            "Belgium": "ベルギー",
            "Egypt": "エジプト",
            "Iran": "イラン",
            "New Zealand": "ニュージーランド",
            "Spain": "スペイン",
            "Cape Verde Islands": "カーボベルデ",
            "Saudi Arabia": "サウジアラビア",
            "Uruguay": "ウルグアイ",
            "France": "フランス",
            "Senegal": "セネガル",
            "Norway": "ノルウェー",
            "Argentina": "アルゼンチン",
            "Algeria": "アルジェリア",
            "Austria": "オーストリア",
            "Jordan": "ヨルダン",
            "Portugal": "ポルトガル",
            "Uzbekistan": "ウズベキスタン",
            "Colombia": "コロンビア",
            "England": "イングランド",
            "Croatia": "クロアチア",
            "Ghana": "ガーナ",
            "Panama": "パナマ"
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
            })
            i++;
        });
        $('.loading-gif').remove();
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

