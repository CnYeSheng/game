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
        html: '繼續使用將視為同意 <a href="./Privacy.html" target="_blank">《隱私權政策》</a> <a href="./Terms.html" target="_blank">《使用規範》</a> 內容',
        footer: '<a href="./Privacy.html" target="_blank">隱私權政策</a> <a href="./Terms.html" target="_blank">使用規範</a> <a href="./遊戲開源碼.txt" target="_blank">遊戲開源</a> <br>製作 <a href="https://wmcc.jp.eu.org">YeSheng</a>',
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

    const savedLockoutTime = localStorage.getItem('lockoutTime');
    if (savedLockoutTime) {
        lockoutTime = parseInt(savedLockoutTime);
    }
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


//密碼
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

//深色模式
// 在網頁載入完成後執行
window.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
  
    // 檢查瀏覽器是否有儲存深色模式設定
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
    // 根據儲存設定切換深色模式
    if (isDarkMode) {
      body.classList.add('dark-mode');
      darkModeToggle.textContent = '🌓';
    }
  
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        darkModeToggle.textContent = isDarkMode ? '🌓' : '🌓';
        localStorage.setItem('darkMode', isDarkMode);
      
        // 如果切換為深色模式,則在動畫結束後再更新背景色
        if (isDarkMode) {
          setTimeout(() => {
            body.style.backgroundColor = '#222';
          }, 800);
        } else {
            setTimeout(() => {
                body.style.backgroundColor = '#f8f9fa';
            }, 800);
        }
      });
  });

  //手機偵測
  function detectMobile() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const elementsToHide = document.querySelectorAll('.mobile');
    elementsToHide.forEach(el => {
      if (isMobile) {
        el.style.display = 'none';
      }
    });
  }

//網外遊戲
window.addEventListener('load', function() {
    const ogs = document.querySelectorAll('.ogs');

    ogs.forEach((icon, index) => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();

            const parentogs = this.closest('.ogs');
            if (parentogs) {
                const gamesLink = parentogs.getAttribute('href');

                Swal.fire({
                    title: `通知`,
                    html: `<p>您確定要進入該網站嗎？<br></p>`,
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
                        window.open(gamesLink, '_blank');
                    }
                });
            }
        });
    });
});


window.addEventListener('load', function() {
    const ogs = document.querySelectorAll('.otherbtn');

    ogs.forEach((icon, index) => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();

            const textToCopy = this.querySelector('.copy-text').innerText;

            copyTextToClipboard(textToCopy);

            Swal.fire({
                title: `完成複製！`,
                html: `複製文本：${textToCopy}<br><p style="color:red;">基岩版和Java版僅為IP相同，不代表可一起遊玩！</p>`,
                icon: `success`,
                footer: `製作 <a href="https://wmcc.jp.eu.org">YeSheng</a>`,
                allowOutsideClick: false,
                confirmButtonText: `確定`,
                reverseButtons: true
            });
        });
    });

    function copyTextToClipboard(text) {
        // 創建一個隱藏的輸入元素
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);

        // 選中輸入元素的內容
        tempInput.select();
        tempInput.setSelectionRange(0, 99999); // 對於移動設備

        // 執行複製命令
        document.execCommand('copy');

        // 移除輸入元素
        document.body.removeChild(tempInput);
    }
});


//mcserver
// 获取 Java 版服务器状态
fetch('https://api.mcsrvstat.us/3/mc.cyss.us.eu.org')
.then(response => response.json())
.then(data => {
    const serverStatusJava = document.getElementById('server-status-java');
    if (data.online) {
        const players = data.players.online + '/' + data.players.max;
        const version = data.version;
        serverStatusJava.innerHTML = `<p><span class="online">✓</span> 玩家: ${players} <br> 版本: ${version}</p>`;
    } else {
        serverStatusJava.innerHTML = '<p><span class="offline">✗</span></p>';
    }
})
.catch(error => {
    console.error('获取 Java 版服务器状态失败:', error);
    const serverStatusJava = document.getElementById('server-status-java');
    serverStatusJava.innerHTML = '<p>获取服务器状态失败</p>';
});

// 获取 Bedrock 版服务器状态
fetch('https://api.mcsrvstat.us/bedrock/3/mc.cyss.us.eu.org')
.then(response => response.json())
.then(data => {
    const serverStatusBedrock = document.getElementById('server-status-bedrock');
    if (data.online) {
        const players = data.players.online + '/' + data.players.max;
        const version = data.version;
        serverStatusBedrock.innerHTML = `<p><span class="online">✓</span> 玩家: ${players} <br> 版本: ${version}</p>`;
    } else {
        serverStatusBedrock.innerHTML = '<p><span class="offline">✗</span></p>';
    }
})
.catch(error => {
    console.error('获取 Bedrock 版服务器状态失败:', error);
    const serverStatusBedrock = document.getElementById('server-status-bedrock');
    serverStatusBedrock.innerHTML = '<p>获取服务器状态失败</p>';
});