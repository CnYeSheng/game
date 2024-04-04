// Draw lines on puzzle table
function getClass(i, j, td) {
    if (i == 0 || i == 6) {
        td.classList.add("top-boundary");
    }

    if (i == 2 || i == 8) {
        td.classList.add("bottom-boundary");
    }

    if (j == 0 || j == 6) {
        td.classList.add("left-boundary");
    }

    if (j == 2 || j == 8) {
        td.classList.add("right-boundary");
    }
}

function tableCreate(){
    var puzzleBoard = document.querySelector('#puzzleBoard');
    var tbl  = document.createElement('table');
    tbl.style = 'margin-left:auto; margin-right:auto; border-collapse: collapse;';

    for (var i = 0; i < 9; i++) {
        var tr = tbl.insertRow();
        for (var j = 0; j < 9; j++) {
            var td = tr.insertCell();
            var input = document.createElement("input");
            input.setAttribute("maxlength", "1");
            input.setAttribute('type', 'tel');
            getClass(i, j, td);
            td.appendChild(input);
        }
    }

    puzzleBoard.appendChild(tbl);
}

tableCreate();

// After creating puzzle board then put limit on input
for (input of document.querySelectorAll('input')){
    input.addEventListener('input', () => {
        var key = this.value;
        var regex = /[1-9]/;
        if (!regex.test(key)){
            this.value = "";
        }
    })
}
