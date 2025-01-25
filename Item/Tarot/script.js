const questionForm = document.getElementById('questionForm');
    const readingSection = document.getElementById('reading');
    const cardResults = document.getElementById('cardResults');
    const downloadLink = document.getElementById('downloadLink');
    const downloadButton = document.getElementById('downloadButton');


    function showError(input) {
      Swal.fire({
        icon: 'error',
        title: '錯誤',
        text: '請輸入您的問題'
      });
      input.reportValidity(); // This will prevent form from submitting
    }

    questionForm.addEventListener('submit', function(event) {
      event.preventDefault();
      readingSection.style.display = 'block';
      const question = document.getElementById('question').value;
      console.log('問題：', question);
      
      // 清空上一次的結果
      cardResults.innerHTML = '';

      // 塔羅牌清單
      const tarotCards = [
        '0愚者.jpg', 'I魔術師.jpg', 'II女祭司.jpg', 'III女皇.jpg', 'IV皇帝.jpg',
        'V教皇.jpg', 'VI戀人.jpg', 'VII戰車.jpg', 'VIII力量.jpg', 'IX隱士.jpg',
        'X命運之輪.jpg', 'XI正義.jpg', 'XII吊人.jpg', 'XIII死神.jpg', 'XIV節制.jpg',
        'XV惡魔.jpg', 'XVI高塔.jpg', 'XVII星星.jpg', 'XVIII月亮.jpg', 'XIX太陽.jpg',
        'XX審判.jpg', 'XXI世界.jpg', 
        '權杖一.jpg','權杖二.jpg','權杖三.jpg','權杖四.jpg','權杖五.jpg',
        '權杖六.jpg','權杖七.jpg','權杖八.jpg','權杖九.jpg','權杖十.jpg',
        '權杖騎士.jpg','權杖侍從.jpg','權杖王后.jpg','權杖國王.jpg',
        '星幣一.jpg','星幣二.jpg','星幣三.jpg','星幣四.jpg','星幣五.jpg',
        '星幣六.jpg','星幣七.jpg','星幣八.jpg','星幣九.jpg','星幣十.jpg',
        '星幣侍從.jpg','星幣騎士.jpg','星幣王后.jpg','星幣國王.jpg',
        '寶劍一.jpg','寶劍二.jpg','寶劍三.jpg','寶劍四.jpg','寶劍五.jpg',
        '寶劍六.jpg','寶劍七.jpg','寶劍八.jpg','寶劍九.jpg','寶劍十.jpg',
        '寶劍侍從.jpg','寶劍騎士.jpg','寶劍王后.jpg','寶劍國王.jpg',
        '聖杯一.jpg','聖杯二.jpg','聖杯三.jpg','聖杯四.jpg','聖杯五.jpg',
        '聖杯六.jpg','聖杯七.jpg','聖杯八.jpg','聖杯九.jpg','聖杯十.jpg',
        '聖杯侍從.jpg','聖杯騎士.jpg','聖杯王后.jpg','聖杯國王.jpg'
      ];

      // 抽取隨機的三張塔羅牌，每張有 50% 機率逆位
      const selectedCards = [];
      for (let i = 1; i <= 3; i++) {
        const randomIndex = Math.floor(Math.random() * tarotCards.length);
        const cardName = tarotCards[randomIndex];
        const isReversed = Math.random() < 0.5; // 50% 機率逆位

        let cardDisplayName = `${cardName.replace('.jpg', '')}`;
        if (isReversed) {
          cardDisplayName += '（逆位）';
        }
        selectedCards.push(cardDisplayName);

const cardContainer = document.createElement('div');
cardContainer.classList.add('card');

const cardImage = document.createElement('img');
cardImage.src = `./img/${cardName}`;
cardImage.alt = `${cardName}`;
cardImage.style.width = '197px'; // 調整寬度
cardImage.style.height = '342px'; // 調整高度
if (isReversed) {
  cardImage.style.transform = 'rotate(180deg)'; // 逆位圖片旋轉180度
}
cardContainer.appendChild(cardImage);

const cardNameText = document.createElement('p');
cardNameText.textContent = cardDisplayName;
cardNameText.style.textAlign = 'center';
cardContainer.appendChild(cardNameText);

cardResults.appendChild(cardContainer);

        // 從清單中移除已經抽取的牌，避免重複抽取
        tarotCards.splice(randomIndex, 1);
      }
      console.log('抽到的牌:', selectedCards);

      // 顯示下載鏈接
      downloadLink.style.display = 'block';

      // 創建一個下載鏈接並觸發點擊事件
      downloadButton.onclick = function() {
        downloadImage(question, selectedCards);
      };

      sendMessage(question, selectedCards);
    });

    function sendMessage(question, selectedCards) {
      // 清空之前的 AI 回答結果
      const aiMessages = chatWindow.querySelectorAll('.ai-message');
      aiMessages.forEach(message => message.remove());
    
      const userInput = question;
    
      // 創建並顯示"生成中"的提示消息
      const loadingMessageDiv = document.createElement('div');
      loadingMessageDiv.textContent = '生成中....';
      loadingMessageDiv.classList.add('message', 'ai-message');
      chatWindow.appendChild(loadingMessageDiv);
    
      // 將選中的牌組合成字符串
      const selectedCardsString = selectedCards.join(', ');
    
      // 設置請求頭
      const headers = {
        'Authorization': 'Bearer AIzaSyDuyci76agMRfBpzLamuiHVxGBClVZBjMg', // 請替換為你的實際 Token
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Host': 'gemini.cyss.us.eu.org',
        'Connection': 'keep-alive'
      };
    
      // 定義請求體
      const body = {
        "model": "gemini-2.0-flash-exp", // 使用指定模型
        "messages": [
          {
            "role": "system",
            "content": "你是一個你有海量案例的塔羅牌的老師 你給的解析和建議都是非常精確的 解析的內容也非常的詳細，請使用中文來回答，最多1000字，聚焦在題目上回答不用解釋原本卡牌的牌面意義，在每一張牌前面增加 第幾張牌。"
          },
          {
            "role": "user",
            "content": `問題：${userInput} 塔羅牌: ${selectedCardsString}，請幫我解析每張牌對這個問題的關係再做總結，謝謝。`
          }
        ],
        "temperature": 0.7, // 控制生成內容的隨機性，默認值為 0.7
        "max_tokens": 1000, // 返回的最大 token 數
        "stream": false // 是否逐步返回內容
      };
    
      // 發送請求到 API
      fetch('https://gemini.cyss.us.eu.org/v1/chat/completions', { // Chat Completions API 路徑
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          // 移除"生成中"的提示信息
          chatWindow.removeChild(loadingMessageDiv);
        
          // 處理返回數據
          if (data.choices && data.choices.length > 0) {
            let aiResponse = data.choices[0].message.content;
            
            // 移除所有 * 符號
            aiResponse = aiResponse.replace(/\*/g, '');
            
            // 處理換行 - 順序很重要
            // 1. 先處理三個換行的情況
            aiResponse = aiResponse.replace(/\n\n\n/g, '<br><br>');
            // 2. 再處理兩個換行的情況
            aiResponse = aiResponse.replace(/\n\n/g, '<br>');
            // 3. 最後處理單個換行
            aiResponse = aiResponse.replace(/\n/g, '<br>');
            
            // 將文本轉換為HTML
            aiResponse = aiResponse
              // 將牌名和標題轉換為HTML的強調標籤
              .replace(/(第\s*[1-3]\s*張牌：(?:[\u0041-\u005A]+)?\s*[\u4e00-\u9fa5]+[十九八七六五四三二一]*(?:（逆位）)?)/g, '<strong>$1</strong>')
              // 處理中文數字形式的牌名（包含可選的空格和逆位）
              .replace(/(第\s*[一二三]\s*張牌：(?:[\u0041-\u005A]+)?\s*[\u4e00-\u9fa5]+[十九八七六五四三二一]*(?:（逆位）)?)/g, '<strong>$1</strong>')
              // 處理總結等標題
              .replace(/(總結|建議|結論|額外提醒|提醒|注意)：/g, '<strong>$1：</strong>');
            // 創建新的div來顯示格式化後的內容
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', 'ai-message');
            messageDiv.innerHTML = aiResponse;
            
            // 添加樣式
            const style = document.createElement('style');
            style.textContent = `
              .ai-message {
                line-height: 1.6;
                margin: 12px 0;
                padding: 10px;
              }
              .ai-message strong {
                color: #2c3e50;
                display: block;
                margin: 18px 0 8px 0;
                font-size: 1.1em;
              }
              .ai-message br {
                display: block;
                margin: 10px 0;
                content: "";
              }
            `;
            document.head.appendChild(style);
            
            chatWindow.appendChild(messageDiv);
          } else {
            throw new Error('API 返回的數據不包含有效內容');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          loadingMessageDiv.textContent = '無法獲取回答，請稍後再試。';
        });
    }

    function downloadImage(question, selectedCards) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // 設置畫布尺寸
      canvas.width = 600; // 三張牌加上間距的寬度
      canvas.height = 420; // 每張牌的高度

      // 填充白色背景
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 繪製問題文本
      ctx.fillStyle = '#000';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`您的問題：${question}`, canvas.width / 2, 20);

      // 在畫布上繪製塔羅牌
      const images = [];
      const promises = selectedCards.map((cardName, index) => {
        return new Promise(resolve => {
          const img = new Image();
          img.crossOrigin = 'anonymous'; // 解決跨域問題
          img.onload = () => {
            if (cardName.includes('（逆位）')) {
              ctx.save();
              ctx.translate(index * 200 + 20 + 90, 40 + 171);
              ctx.rotate(Math.PI); // 旋轉180度
              ctx.drawImage(img, -90, -171, 180, 342); // 調整圖片大小和位置
              ctx.restore();
            } else {
              ctx.drawImage(img, index * 200 + 20, 40, 180, 342); // 調整圖片大小和位置
            }

            // 繪製牌名
            ctx.fillStyle = '#000';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(cardName, index * 200 + 110, 412); // 調整牌名位置

            resolve();
          };
          img.src = `./img/${cardName.replace('（逆位）', '')}.jpg`;
        });
      });

      // 等待所有圖片加載完成後再繪製
      Promise.all(promises).then(() => {
        // 將畫布轉換為數據URL
        const imageDataURL = canvas.toDataURL('image/png');

        // 創建一個下載鏈接並觸發點擊事件
        const a = document.createElement('a');
        a.href = imageDataURL;
        a.download = `${question}.png`;
        a.click();
      });
    }