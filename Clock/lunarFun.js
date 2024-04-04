'use strict';

/**
 * @auth iilu.me
 * 用法說明可查看 [lunarFun](https://github.com/iilu/lunarFun)
 * 沒有特殊說明，牽扯到的數字日期都為中國公歷日期，農歷日期會特別說明
 */

const LUNAR_INFO = {
    MIN_YEAR: 1901, // YEAR_INFO 的最小年份，和數組下標配合可知每個項的年份
    MAX_YEAR: 2100, // YEAR_INFO 的最大年份
    YEAR_INFO: [
        "4e4ae0", "22a570", "7554d5", "42d260", "12d950", "e56554", "3656a0", "a9ad0", "5955d2", "2a4ae0",
        "79a5b6", "4aa4d0", "1ad250", "e9d255", "3ab540", "ed6a0", "5dada2", "2e95b0", "864977", "524970",
        "22a4b0", "71b4b5", "426a50", "166d40", "e1ab54", "362b60", "a9570", "5d52f2", "2a4970", "796566",
        "46d4a0", "1aea50", "e96a95", "3a5ad0", "122b60", "e186e3", "2e92e0", "fd48d7", "4ec950", "22d4a0",
        "edd8a6", "3eb550", "1656a0", "e5a5b4", "3625d0", "a92d0", "59d2b2", "2aa950", "75b557", "466ca0",
        "1ab550", "ed5355", "3a4da0", "ea5b0", "e14573", "3252b0", "7da9a8", "4ae930", "226aa0", "71aea6",
        "3eab50", "164b60", "65aae4", "36a570", "a5260", "55f263", "26d950", "795b57", "4656a0", "1a96d0",
        "6d4dd5", "3e4ad0", "ea4d0", "5dd4d4", "2ed250", "7dd558", "4ab540", "1eb6a0", "f195a6", "4295b0",
        "1649b0", "65a974", "36a4b0", "ab27a", "526a50", "266d40", "75af46", "46ab60", "1a9570", "6d4af5",
        "3e4970", "1264b0", "5d74a3", "2aea50", "7d6b58", "4e5ac0", "1eab60", "7196d5", "4292e0", "16c960",
        "61d954", "32d4a0", "6da50", "597552", "2656a0", "75abb7", "4a25d0", "1e92d0", "69cab5", "3aa950",
        "eb4a0", "5dbaa4", "2aad50", "7d55d9", "4e4ba0", "22a5b0", "f15176", "4252b0", "16a930", "657954",
        "326aa0", "6ad50", "595b52", "2a4b60", "75a6e6", "46a4e0", "1ad260", "69ea65", "36d530", "e5aa0",
        "5d76a3", "2e96d0", "7d4afb", "4e4ad0", "22a4d0", "f1d0b6", "3ed250", "12d520", "61dd45", "32b5a0",
        "656d0", "5955b2", "2a49b0", "79a577", "46a4b0", "1aaa50", "e9b255", "3a6d20", "aada0", "dd4b63",
        "2e9370", "649f8", "4e4970", "2264b0", "f168a6", "3eea50", "126aa0", "e1a6c4", "32aae0", "a92e0",
        "55d2e3", "26c960", "75d557", "46d4a0", "16da50", "695d55", "3a56a0", "ea6d0", "5d55d4", "2e52d0",
        "7da9b8", "4ea950", "1eb4a0", "6db6a6", "3ead50", "1655a0", "61aba4", "32a5b0", "a52b0", "59b273",
        "266930", "757337", "466aa0", "1aad50", "e94b55", "3a4b60", "ea570", "6154e4", "2ad160", "79e968",
        "4ad520", "1edaa0", "ed6aa6", "3e56d0", "164ae0", "65a9d4", "32a2d0", "6d150", "55f252", "26d520"
    ],
    HEAVENLY_STEMS: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
    EARTHLY_BRANCHES: ['子', '醜', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'],
    ZODIAC: ['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬'],
    CHINESE_MONTH: ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '臘'],
    CHINESE_DATE: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '初', '廿', '卅', '年', '月', '日', '閏'], // 廿: nian; 卅: sa; 都讀四聲
    CHINESE_SOLAR_TERMS: ['立春', '雨水', '驚蟄', '春分', '清明', '谷雨', '立夏', '小滿', '芒種', '夏至', '小暑', '大暑', '立秋', '處暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至', '小寒', '大寒']
}

/**
 * _ 開頭的方法默認為私有方法
 */
class LunarFunClass {
    constructor() {

    }

    /**
     * 作為下列方法必傳參數的默認參數傳入
     * 用來在方法所需的參數沒有傳入的時候拋出錯誤
     */
    _missingParameters() {
        throw new Error('Missing parameter');
    }

    /**
     * 傳入中國農歷年份和其對應的十六進制字符串信息，返回JS對象表示的農歷數據
     * 傳入的十六進制字符串不包括 “0x” 前綴
     * @param { number } year
     * @param { string } numStr
     */
    toJSON(year = this._missingParameters(), numStr = this._missingParameters()) {
        if (!numStr) {
            return '';
        }
        let hexadecimal = numStr.toString('16'); // 保證使用的數據是十六進制的字符串
        let binary = parseInt(hexadecimal, 16).toString(2);
        if (binary.length !== 24) { // 不足24位則左邊補0補足24位
            binary = '0'.repeat(24 - binary.length) + binary;
        }
        let lunarItem = {
            'year': +year,
        };
        // binary 第 21-24 個字符判斷是否是閏年，如果是則得到閏幾月
        // binary 第 1 個字符是當年份是閏年的時候判斷閏月的天數，1是大月30天， 0是小月29天，如果不是閏年則為0
        let runInfo = binary.slice(-4);
        if (runInfo === '0000') {
          lunarItem.isRun = false;
          lunarItem.runMonth = 0;
          lunarItem.runMonthDays = 0;
        } else {
          lunarItem.isRun = true;
          lunarItem.runMonth = parseInt(runInfo, 2);
          lunarItem.runMonthDays = +binary.slice(0, 1) + 29;
        }

        // binary 第 9-20 個字符是當年的正常月份天數，1是大月30天， 0是小月29天
        lunarItem.monthsDays = [];
        let monthInfo = binary.slice(8, 20);
        [...monthInfo].map(item => {
            lunarItem.monthsDays.push(+item + 29);
        })

        // binary 第 7-8 個字符是 農歷年份正月初一對應的公歷月份
        lunarItem.firstMonth = parseInt(binary.slice(6, 8), 2);

        // binary 2-6 個字符是 農歷年份正月初一對應的公歷日子
        lunarItem.firstDay = parseInt(binary.slice(1, 6), 2);

        return lunarItem;
        /* 輸出例子
            {
                 "year": 2000, // 農歷年份的數字表示
                 "isRun": false, // 是否是閏年
                 "runMonth": 0, // 是閏年的話閏幾月，非閏年為 0
                 "runMonthDays": 0, // 是閏年的話閏月的天數，非閏年為 0
                 "monthsDays": [30, 30, 29, 29, 30, 29, 29, 30, 29, 30, 30, 29], // 正常十二個月的每月天數
                 "firstMonth": 2, // 農歷年份正月初一對應的公歷月份
                 "firstDay": 5 // 農歷年份正月初一對應的公歷日子
            }
        */
    }

    /**
     * 判斷輸入的中國公歷年份是否是閏年
     * @param year
     * @returns {boolean}
     */
    isLeapYear(year = this._missingParameters()) {
        /**
         * 現在的公歷是格里高利歷，是公元1582年以後使用的，之前使用的是儒略歷。
         * 格里高利歷閏年的定義：世紀年中能被400整除的，和非世紀年中能被4整除的年份(即能被400整除的，或者不能被100整除而能被4整除的年份)
         * 儒略歷閏年的定義：能被4整除的年份。
         */

        /**
         * 使用一元運算符 + 來轉換數字對於 parseInt() 和 parseFloat() 來說有一個地方表現不一致
         * 對於 '123abc' 前者轉為 NaN , 後者轉為 123
         */

        let yearNum = +year;

        if (Number.isNaN(yearNum)) {
            console.warn('輸入的年份參數有誤');
            return false;
        }

        if (yearNum < 1582) {
            // 儒略歷閏年
            return (yearNum % 4 === 0);
        } else {
            // 格里高利歷閏年
            return (yearNum % 4 === 0 && yearNum % 100 !== 0) || (yearNum % 400 === 0);
        }
    }

    /**
     * 傳入中國公歷年份，輸出天幹，如果參數錯誤返回空字符串
     * @param year
     * @returns {string}
     */
    getHeavenlyStems(year = this._missingParameters()) {
        let yearNum = +year;

        if (Number.isNaN(yearNum)) {
            console.warn('輸入的年份參數有誤');
            return '';
        }

        let i = (yearNum - 3) % 10;
        if (i === 0) {// 余數為 0 的項即是第 10 個項
            i = 10;
        }

        return this.LUNAR_INFO.HEAVENLY_STEMS[i - 1];
    }

    /**
     * 傳入中國公歷年份，輸出地支，如果參數錯誤返回空字符串
     * @param year
     * @returns {string}
     */
    getEarthlyBranches(year = this._missingParameters()) {
        let yearNum = +year;

        if (Number.isNaN(yearNum)) {
            console.warn('輸入的年份參數有誤');
            return '';
        }

        let i = (yearNum - 3) % 12;
        if (i === 0) { // 余數為 0 的項及時第 12 個項
            i = 12;
        }

        return this.LUNAR_INFO.EARTHLY_BRANCHES[i - 1];
    }

    /**
     * 傳入中國公歷年份，輸出生肖，如果參數錯誤返回空字符串
     * @param year
     * @returns {string}
     */
    getZodiac(year = this._missingParameters()) {
        let yearNum = +year;

        if (Number.isNaN(yearNum)) {
            console.warn('輸入的年份參數有誤');
            return '';
        }

        let i = (yearNum - 3) % 12;
        if (i === 0) { // 余數為 0 的項及時第 12 個項
            i = 12;
        }

        return this.LUNAR_INFO.ZODIAC[i - 1];
    }

    /**
     * 傳入中國公歷年份和月份，輸出對應月份的天數
     * @param year
     * @param month
     * @returns {number}
     */
    getMonthNumberDays(year = this._missingParameters(), month = this._missingParameters()) {
        let FebDays = this.isLeapYear(year) ? 29 : 28;
        let monthNumberDaysArr = ['', 31, FebDays, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return monthNumberDaysArr[month];
    }

    /**
     * 傳入中國農歷年份和月份，輸出對應月份的天數，第三個參數是輸入的月份是否為閏月，默認為 false
     * 假設傳入的是 (1903, 4);       表示 輸出 農歷1906年 4月 的天數
     * 假設傳入的是 (1906, 4, true); 表示 輸出 農歷1906年 閏4月 的天數（第三個參數生效的前提是輸入的是閏年，且月剛好是閏）
     * @param year
     * @param month
     * @param run
     * @returns {number}
     */
    getLunarMonthNumberDays(year = this._missingParameters(), month = this._missingParameters(), isRun = false) {
        let yearData = this.LUNAR_INFO.YEAR_INFO[year - this.LUNAR_INFO.MIN_YEAR];
        let yearDataInfo = this.toJSON(+year, yearData);

        // 如果輸入的年份是農歷閏年，且輸入的月份剛好是閏月，且 isRun 為 true，說明需要輸出閏月的天數
        if (yearDataInfo.isRun && (+month === yearDataInfo.runMonth) && isRun) {
            return yearDataInfo.runMonthDays;
        } else {
            return yearDataInfo.monthsDays[month - 1];
        }
    }

    /**
     * 傳入中國農歷年月日返回其漢字表示，第四個參數在農歷年份是閏年的時候決定輸入的是正常月份還是閏月
     */
    formatLunarDate(year = this._missingParameters(), month = this._missingParameters(), day = this._missingParameters(), isRun = false) {
        let chineseDateText = this.LUNAR_INFO.CHINESE_DATE; // 存放有關 天 的字符串數組
        let chineseMonthText = this.LUNAR_INFO.CHINESE_MONTH; // 存放有關 月 的字符串數組
        // 年
        let resultYear = '';
        let yearNumArr = [...(+year + '')];
        let yearStrArr = [];
        yearNumArr.map(item => {
            yearStrArr.push(chineseDateText[+item]);
        })
        resultYear = yearStrArr.join('');

        // 月
        let resultMonth = chineseMonthText[month - 1];
        if (isRun) {
            resultMonth = chineseDateText[17] + resultMonth;
        }

        // 日
        let resultDay = '';
        let dayNumArr = [...(+day + '')];
        if (day <= 10) {
            resultDay = chineseDateText[11] + chineseDateText[+day];
        } else if (day <= 20) {
            if (day < 20) {
                resultDay = chineseDateText[10] + chineseDateText[+dayNumArr[1]];
            } else if (+day === 20) {
                resultDay = chineseDateText[2] + chineseDateText[10];
            }
        } else if (day <= 30) { // 農歷一個月最多大月30天
            if (day < 30) {
                resultDay = chineseDateText[12] + chineseDateText[+dayNumArr[1]];
            } else if (+day === 30) {
                resultDay = chineseDateText[3] + chineseDateText[10];
            }
        }

        return resultYear + chineseDateText[14] + resultMonth + chineseDateText[15] + resultDay + chineseDateText[16];
    }

    /**
     * 傳入中國農歷年份，輸出那年所有的天數
     * 如果傳入的參數不規範，則返回 0
     * @param year
     */
    getLunarYearDaysTotal(year = this._missingParameters()) {
        if (!year) {
            console.warn('輸入的年份參數有誤');
            return 0;
        }
        let yearData = this.LUNAR_INFO.YEAR_INFO[year - this.LUNAR_INFO.MIN_YEAR];
        let yearDataInfo = this.toJSON(+year, yearData);

        if (yearDataInfo.isRun) { // 是閏年，加上閏月的天數
            return yearDataInfo.monthsDays.reduce((arr, cur) => {
                return arr + cur;
            }, yearDataInfo.runMonthDays)
        } else { // 不是閏年，只計算普通月份天數
            return yearDataInfo.monthsDays.reduce((arr, cur) => {
                return arr + cur;
            })
        }
    }

    /**
     * 輸入中國農歷日期，輸出日期距離那年正月初一的天數
     * 第4個參數是輸入的月份是否為閏月，默認為 false
     * @param year
     * @param month
     * @param day
     * @param isRun
     * @returns {number}
     */
    distanceLunarFirstDays(year = this._missingParameters(), month = this._missingParameters(), day = this._missingParameters(), isRun = false) {
        let yearData = this.LUNAR_INFO.YEAR_INFO[year - this.LUNAR_INFO.MIN_YEAR];
        let yearDataInfo = this.toJSON(+year, yearData);

        if (!yearDataInfo.isRun) { // 如果不是閏年 返回1月到輸入月份前一個月的天數總和加上 日子-1
            return yearDataInfo.monthsDays.slice(0, month-1).reduce((arr, cur) => {
                return arr + cur;
            }, 0) + day - 1;
        } else { // 如果是閏年，存在多種情況，方便理解下面寫出了4種情況
            // 如果輸入的月份比閏月小，則和不是閏年一樣輸出
            if (month < yearDataInfo.runMonth) {
                return yearDataInfo.monthsDays.slice(0, month-1).reduce((arr, cur) => {
                    return arr + cur;
                }, 0) + day - 1;
            }
            // 輸入的月份比閏月大，輸出的月份總和要加上閏月
            if (month > yearDataInfo.runMonth) {
                return yearDataInfo.monthsDays.slice(0, month-1).reduce((arr, cur) => {
                    return arr + cur;
                }, yearDataInfo.runMonthDays) + day - 1;
            }
            // 輸入的月份和閏月一樣，且isRun為false，和不是閏年一樣輸出
            if (month === yearDataInfo.runMonth && !isRun) {
                return yearDataInfo.monthsDays.slice(0, month-1).reduce((arr, cur) => {
                    return arr + cur;
                }, 0) + day - 1;
            }
            // 輸入的月份和閏月一樣，且isRun為true，返回1月到輸入月份的的天數和加上日子-1
            if (month === yearDataInfo.runMonth && isRun) {
                return yearDataInfo.monthsDays.slice(0, month).reduce((arr, cur) => {
                    return arr + cur;
                }, 0) + day - 1;
            }
        }
    }

     /**
     * 輸入兩個公歷日期對象，輸出兩個日期間隔的天數
     * 注意，請傳入兩個時區相同的對象，例如傳入的兩個日起對象都是 UTC 時間，或都是中國時區的日起對象
     * @param date1
     * @param date2
     * @returns {number}
     */
    distanceDate(date1 = this._missingParameters(), date2 = this._missingParameters()) {
        let distance = date1 - date2; // 以毫秒計的運行時長

        // 這里會有精度問題，由原來的 Math.floor 轉為 Math.round 方法，因為計算的天數有可能會出現 在中國時區為 354天，在新加坡時區為 353.99天，（中國時區和新加坡時區應該都是 +8 時區，按理說獲取的時間戳是一樣的，但它就是有誤差我也是沒辦法
        // return Math.floor(Math.abs(distance) / 1000 / 60 / 60 / 24); // 相差的毫秒數轉為天數
        return Math.round(Math.abs(distance) / 1000 / 60 / 60 / 24); // 相差的毫秒數轉為天數
    }

    /**
     * 輸入中國公歷年月日，返回其中國時間日期對象，時分秒不傳默認 0
     * 注意：此日期對象最好不要使用日期對象的獲取年月日方法等直接返回年月日，因為時區不一定是,在中國
     * 因為月份在日期對象里面需要 -1(js日期對象月份從0開始 0-11)，時常忘記，所以這里寫一個方法
     * @param year
     * @param month
     * @param day
     * @returns {Date}
     */
    getDateYMD(year = this._missingParameters(), month = this._missingParameters(), day = this._missingParameters(), h = 0, m = 0, s = 0) {
        if (new Date().getTimezoneOffset() === -480) { // 表示當前是在中國時區
            return new Date(+year, month - 1, +day, h, m, s);
            
        } else { // 表示當前不是在中國時區，那麽根據輸入的年月日，返回其中國時區相同的日期對象(即時間戳一樣)
            let localDate = new Date(+year, month - 1, +day, h, m, s); // 本地時間
            let offsetGMT = new Date().getTimezoneOffset(); // 本地時間和格林威治的時間差，單位為分鐘
            let chinaTimestamp = localDate.getTime() - (offsetGMT * 60 * 1000) - (8 * 60 * 60 * 1000); // 中國時間戳

            return new Date(chinaTimestamp);
        }
    }

     /**
     * 格式化輸出中國時間對象
     * 根據中國時間對象，返回對應中國時間格式的中國時間字符串
     * @param {object} dateObj 時間對象 如果不傳則默認當前時間（如果在非中國時區，則默認中國時區的當前時間對象
     * @param {string} formatText 時間格式 區分大小寫 如果不傳則默認格式為 YYYY-MM-DD hh:mm:ss
     */
    formatDate(dateObj, formatText = 'YYYY-MM-DD hh:mm:ss') {
        /**
         * formatText 的字符含義
         * | 格式       | 含義    | 備注       | 舉例           |
         * | :--:      | :--:    | :--:      | :--:          |
         * | YYYY      | 年      | 四位數         | 1999          |
         * | M         | 月      | 不補零     | 6             |
         * | MM        | 月      | 補零       | 06            |
         * | D         | 日      | 不補零     | 6             |
         * | DD        | 日      | 補零       | 06            |
         * | h         | 小時     | 不補零     | 7             |
         * | hh        | 小時     | 補零      | 07            |
         * | m         | 分鐘     | 不補零     | 8             |
         * | mm        | 分鐘     | 補零      | 08            |
         * | s         | 秒      | 不補零     | 9             |
         * | ss        | 秒      | 補零       | 09            |
         * | W         | 星期    | 不補零，返回 0-6 0表示星期天     | 1             |
         * |WW         | 星期    | 補零，返回 00-06 00表示星期天      | 01            |
         * |WT         | 星期    | 文字表述   | 星期一         |
         * | timestamp | JS時間戳 | 13位毫秒級 | 0928624089000 |
         */

        /**
         * @desc 十進制數字補零 注意無窮大和無窮小, 會返回一個數字字符串, 如果無法補零則會返回空字符串，默認十進制
         * @todu 注意，如果參數值是Number且是0開頭，有可能會被解析為八進制數字
         * @returns {string} 返回十進制數字字符串
         * @param {number or string} num
         */
        let addZero = function (num) {
            if (typeof num === "undefined") {
                console.warn("注意，addZero() 補零方法沒有接收到值，將返回空字符串");
                return '';
            }

            let number = num - 0;

            if (Number.isNaN(number)) {
                console.warn("注意，addZero() 補零方法接收的值無法轉換為數字，將返回空字符串");
                return '';
            }
            if (!isFinite(number)) {
                console.warn("注意，addZero() 補零方法接收的值不是js能解析的有限數值，將返回空字符串");
                return '';
            }

            return number < 10 ? '0' + number : '' + number;
        };

        /**
         * 傳入中國日期對象和格式化字符串，返回相應的根據 格式化字符串 替換後的 格式化後的時間字符串
         * @todu 如果需要增加其他的格式，例如‘毫秒’，則需要修改 regObj 這個正則，並修改接下來的格式化方法(中國時區和非中國時區的格式化方法)。
         * @param {object} dateObj 時間日期對象
         * @param {string} formatText 格式化字符串模板
         */
        let formatReplace = function (dateObj, formatText = 'YYYY-MM-DD hh:mm:ss') {
            if (!dateObj) { // 如果時間對象為空，則返回錯誤
                console.error('formatReplace() 函數沒有接收到 Date 時間日期對象。');
                return false;
            }
            
            // 格式化時間就是把日期對象格式化類似默認的 YYYY-MM-DD hh:mm:ss 模樣
            // 在同一個日期對象上 UTC時區格式化時間 比 中國時區格式化時間 少8小時
            // 要想讓 UTC時區格式化時間 和 中國時區格式化時間一樣，只需要 日期對象本身+8小時
            // 這樣 新的日期對象UTC時區格式化時間 就和 舊的日期對象中國時區格式化時間 在字符串展示上一樣
            // 上面的可用偽代碼表達為 日期對象.getHours() === new Date(日期對象.getTime() + 8小時毫秒).getUTCHours()
            let lengthenDateObj = new Date(dateObj.getTime() + 8 * 60 * 60 * 1000);
            let weekText = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            let regObj = /YYYY|M{1,2}|D{1,2}|h{1,2}|m{1,2}|s{1,2}|WT|W{1,2}|timestamp/g; // 注意順序，比如 WT 要在 W 前面，否則會先匹配 W
            
            return formatText.replace(regObj, function (match) {
                /**
                 * 返回替換字符串，根據 **中國時間** 返回
                 * match 是匹配到的字符串 如果 regObj 為 g 模式（全局替換），則每次匹配都會執行這個函數
                 * switch 使用的是全等匹配 即 match === case的值
                 */
                switch (match) {
                    case 'YYYY':
                        return lengthenDateObj.getUTCFullYear(); // 1000-9999
                    case 'M':
                        return lengthenDateObj.getUTCMonth() + 1; // 月份是 0-11, 這里返回 1-12
                    case 'MM':
                        return addZero(lengthenDateObj.getUTCMonth() + 1); // 月份是 0-11, 這里返回 01-12
                    case 'D':
                        return lengthenDateObj.getUTCDate(); // 1-31
                    case 'DD':
                        return addZero(lengthenDateObj.getUTCDate()); // 01-31
                    case 'h':
                        return lengthenDateObj.getUTCHours(); // 0-23
                    case 'hh':
                        return addZero(lengthenDateObj.getUTCHours()); // 00-23
                    case 'm':
                        return lengthenDateObj.getUTCMinutes(); // 0-59
                    case 'mm':
                        return addZero(lengthenDateObj.getUTCMinutes()); // 00-59
                    case 's':
                        return lengthenDateObj.getUTCSeconds(); // 0-59
                    case 'ss':
                        return addZero(lengthenDateObj.getUTCSeconds()); // 00-59
                    case 'W':
                        return lengthenDateObj.getUTCDay(); // 日期是 0 代表星期日， 1 代表星期一，2 代表星期二， 依次類推 這里返回 0-6
                    case 'WW':
                        return addZero(lengthenDateObj.getUTCDay()); // 日期是 0 代表星期日， 1 代表星期一，2 代表星期二， 依次類推 這里返回 00-06
                    case 'WT':
                        return weekText[lengthenDateObj.getUTCDay()]; // // 日期是 0 代表星期日， 1 代表星期一，2 代表星期二， 依次類推 這里返回 星期一~星期日
                    case 'timestamp':
                        // 注意，這里不能用 lengthenDateObj日期對象 返回時間戳，要用 dateObj日期對象 返回時間戳，因為 lengthenDateObj 只是方便計算的時間對象，實際傳入的時間對象還是 dateObj
                        // 時間戳代表日期對象，實際傳入 dateObj 的日期對象 , 則返回 dateObj 的時間戳。
                        // 同一個日期對象在不同的時區獲得的時間戳都是一樣的。
                        return dateObj.getTime(); // 從1970-1-1 00:00:00 UTC（協調世界時）到該日期經過的毫秒數，對於1970-1-1 00:00:00 UTC之前的時間返回負值。
                    default:
                        console.warn('沒有查詢到格式化字符串，請確認日期格式化字符串是否正確');
                        return '';
                }
            });
        };

        if (!dateObj) { // 如果時間對象為空，則默認為當前中國時間
            let nowDate = null;
            if (new Date().getTimezoneOffset() === -480) { // 表示當前是在中國時區
                nowDate = new Date();
            } else {
                let localDate = new Date(); // 本地時間
                let offsetGMT = new Date().getTimezoneOffset(); // 本地時間和格林威治的時間差，單位為分鐘
                let chinaTimestamp = localDate.getTime() - (offsetGMT * 60 * 1000) - (8 * 60 * 60 * 1000); // 中國時間戳

                nowDate = new Date(chinaTimestamp);
            }
            return formatReplace(nowDate, formatText);
        } else {
            return formatReplace(dateObj, formatText);
        }
    }
    
    /**
     * 傳入中國公歷年月日返回農歷年月日數組
     * 數組的第四個項是在年份為閏年的時候決定輸出的月份是否是閏月
     * @param { number } year 
     * @param { number } month 
     * @param { number } day 
     */
    gregorianToLunal(year = this._missingParameters(), month = this._missingParameters(), day = this._missingParameters()) {
        let yearData = this.LUNAR_INFO.YEAR_INFO[year - this.LUNAR_INFO.MIN_YEAR]; // 獲取輸入年份的16進制數據
        let yearDataInfo = this.toJSON(+year, yearData); // 轉化為 JSON數據

        /**
         * 以輸入年份的農歷正月初一對應的月份和天數來作為基準
         * 如果輸入的月份和天數比基準 大，說明輸出的農歷年份是同年
         * 如果輸入的月份和天數比基準 小，說明輸出的農歷年份要比同年公歷小一年
         */
        let compare = 0; // 0 表示輸入的月份天數和基準一致, 即正月初一 || 1 表示輸入的月份天數比基準 大 || -1 表示輸入的月份天數比基準 小
        if (month > yearDataInfo.firstMonth) { // 輸入的月份和比正月初一對應的月份大，
            compare = 1;
        } else if (month < yearDataInfo.firstMonth) { // 輸入的月份比正月初一對應的月份小
            compare = -1;
        } else if (+month === yearDataInfo.firstMonth) { // 輸入的月份和正月初一的月份相同，這個時候比較天數
            if (day > yearDataInfo.firstDay) {
                compare = 1;
            } else if (day < yearDataInfo.firstDay) {
                compare = -1;
            } else if (+day === yearDataInfo.firstDay) {
                compare = 0;
            }
        }

        let lunalYear = 0; // 輸出的農歷年份
        let lunalMonth = 0; // 輸出的農歷月份
        let lunalDay = 0; // 輸出的農歷天
        let lunalIsRun = false; // 如果輸出的農歷年份是閏年，此參數有效，判斷輸出的月份是否是閏月， 默認false

        if (compare === 1) { // 輸入的月份天數比基準 大， 使用同輸入年份的農歷年份數據
            lunalYear = +year;
        } else if (compare === -1) { // 輸入的月份天數比基準 小，使用同輸入年份 上一年 的農歷數據
            lunalYear = year - 1;
            yearData = this.LUNAR_INFO.YEAR_INFO[lunalYear - this.LUNAR_INFO.MIN_YEAR];
            yearDataInfo = this.toJSON(lunalYear, yearData);
        } else if (compare === 0) { // 輸入的月份天數和基準一致
            lunalYear = +year;
            lunalMonth = 1;
            lunalDay = 1;
        }

        let differDays = this.distanceDate(this.getDateYMD(lunalYear, yearDataInfo.firstMonth, yearDataInfo.firstDay), this.getDateYMD(year, month, day)); // 輸入的公歷年月日和其所在農歷正月初一相差的天數
        let monthsTotalArr = [...yearDataInfo.monthsDays]; // 農歷所有月份組成的數組，包括閏月，
        if (yearDataInfo.isRun) { // 如果有閏月，則在原來的月份後面插入閏月
            monthsTotalArr.splice(yearDataInfo.runMonth, 0, yearDataInfo.runMonthDays);
        }
        let monthsTotalArrIndex = 0; // 農歷月份處在monthsTotalArr的下標
        let reduceBreak = false; // 額外參數，用來判斷是否還進行計算 monthsTotalArrIndex 和 lunalDay
        monthsTotalArr.reduce((accumulator, currentValue, index) => {
            // 與正月初一相差的天數+1即是正月初一到輸入年月日的天數，例如1號到3號相差2天，但1號到3號總共3天
            if (((accumulator + currentValue) >= (differDays + 1)) && !reduceBreak) {
                reduceBreak = true;
                monthsTotalArrIndex = index;
                // 天數 = 月份的天數 - (農歷前幾個月的總和 - (公歷相差天數 + 1))
                lunalDay = monthsTotalArr[index] - ((accumulator + currentValue) - (differDays + 1));
            }
            return accumulator + currentValue
        }, 0);
        
        /**
         * monthsTotalArrIndex 是所有農歷月份數組的下標，如果不是閏年 monthsTotalArrIndex+1 就表示當前農歷月份
         * 如果是閏年，monthsTotalArrIndex+1 <= 閏月， 則 monthsTotalArrIndex+1 表示當前農歷月份
         * 如果是閏年，monthsTotalArrIndex+1 > 閏月，則 monthsTotalArrIndex 表示當前農歷月份
         * 如果 monthsTotalArrIndex+1 剛好比閏月打一個月，則 lunalIsRun 為 true
         */
        if (yearDataInfo.isRun) {
            if ((monthsTotalArrIndex + 1) <= yearDataInfo.runMonth) {
                lunalMonth = monthsTotalArrIndex + 1;
            } else {
                lunalMonth = monthsTotalArrIndex;
                // (monthsTotalArrIndex + 1) - yearDataInfo.runMonth === 1 縮寫一下就是下面的判斷
                if (monthsTotalArrIndex === yearDataInfo.runMonth) {
                    lunalIsRun = true
                }
            }
        } else {
            lunalMonth = monthsTotalArrIndex + 1;
        }

        return [+lunalYear, +lunalMonth, +lunalDay, lunalIsRun];
    }

    /**
     * 傳入中國農歷年月日返回中國公歷年月日數組，第四個參數在農歷年份是閏年的時候決定輸入的是正常月份還是閏月
     * @param year
     * @param month
     * @param day
     * @param isRun
     */
    lunalToGregorian(year = this._missingParameters(), month = this._missingParameters(), day = this._missingParameters(), isRun = false) {
        let yearData = this.LUNAR_INFO.YEAR_INFO[year - this.LUNAR_INFO.MIN_YEAR];
        let yearDataInfo = this.toJSON(+year, yearData);

        let distanceLunarLunarFirstDays = this.distanceLunarFirstDays(+year, +month, +day, isRun); // 輸入的日子和農歷正月初一相差的天數
        let distanceLunarGregorianFirstDay = this.distanceDate(this.getDateYMD(+year, 1, 1), this.getDateYMD(+year, yearDataInfo.firstMonth, yearDataInfo.firstDay)); // 輸入年份農歷正月初一和公歷一月一日相差的天數
        let distanceGregorianFirstDay = distanceLunarLunarFirstDays + distanceLunarGregorianFirstDay; // 輸入日期距離公歷一月一日相差的天數
        let isGregorianRun = this.isLeapYear(+year); // 輸入的年份公歷是否是閏年
        let gregorianYearDays = isGregorianRun ? 366 : 365; // 輸入的年份的公歷天數，平年365，閏年366
        
        // 輸入的農歷日期到了下一年公歷年
        if ((distanceGregorianFirstDay + 1) > gregorianYearDays) { // +1是因為 相差天數+1 === 兩個日期所占的天數，例如：1-3日相差2天，但1-3一共3天。
            let day = (distanceGregorianFirstDay + 1) - gregorianYearDays;
            // 輸入的農歷日期在下一年公歷年的1月
            if (day <= 31) {
                return [+year+1, 1, day];
            } else { // 輸入的農歷日期在下一年的2月
                return [+year+1, 2, day-31];
            }
        } else { // 輸入的農歷日期還在當前的公歷年
            let monthsTotalArr = isGregorianRun ? [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 公歷年月份組成的數組，閏年2月29天，平年2月28天
            let monthsTotalArrIndex = 0; // 公歷月份處在 monthsTotalArr 的下標
            let gregorianDays = 0; // 公歷當月天數
            let reduceBreak = false; // 額外參數，用來判斷是否還進行計算 monthsTotalArrIndex
            monthsTotalArr.reduce((accumulator, currentValue, index) => {
                // +1是因為 相差天數+1 === 兩個日期所占的天數，例如：1-3日相差2天，但1-3一共3天。
                if (((accumulator + currentValue) >= (distanceGregorianFirstDay + 1)) && !reduceBreak) {
                    reduceBreak = true;
                    monthsTotalArrIndex = index;
                    // 天數 = 月份的天數 - (公歷前幾個月的總和 - (公歷相差天數 + 1))
                    gregorianDays = monthsTotalArr[index] - ((accumulator + currentValue) - (distanceGregorianFirstDay + 1))
                }
                return accumulator + currentValue
            }, 0);
            return [+year, monthsTotalArrIndex + 1, gregorianDays];
        }
    }



    

}

LunarFunClass.prototype.LUNAR_INFO = LUNAR_INFO;

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.lunarFun = factory()); // lunarFun 是庫的名字
}(this, (function () { 
    'use strict';
    return new LunarFunClass();
})));
