$(function () {
    $.ajax({
        type: 'post',
        url: "https://footballtickets-by-gakuseimiler.com/wp-content/themes/stile-child/get-football-data.php",
        data: {arg: 7},
        dataType: 'json'
        }).done (function(data){
        //JSON取得後の処理
        matches = data.matches;
        matches.forEach(function (match) {
            match.competition = data.competition
            match.td_class = "td-cl"
        });
        games_num = data.count;

        game_list = matches;

        var club_list = {
            'Club Atlético de Madrid': 'アトレティコ',
            'Real Madrid CF': 'レアル・マドリー',
            'FC Barcelona': 'バルセロナ',
            'Real Sociedad de Fútbol': 'レアル・ソシエダ',
            'Villarreal CF': 'ビジャレアル',
            'Cádiz CF': 'カディス',
            'Sevilla FC': 'セビージャ',
            'Athletic Club': 'アスレティック・ビルバオ',
            'UD Las Palmas': 'ラス・パルマス',
            'Rayo Vallecano de Madrid': 'ラージョ・バジェカーノ',
            'Getafe CF': 'ヘタフェ',
            'RC Celta de Vigo': 'セルタ',
            'Valencia CF': 'バレンシア',
            'Real Betis Balompié': 'ベティス',
            'CA Osasuna': 'オサスナ',
            'RCD Mallorca': 'マジョルカ',
            'Girona FC': 'ジローナ',
            'UD Almería': 'アルメリア',
            'Granada CF': 'グラナダ',
            'Deportivo Alavés': 'アラベス'
        };

        var youbi = ["日", "月", "火", "水", "木", "金", "土"];
        var date, jdate;
        var jtime = "";
        var future_matchday_count = 0;
        var past_matchday_count = 1;

        // スコア計算
        function getScore(score, fullScore, pkScore) {
            if (score.duration == 'PENALTY_SHOOTOUT') {
                return (fullScore - pkScore) + '(' + pkScore + ')';
            } else {
                return fullScore;
            }
        }
        // スコアとキックオフ時間
        function getScoreOrDate(game, game_jdate, game_jtime) {
            if (game.score.fullTime.homeTeam > game.score.fullTime.awayTeam) {
                return '<td class="' + game.td_class + '"><span style="font-size: 80%; color: #ff0000;">'
                + getScore(game.score, game.score.fullTime.homeTeam, game.score.penalties.homeTeam) + '</span><span style="font-size: 80%; color: #454545;"> - ' + getScore(game.score, game.score.fullTime.awayTeam, game.score.penalties.awayTeam) 
                + '</span></td>';
            } else if (game.score.fullTime.homeTeam < game.score.fullTime.awayTeam) {
                return '<td class="' + game.td_class + '"><span style="font-size: 80%; color: #454545;">'
                + getScore(game.score, game.score.fullTime.homeTeam, game.score.penalties.homeTeam) + ' - </span><span style="font-size: 80%; color: #ff0000;">' + getScore(game.score, game.score.fullTime.awayTeam, game.score.penalties.awayTeam) 
                + '</span></td>';
            } else {
                return '<td class="' + game.td_class + '"><span style="font-size: 80%; color: #454545;">'
                + getScore(game.score, game.score.fullTime.homeTeam, game.score.penalties.homeTeam) + ' - ' + getScore(game.score, game.score.fullTime.awayTeam, game.score.penalties.awayTeam) 
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
                    + '<td style="padding: 6px;"><img src="https://crests.football-data.org/' + game_list[i].homeTeam.id + '.svg" height="24" width="24">'
                    + '<br /><span style="font-size: 70%;">'
                    + club_list[game_list[i].homeTeam.name] + '</span></td>'
                    + getScoreOrDate(game_list[i], jdate, jtime)
                    + '<td style="padding: 6px;"><img src="https://crests.football-data.org/' + game_list[i].awayTeam.id + '.svg" height="24" width="24">'
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
                    + '<td style="padding: 6px;"><img src="https://crests.football-data.org/' + game_list[i].homeTeam.id + '.svg" height="24" width="24">'
                    + '<br /><span style="font-size: 70%;">'
                    + club_list[game_list[i].homeTeam.name] + '</span></td>'
                    + '<td class="' + game_list[i].td_class + '"><span style="font-size: 65%; color: #454545;">'
                    + (jdate.getMonth() + 1) + '/' + jdate.getDate() + '(' + youbi[jdate.getDay()] + ')'
                    + '<br />' + jtime + '</span></td>'
                    + '<td style="padding: 6px;"><img src="https://crests.football-data.org/' + game_list[i].awayTeam.id + '.svg" height="24" width="24">'
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

