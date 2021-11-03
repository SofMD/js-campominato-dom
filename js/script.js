const btn = document.getElementById('play-btn');
const dimDifficoltà = document.getElementById('dimensions');
const wrapGrid = document.getElementById('wrap-grid');

//set grid
btn.addEventListener('click', function()  {
    //creo dimensioni gridù
    const dimGrid = dimDifficoltà.value;
    console.log(dimGrid);
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
    console.log(numCells);
    console.log(sideCell);

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
            console.log(this);
            this.classList.add('clicked')
        })

        grid.append(square);

    }

});


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