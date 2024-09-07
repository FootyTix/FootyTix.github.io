$(function () {
    $.ajax({
        type: 'post',
        url: "https://footballtickets-by-gakuseimiler.com/wp-content/themes/stile-child/get-football-data.php",
        data: {arg: 31},
        dataType: 'json'
        }).done (function(data){
        //JSON取得後の処理
        matches = data.matches;
        matches.forEach(function (match) {
            match.competition = data.competition
            match.td_class = "td-cl"
        });
        games_num = data.resultSet.count; //v4

        game_list = matches;

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

        var youbi = ["日", "月", "火", "水", "木", "金", "土"];
        var date, jdate;
        var jtime = "";
        var future_matchday_count = 0;
        var past_matchday_count = 1;

        // スコア計算
        function getScore(score, team) {
            if (score.duration == 'PENALTY_SHOOTOUT') {
                if (team == 'home') {
                    return score.regularTime.home + '(' + score.penalties.home + ')';
                } else {
                    return score.regularTime.away + '(' + score.penalties.away + ')';
                }
            } else {
                if (team == 'home') {
                    return score.fullTime.home;
                } else {
                    return score.fullTime.away;
                }
            }
        }
        // スコアとキックオフ時間
        function getScoreOrDate(game, game_jdate, game_jtime) {
            if (game.score.fullTime.home > game.score.fullTime.away) {
                return '<td class="' + game.td_class + '"><span style="font-size: 80%; color: #ff0000;">'
                + getScore(game.score, 'home') + '</span><span style="font-size: 80%; color: #454545;"> - ' + getScore(game.score, 'away') 
                + '</span></td>';
            } else if (game.score.fullTime.home < game.score.fullTime.away) {
                return '<td class="' + game.td_class + '"><span style="font-size: 80%; color: #454545;">'
                + getScore(game.score, 'home') + ' - </span><span style="font-size: 80%; color: #ff0000;">' + getScore(game.score, 'away') 
                + '</span></td>';
            } else {
                return '<td class="' + game.td_class + '"><span style="font-size: 80%; color: #454545;">'
                + getScore(game.score, 'home') + ' - ' + getScore(game.score, 'away') 
                + '</span></td>';
            }
        }

        for (var i = 0; i < games_num; i++) {
            // 日時を日本時間に変換
            date = new Date(game_list[i].utcDate);
            date = date.toLocaleString("ja-JP");
            jdate = new Date(date);
            jtime = jdate.getHours() == 9 ? '未定' : (jdate.getHours() + ':' + ("0" + jdate.getMinutes()).slice(-2));

            if (game_list[i].status == 'FINISHED') {
                //節を挿入
                if (game_list[i].matchday != past_matchday_count) {
                    $("#results-tbl").prepend(
                        '<tr><td style="background-color: #1464b3; color: #ffffff;" colspan="3" align="center"><span style="font-size: 80%;">'
                        + '󠁢󠁥󠁮󠁧󠁿第' + past_matchday_count + '節'
                        + '</span></td></tr>'
                    );
                    past_matchday_count = game_list[i].matchday;
                }
                //テーブルに挿入
                $("#results-tbl").prepend(
                    '<tr align="center">'
                    + '<td style="padding: 6px;"><img src="https://crests.football-data.org/' + game_list[i].homeTeam.id + '.svg"' 
                    + 'onerror="this.src=' + '\'https://crests.football-data.org/' + game_list[i].homeTeam.id + '.png\'" height="24" width="24">'
                    + '<br /><span style="font-size: 70%;">'
                    + club_list[game_list[i].homeTeam.name] + '</span></td>'
                    + getScoreOrDate(game_list[i], jdate, jtime)
                    + '<td style="padding: 6px;"><img src="https://crests.football-data.org/' + game_list[i].awayTeam.id + '.svg"' 
                    + 'onerror="this.src=' + '\'https://crests.football-data.org/' + game_list[i].awayTeam.id + '.png\'" height="24" width="24">'
                    + '<br /><span style="font-size: 70%;">'
                    + club_list[game_list[i].awayTeam.name] + '</span></td>'
                    + '</tr>'
                );

            } else {
                //節を挿入
                if (game_list[i].matchday != future_matchday_count) {
                    future_matchday_count = game_list[i].matchday;
                    $("#matches-tbl").append(
                        '<tr><td style="background-color: #1464b3; color: #ffffff;" colspan="3" align="center"><span style="font-size: 80%;">'
                        + '󠁢󠁥󠁮󠁧󠁿第' + future_matchday_count + '節'
                        + '</span></td></tr>'
                    );
                }
                //テーブルに挿入
                $("#matches-tbl").append(
                    '<tr align="center">'
                    + '<td style="padding: 6px;"><img src="https://crests.football-data.org/' + game_list[i].homeTeam.id + '.svg"' 
                    + 'onerror="this.src=' + '\'https://crests.football-data.org/' + game_list[i].homeTeam.id + '.png\'" height="24" width="24">'
                    + '<br /><span style="font-size: 70%;">'
                    + club_list[game_list[i].homeTeam.name] + '</span></td>'
                    + '<td class="' + game_list[i].td_class + '"><span style="font-size: 65%; color: #454545;">'
                    + (jdate.getMonth() + 1) + '/' + jdate.getDate() + '(' + youbi[jdate.getDay()] + ')'
                    + '<br />' + jtime + '</span></td>'
                    + '<td style="padding: 6px;"><img src="https://crests.football-data.org/' + game_list[i].awayTeam.id + '.svg"' 
                    + 'onerror="this.src=' + '\'https://crests.football-data.org/' + game_list[i].awayTeam.id + '.png\'" height="24" width="24">'
                    + '<br /><span style="font-size: 70%;">'
                    + club_list[game_list[i].awayTeam.name] + '</span></td>'
                    + '</tr>'
                );
            }
        }

        $("#results-tbl").prepend(
            '<tr><td style="background-color: #1464b3; color: #ffffff;" colspan="3" align="center"><span style="font-size: 80%;">'
            + '󠁢󠁥󠁮󠁧󠁿第' + past_matchday_count + '節'
            + '</span></td></tr>'
        );
        $('#loading-gif').remove();
        $('#results-loading-gif').remove();
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

