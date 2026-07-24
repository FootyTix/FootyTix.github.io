$(function () {
    // $.ajax({
    //     type: 'post',
    //     url: "https://footballtickets-by-gakuseimiler.com/wp-content/themes/stile-child/get-football-data.php",
    //     data: {arg: 8},
    //     dataType: 'json'
    //     }).done (function(data){
    fetch('https://footballtickets-by-gakuseimiler.com/wp-content/football-data/json/fl1_standings.json')
    .then(response => response.json())
    .then(data => {
        //JSON取得後の処理    
        standings = data.standings[0].table;

        var club_list = {
            'Lille OSC': 'リール',
            'Le Mans FC': 'ル・マン',
            'Olympique de Marseille': 'マルセイユ',
            'FC Lorient': 'ロリアン',
            'Stade Brestois 29': 'ブレスト',
            'Racing Club de Lens': 'RCランス',
            'Stade Rennais FC 1901': 'レンヌ',
            'Angers SCO': 'アンジェ',
            'AJ Auxerre': 'オセール',
            'Le Havre AC': 'ル・アーヴル',
            'RC Strasbourg Alsace': 'ストラスブール',
            'OGC Nice': 'ニース',
            'Paris Saint-Germain FC': 'PSG',
            'Toulouse FC': 'トゥールーズ',
            'Olympique Lyonnais': 'リヨン',
            'Paris FC': 'パリFC',
            'AS Monaco FC': 'モナコ',
            'ES Troyes AC': 'トロワ'
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