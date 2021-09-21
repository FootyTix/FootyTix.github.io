$(function () {
    $.ajaxSetup({
        headers: { "X-Auth-Token": "988f0be1f26f481fae9b8b19d0327312" }
    });
    $.getJSON('https://api.football-data.org/v2/competitions/CL/matches', function (data) {

        //JSON取得後の処理
        matches = data.matches;
        matches.forEach(function (match) {
            match.competition = data.competition
            match.td_class = "td-cl"
        });
        games_num = data.count;

        game_list = matches;

        var club_list = {
            'Liverpool FC': 'リバプール',
            'Manchester City FC': 'マンチェスター・C',
            'Manchester United FC': 'マンチェスター・U',
            'Chelsea FC': 'チェルシー',
            'FC Bayern München': 'バイエルン',
            'Borussia Dortmund': 'ドルトムント',
            'RB Leipzig': 'ライプツィヒ',
            'VfL Wolfsburg': 'ヴォルフスブルク',
            'FC Barcelona': 'バルセロナ',
            'Real Madrid CF': 'レアル・マドリー',
            'Club Atlético de Madrid': 'アトレティコ',
            'Sevilla FC': 'セビージャ',
            'Juventus FC': 'ユベントス',
            'FC Internazionale Milano': 'インテル',
            'Atalanta BC': 'アタランタ',
            'AC Milan': 'ACミラン',
            'Paris Saint-Germain FC': 'PSG',
            'Malmö FF': 'マルメ',
            'Lille OSC': 'リール',
            'FC Red Bull Salzburg': 'ザルツブルク',
            'BSC Young Boys': 'ヤングボーイズ',
            'FK Shakhtar Donetsk': 'シャフタール・ドネツク',
            'FC Porto': 'ポルト',
            'Villarreal CF': 'ビジャレアル',
            'AFC Ajax': 'アヤックス',
            'Sport Lisboa e Benfica': 'ベンフィカ',
            'FC Sheriff Tiraspol': 'シェリフ・ティラスポリ',
            'Club Brugge KV': 'クラブ・ブルッヘ',
            'FK Zenit Sankt-Petersburg': 'ゼニト',
            'FK Dynamo Kyiv': 'ディナモ・キエフ',
            'Sporting Clube de Portugal': 'スポルティングCP',
            'Beşiktaş JK': 'ベシクタシュ',
        };

        var youbi = ["日", "月", "火", "水", "木", "金", "土"];
        var date, jdate;
        var jtime = "";
        var future_matchday_count = 0;
        var past_matchday_count = 1;

        // ラウンド名
        function getMatchdayOrRound(game){
            var round_name = {
                'LAST_16': 'ラウンド16',
                'QUARTER_FINAL': '準々決勝',
                'SEMI_FINAL': '準決勝',
                'FINAL': '決勝'
            }

            if (game.stage == 'GROUP_STAGE') {
                return '󠁢󠁥󠁮󠁧󠁿第' + game.matchday + '節';
            } else if (round_name[game.stage]) {
                return round_name[game.stage]
            } else {
                return -1;
            }
        }

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
            if (round_name = getMatchdayOrRound(game_list[i]) == -1) {
                continue;
            }

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
                    + '<td style="padding-top: 6px;"><img src="https://crests.football-data.org/' + game_list[i].homeTeam.id + '.svg" height="24" width="24">'
                    + '<br /><span style="font-size: 70%;">'
                    + club_list[game_list[i].homeTeam.name] + '</span></td>'
                    + getScoreOrDate(game_list[i], jdate, jtime)
                    + '<td style="padding-top: 6px;"><img src="https://crests.football-data.org/' + game_list[i].awayTeam.id + '.svg" height="24" width="24">'
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
        }
        $("#results-tbl").prepend(
            '<tr><td style="background-color: #1464b3; color: #ffffff;" colspan="3" align="center"><span style="font-size: 80%;">'
            + '󠁢󠁥󠁮󠁧󠁿第' + past_matchday_count + '節'
            + '</span></td></tr>'
        );
        $('#loading-gif').remove();
        $('#results-loading-gif').remove();
    })
    .error(function () {
        // エラーがあった時
        $('#loading-gif').children().remove();
        $('#loading-gif').append('ページを更新してください');
    });
});

