(function () {

  var path = window.location.pathname.replace(/\/+$/, '') || '/';


  /* =====================================================
     リーグ設定
     ===================================================== */

  var leagues = {

    'uefa-champions-league': {
      name: 'チャンピオンズリーグ',
      watch: '/entry/ucl-wowow-broadcast'
    },

    'premier-league': {
      name: 'プレミアリーグ',
      watch: '/entry/premier-league-broadcast'
    },

    'la-liga': {
      name: 'ラ・リーガ',
      watch: '/entry/la-liga-broadcast'
    },

    'serie-a': {
      name: 'セリエA',
      watch: '/entry/serie-a-broadcast'
    },

    'bundesliga': {
      name: 'ブンデスリーガ',
      watch: '/entry/bundesliga-broadcast'
    },

    'ligue-1': {
      name: 'リーグ・アン',
      watch: '/entry/ligue1-broadcast'
    },

    'eredivisie': {
      name: 'エールディヴィジ',
      watch: '/entry/eredivisie-broadcast'
    },

    'primeira-liga': {
      name: 'プリメイラ・リーガ',
      watch: null
    },

    'efl-championship': {
      name: 'EFLチャンピオンシップ',
      watch: '/entry/ifollow'
    },

    'wc2026': {
      name: '北中米W杯2026',
      watch: '/entry/wc2026-broadcast-dazn'
    }

  };


  /* =====================================================
     日程 or 順位
     ===================================================== */

  var mode = path.indexOf('/standings') === 0
    ? 'standings'
    : 'fixtures';


  /* =====================================================
     現在リーグ
     ===================================================== */

  var currentLeague = null;

  Object.keys(leagues).some(function (slug) {

    if (
      path === '/fixtures/' + slug ||
      path === '/standings/' + slug
    ) {

      currentLeague = slug;
      return true;

    }

    return false;

  });


  /* =====================================================
     DOM
     ===================================================== */

  var fixturesTab =
    document.getElementById('ftx-tab-fixtures');

  var standingsTab =
    document.getElementById('ftx-tab-standings');

  var watchTab =
    document.getElementById('ftx-tab-watch');

  var watchLabel =
    document.getElementById('ftx-watch-label');

  var leagueGrid =
    document.getElementById('ftx-league-grid');


  if (
    !fixturesTab ||
    !standingsTab ||
    !watchTab ||
    !watchLabel ||
    !leagueGrid
  ) {
    return;
  }


  /* =====================================================
     日程 / 順位リンク
     ===================================================== */

  if (currentLeague) {

    fixturesTab.href =
      '/fixtures/' + currentLeague;

    standingsTab.href =
      '/standings/' + currentLeague;

  } else {

    fixturesTab.href = '/fixtures';
    standingsTab.href = '/standings';

  }


  /* =====================================================
     現在のタブ
     ===================================================== */

  if (mode === 'standings') {

    standingsTab.classList.add('is-active');

    standingsTab.setAttribute(
      'aria-current',
      'page'
    );

  } else {

    fixturesTab.classList.add('is-active');

    fixturesTab.setAttribute(
      'aria-current',
      'page'
    );

  }


  /* =====================================================
     視聴方法CTA
     個別リーグのみ表示
     ===================================================== */

  if (
    currentLeague &&
    leagues[currentLeague] &&
    leagues[currentLeague].watch
  ) {

    watchTab.href =
      leagues[currentLeague].watch;

    watchTab.hidden = false;

    watchTab.dataset.league =
      currentLeague;

    watchLabel.textContent =
      leagues[currentLeague].name +
      'の視聴方法を見る';

  }


  /* =====================================================
     リーグ切り替え
     ===================================================== */

  var leagueLinks =
    leagueGrid.querySelectorAll(
      '.ftx-league-link'
    );


  leagueLinks.forEach(function (link) {

    var slug = link.dataset.league;


    /*
     * 日程なら日程、
     * 順位表なら順位表の状態を維持
     */
    link.href =
      '/' + mode + '/' + slug;


    if (slug === currentLeague) {

      link.classList.add('is-active');

      link.setAttribute(
        'aria-current',
        'page'
      );

    }

  });


  /* =====================================================
     GA4
     ===================================================== */

  watchTab.addEventListener(
    'click',
    function () {

      if (!currentLeague) {
        return;
      }


      var params = {

        league:
          currentLeague,

        source_page:
          mode,

        placement:
          'shared_nav_1165',

        link_url:
          watchTab.href

      };


      if (
        typeof window.gtag === 'function'
      ) {

        window.gtag(
          'event',
          'viewing_guide_click',
          params
        );

      }

      else if (window.dataLayer) {

        window.dataLayer.push({

          event:
            'viewing_guide_click',

          league:
            currentLeague,

          source_page:
            mode,

          placement:
            'shared_nav_1165',

          link_url:
            watchTab.href

        });

      }

    }
  );

})();