const btn = document.getElementById('play-btn');
const dimDifficoltà = document.getElementById('dimensions');
const wrapGrid = document.getElementById('wrap-grid');


//set grid
btn.addEventListener('click', function()  {

    //creo dimensioni gridù
    const dimGrid = dimDifficoltà.value;
    let numCells;
    let sideCell;


    //grandezze per difficoltà
    switch(dimGrid) {
        case '1':
            numCells = 100;
            sideCell = 10;
           break;
        case '2':
            numCells = 81;
            sideCell = 9;
           break;
        case '3':
            numCells = 49;
            sideCell = 7;
    }


    //creo griglia
    const grid = document.createElement('div');
    grid.classList.add('grid');

    //inserisco griglia
    wrapGrid.append(grid);


    //creo quadrati
    for (let i = 1; i <= numCells ; i++ ) {
        const square = genSquare( [i] , sideCell);

        //square cliccabili
        square.addEventListener('click', function(){
            this.classList.add('clicked')
        });

        grid.append(square);

    }


    //creo bombe
    const listBombs = genBombe(numCells, 16);
    console.log(listBombs);


});



// FUNCTION------


/**
 * creo square
 */
function genSquare (num , cells) {
    const quad = document.createElement('div');
    quad.classList.add('square');
    quad.innerHTML = num;
    //dimensioni
    quad.style.width = `calc(100% / ${cells})`;
    quad.style.height = `calc(100% / ${cells})`;
    return quad;
}


/**
 * creazione bombe
 */
function genBombe(totCells, totBombs) {
    const bombs = [];

    while(bombs.length < totBombs) {
        //numeri random
        const bomb = genNumRand(1, totCells);

        //numero generato deve essere univoco
        if(!bombs.includes(bomb)) {
            bombs.push(bomb);
        }
    }
    return bombs;
}



/**
 * numeri random
 */
function genNumRand(min, max) {
    return Math.floor(Math.random()*(max - min + 1)) + min;
}