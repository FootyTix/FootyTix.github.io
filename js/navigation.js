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
     日程 / 順位表
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
     DOM取得
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

  var allLeaguesLink =
    document.getElementById('ftx-all-leagues');

  var allLeaguesLabel =
    document.getElementById('ftx-all-leagues-label');


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
     日程 / 順位表タブ

     個別リーグでは同リーグの
     日程 ⇔ 順位表を維持
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
     現在タブ
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
     全リーグ一覧への導線
     ===================================================== */

  if (
    allLeaguesLink &&
    allLeaguesLabel
  ) {

    if (mode === 'standings') {

      allLeaguesLink.href =
        '/standings';

      allLeaguesLabel.textContent =
        '全リーグの順位表';

    } else {

      allLeaguesLink.href =
        '/fixtures';

      allLeaguesLabel.textContent =
        '全リーグの日程';

    }

  }


  /* =====================================================
     視聴方法CTA
     ===================================================== */

  var watchUrl = null;

  if (
    currentLeague &&
    leagues[currentLeague] &&
    leagues[currentLeague].watch
  ) {

    watchUrl =
      leagues[currentLeague].watch;

    /*
     * hrefを明示的に設定
     */
    watchTab.setAttribute(
      'href',
      watchUrl
    );

    /*
     * hiddenを完全に削除
     */
    watchTab.removeAttribute(
      'hidden'
    );

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

    var slug =
      link.dataset.league;


    /*
     * 現在の日程/順位表モードを維持
     */
    link.href =
      '/' + mode + '/' + slug;


    if (slug === currentLeague) {

      link.classList.add(
        'is-active'
      );

      link.setAttribute(
        'aria-current',
        'page'
      );

    }

  });


  /* =====================================================
     視聴方法クリック

     テーマや他JSに影響されても
     確実にリンク先へ移動させる
     ===================================================== */

  watchTab.addEventListener(
    'click',
    function (event) {

      if (!watchUrl) {
        return;
      }


      /*
       * 通常リンク処理を一旦止める
       */
      event.preventDefault();


      try {

        /*
         * GA4
         */
        var params = {

          league:
            currentLeague,

          source_page:
            mode,

          placement:
            'shared_nav_1165',

          link_url:
            watchUrl

        };


        if (
          typeof window.gtag ===
          'function'
        ) {

          window.gtag(
            'event',
            'viewing_guide_click',
            params
          );

        }

        else if (
          window.dataLayer
        ) {

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
              watchUrl

          });

        }

      }

      catch (error) {

        /*
         * 計測失敗しても
         * ページ遷移には影響させない
         */
        console.warn(
          'viewing_guide_click tracking failed',
          error
        );

      }

      finally {

        /*
         * 必ず視聴方法ページへ移動
         */
        window.location.assign(
          watchUrl
        );

      }

    }
  );

})();