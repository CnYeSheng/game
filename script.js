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

  const customDetails = document.getElementById('custom-details');
  const gamesChose = document.getElementById('games-chose');
  const btns = document.querySelectorAll('.btn');

  customDetails.addEventListener('toggle', function() {
      if (this.open) {
          gamesChose.classList.remove('animate');
          void gamesChose.offsetWidth;
          gamesChose.classList.add('animate');
          btns.forEach(btn => {
              btn.classList.remove('animate');
              void btn.offsetWidth;
              btn.classList.add('animate');
          });
      }
  });

  btns.forEach(btn => {
      btn.addEventListener('click', function() {
          this.classList.remove('animate');
          void this.offsetWidth;
          this.classList.add('animate');
      });
  });
});

window.onload = function() {
    Swal.fire({
        icon: 'info',
        title: '公告',
        html: '4/4後網站網址將會全數改成英文',
        confirmButtonText: '確定',
    });
}