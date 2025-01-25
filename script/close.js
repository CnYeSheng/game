// 確保腳本只初始化一次
/*
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkRedirect);
} else {
    checkRedirect();
}

function checkRedirect() {
    try {
        // 檢查當前頁面路徑
        const currentPath = window.location.pathname.split('/').pop().toLowerCase();
        console.log('當前頁面路徑：', currentPath);

        // 如果已經在 Close.html 頁面，直接返回
        if (currentPath === 'close.html') {
            console.log('當前已在 Close.html 頁面，不需要重定向');
            return;
        }

        // 設定結束時間
        const endDate = new Date('2025-02-19T23:59:59+08:00');
        const currentDate = new Date();

        // 添加調試信息
        console.log('結束時間：', endDate.toLocaleString());
        console.log('當前時間：', currentDate.toLocaleString());

        // 如果當前時間已超過結束時間，則重定向
        if (currentDate >= endDate) {
            console.log('已超過結束時間，執行重定向');
            window.location.href = '/Close.html';
        } else {
            console.log('尚未到結束時間，繼續顯示當前頁面');
        }

    } catch (error) {
        console.error('檢查重定向時發生錯誤：', error);
    }
}
*/