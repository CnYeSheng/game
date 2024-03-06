// script.js
// 添加淡入淡出動畫
window.addEventListener('load', function() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const section = document.querySelector('section');
    const footer = document.querySelector('footer');
  
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