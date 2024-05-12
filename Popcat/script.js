const catImg = document.getElementById('cat');
const countDisplay = document.getElementById('count');
const popSound = new Audio('pop.ogg');
let count = getCookieValue('popcat-count') || 0;
let isPressed = false;
updateCountDisplay();

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
//document.addEventListener('click', handleClick);
document.addEventListener('contextmenu', handleRightClick);

document.addEventListener('mouseup', MouseUp);
document.addEventListener('mousedown', MouseDown);

function handleKeyDown(event) {
    if (!isPressed) {
        count++;
        updateCountDisplay();
        catImg.classList.add('pressed');
        popSound.play();
        isPressed = true;
    }
}

function handleKeyUp() {
    catImg.classList.remove('pressed');
    isPressed = false;
}

function MouseDown(event) {
    if (!isPressed) {
        count++;
        event.preventDefault();
        updateCountDisplay();
        catImg.classList.add('pressed');
        popSound.play();
    }
}

function MouseUp() {
    catImg.classList.remove('pressed');
}

/*function handleClick(event) {
    count++;
    updateCountDisplay();
    popSound.play();
    setTimeout(() => {
        catImg.classList.remove('pressed');
    }, 100);
}*/

/*function handleClick(event) {
    count++;
    event.preventDefault();
    updateCountDisplay();
    catImg.classList.add('pressed');
    popSound.play();
    setTimeout(() => {
        catImg.classList.remove('pressed');
    }, 100);
}*/

/*function handleRightClick(event) {
    count++;
    event.preventDefault();
    updateCountDisplay();
    catImg.classList.add('pressed');
    popSound.play();
    setTimeout(() => {
        catImg.classList.remove('pressed');
    }, 100);
}*/

function handleRightClick(event) {
    event.preventDefault();
}

function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookieValue(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

function updateCountDisplay() {
    countDisplay.textContent = count;
    setCookie('popcat-count', count, 365);
}