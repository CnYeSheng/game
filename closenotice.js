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