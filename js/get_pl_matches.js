$(function () {
    $.ajaxSetup({
        headers: { "X-Auth-Token": "8d515051437f466083d82551328ba830" }
    });
    $.getJSON('https://api.football-data.org/v2/competitions/PL/matches?status=SCHEDULED', function (data_PL) {

        //JSON取得後の処理
        PL = data_PL.matches;
        PL.forEach(function (match) {
            match.competition = data_PL.competition
            match.competition.img = "🏴󠁧󠁢󠁥󠁮󠁧󠁿"
            match.td_class = "td-cl"
        });
        games_num = data_PL.count;

        game_list = PL

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
            'Wolverhampton Wanderers FC': 'ウォルヴァーハンプトン',
            'Aston Villa FC': 'アストン・ヴィラ',
            'Newcastle United FC': 'ニューカッスル',
            'Leeds United FC': 'リーズ ',
            'Crystal Palace FC': 'クリスタル・パレス',
            'Brighton & Hove Albion FC': 'ブライトン',
            'Fulham FC': 'フラム',
            'West Bromwich Albion FC': 'WBA',
            'Burnley FC': 'バーンリー',
            'Sheffield United FC': 'シェフィールド・U'
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

