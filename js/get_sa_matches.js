$(function () {
    $.ajaxSetup({
        headers: { "X-Auth-Token": "ffa3eafb266c4274ab4491428e516b49" }
    });
    $.getJSON('https://api.football-data.org/v2/competitions/SA/matches?status=SCHEDULED', function (data) {

        //JSON取得後の処理
        matches = data.matches;
        matches.forEach(function (match) {
            match.competition = data.competition
            match.td_class = "td-cl"
        });
        games_num = data.count;

        game_list = matches;

        var club_list = {
            'AC Milan': 'ACミラン',
            'FC Internazionale Milano': 'インテル',
            'Juventus FC': 'ユベントス',
            'US Sassuolo Calcio': 'サッスオーロ',
            'SSC Napoli': 'ナポリ',
            'SS Lazio': 'ラツィオ',
            'AS Roma': 'ローマ',
            'Hellas Verona FC': 'ヴェローナ',
            'Atalanta BC': 'アタランタ',
            'Bologna FC 1909': 'ボローニャ',
            'Cagliari Calcio': 'カリアリ',
            'UC Sampdoria': 'サンプドリア',
            'Spezia Calcio': 'スペツィア',
            'Udinese Calcio': 'ウディネーゼ',
            'Venezia FC': 'ヴェネツィア',
            'US Salernitana 1919': 'サレルニターナ',
            'ACF Fiorentina': 'フィオレンティーナ',
            'Torino FC': 'トリノ',
            'Genoa CFC': 'ジェノア',
            'Empoli FC': 'エンポリ'
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
            if (game_list[i].matchday != matchday_count) {
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
                + '<td style="padding-top: 6px;"><img src="https://crests.football-data.org/' + game_list[i].homeTeam.id + '.svg" height="24" width="24">'
                + '<br /><span style="font-size: 70%;">'
                + club_list[game_list[i].homeTeam.name] + '</span></td>'
                + '<td class="' + game_list[i].td_class + '"><span style="font-size: 65%; color: #454545;">'
                + (jdate.getMonth() + 1) + '/' + jdate.getDate() + '(' + youbi[jdate.getDay()] + ')'
                + '<br />' + jtime + '</span></td>'
                + '<td style="padding-top: 6px;"><img src="https://crests.football-data.org/' + game_list[i].awayTeam.id + '.svg" height="24" width="24">'
                + '<br /><span style="font-size: 70%;">'
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

