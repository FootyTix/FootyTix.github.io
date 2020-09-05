<p>
<script type="text/javascript">// <![CDATA[
$(function() {
  $.ajaxSetup({
    headers : {"X-Auth-Token" : "28fcc697165249959737b7f980aeefd2"}
  });
  $.when(
    $.getJSON("https://api.football-data.org/v2/competitions/PL/matches?matchday=1"),
    $.getJSON('https://api.football-data.org/v2/competitions/BL1/matches?matchday=1')
  )
  .done(function(data_PL, data_BL) {
    PL = data_PL[0].matches;
    BL = data_BL[0].matches;
    
    $(".matchresults-end").before('<h4>' + data_PL[0].competition.name + '</h4>');
    for(var i=0;i<data_PL[0].count;i++){
          $(".matchresults-end").before('<p>成功' + i + '</br>');
  　var date = new Date(PL[i].utcDate);
  　date = date.toLocaleString("ja-JP");

  $(".matchresults-end").before(
    '<p>' + date + '</br>'
    + PL[i].matchday + '</br>'
    + PL[i].homeTeam.name + '</br>'
    + PL[i].awayTeam.name + '</p>'
  );}
  
    $(".matchresults-end").before('<h4>' + data_BL[0].competition.name + '</h4>');
  for(var i=0;i<data_BL[0].count;i++){
          $(".matchresults-end").before('<p>成功' + i + '</br>');
  var date = new Date(BL[i].utcDate);
  date = date.toLocaleString("ja-JP");

  $(".matchresults-end").before(
    '<p>' + date + '</br>'
    + BL[i].matchday + '</br>'
    + BL[i].homeTeam.name + '</br>'
    + BL[i].awayTeam.name + '</p>'
  );}

  })
  .fail(function() {
    // エラーがあった時
    $(".matchresults-end").before('<p>エラー</p>');
  });
});
// ]]></script>
</p>
<p>直近10試合の結果を表示します。</p>
<div class="matchresults-end"> </div>