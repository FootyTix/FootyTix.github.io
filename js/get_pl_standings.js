$(function () {
    $.ajaxSetup({
        headers: { "X-Auth-Token": "8d515051437f466083d82551328ba830" }
    });
    $.getJSON('https://api.football-data.org/v2/competitions/PL/standings?standingType=TOTAL', function (data_PL) {
        //JSON取得後の処理
        standings = data_PL.standings[0].table;

        var club_list = {
            'Liverpool FC': 'リバプール',
            'Manchester City FC': 'マンチェスター・C',
            'Manchester United FC': 'マンチェスター・U',
            'Arsenal FC': 'アーセナル',
            'Tottenham Hotspur FC': 'トッテナム',
            'Chelsea FC': 'チェルシー',
            'Everton FC': 'エバートン',
            'Leicester City FC': 'レスター',
            'West Ham United FC': 'ウェストハム',
            'Southampton FC': 'サウサンプトン',
            'Wolverhampton Wanderers FC': 'ウルブス',
            'Aston Villa FC': 'アストン・ヴィラ',
            'Newcastle United FC': 'ニューカッスル',
            'Leeds United FC': 'リーズ ',
            'Crystal Palace FC': 'クリスタル・パレス',
            'Brighton & Hove Albion FC': 'ブライトン',
            'Brentford FC': 'ブレントフォード',
            'Norwich City FC': 'ノリッジ',
            'Burnley FC': 'バーンリー',
            'Watford FC': 'ワトフォード'
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

