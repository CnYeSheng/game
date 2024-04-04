// sudoku solver functions
function findEmpty(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] === "") {
                return [i, j];
            }
        }
    }
    return null
}


function valid(board, num, position) {
    // row
    for (var i = 0; i < 9; i++) {
        if (board[position[0]][i] === num && i !== position[1]) {
            return false;
        }
    }
    // col
    for (var i = 0; i < 9; i++) {
        if (board[i][position[1]] === num && i !== position[0]) {
            return false;
        }
    }
    // 3 by 3 box
    var box_x = Math.floor(position[1] / 3);
    var box_y = Math.floor(position[0] / 3);
    
    for (var i = box_y*3; i < box_y*3 + 3; i++) {
        for (var j = box_x*3; j < box_x*3 + 3; j++) {
            if (board[i][j] === num && (position[0] !== i || position[1] !== j)) {
                return false;
            } 
        }
    }
    return true;
}

function validPuzzle(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] !== "" && (!valid(board, board[i][j], [i, j]))) {
                return false;
            }
        }
    }

    return true;
}

function attempt(board, queue, solveType) {
    var find = findEmpty(board);
    if (find === null) {
        return true;
    } else {
        var row = find[0];
        var col = find[1];
    }
    
    for (var i = 1; i < 10; i++) {
        if (valid(board, i.toString(), [row, col]) === true) {
            board[row][col] = i.toString();
            if (solveType === "instant") {
                document.querySelectorAll('input')[row*9 + col].value = i.toString();
            } else {
                queue.push([row*9 + col, i.toString()]);
            } 
            
            if (attempt(board, queue, solveType) === true) {
                return true;
            } else {
                board[row][col] = "";
                if (solveType === "instant") {
                    document.querySelectorAll('input')[row*9 + col].value = "";
                } else {
                    queue.push([row*9 + col, ""]);
                }
            }
        }
    }
    return false;
}
// back tracking algorithm ends here
// ----------------------------------------------


function arrayToPuzzle(array) {
    var puzzle = [];
    for (var i = 0; i < 9; i++) {
        var row =[];
        
        for (var j = 0; j < 9; j++) {
            row.push(array[i*9 + j].value);
        } 
        puzzle.push(row);
    }
    return puzzle;
}


function displayBackTracking(queue, speed) {
    var inputList = document.querySelectorAll('input');
    var progressBar = document.getElementById("progressBar");
    
    qLength = queue.length;
    var steps = 0;

    document.querySelector("#progressBackground").style.display = "block";
    document.querySelector("#progressBar").style.display = "block";

    var move = setInterval(function(){
        if (queue.length === 0) {
            clearInterval(move)
            
            document.querySelector("#clear").disabled = false;
            document.querySelector("#default").disabled = false;
            document.querySelector("#solve").disabled = false;
            document.querySelector("#range").disabled = false;

            setTimeout(() => {
                alert('完成!');
            }, 200);
        } else {

            // For some reason when speed === 1, setInterval doesn't work as fast as 1 step/ms
            // So I put a for loop inside when speed === 1, to make the setInterval run faster
            if (speed !== 1000) {
                for (i = 0; i < 10; i++) {
                    nextMove = queue.shift();
                    inputList[nextMove[0]].value = nextMove[1];

                    steps++;
                    progressBar.style.width = (steps/qLength * 100).toString() + "%";
                }            
            } else {
                nextMove = queue.shift();
                inputList[nextMove[0]].value = nextMove[1];
                
                steps++;
                progressBar.style.width = (steps/qLength * 100).toString() + "%";
            }
        }
    }, speed);
}


function solvePuzzle() {
    var array = document.querySelectorAll('td input');
    var puzzle = arrayToPuzzle(array);

    if (!validPuzzle(puzzle)) {
        alert('Puzzle is unsolvable!');
        return false;
    }

    var solveType;

    var selectedSpeed = document.querySelector('#range').value;

    if (selectedSpeed === "5") {
        solveType = "instant";
    } else {
        solveType = "withProcess";
    }


    var queue = [];

    var result = attempt(puzzle, queue, solveType);
       

    var speedTable = {
        "1": 1000,
        "2": 100,
        "3": 10,
        "4": 1,
    };

    var speed = speedTable[selectedSpeed];
        

    if (solveType === "instant") {
        if (result) {
            setTimeout(() => {
                alert('Puzzle Solved!');
            }, 200);
        } else {
            alert('Puzzle is unsolvable!');
        }
    }

    if (solveType === "withProcess") {
        if (result) {
            document.querySelector("#default").disabled = true;
            document.querySelector("#clear").disabled = true;
            document.querySelector("#solve").disabled = true;
            document.querySelector("#range").disabled = true;

            displayBackTracking(queue, speed);

        } else {
            alert('Puzzle is unsolvable!');
        }
        
    }
}


document.querySelector('#solve').addEventListener("click", solvePuzzle);

document.querySelector("#progressBackground").style.display = "none";
document.querySelector("#progressBar").style.display = "none";
