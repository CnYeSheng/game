window.addEventListener('load', function() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const section = document.querySelector('section');
    const footer = document.querySelector('footer');

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


window.onload = function () {
    Swal.fire({
        title: '公告',
        icon: 'info',
        html: '當點擊同意後視為已閱覽並同意<a href="./Privacy.html" target="_blank">《隱私權政策》</a>',
        footer: '<a href="./Privacy.html" target="_blank">隱私權政策</a> <a href="./遊戲開源碼.txt" target="_blank">遊戲開源</a> <br>製作 <a href="https://wmcc.jp.eu.org">YeSheng</a>',
        showDenyButton: true,
        denyButtonText: '不同意',
        confirmButtonText: '同意',
        allowOutsideClick: false,
    }).then((result) => {
        if (result.isDenied) {
            history.back()
        }
    });
};

// 在網頁加載後綁定點擊事件
window.addEventListener('load', function() {
    // 獲取所有的 info icon 元素
    const infoIcons = document.querySelectorAll('.info-icon');

    // 遍歷每個 info icon 元素，為其添加點擊事件
    infoIcons.forEach((icon, index) => {
        icon.addEventListener('click', function(e) {
            e.preventDefault(); // 防止點擊後跳轉

            // 獲取點擊的 info icon 的父級 .btn 元素
            const parentBtn = this.closest('.btn');
            if (parentBtn) {
                // 獲取父級 .btn 元素的 title 屬性值作為遊戲的標題
                const title = parentBtn.getAttribute('title');

                // 獲取點擊的 info icon 的 gamePlay 屬性值
                const gamePlay = this.getAttribute('gamePlay');

                // 獲取父級 .btn 元素的 href 屬性值作為遊戲的連結
                const gameLink = parentBtn.getAttribute('href');

                // 使用 SweetAlert 顯示遊戲玩法和開始遊玩按鈕
                Swal.fire({
                    title: `${title} 說明`,
                    html: `<p>${gamePlay}</p>`,
                    icon: 'info',
                    footer: '製作 <a href="https://wmcc.jp.eu.org">YeSheng</a>',
                    showCancelButton: true,
                    allowOutsideClick: false,
                    cancelButtonText: '返回',
                    confirmButtonText: '進入',
                    cancelButtonColor: '#d33',
                    confirmButtonColor: '#3085d6',
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        // 如果點擊了「開始遊玩」按鈕，跳轉到遊戲連結
                        window.open(gameLink, '_blank');
                    }
                });
            }
        });
    });
});



