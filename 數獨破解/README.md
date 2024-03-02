# About this project

--------------

## What is this project:
This is a Front-End practice project that can be used to solve Sudoku puzzles. It uses vanilla JavaScript, HTML, CSS and some styling from Bootstrap (The navbar and the bootstrap grid system).

Currently, this project is deployed at https://buddylich.pythonanywhere.com/ . Feel free to pay a visit.


## How to use this Sudoku Solver:
1. After the webpage is loaded, you will see a 9x9 empty Sudoku board. You can find a puzzle from Internet and fill in the numbers on the puzzle board, or you can also generate a default puzzle.

2. There is a dragable slider below the button "Display Process". Drag the slider to choose the speed displaying the solving process, then click the button "Display Process". 

3. If you choose the highest speed, the puzzle should be solved instantly. And the lowest speed is about one step per seconds.


## Why do I make this project:

In November 2020, I encounter a Sudoku Solver problem on LeetCode. I didn't complete this problem on my own, but the Backtracking algorithm really shocked me. 
So I was thinking, "Why don't I make a Sudoku Solver website, and display the process of backtracking? It will be really awesome".
I spent some time studying the DOM manipulation and the `setInterval()` function in JavaScript. Then I pieced them together, and created this Sudoku Solver.


## How does it work:
1. First when the html page is loaded, it will import the `generate_board.js`, generate the 9x9 sudoku board.

2. Then, import the `button_utils.js`, add eventListener to the buttons on the page.

3. Before using the Backtracking algorithm solving puzzle, it will look at the puzzle and make sure it is valid and solvable.

4. After the Backtracking starts, every move of the algorithm will be appended into a queue.

5. When the Backtracking is completed, the moves will be poped from the queue once a time. Then a function will take these move as argument, and manipulate the DOM object. This is the actual process displaying the solving process. 


## What's next:

Since I didn't do much on the design, this page kinda looks ugly, especially the range slider.
