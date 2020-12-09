$(function ($) {
    $("#btn1").on("click", function () {
        /// チェックされたvalue値を配列として取得
        var select_vals = $('input[name=clubs]:checked').map(function () {
            return $(this).val();
        }).get();
        $.each($("#pref-table tbody tr"), function (index, element) {
            if (select_vals == "") {
                $(element).css("display", "table-row");
                return true;
            }
            var row_text = $(element).text();
            var flag = 0;
            $.each(select_vals, function (index, select_val) {
                if (row_text.indexOf(select_val) != -1) {
                    flag = 1;
                    return false;
                }
            });
            if (flag == 1) {
                $(element).css("display", "table-row");
            } else {
                $(element).css("display", "none");
            }
        })
    });
    $('#all_check').change(function () {
        if ($(this).prop('checked')) {
            $('input:checkbox[name="clubs"]').prop('checked', true);
        } else {
            $('input:checkbox[name="clubs"]').prop('checked', false);
        }
    });
});
$(function () {
    // $.ajaxSetup({
    //     headers: { "X-Auth-Token": "28fcc697165249959737b7f980aeefd2" }
    // });
    $.when(
        $.getJSON({
            url: "https://api.football-data.org/v2/competitions/PL/matches?status=SCHEDULED",
            headers: { "X-Auth-Token": "28fcc697165249959737b7f980aeefd2" }
        }),
        $.getJSON({
            url: "https://api.football-data.org/v2/competitions/BL1/matches?status=SCHEDULED",
            headers: { "X-Auth-Token": "f70cd1be97664d618660f91a5d736505" }
        }),
        $.getJSON({
            url: "https://api.football-data.org/v2/competitions/PD/matches?status=SCHEDULED",
            headers: { "X-Auth-Token": "d7027a3a37224b918d5af11421c478a9" }
        }),
        $.getJSON({
            url: "https://api.football-data.org/v2/competitions/SA/matches?status=SCHEDULED",
            headers: { "X-Auth-Token": "061bce2b0738476f94d97e516179852d" }
        }),
        $.getJSON({
            url: "https://api.football-data.org/v2/competitions/FL1/matches?status=SCHEDULED",
            headers: { "X-Auth-Token": "3752f505d947465d8b1c5b03430890eb" }
        }),
        $.getJSON({
            url: "https://api.football-data.org/v2/competitions/CL/matches?status=SCHEDULED",
            headers: { "X-Auth-Token": "28d539fc326e418e930ef4221a051b1d" }
        })
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
            PD = data_PD[0].matches;
            PD.forEach(function (match) {
                match.competition = data_PD[0].competition
                match.competition.img = "🇪🇸"
                match.td_class = "td-pd"
            });
            SA = data_SA[0].matches;
            SA.forEach(function (match) {
                match.competition = data_SA[0].competition
                match.competition.img = "🇮🇹"
                match.td_class = "td-sa"
            });
            FL = data_FL[0].matches;
            FL.forEach(function (match) {
                match.competition = data_FL[0].competition
                match.competition.img = "🇫🇷"
                match.td_class = "td-fl"
            });
            CL = data_CL[0].matches;
            CL.forEach(function (match) {
                match.competition = data_CL[0].competition
                match.competition.img = '<img src="https://cdn-ak.f.st-hatena.com/images/fotolife/k/ktakumi11/20201004/20201004184003.png" alt="20201004184003">'
                match.td_class = "td-cl"
            });

            games_num = data_PL[0].count
                + data_BL[0].count
                + data_PD[0].count
                + data_SA[0].count
                + data_FL[0].count
                + data_CL[0].count;;

            game_list = PL.concat(BL, PD, SA, FL, CL)

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
                'Leicester City FC': 'レスター',
                'FC Bayern München': 'バイエルン',
                'Borussia Dortmund': 'ドルトムント',
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
                        + '<td><img src="https://crests.football-data.org/' + game_list[i].homeTeam.id + '.svg" height="24">'
                        + '<br /><span style="font-size: 80%;">'
                        + club_list[game_list[i].homeTeam.name] + '</span></td>'
                        + '<td class="' + game_list[i].td_class + '"><span style="font-size: 65%;">'
                        + (jdate.getMonth() + 1) + '/' + jdate.getDate() + '(' + youbi[jdate.getDay()] + ')'
                        + '<br />' + jtime + '</span><br /><span style="font-size: 55%;">'
                        + game_list[i].competition.img + '󠁢󠁥󠁮󠁧󠁿 第' +
                        + game_list[i].matchday + '節</span></td>'
                        + '<td><img src="https://crests.football-data.org/' + game_list[i].awayTeam.id + '.svg" height="24">'
                        + '<br /><span style="font-size: 80%;">'
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