// 設定目標日期
const targetDate = new Date("2024-05-18T00:00:00");

// 更新倒數計時器
function updateCountdown() {
  const currentDate = new Date();
  const timeDiff = targetDate.getTime() - currentDate.getTime();

  if (timeDiff <= 0) {
    // 倒計時結束
    document.getElementById("countdown").innerHTML = "考試加油！";
    return;
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

// 每秒鐘更新一次倒數計時器
setInterval(updateCountdown, 1000);