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



    //creo bombe
    const listBombs = genBombe(numCells, 16);
    console.log(listBombs);

    //numero tentativi
    const tentativi = [];
    const maxTentativi = numCells - listBombs.length;
    console.log('maxtent', maxTentativi);



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

            sqaureClick(square, listBombs, tentativi, maxTentativi);

        });

        grid.append(square);

    }


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


/**
 * click sui quadrati
 */
function sqaureClick(square, listBombs, tentativi, maxTentativi) {
    //capire che numero l'utente ha selezionato dalla tabella
    const num = parseInt(square.innerHTML);
    console.log('numero selezionato', num)
    
    //capire se il numero selezionato fa parte dell'array delle bombe
    //controllare che non sia numero gia selezionato
    if(listBombs.includes(num)) {
        console.log('questa è una bomba');
        //azioni dopo aver schiacciato una bomba
        clickbomb(listBombs, tentativi, maxTentativi);
    }
    else if (!tentativi.includes(num)){
        //cambio il colore perche è una bomba
        square.classList.add('notbomb')

        //aggiungere numero alla lista tentativi 
        tentativi.push(num);

        //controllo se numeri tentativi attuali è uguale a numero massimo tentativi 
        if(tentativi.length === maxTentativi) {
            console.log('hai vinto');
        }
    }
}



/**
 * se si clicca la bomba
 */
function clickbomb(listBombs, tentativi, maxTentativi) {
    //tutti i quadrati
    const squares = document.querySelectorAll('.square');

    //dopo aver cliccato una bomba pure le altre si mostrano
    for(let i=0; i< squares.length; i++) {
        const square = squares[i];
        const squareValue = parseInt(square.innerHTML);

        if(listBombs.includes(squareValue)) {
            square.classList.add('bomb');
        }
    }
}