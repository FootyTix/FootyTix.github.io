$(function () {
    $.ajax({
        type: 'post',
        url: "https://footballtickets-by-gakuseimiler.com/wp-content/themes/stile-child/get-football-data.php",
        data: {arg: 11},
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
            'Manchester United FC': 'マンチェスター・U',
            'Manchester City FC': 'マンチェスター・C',
            'Arsenal FC': 'アーセナル',
            'PSV': 'PSV',
            'FC Bayern München': 'バイエルン',
            'Borussia Dortmund': 'ドルトムント',
            'RB Leipzig': 'ライプツィヒ',
            'Real Sociedad de Fútbol': 'レアル・ソシエダ',
            'FC Barcelona': 'バルセロナ',
            'Real Madrid CF': 'レアル・マドリー',
            'Club Atlético de Madrid': 'アトレティコ',
            'Sevilla FC': 'セビージャ',
            'Sporting Clube de Braga': 'ブラガ',
            'FC Internazionale Milano': 'インテル',
            'SSC Napoli': 'ナポリ',
            'AC Milan': 'ACミラン',
            'Paris Saint-Germain FC': 'PSG',
            'Racing Club de Lens': 'RCランス',
            'Galatasaray SK': 'ガラタサライ',
            'FC Red Bull Salzburg': 'ザルツブルク',
            'Celtic FC': 'セルティック',
            'FC København': 'コペンハーゲン',
            'FC Porto': 'ポルト',
            '1. FC Union Berlin': 'ウニオン・ベルリン',
            'Royal Antwerp FC': 'アントワープ',
            'Sport Lisboa e Benfica': 'ベンフィカ',
            'FK Shakhtar Donetsk': 'シャフタール・ドネツク',
            'FK Crvena Zvezda': 'ツルヴェナ・ズヴェズダ',
            'Feyenoord Rotterdam': 'フェイエノールト',
            'SS Lazio': 'ラツィオ',
            'BSC Young Boys': 'ヤングボーイズ',
            'Newcastle United FC': 'ニューカッスル',
        };

        var youbi = ["日", "月", "火", "水", "木", "金", "土"];
        var date, jdate;
        var jtime = "";
        var future_matchday_count = 0;
        var past_matchday_count = 1;
        var future_round;
        var past_round = '第1節';

        // ラウンド名
        function getMatchdayOrRound(game){
            var round_name = {
                'LAST_16': 'ラウンド16',
                'QUARTER_FINAL': '準々決勝',
                'SEMI_FINALS': '準決勝',
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

        // ホームチーム名
        function getHomeTeam (game) {
            if (game.homeTeam.id == null) {
                return '<td><span style="font-size: 70%;">' + '未定' + '</span></td>';
            } else {
                return '<td style="padding: 6px;"><img src="https://crests.football-data.org/' + game.homeTeam.id + '.svg" height="24" width="24">'
                + '<br /><span style="font-size: 70%;">'
                + club_list[game.homeTeam.name] + '</span></td>';
            }
        }

        // アウェイチーム名
        function getAwayTeam (game) {
            if (game.awayTeam.id == null) {
                return '<td><span style="font-size: 70%;">' + '未定' + '</span></td>';
            } else {
                return '<td style="padding: 6px;"><img src="https://crests.football-data.org/' + game.awayTeam.id + '.svg" height="24" width="24">'
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
            round = getMatchdayOrRound(game_list[i]);
            if (round == -1) {
                continue;
            }

            if (game_list[i].status == 'FINISHED') {
                //節を挿入
                if (game_list[i].matchday != past_matchday_count) {
                    $("#results-tbl").prepend(
                        '<tr><td style="background-color: #1464b3; color: #ffffff;" colspan="3" align="center"><span style="font-size: 80%;">'
                        + past_round
                        + '</span></td></tr>'
                    );
                    past_matchday_count = game_list[i].matchday;
                    past_round = round;
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
                    future_round = round;
                    $("#matches-tbl").append(
                        '<tr><td style="background-color: #1464b3; color: #ffffff;" colspan="3" align="center"><span style="font-size: 80%;">'
                        + future_round
                        + '</span></td></tr>'
                    );
                }
                //テーブルに挿入
                $("#matches-tbl").append(
                    '<tr align="center">'
                    + getHomeTeam(game_list[i])
                    + '<td class="' + game_list[i].td_class + '"><span style="font-size: 65%; color: #454545;">'
                    + (jdate.getMonth() + 1) + '/' + jdate.getDate() + '(' + youbi[jdate.getDay()] + ')'
                    + '<br />' + jtime + '</span></td>'
                    + getAwayTeam(game_list[i])
                    + '</tr>'
                );
            }
        }
        $("#results-tbl").prepend(
            '<tr><td style="background-color: #1464b3; color: #ffffff;" colspan="3" align="center"><span style="font-size: 80%;">'
            + past_round
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

