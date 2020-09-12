const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM();
const { document } = dom.window;
const jquery = require('jquery');
const $ = jquery(dom.window);

$(function () {
    $.ajaxSetup({
        headers: { "X-Auth-Token": "28fcc697165249959737b7f980aeefd2" }
    });
    $.when(
        $.getJSON("https://api.football-data.org/v2/competitions/PL/matches"),
        $.getJSON('https://api.football-data.org/v2/competitions/BL1/matches'),
        $.getJSON('https://api.football-data.org/v2/competitions/PD/matches'),
        $.getJSON('https://api.football-data.org/v2/competitions/SA/matches'),
        $.getJSON('https://api.football-data.org/v2/competitions/FL1/matches'),
        $.getJSON('https://api.football-data.org/v2/competitions/CL/matches')
    )
        .done(function (data_PL, data_BL, data_PD, data_SA, data_FL, data_CL) {
            var fs = require('fs');
            
            var json_PL = JSON.stringify(data_PL)
            fs.writeFileSync('./data/PL_matches.json', json_PL);

            var json_BL = JSON.stringify(data_BL)
            fs.writeFileSync('./data/BL_matches.json', json_BL);

            var json_PD = JSON.stringify(data_PD)
            fs.writeFileSync('./data/PD_matches.json', json_PD);

            var json_SA = JSON.stringify(data_SA)
            fs.writeFileSync('./data/SA_matches.json', json_SA);

            var json_FL = JSON.stringify(data_FL)
            fs.writeFileSync('./data/FL_matches.json', json_FL);

            var json_CL = JSON.stringify(data_CL)
            fs.writeFileSync('./data/CL_matches.json', json_CL);
        })
        .fail(function () {
            // エラーがあった時
            console.log('error');
        });
});