// 모바일 햄버거 메뉴 — 링크 클릭 시 자동 닫힘
document.addEventListener('DOMContentLoaded', function() {
  var menu = document.querySelector('.nav-right, .nav-links');
  if (!menu) return;
  menu.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
      menu.classList.remove('mobile-open');
    }
  });
});
