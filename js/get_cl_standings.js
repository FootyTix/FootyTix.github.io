$(function () {
    // $.ajax({
    //     type: 'post',
    //     url: "https://footballtickets-by-gakuseimiler.com/wp-content/themes/stile-child/get-football-data.php",
    //     data: {arg: 10},
    //     dataType: 'json'
    //     }).done (function(data){
    fetch('https://footballtickets-by-gakuseimiler.com/wp-content/football-data/json/cl_standings.json')
    .then(response => response.json())
    .then(data => {
        //JSON取得後の処理
        standings_list = data.standings;

      var club_list = {
            'AFC Ajax': 'アヤックス',
            'Arsenal FC': 'アーセナル',
            'AS Monaco FC': 'モナコ',
            'Atalanta BC': 'アタランタ',
            'Athletic Club': 'アスレティック・ビルバオ',
            'Club Atlético de Madrid': 'アトレティコ・マドリード',
            'Bayer 04 Leverkusen': 'レヴァークーゼン',
            'FC Bayern München': 'バイエルン',
            'Borussia Dortmund': 'ドルトムント',
            'Chelsea FC': 'チェルシー',
            'Club Brugge KV': 'クラブ・ブルッヘ',
            'Eintracht Frankfurt': 'フランクフルト',
            'FC Barcelona': 'バルセロナ',
            'FC København': 'コペンハーゲン',
            'FK Bodø/Glimt': 'ボーデ／グリムト',
            'FK Kairat': 'カイラト',
            'Galatasaray SK': 'ガラタサライ',
            'FC Internazionale Milano': 'インテル',
            'Juventus FC': 'ユヴェントス',
            'Liverpool FC': 'リヴァプール',
            'Manchester City FC': 'マンチェスター・C',
            'Newcastle United FC': 'ニューカッスル',
            'PAE Olympiakos SFP': 'オリンピアコス',
            'Olympique de Marseille': 'マルセイユ',
            'Paphos FC': 'パフォス',
            'Paris Saint-Germain FC': 'PSG',
            'PSV': 'PSV',
            'Qarabağ Ağdam FK': 'カラバフ',
            'Real Madrid CF': 'レアル・マドリード',
            'Sport Lisboa e Benfica': 'ベンフィカ',
            'SK Slavia Praha': 'スラヴィア・プラハ',
            'Sporting Clube de Portugal': 'スポルティング',
            'SSC Napoli': 'ナポリ',
            'Tottenham Hotspur FC': 'トッテナム',
            'Royale Union Saint-Gilloise': 'ユニオンSG',
            'Villarreal CF': 'ビジャレアル'
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

