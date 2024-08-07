document.addEventListener('DOMContentLoaded', function() {
    // 設定重定向的日期和時間
    const redirectDate = new Date('2024-08-18T00:00:00+08:00');

    // 取得當前時間
    const currentDate = new Date();

    // 檢查當前頁面是否是 close.html
    const currentPath = window.location.pathname.split('/').pop();

    // 如果當前頁面不是 close.html 並且當前時間已經到達或超過重定向時間，進行重定向
    if (currentPath !== 'close.html' && currentDate >= redirectDate) {
        window.location.href = '/close.html';
    } else if (currentPath !== 'close.html') {
        // 計算到重定向時間的毫秒數
        const timeUntilRedirect = redirectDate - currentDate;

        // 設定定時器在正確的時間進行重定向
        setTimeout(function() {
            window.location.href = '/close.html';
        }, timeUntilRedirect);
    }
});

// 讀取 JSON 文件並朗讀內容
fetch('closingMessage.json')
  .then(response => response.json())
  .then(data => {
    // 將數組中的文本連接成一個完整的句子
    const fullText = data.closingMessageText.join('，');

    // 創建一個 SpeechSynthesisUtterance 實例
    const utterance = new SpeechSynthesisUtterance(fullText);

    // 設置語言為中文（簡體中文，因為沒有專門的繁體中文選項）
    utterance.lang = 'zh-TW';

    // 開始朗讀
    speechSynthesis.speak(utterance);
  })
  .catch(error => console.error('Error:', error));