window.addEventListener('load', function() {
  const header = document.querySelector('header');
  const nav = document.querySelector('nav');
  const section = document.querySelector('section');
  const footer = document.querySelector('footer');

  // 檢查是否已經有瀏覽次數
  let views = localStorage.getItem('views');

  // 如果沒有，設置初始值為 0
  if (!views) {
    views = 0;
  } else {
    views = parseInt(views); // 確保 views 是數字類型
  }

 // 在網頁上顯示瀏覽次數
  var displayviews = views < 10 ? "0" + views : views;
  document.getElementById('views').innerText = `${displayviews}`;

  // 增加瀏覽次數
  views++;

  // 更新本地存儲中的瀏覽次數
  localStorage.setItem('views', views.toString());

  header.style.opacity = '0';
  nav.style.opacity = '0';
  section.style.opacity = '0';
  footer.style.opacity = '0';

  setTimeout(function() {
    header.style.opacity = '1';
    nav.style.opacity = '1';
    section.style.opacity = '1';
    footer.style.opacity = '1';
  }, 500);
});
