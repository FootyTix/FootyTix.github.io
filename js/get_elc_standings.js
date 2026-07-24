$(function () {
    // $.ajax({
    //     type: 'post',
    //     url: "https://footballtickets-by-gakuseimiler.com/wp-content/themes/stile-child/get-football-data.php",
    //     data: {arg: 32},
    //     dataType: 'json'
    //     }).done (function(data){
    fetch('https://footballtickets-by-gakuseimiler.com/wp-content/football-data/json/elc_standings.json')
    .then(response => response.json())
    .then(data => {
        //JSON取得後の処理    
        standings = data.standings[0].table;

        var club_list = {
            'Swansea City AFC': 'スウォンジー',
            'Middlesbrough FC': 'ミドルズブラ',
            'Queens Park Rangers FC': 'QPR',
            'Norwich City FC': 'ノリッジ',
            'Birmingham City FC': 'バーミンガム',
            'Burnley FC': 'バーンリー',
            'Derby County FC': 'ダービー',
            'Wolverhampton Wanderers FC': 'ウルブス',
            'Preston North End FC': 'プレストン',
            'Cardiff City FC': 'カーディフ',
            'West Ham United FC': 'ウェストハム',
            'Portsmouth FC': 'ポーツマス',
            'West Bromwich Albion FC': 'WBA',
            'Bolton Wanderers FC': 'ボルトン',
            'Southampton FC': 'サウサンプトン',
            'Sheffield United FC': 'シェフィールド・U',
            'Blackburn Rovers FC': 'ブラックバーン',
            'Watford FC': 'ワトフォード',
            'Lincoln City FC': 'リンカーン',
            'Charlton Athletic FC': 'チャールトン',
            'Wrexham AFC': 'レクサム',
            'Bristol City FC': 'ブリストル',
            'Millwall FC': 'ミルウォール',
            'Stoke City FC': 'ストーク'
        };
        // 順位表作成
        standings.forEach(function (standing) {
            $("#standings-tbl").append(
                '<tr align="center">'
                + '<td><span style="font-size: 70%;">' + standing.position + '</span></td>'
                + '<td style="padding: 4px;"><span style="font-size: 70%;">' + '<div style = "text-align: left"><div style="padding: 4px 4px 0 4px; display: table-cell; vertical-align: middle;"><img src="' 
                + standing.team.crest + '" height="24" width="24"></div><div style="display: table-cell; vertical-align: middle;">' 
                + club_list[standing.team.name] + '</div></div></span></td>'
                + '<td><span style="font-size: 70%; font-weight: bolder;"><mark style="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-vivid-red-color">' + standing.points + '</mark></span></td>'
                + '<td><span style="font-size: 70%;">' + standing.playedGames + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.won + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.draw + '</span></td>'
                + '<td><span style="font-size: 70%;">' + standing.lost + '</span></td>'
                + '<td><span style="font-size: 70%;">' + ['','+'][+(standing.goalDifference > 0)] + standing.goalDifference + '</span></td>'
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