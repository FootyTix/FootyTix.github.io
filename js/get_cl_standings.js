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
            'AC Milan': 'ACミラン',
            'AC Sparta Praha': 'ACスパルタ・プラハ',
            'Arsenal FC': 'アーセナル',
            'AS Monaco FC': 'ASモナコ',
            'Aston Villa FC': 'アストン・ヴィラ',
            'Atalanta BC': 'アタランタ',
            'Club Atlético de Madrid': 'アトレティコ',
            'Bayer 04 Leverkusen': 'レバークーゼン',
            'FC Bayern München': 'バイエルン',
            'Borussia Dortmund': 'ドルトムント',
            'BSC Young Boys': 'ヤングボーイズ',
            'Bologna FC 1909': 'ボローニャ',
            'Celtic FC': 'セルティック',
            'Club Brugge KV': 'クラブ・ブルージュ',
            'FK Crvena Zvezda': 'ツルヴェナ・ズヴェズダ',
            'GNK Dinamo Zagreb': 'ディナモ・ザグレブ',
            'FC Barcelona': 'バルセロナ',
            'Feyenoord Rotterdam': 'フェイエノールト',
            'Girona FC': 'ジローナ',
            'FC Internazionale Milano': 'インテル',
            'Juventus FC': 'ユヴェントス',
            'Lille OSC': 'リール',
            'Liverpool FC': 'リヴァプール',
            'Manchester City FC': 'マンチェスター・C',
            'Paris Saint-Germain FC': 'PSG',
            'PSV': 'PSV',
            'RB Leipzig': 'ライプツィヒ',
            'FC Red Bull Salzburg': 'ザルツブルク',
            'Real Madrid CF': 'レアル・マドリー',
            'FK Shakhtar Donetsk': 'シャフタール・ドネツク',
            'Sport Lisboa e Benfica': 'ベンフィカ',
            'ŠK Slovan Bratislava': 'スロヴァン・ブラチスラヴァ',
            'Sporting Clube de Portugal': 'スポルティングCP',
            'Stade Brestois 29': 'ブレスト',
            'SK Sturm Graz': 'グラーツ',
            'VfB Stuttgart': 'シュトゥットガルト'
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

