
$(function () {
    $.ajaxSetup({
        headers: { "X-Auth-Token": "28fcc697165249959737b7f980aeefd2" }
    });
    $.when(
        $.getJSON("https://api.football-data.org/v2/competitions/PL/matches?status=SCHEDULED")
    )
        .done(function (data_PL, data_BL, data_PD, data_SA, data_FL, data_CL) {
            PL = data_PL[0].matches;
            PL.forEach(function (match) {
                match.competition = data_PL[0].competition
                match.competition.img = "🏴󠁧󠁢󠁥󠁮󠁧󠁿"
                match.td_class = "td-pl"
            });
            BL = data_BL[0].matches;
            BL.forEach(function (match) {
                match.competition = data_BL[0].competition
                match.competition.img = "🇩🇪"
                match.td_class = "td-bl"
            });

            games_num = data_PL[0].count
                + data_BL[0].count
                + data_PD[0].count
                + data_SA[0].count
                + data_FL[0].count;

            game_list = PL.concat(BL, PD, SA, FL)

            game_list.sort(function (a, b) {
                if (a.utcDate > b.utcDate) {
                    return 1;
                } else {
                    return -1;
                }
            });

            var club_list = {
                'Liverpool FC': 'リバプール',
                'Manchester City FC': 'マンチェスター・C',
                'Manchester United FC': 'マンチェスター・U',
                'Arsenal FC': 'アーセナル',
                'Tottenham Hotspur FC': 'トッテナム',
                'Chelsea FC': 'チェルシー',
                'Everton FC': 'エバートン',
                'FC Bayern München': 'バイエルン',
                'BV Borussia 09 Dortmund': 'ドルトムント',
                'RB Leipzig': 'ライプツィヒ',
                'FC Schalke 04': 'シャルケ',
                'FC Barcelona': 'バルセロナ',
                'Real Madrid CF': 'レアル・マドリー',
                'Club Atlético de Madrid': 'アトレティコ',
                'Sevilla FC': 'セビージャ',
                'Villarreal CF': 'ビジャレアル',
                'Juventus FC': 'ユベントス',
                'SSC Napoli': 'ナポリ',
                'AS Roma': 'ローマ',
                'FC Internazionale Milano': 'インテル',
                'AC Milan': 'ACミラン',
                'Atalanta BC': 'アタランタ',
                'SS Lazio': 'ラツィオ',
                'Paris Saint-Germain FC': 'PSG',
                'Olympique de Marseille': 'マルセイユ',
                'Olympique Lyonnais': 'リヨン'
            };

            var youbi = ["日", "月", "火", "水", "木", "金", "土"];
            var date, jdate;
            var jtime = "";

            for (var i = 0; i < games_num; i++) {
                if (club_list[game_list[i].homeTeam.name] && club_list[game_list[i].awayTeam.name]) {
                    date = new Date(game_list[i].utcDate);
                    date = date.toLocaleString("ja-JP");
                    jdate = new Date(date);
                    jtime = jdate.getHours() == 9 ? '未定' : (jdate.getHours() + ':' + ("0" + jdate.getMinutes()).slice(-2));
                    $("#matches-tbl").append(
                        '<tr align="center">'
                        + '<td><span style="font-size: 80%;">'
                        + club_list[game_list[i].homeTeam.name] + '</span></td>'
                        + '<td class="' + game_list[i].td_class + '"><span style="font-size: 65%;">'
                        + (jdate.getMonth() + 1) + '/' + jdate.getDate() + '(' + youbi[jdate.getDay()] + ')'
                        + '<br />' + jtime + '</span><br /><span style="font-size: 55%;">'
                        + game_list[i].competition.img + '󠁢󠁥󠁮󠁧󠁿 第' +
                        + game_list[i].matchday + '節</span></td>'
                        + '<td><span style="font-size: 80%;">'
                        + club_list[game_list[i].awayTeam.name] + '</span></td>'
                        + '</tr>'
                    );
                }
            }
            $('#loading-gif').remove();
        })
        .fail(function () {
            // エラーがあった時
            $('#loading-gif').children().remove();
            $('#loading-gif').append('ページを更新してください');
        });
});