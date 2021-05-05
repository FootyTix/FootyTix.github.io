$(function () {
    $.ajaxSetup({
        headers: { "X-Auth-Token": "eef183d61edc4fa8b63108971f91fabf" }
    });
    $.getJSON('https://api.football-data.org/v2/competitions/FL1/matches?status=SCHEDULED', function (data) {

        //JSON取得後の処理
        matches = data.matches;
        matches.forEach(function (match) {
            match.competition = data.competition
            match.td_class = "td-cl"
        });
        games_num = data.count;

        game_list = matches;

        var club_list = {
            'Paris Saint-Germain FC': 'PSG',
            'Olympique de Marseille': 'マルセイユ',
            'Lille OSC': 'リール',
            'Olympique Lyonnais': 'リヨン',
            'AS Monaco FC': 'モナコ',
            'Montpellier HSC': 'モンペリエ',
            'Racing Club de Lens': 'RCランス',
            'Stade Rennais FC 1901': 'レンヌ',
            'Angers SCO': 'アンジェ',
            'Stade Brestois 29': 'ブレスト',
            'OGC Nice': 'ニース',
            'FC Metz': 'メス',
            'FC Girondins de Bordeaux': 'ボルドー',
            'FC Nantes': 'ナント',
            'AS Saint-Étienne': 'サンテティエンヌ',
            'Nîmes Olympique': 'ニーム',
            'Stade de Reims': 'スタッド・ランス',
            'FC Lorient': 'ロリアン',
            'RC Strasbourg Alsace': 'ストラスブール',
            "Dijon Football Côte d'Or": 'ディジョン'
        };

        var youbi = ["日", "月", "火", "水", "木", "金", "土"];
        var date, jdate;
        var jtime = "";
        var matchday_count = 0;

        for (var i = 0; i < games_num; i++) {
            // 日時を日本時間に変換
            date = new Date(game_list[i].utcDate);
            date = date.toLocaleString("ja-JP");
            jdate = new Date(date);
            jtime = jdate.getHours() == 9 ? '未定' : (jdate.getHours() + ':' + ("0" + jdate.getMinutes()).slice(-2));
            
            //節を挿入
            if (game_list[i].matchday > matchday_count) {
                matchday_count = game_list[i].matchday;
                $("#matches-tbl").append(
                    '<tr><td style="background-color: #1464b3; color: #ffffff;" colspan="3" align="center"><span style="font-size: 80%;">'
                    + '󠁢󠁥󠁮󠁧󠁿第' + matchday_count + '節'
                    + '</span></td></tr>'
                );
            }

            //テーブルに挿入
            $("#matches-tbl").append(
                '<tr align="center">'
                + '<td><img src="https://crests.football-data.org/' + game_list[i].homeTeam.id + '.svg" height="24">'
                + '<br /><span style="font-size: 80%;">'
                + club_list[game_list[i].homeTeam.name] + '</span></td>'
                + '<td class="' + game_list[i].td_class + '"><span style="font-size: 65%;">'
                + (jdate.getMonth() + 1) + '/' + jdate.getDate() + '(' + youbi[jdate.getDay()] + ')'
                + '<br />' + jtime + '</span><br /><span style="font-size: 65%;"></span></td>'
                + '<td><img src="https://crests.football-data.org/' + game_list[i].awayTeam.id + '.svg" height="24">'
                + '<br /><span style="font-size: 80%;">'
                + club_list[game_list[i].awayTeam.name] + '</span></td>'
                + '</tr>'
            );
        }
        $('#loading-gif').remove();
    })
        .error(function () {
            // エラーがあった時
            $('#loading-gif').children().remove();
            $('#loading-gif').append('ページを更新してください');
        });
});

