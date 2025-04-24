// js/main.js
// サイト読み込み後に動作する処理
document.addEventListener('DOMContentLoaded', function() {
  // BGM設定
  const bgm = document.getElementById('bgm');
  if (bgm) {
    bgm.volume = 0.05;
    document.addEventListener('click', () => {
      bgm.play();
    }, { once: true });
  }

  // ハンバーガーメニュー切替
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // スクロールリビール効果
  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    reveals.forEach(el => {
      const revealPoint = 150;
      if (el.getBoundingClientRect().top < window.innerHeight - revealPoint) {
        el.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // ヒーローセクションのバックグラウンドフリッカー
  const hero = document.querySelector('.hero');
  if (hero) {
    setInterval(() => {
      const brightness = 0.9 + Math.random() * 0.3;
      hero.style.filter = `brightness(${brightness})`;
    }, 100);
  }

  // サイトメニュー開閉
  const siteMenu = document.getElementById('site-menu');
  const siteMenuToggle = document.querySelector('.site-menu-toggle');
  const siteMenuClose = document.querySelector('.site-menu-close');

  if (siteMenu && siteMenuToggle && siteMenuClose) {
    siteMenuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      siteMenu.style.display = 'block';
      requestAnimationFrame(() => {
        siteMenu.classList.add('active');
      });
    });

    siteMenuClose.addEventListener('click', function(e) {
      e.stopPropagation();
      siteMenu.classList.remove('active');
      setTimeout(() => {
        siteMenu.style.display = 'none';
      }, 300);
    });

    // メニュー外をクリックした時の処理
    document.addEventListener('click', function(e) {
      if (siteMenu.style.display === 'block' && 
          !siteMenu.contains(e.target) && 
          !siteMenuToggle.contains(e.target)) {
        siteMenu.classList.remove('active');
        setTimeout(() => {
          siteMenu.style.display = 'none';
        }, 300);
      }
    });
  }
}); 