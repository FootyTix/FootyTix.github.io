$(function () {
        $.ajax({
            type: 'post',
            url: "https://footballtickets-by-gakuseimiler.com/wp-content/themes/stile-child/get-football-data.php",
            data: {arg: 6},
            dataType: 'json'
            }).done (function(data){
            //JSON取得後の処理
        standings = data.standings[0].table;

        var club_list = {
            'Club Atlético de Madrid': 'アトレティコ',
            'Real Madrid CF': 'レアル・マドリー',
            'FC Barcelona': 'バルセロナ',
            'Real Sociedad de Fútbol': 'レアル・ソシエダ',
            'Villarreal CF': 'ビジャレアル',
            'Cádiz CF': 'カディス',
            'Sevilla FC': 'セビージャ',
            'Athletic Club': 'アスレティック・ビルバオ',
            'Elche CF': 'エルチェ',
            'Rayo Vallecano de Madrid': 'ラージョ・バジェカーノ',
            'Getafe CF': 'ヘタフェ',
            'RC Celta de Vigo': 'セルタ',
            'Valencia CF': 'バレンシア',
            'Real Betis Balompié': 'ベティス',
            'CA Osasuna': 'オサスナ',
            'RCD Mallorca': 'マジョルカ',
            'Girona FC': 'ジローナ',
            'UD Almería': 'アルメリア',
            'Real Valladolid CF': 'バジャドリード',
            'RCD Espanyol de Barcelona': 'エスパニョール'
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

