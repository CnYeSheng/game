if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('service worker registered'))
      .catch(err => console.log('service worker not registered', err));
}

var inputNum = [];
var globalInputCounter = 0;
var answer = random4Numbers();

console.log("正確答案:",answer)

document.querySelectorAll('.inputNumberBtn').forEach(e => {
  e.addEventListener('click', recordInput);
});

document.querySelector('.submitBtn').addEventListener('click', submit);

document.querySelector('.deleteBtn').addEventListener('click', cleanAnswer);


function random4Numbers() {
  var num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var arr = [];

  for (let i = 0; i < 4; i++) {
    var random = Math.floor(Math.random() * (num.length));
    arr.push(num[random]);
    num.splice(random, 1);
  }
  return arr;
}

function checkAnswer() {
  if (inputNum.length != 4) {
    Swal.fire('請輸入4位數字');
    return;
  }

  let hint = { A: 0, B: 0 }

  for (let i = 0; i < answer.length; i++) {
    hint.B += inputNum.find(x => x == answer[i]) ? 1 : 0;
    hint.B -= inputNum[i] == answer[i] ? 1 : 0;
    hint.A += inputNum[i] == answer[i] ? 1 : 0;
  }

  return hint;
}

function checkDuplicate(num) {
  return inputNum.includes(num);
}
let submitCount = 0; // 提交次數

function recordInput(e) {
  var input = e.target.innerHTML;
  if (inputNum.length < 4 && !checkDuplicate(input)) {
    inputNum.push(input);
    document.querySelectorAll('.displayRow').forEach((e, index) => {
      e.innerHTML = inputNum[index] ? inputNum[index] : '-';
    });
  } else if (inputNum.length >= 4 || checkDuplicate(input)) {
    let message = '';
    if (inputNum.length >= 4) {
      message = '最多輸入4位數字';
    }
    if (checkDuplicate(input)) {
      message = '數字不能重複!';
    }
    Swal.fire(message);
  }
}

function cleanAnswer() {
  document.querySelectorAll('.displayRow').forEach((e) => {
    e.innerHTML = '-';
  });
  inputNum = [];
}

var inputNum = [];
var globalInputCounter = 0;
var startTime; // 保存開始時間的變數
var timerInterval; // 保存計時器的變數
var timerDisplay = document.getElementById('timer'); // 獲取顯示計時器的元素

document.querySelectorAll('.inputNumberBtn').forEach(e => {
  e.addEventListener('click', recordInput);
});

document.querySelector('.submitBtn').addEventListener('click', submit);

document.querySelector('.deleteBtn').addEventListener('click', cleanAnswer);

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000); // 每秒更新計時器
}

function updateTimer() {
  var elapsedTime = Math.floor((Date.now() - startTime) / 1000); // 計算經過的秒數
  var seconds = elapsedTime;
  var displaySeconds = seconds < 10 ? "0" + seconds : seconds;
  timerDisplay.textContent = `時間：${displaySeconds}秒`;
}

function stopTimer() {
  clearInterval(timerInterval); // 清除計時器
}

function random4Numbers() {
  var num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var arr = [];

  for (let i = 0; i < 4; i++) {
    var random = Math.floor(Math.random() * (num.length));
    arr.push(num[random]);
    num.splice(random, 1);
  }
  return arr;
}

function checkAnswer() {
  if (inputNum.length != 4) {
    Swal.fire('請輸入4位數字');
    return;
  }

  let hint = { A: 0, B: 0 }

  for (let i = 0; i < answer.length; i++) {
    hint.B += inputNum.find(x => x == answer[i]) ? 1 : 0;
    hint.B -= inputNum[i] == answer[i] ? 1 : 0;
    hint.A += inputNum[i] == answer[i] ? 1 : 0;
  }

  return hint;
}

function checkDuplicate(num) {
  return inputNum.includes(num);
}

function recordInput(e) {
  var input = e.target.innerHTML;
  if (inputNum.length < 4 && !checkDuplicate(input)) {
    inputNum.push(input);
    document.querySelectorAll('.displayRow').forEach((e, index) => {
      e.innerHTML = inputNum[index] ? inputNum[index] : '-';
    });
  } else if (inputNum.length >= 4 || checkDuplicate(input)) {
    let message = '';
    if (inputNum.length >= 4) {
      message = '最多輸入4位數字';
    }
    if (checkDuplicate(input)) {
      message = '數字不能重複!';
    }
    Swal.fire(message);
  }
}

function cleanAnswer() {
  document.querySelectorAll('.displayRow').forEach((e) => {
    e.innerHTML = '-';
  });
  inputNum = [];
}

function submit() {
  var result = checkAnswer();
  if (result) {
    showResult(inputNum.toString().replace(/,/g, ''), `${result.A}A${result.B}B`);
    console.log("輸入答案:", inputNum);
    cleanAnswer();
    submitCount++;
    submitCountDisplay.textContent = `提交次數：${submitCount}`;

    if (result.A === 4) {
      stopTimer(); // 在成功時停止計時器
      Swal.fire({
        icon: 'success',
        title: '恭喜你成功了!',
        text: `提交次數 ${submitCount} 次，${timerDisplay.textContent}`,
        confirmButtonText: '確定',
      });
    }
  }
}
const submitCountDisplay = document.getElementById('submitCount');

function showResult(history, hint){
  document.querySelector('.historyList').innerHTML += `<div class="result">${history}</div>`;
  document.querySelector('.hintList').innerHTML += `<div class="result">${hint}</div>`;
}

startTimer(); // 在載入時啟動計時器
