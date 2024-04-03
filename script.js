// 這段程式碼會在網頁加載後立即執行
window.addEventListener('load', function() {
    // 檢查目前的網址
    const currentPath = window.location.pathname;
    const invalidPaths = ['./404.html', '/index.html']; // 如果有其他不需跳轉的頁面，可以在這裡添加

    if (!invalidPaths.includes(currentPath)) {
        // 如果網址不是404.html或其他指定的頁面，則跳轉到404.html
        window.location.href = './404.html';
    }
});

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
        icon: 'error',
        title: '公告',
        html: '因4/4需更改網站，故4/4~4/6不開放使用',
        confirmButtonText: '確定',
        footer: '製作：<a href="https://wmcc.jp.eu.org" target="_blank">YeSheng</a>'
    });
}
