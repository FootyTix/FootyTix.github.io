$(function () {
    $.ajaxSetup({
        headers: { "X-Auth-Token": "988f0be1f26f481fae9b8b19d0327312" }
    });
    $.getJSON('https://api.football-data.org/v2/competitions/EC/matches', function (data) {

        //JSON取得後の処理
        matches = data.matches;
        matches.forEach(function (match) {
            match.competition = data.competition
            match.td_class = "td-cl"
        });
        games_num = data.count;

        game_list = matches;

        var club_list = {
            "Germany": "ドイツ",
            "Spain": "スペイン",
            "Portugal": "ポルトガル",
            "Slovakia": "スロヴァキア",
            "England": "イングランド",
            "France": "フランス",
            "Denmark": "デンマーク",
            "Italy": "イタリア",
            "Switzerland": "スイス",
            "Ukraine": "ウクライナ",
            "Sweden": "スウェーデン",
            "Poland": "ポーランド",
            "Czech Republic": "チェコ",
            "Croatia": "クロアチア",
            "Turkey": "トルコ",
            "Belgium": "ベルギー",
            "Russia": "ロシア",
            "Austria": "オーストリア",
            "Hungary": "ハンガリー",
            "Wales": "ウェールズ",
            "Finland": "フィンランド",
            "North Macedonia": "北マケドニア",
            "Netherlands": "オランダ",
            "Scotland": "スコットランド",
        };

        var youbi = ["日", "月", "火", "水", "木", "金", "土"];
        var date, jdate;
        var jtime = "";
        var matchday_count = 0;

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
            } else {
                return round_name[game.stage]
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
            if (game.status == 'FINISHED') {
                if (game.score.fullTime.homeTeam > game.score.fullTime.awayTeam) {
                    return '<td class="' + game.td_class + '"><span style="font-size: 65%; color: #ff0000;">'
                    + getScore(game.score, game.score.fullTime.homeTeam, game.score.penalties.homeTeam) + '</span><span style="font-size: 65%; color: #454545;"> - ' + getScore(game.score, game.score.fullTime.awayTeam, game.score.penalties.awayTeam) 
                    + '</span></td>';
                } else if (game.score.fullTime.homeTeam < game.score.fullTime.awayTeam) {
                    return '<td class="' + game.td_class + '"><span style="font-size: 65%; color: #454545;">'
                    + getScore(game.score, game.score.fullTime.homeTeam, game.score.penalties.homeTeam) + ' - </span><span style="font-size: 65%; color: #ff0000;">' + getScore(game.score, game.score.fullTime.awayTeam, game.score.penalties.awayTeam) 
                    + '</span></td>';
                } else {
                    return '<td class="' + game.td_class + '"><span style="font-size: 65%; color: #454545;">'
                    + getScore(game.score, game.score.fullTime.homeTeam, game.score.penalties.homeTeam) + ' - ' + getScore(game.score, game.score.fullTime.awayTeam, game.score.penalties.awayTeam) 
                    + '</span></td>';
                }
            } else {
                return '<td class="' + game.td_class + '"><span style="font-size: 65%;">'
                + (game_jdate.getMonth() + 1) + '/' + game_jdate.getDate() + '(' + youbi[game_jdate.getDay()] + ')'
                + '<br />' + game_jtime + '</span></td>';
            }
        }

        // ホームチーム名
        function getHomeTeam (game) {
            if (game.homeTeam.id == null) {
                return '<td><span style="font-size: 70%;">' + '未定' + '</span></td>';
            } else {
                return '<td style="padding-top: 6px;"><img src="https://crests.football-data.org/' + game.homeTeam.id + '.svg" height="15" width="15">'
                + '<br /><span style="font-size: 70%;">'
                + club_list[game.homeTeam.name] + '</span></td>';
            }
        }

        // アウェイチーム名
        function getAwayTeam (game) {
            if (game.awayTeam.id == null) {
                return '<td><span style="font-size: 70%;">' + '未定' + '</span></td>';
            } else {
                return '<td style="padding-top: 6px;"><img src="https://crests.football-data.org/' + game.awayTeam.id + '.svg" height="15" width="15">'
                + '<br /><span style="font-size: 70%;">'
                + club_list[game.awayTeam.name] + '</span></td>';
            }
        }

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
                    + getMatchdayOrRound(game_list[i])
                    + '</span></td></tr>'
                );
            }

            //テーブルに挿入
            $("#matches-tbl").append(
                '<tr align="center">'
                + getHomeTeam(game_list[i])
                + getScoreOrDate(game_list[i], jdate, jtime)
                + getAwayTeam(game_list[i])
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

