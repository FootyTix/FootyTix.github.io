$(function () {
    // $.ajax({
    //     type: 'post',
    //     url: "https://footballtickets-by-gakuseimiler.com/wp-content/themes/stile-child/get-football-data.php",
    //     data: {arg: 11},
    //     dataType: 'json'
    //     }).done (function(data){
    fetch('https://footballtickets-by-gakuseimiler.com/wp-content/football-data/json/cl_matches.json')
    .then(response => response.json())
    .then(data => {
        //JSON取得後の処理
        matches = data.matches;
        matches.forEach(function (match) {
            match.competition = data.competition
            match.td_class = "td-cl"
        });
        games_num = data.resultSet.count; //v4

        game_list = matches;

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
                'PLAYOFFS': '決勝Tプレーオフ',
                'LAST_16': 'ラウンド16',
                'QUARTER_FINALS': '準々決勝',
                'SEMI_FINALS': '準決勝',
                'FINAL': '決勝'
            }
            var leg_name = {
                1: '1stレグ',
                2: '2ndレグ'
            }

            if (game.stage == 'LEAGUE_STAGE') {
                return '󠁢󠁥󠁮󠁧󠁿第' + game.matchday + '節';
            } else if (game.stage == 'FINAL') {
                return round_name[game.stage]
            } else if (round_name[game.stage]) {
                return round_name[game.stage] + ' ' + leg_name[game.matchday]
            } else {
                return -1;
            }
        }

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

        // ホームチーム名
        function getHomeTeam (game) {
            if (game.homeTeam.id == null) {
                return '<td><span style="font-size: 70%;">' + '未定' + '</span></td>';
            } else {
                return '<td style="padding: 6px;"><img src="https://crests.football-data.org/' + game.homeTeam.id + '.svg"' 
                + 'onerror="this.src=' + '\'https://crests.football-data.org/' + game_list[i].homeTeam.id + '.png\'" height="24" width="24">'
                + '<br /><span style="font-size: 70%;">'
                + club_list[game.homeTeam.name] + '</span></td>';
            }
        }

        // アウェイチーム名
        function getAwayTeam (game) {
            if (game.awayTeam.id == null) {
                return '<td><span style="font-size: 70%;">' + '未定' + '</span></td>';
            } else {
                return '<td style="padding: 6px;"><img src="https://crests.football-data.org/' + game.awayTeam.id + '.svg"' 
                + 'onerror="this.src=' + '\'https://crests.football-data.org/' + game_list[i].awayTeam.id + '.png\'" height="24" width="24">'
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

