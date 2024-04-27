//動畫
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const section = document.querySelector('section');
    const footer = document.querySelector('footer');
  
    if (nav && section && footer) {
      nav.style.opacity = '0';
      section.style.opacity = '0';
      footer.style.opacity = '0';
  
      if (header) {
        header.style.opacity = '1';
      }
  
      setTimeout(function() {
        if (nav && section && footer) {
          nav.style.opacity = '1';
          section.style.opacity = '1';
          footer.style.opacity = '1';
        }
      }, 500);
    }
  
    const customDetails = document.getElementById('custom-details');
    const gamesChose = document.getElementById('games-chose');
    const btns = document.querySelectorAll('.btn');
  
    if (customDetails && gamesChose && btns.length > 0) {
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
    }
  });

//同意畫面
window.onload = function () {
    console.log("页面加载完成");
    // 显示同意选项
    Swal.fire({
        html: '繼續使用將視為同意 <a href="./Privacy.html" target="_blank">《隱私權政策》</a> 內容',
        footer: '<a href="./Privacy.html" target="_blank">隱私權政策</a> <a href="./遊戲開源碼.txt" target="_blank">遊戲開源</a> <br>製作 <a href="https://wmcc.jp.eu.org">YeSheng</a>',
        showDenyButton: true,
        denyButtonText: '不同意',
        confirmButtonText: '同意',
        allowOutsideClick: false,
    }).then((result) => {
        console.log("用户选择了：" + result);
        if (result.isConfirmed) {
            // 如果用户同意，则使用 Fetch API 获取更新信息并显示最新更新
            fetch('updates.json')
                .then(response => {
                    console.log("网络请求成功");
                    return response.json();
                })
                .then(data => {
                    console.log("成功获取更新数据");
                    // 获取最新更新的日期
                    var latestDate = data[0].date;
                    // 获取最新更新的内容
                    var updates = data[0].updates;

                    // 构建更新信息的 HTML 格式
                    var updateHTML = "";
                    updates.forEach(update => {
                        // 处理更新文本，添加空格来停顿
                        var gamesText = update.games.join("、");
                        updateHTML += "<p>" + update.type + "：" + gamesText + "</p>";
                    });

                    // 使用 SweetAlert 展示最新更新信息
                    Swal.fire({
                        title: latestDate,
                        html: updateHTML,
                        icon: "info",
                        allowOutsideClick: false,
                        footer: '製作 <a href="https://wmcc.jp.eu.org">YeSheng</a>',
                    });

                    // 设置语音合成器的语言为中文
                    var utterance = new SpeechSynthesisUtterance();
                    utterance.lang = 'zh-TW';

                    // 定義需要語音合成的內容
                    var contents = [
                        "最新更新：" + latestDate,
                    ];

                    // 將新增和修改分開
                    updates.forEach(update => {
                        contents.push(update.type); // 添加新增或修改
                        contents.push(update.games.join("，")); // 添加遊戲名稱，使用逗號隔開
                    });

                    contents.push("製作：YeSheng"); // 添加製作信息

                    // 語音合成的索引
                    var index = 0;

                    // 語音合成函數
                    function speakNext() {
                        if (index < contents.length) {
                            utterance.text = contents[index];
                            speechSynthesis.speak(utterance);
                            index++;
                        }
                    }

                    // 監聽語音合成結束事件，然後調用下一段語音合成
                    utterance.onend = function(event) {
                        speakNext();
                    };

                    // 調用第一段語音合成
                    speakNext();
                })
                .catch(error => {
                    console.error('获取更新信息失败：', error);
                });
        } else if (result.isDenied) {
            // 如果用户不同意，则返回上一页
            history.back();
        }
    });
};

//遊戲選擇
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

const correctPasswordHash = "5144439bbab67dfb1f8c153a350eea1b338fd10e087c45261eff1ec68487dced33869962019212cba361b871ef5d202b27cd0d26f588145768570a38434cdb89";

let loginAttempts = 0;
let lockoutTime = 0;

window.addEventListener('load', function() {
    const pws = document.querySelectorAll('#pw');

    pws.forEach((icon, index) => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            checkLockout(this.href);
        });
    });
});

function checkLockout(href) {
    const currentTime = new Date().getTime();
    const timeLeft = lockoutTime - currentTime;

    if (timeLeft > 0) {
        showCountdown(timeLeft, href);
    } else {
        showPasswordPrompt(href);
    }
}

function showPasswordPrompt(href) {
    Swal.fire({
        title: '請輸入密碼',
        input: 'text',
        inputAttributes: { autocapitalize: 'off' },
        showCancelButton: true,
        confirmButtonText: '確認',
        showLoaderOnConfirm: true,
        preConfirm: (password) => validatePassword(password, href),
        allowOutsideClick: () => !Swal.isLoading()
    });
}

function validatePassword(password, href) {
    const passwordHash = sha512(sha384(sha256(sha1(md5(btoa(password))))));
    if (passwordHash === correctPasswordHash) {
        window.open(href, '_blank');
    } else {
        loginAttempts++;
        if (loginAttempts >= 5) {
            const lockoutPeriod = 60000 + (Math.floor((loginAttempts - 5) / 3) * 20000);
            lockoutTime = new Date().getTime() + lockoutPeriod;
            localStorage.setItem('lockoutTime', lockoutTime);
            showCountdown(lockoutPeriod, href);
        }
        Swal.showValidationMessage(`密碼錯誤`);
    }
}

function showCountdown(duration, href) {
    let initialSeconds = Math.round(duration / 1000);
    let timerInterval;

    Swal.fire({
        title: '輸入錯誤太多次',
        html: '請等待 <b>' + initialSeconds + '</b> 秒後重新嘗試。',
        timer: duration,
        timerProgressBar: true,
        didOpen: () => {
            const b = Swal.getHtmlContainer().querySelector('b');
            timerInterval = setInterval(() => {
                initialSeconds -= 1; // 每次減少一秒
                if(initialSeconds >= 0) {
                    b.textContent = initialSeconds;
                }

                if(initialSeconds < 0) {
                    clearInterval(timerInterval);
                    Swal.clickConfirm(); // 自動確認當倒數結束
                }
            }, 1000);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            showPasswordPrompt(href); // 倒數結束後或被手動關閉，則執行顯示密碼提示框的函數
        }
    });
}

// Saves lockout time on browser close or page refresh
window.onbeforeunload = function() {
    if (lockoutTime) {
        localStorage.setItem('lockoutTime', lockoutTime);
    }
};

// Recovers lockout time on page load
window.onload = function() {
    const savedLockoutTime = localStorage.getItem('lockoutTime');
    if (savedLockoutTime) {
        lockoutTime = parseInt(savedLockoutTime);
    }
};