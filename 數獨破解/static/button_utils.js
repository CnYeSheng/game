function clearBoard() {
    var inputs = document.querySelectorAll('input');
    for (i = 0; i < 81; i++) {
        inputs[i].value = "";
    }

    document.querySelector("#progressBackground").style.display = "none";
    document.querySelector("#progressBar").style.display = "none";
}


function get_dummy() {
    var dummy = [
        "5","3", "", "","7", "", "", "", "",
        "6", "", "","1","9","5", "", "", "",
         "","9","8", "", "", "", "","6", "",
        "8", "", "", "","6", "", "", "","3",
        "4", "", "","8", "","3", "", "","1",
        "7", "", "", "","2", "", "", "","6",
         "","6", "", "", "", "","2","8", "",
         "", "", "","4","1","9", "", "","5",
         "", "", "", "","8", "", "","7","9"];
    
    var inputs = document.querySelectorAll('input');
    
    for (i = 0; i < 81; i++) {
        inputs[i].value = dummy[i];
    }
}


document.querySelector('#default').addEventListener("click", get_dummy);
document.querySelector('#clear').addEventListener("click", clearBoard);
