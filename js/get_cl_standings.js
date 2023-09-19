$(function () {
    $.ajax({
        type: 'post',
        url: "https://footballtickets-by-gakuseimiler.com/wp-content/themes/stile-child/get-football-data.php",
        data: {arg: 10},
        dataType: 'json'
        }).done (function(data){
        //JSON取得後の処理
        standings_list = data.standings;

        var club_list = {
            'Manchester United FC': 'マンチェスター・U',
            'Manchester City FC': 'マンチェスター・C',
            'Arsenal FC': 'アーセナル',
            'PSV': 'PSV',
            'FC Bayern München': 'バイエルン',
            'Borussia Dortmund': 'ドルトムント',
            'RB Leipzig': 'ライプツィヒ',
            'Real Sociedad de Fútbol': 'レアル・ソシエダ',
            'FC Barcelona': 'バルセロナ',
            'Real Madrid CF': 'レアル・マドリー',
            'Club Atlético de Madrid': 'アトレティコ',
            'Sevilla FC': 'セビージャ',
            'Sporting Clube de Braga': 'ブラガ',
            'FC Internazionale Milano': 'インテル',
            'SSC Napoli': 'ナポリ',
            'AC Milan': 'ACミラン',
            'Paris Saint-Germain FC': 'PSG',
            'Racing Club de Lens': 'RCランス',
            'Galatasaray SK': 'ガラタサライ',
            'FC Red Bull Salzburg': 'ザルツブルク',
            'Celtic FC': 'セルティック',
            'FC København': 'コペンハーゲン',
            'FC Porto': 'ポルト',
            '1. FC Union Berlin': 'ウニオン・ベルリン',
            'Royal Antwerp FC': 'アントワープ',
            'Sport Lisboa e Benfica': 'ベンフィカ',
            'FK Shakhtar Donetsk': 'シャフタール・ドネツク',
            'FK Crvena Zvezda': 'ツルヴェナ・ズヴェズダ',
            'Feyenoord Rotterdam': 'フェイエノールト',
            'SS Lazio': 'ラツィオ',
            'BSC Young Boys': 'ヤングボーイズ',
            'Newcastle United FC': 'ニューカッスル',
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

