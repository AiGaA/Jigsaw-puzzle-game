let source;
let tiles = [];
let cols = 3;
let rows = 3;
let w, h;
let board = [];


function preload() {
    source = loadImage("./assets/images/fox.png")
}

function setup() {
    const myPuzzle = createCanvas(600, 600);
    myPuzzle.parent('puzzleDiv');

    w = width/cols;
    h = height/rows;

    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            let x = i * w;
            let y = j * h;
            let img = createImage(w, h);
            img.copy(source, x, y, w, h, 0, 0, w, h);
            let index = i + j * cols;
            board.push(index);
            let tile = new Tile(index, img);
            tiles.push(tile);
        }
    }

    tiles.pop();
    board.pop();
    //This will hide the last tile
    board.push(-1);

    puzzleShuffle(board);

}


function swap(i, j, arr) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function randomMove(arr) {
    let r1 = floor(random(cols));
    let r2 = floor(random(rows));
    moveTile(r1, r2, arr);
}

//shuffle tiles
function puzzleShuffle(arr){
    for (let i = 0; i < 50; i++){
        randomMove(arr);
    }
}

// Move based on click
function mousePressed() {
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    moveTile(i, j, board);
}

function draw() {
    const refreshButton = document.getElementById('refresh-btn');

    background(0);
    //image(source, 0, 0);
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++) {
            let index = i + j * cols;
            let x = i * w;
            let y = j * h;
            let tileIndex = board[index];
            if (tileIndex > -1) {
                let img = tiles[tileIndex].img;
                image(img, x, y, w, h);
            }   
        }
    }
        
    // Show it as grid
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * w;
            let y = j * h;
            strokeWeight(2);
            noFill();
            rect(x, y, w, h);
        }        
    }

    // If it is solved
    if (isSolved()) {
        let showWinnerModal = document.getElementById('modal-win');
        showWinnerModal.classList.add('show');
    }

    gameEnd();

    refreshButton.addEventListener('click', () => {
        puzzleShuffle(board);
    });
}



// Check if solved
function isSolved() {
  for (let i = 0; i < board.length-1; i++) {
    if (board[i] !== tiles[i].index) {
      return false;
    }
  }
  return true;
}

// Swap two pieces
function moveTile(i, j, arr) {
    let blank = findBlank();
    let blankCol = blank % cols;
    let blankRow = floor(blank / rows);
    
    // Double check valid move
    if (isNeighbour(i, j, blankCol, blankRow)) {
      swap(blank, i + j * cols, arr);
    }
}

// Check if neighbor
function isNeighbour(i, j, x, y) {
    if (i !== x && j !== y) {
      return false;
    }
  
    if (abs(i - x) == 1 || abs(j - y) == 1) {
      return true;
    }
    return false;
}

function findBlank(){
    for(let i = 0; i < board.length; i++){
        if (board[i] == -1) return i;
    }
}

function gameEnd() {
    const closeGame = document.getElementById('btn-close');
    const playAgain = document.getElementById('btn-yes');
    const showWinnerModal = document.getElementById('modal-win');

    closeGame.addEventListener('click', () => {
        showWinnerModal.classList.remove('show');
        
    });

    playAgain.addEventListener('click', () => {
        showWinnerModal.classList.remove('show');
        puzzleShuffle(board);
    });
}
