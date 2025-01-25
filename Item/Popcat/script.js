/*Preloading alternate cat image*/
preload = new Image();
preload.src = "imgs/op.png";

/*Cat elem*/
let cat = null;
window.onload = function() {
    cat = document.getElementById("p");
    pop_count = getCookie("pop_count")
    if (cat) {
        cat.innerHTML = pop_count > 0 ? pop_count : "";
    }
}

/*Pop mp3s*/
pops = [
    "pops/pop1.mp3",
    "pops/pop2.mp3",
    "pops/pop3.mp3",
    "pops/pop4.mp3",
]
pop_i = 0

/*Cookie utils*/
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

op_func = function(){
    /*Chance cat image to op.jpg via css*/
    if (cat) {
        cat.id = "op"
    }
    /*Play pop noise*/
    a = new Audio(pops[pop_i])
    a.load()
    a.play()
    /*Increment index for next pop noise*/
    pop_i = (pop_i+1)%pops.length
    /*Increment pop count*/
    pop_count++
    if (cat) {
        cat.innerHTML = pop_count
    }
    event.preventDefault();
    setCookie("pop_count",pop_count,365)
    /*Fire google analytics event for pop*/
    // gtag('event', 'pop');
}

p_func = () => setTimeout(() => {
    if (cat) {
        cat.id = "p"
    }
}, 25)

// 禁止右鍵選單
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// 確保在鬆開按鍵之後才會觸發事件
let isKeyDown = false;
document.addEventListener("keydown", function(e) {
    if (!isKeyDown) {
        op_func();
    }
    isKeyDown = true;
});

document.addEventListener("keyup", function(e) {
    if (isKeyDown) {
        p_func();
    }
    isKeyDown = false;
});

document.addEventListener("pointerdown", op_func)
document.addEventListener("pointerup", p_func)