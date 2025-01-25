let answer;
    let minRange;
    let maxRange;
    let attempts;
    let startTime;
    let timerInterval;

    function startGame(max) {
      minRange = 1;
      maxRange = max;
      answer = Math.floor(Math.random() * maxRange) + 1;
      attempts = 0;
      startTime = new Date().getTime();

      document.getElementById('gameButtons').style.display = 'none';
      document.getElementById('gameArea').style.display = 'block';
      setMessage(`猜一個在 ${minRange} 和 ${maxRange} 之間的數字：`);

      // 開始計時器
      startTimer();
    }

    function setMessage(message) {
      document.getElementById('gameMessage').innerHTML = message;
    }

    function checkGuess() {
      let guess = parseInt(document.getElementById('guessInput').value.trim());
      document.getElementById('guessInput').value = '';

      if (isNaN(guess) || guess < minRange || guess > maxRange) {
        setMessage(`請輸入一個在 ${minRange} 和 ${maxRange} 之間的有效數字！`);
        return;
      }

      attempts++;

      if (guess === answer) {
        let endTime = new Date().getTime();
        let totalTime = (endTime - startTime) / 1000;

        // 停止計時器
        clearInterval(timerInterval);

        Swal.fire({
          icon: 'success',
          title: '恭喜！你猜對了！',
          html: `猜的數字：${guess}<br>猜的次數：${attempts}<br>花費時間：${totalTime.toFixed(2)} 秒`
        }).then(() => {
          document.getElementById('gameButtons').style.display = 'block';
          document.getElementById('gameArea').style.display = 'none';
        });
      } else if (guess < answer) {
        minRange = guess + 1;
        setMessage(`<strong>再大一點！</strong><br>範圍更新為 ${minRange} ~ ${maxRange}`);
      } else {
        maxRange = guess - 1;
        setMessage(`<strong>再小一點！</strong><br>範圍更新為 ${minRange} ~ ${maxRange}`);
      }
    }

    function startTimer() {
      timerInterval = setInterval(function() {
        let now = new Date().getTime();
        var elapsedTime = Math.floor((now - startTime) / 1000);
        var seconds = elapsedTime;
        var displaySeconds = seconds < 10 ? "0" + seconds : seconds;
        var displayAttempts = attempts < 10 ? "0" + attempts : attempts;
        document.getElementById('timer').innerHTML = `時間： ${displaySeconds} 秒`;
        document.getElementById('attempts').innerHTML = `次數： ${displayAttempts} 次`;
      }, 1000);
    console.log("答案：",answer)
    }