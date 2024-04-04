function updateClock() {
    const now = new Date();
  
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
  
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const day = now.getDay();
  
    const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const weekDay = weekDays[day];
  
    const timeString = `${padZero(hours)} : ${padZero(minutes)} : ${padZero(seconds)}`;
    const dateString = `${year} 年 ${padZero(month)} 月 ${padZero(date)} 日`;
    const weekDayString = `${weekDay}`
  
    document.getElementById('time').textContent = timeString;
    document.getElementById('date').textContent = dateString;
    document.getElementById('weekday').textContent = weekDayString;
  
    // 設置農曆日期
    const lunalYear = lunarFun.getHeavenlyStems(year);
    const lunalYears = lunarFun.getEarthlyBranches(year);
    const lunasign = lunarFun.getZodiac(year);
// 農曆月份對應表
const CHINESE_MONTHS = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '臘'];

// 農曆日期對應表
const CHINESE_DAYS = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

function getChineseLunarDate(day) {
  let lunarDayText = '';

  if (day <= 10) {
    lunarDayText = '初' + CHINESE_DAYS[day - 1];
  } else if (day > 10 && day < 20) {
    lunarDayText = '十' + CHINESE_DAYS[day - 11];
  } else if (day === 20) {
    lunarDayText = '二十';
  } else if (day > 20 && day < 30) {
    lunarDayText = '廿' + CHINESE_DAYS[day - 21];
  } else if (day === 30) {
    lunarDayText = '三十';
  }

  return lunarDayText;
}

function updateClock() {
  const now = new Date();
  
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  
  // 獲取農曆日期
  const luna = lunarFun.gregorianToLunal(year, month, date);
  const lunarMonth = luna[1];
  const lunarMonthText = CHINESE_MONTHS[lunarMonth - 1]; // 因為月份是從1開始的，而映射表從0開始
  const lunarDay = luna[2];
  const lunarDayText = getChineseLunarDate(lunarDay);
  
  console.log(lunarMonthText, lunarDayText);

    const lunarDateString = `${lunalYear}${lunalYears}${lunasign}年${lunarMonthText}月${lunarDayText}`;
    document.getElementById('lunar').textContent = lunarDateString;
  }
  updateClock();

}
  function padZero(num) {
    return num.toString().padStart(2, '0');
  }
  
  updateClock();
  setInterval(updateClock, 1000);
