$(function () {
    $.ajax({
        type: 'post',
        url: "https://footballtickets-by-gakuseimiler.com/wp-content/themes/stile-child/get-football-data.php",
        data: {arg: 32},
        dataType: 'json'
        }).done (function(data){
        //JSON取得後の処理    
        standings = data.standings[0].table;

        var club_list = {
            'Sunderland AFC': 'サンダーランド',
            'West Bromwich Albion FC': 'WBA',
            'Watford FC': 'ワトフォード',
            'Leeds United FC': 'リーズ',
            'Blackburn Rovers FC': 'ブラックバーン',
            'Burnley FC': 'バーンリー',
            'Middlesbrough FC': 'ミドルズブラ',
            'Sheffield United FC': 'シェフィールド・U',
            'Oxford United FC': 'オックスフォード',
            'Derby County FC': 'ダービー',
            'Stoke City FC': 'ストーク',
            'Queens Park Rangers FC': 'QPR',
            'Norwich City FC': 'ノリッジ',
            'Bristol City FC': 'ブリストル',
            'Millwall FC': 'ミルウォール',
            'Swansea City AFC': 'スウォンジー',
            'Coventry City FC': 'コヴェントリー',
            'Portsmouth FC': 'ポーツマス',
            'Hull City AFC': 'ハル・シティ',
            'Sheffield Wednesday FC': 'シェフィールド・ウェンズデイ',
            'Preston North End FC': 'プレストン',
            'Plymouth Argyle FC': 'プリマス',
            'Luton Town FC': 'ルートン',
            'Cardiff City FC': 'カーディフ'
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