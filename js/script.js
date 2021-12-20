
// CAMPOMINATO

//per prima cosa ho creato delle variabili che userò più avanti nel codice
// le prime quattro variabili riguardano gli elementi del html
// le tre variabili 'lenghtlevel' riguardano la lunghezza dalla grid
// le successive tre sono per check, per controllare se un bottone è stato cliccato
const containerBig = document.querySelector('.container');
const level1 = document.getElementById('level-1');
const level2 = document.getElementById('level-2');
const level3 = document.getElementById('level-3');
const lenghtLevel1=100;
const lenghtLevel2=81;
const lenghtLevel3=49;
let checkLevel1= false;
let checkLevel2= false;
let checkLevel3= false;

// questa funzione serve per aggiungere una dimensione al container
//  in base al livello scekto
function dimensionContainer(container){
    if(checkLevel1){
        
        container.classList.remove('width-2');
        container.classList.remove('width-3');
        
        container.classList.add('width-1');
    }
    else if(checkLevel2){
        container.classList.add('width-2');
        container.classList.remove('width-1');
        container.classList.remove('width-3');
    }
    else{ 
        container.classList.add('width-3');
        container.classList.remove('width-2');
        container.classList.remove('width-1');
    }
}

// questa funzione serve per creare i vari box nel container
function createBox(container, index) {
    const square = document.createElement('div');
    square.className = 'box';
    console.log(square);
    square.innerHTML = index;
    container.append(square);
    square.addEventListener('click', function () {
        this.classList.add('lightBlue');
    })
}

// questa è la funzione che tramite un "for" usa una delle variabili lenght
// e la inserisce come valore massimo
function maxDimension(maxNumber, func){

    for (let i = 1; i <= maxNumber; i++) {

        func(containerBig, i);

    }
}


// in questa ultima parte invece ci sono i vari event listener
// uno per ogni bottone
// all'interno di ognuno ho aggiunto un if per controllare che se il bottone
// è stato cliccato di non reaggire a un click successivo,
// a meno che l'utente non abbia cliccato un altro bottone prima  
level1.addEventListener('click', function(){
    if(!checkLevel1){
        containerBig.innerHTML='';
        checkLevel1= true;
        checkLevel2=false;
        checkLevel3=false;
        dimensionContainer(containerBig);
        maxDimension(lenghtLevel1, createBox);

    }
});

level2.addEventListener('click', function(){
    if (!checkLevel2) {
        containerBig.innerHTML = '';
        checkLevel2 = true;
        checkLevel1 = false;
        checkLevel3 = false;
        dimensionContainer(containerBig);
        maxDimension(lenghtLevel2, createBox);
    }
});

level3.addEventListener('click', function(){
    if(!checkLevel3){
        containerBig.innerHTML = '';
        checkLevel3 = true;
        checkLevel2 = false;
        checkLevel1 = false;

        dimensionContainer(containerBig);
        maxDimension(lenghtLevel3, createBox);
    }
});

