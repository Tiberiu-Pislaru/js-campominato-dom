// CAMPO MINATO

//per prima cosa ho creato delle variabili che userò più avanti nel codice
// le prime otto variabili riguardano gli elementi del html
// le tre variabili 'lenghtlevel' riguardano la lunghezza dalla grid
// successivamente ho usato la destrutturazione per questi di leggibilità
// le ultimi variabili servono per la visualizzazione dei dati sullo schermo
const containerBig = document.getElementById('container');
const finalBox = document.getElementById('lose');
const level1 = document.getElementById('level-1');
const level2 = document.getElementById('level-2');
const level3 = document.getElementById('level-3');
const buttonAgain= document.getElementById('again');
const messagge= document.getElementById('mess-gameOver');
const result= document.getElementById('result');
const lenghtLevel1=100;
const lenghtLevel2=81;
const lenghtLevel3=49;
let [checkLevel1, checkLevel2, checkLevel3]= [false, false, false];
let numbersBomb = [];
let maxTry=0;
let score=0;

// funzione che serve per controllare se ho preso una bomba
function isABomb(listToCheck, value){
    return listToCheck.includes(value);
}

// funzione che serve per mostrare la schermata di Game Over
function gameOver(text, clas){
    // i argomenti text e clas sono due stringhe
    finalBox.classList.add('block');
    messagge.innerHTML = text;
    result.innerHTML = `Il tuo punteggio è ${score}`;
    finalBox.classList.add(clas);
}

// questa funzione serve per creare i vari box nel container
// con i valori numerici e il testo al loro interno
// tramite .value ho assegnato a ogni box un valore numeri (index)
// dentro il ciclo if del addEventListener ho fatto in modo che
// se io cliccavo su un box che aveva come valore (value) un numero presente nell'array numbersBomb
// doveva fare certe cose sotto indicate
// altrimenti aumentava il mio punteggio di 1
// il secondo if serve per controllare
// se il mio punteggio equivale alle mosse disponibili
function createBox(container, index) {
    
    const square = document.createElement('div');
    square.className = 'box';
    square.innerHTML = index;
    square.value = index;
    container.append(square);

    square.addEventListener('click', function () {
        this.classList.add('lightBlue');
        if (isABomb(numbersBomb, this.value)){
            this.style.backgroundColor= 'red';
            gameOver('Hai perso', 'lose');

        }else{
            score++;
        }
        if (score === maxTry){
            gameOver('Complimenti hai visto', 'win');

        }
    })
}

// questa è la funzione che tramite un "for" usa una delle variabili lenght
// e la inserisce come valore massimo
function maxDimension(maxNumber,containerGame, func){

    for (let i = 1; i <= maxNumber; i++) {

        func(containerGame, i);
    }
}

//queste due funzioni servono che creare numeri random e per popolare la variabile numbersBomb 
function getRandom(min, max) {
    return Math.floor(Math.random() * ((max + 1) - min)) + min
}

function randomNumInDifRange(maxNum, func, array, minNum=1){
    
    while (array.length < 16) {
    
        let random = func(minNum, maxNum);
    
        if (!array.includes(random)) {
    
            array.push(random);
    
        }
    }
}

// in questa ultima parte invece ci sono i vari event listener
// uno per ogni bottone
// all'interno di ognuno ho aggiunto un if per controllare che se il bottone
// è stato cliccato di non reaggire a un click successivo,
// a meno che l'utente non abbia cliccato un altro bottone prima 
// all'interno dei primi 3 eventListener viene chiamata la funzione che serve per popolare
// la variabile numbersBomb
// e anche un' operazione per sapere il numero massimo di tentativi 
level1.addEventListener('click', function(){
    if(!checkLevel1){
        containerBig.innerHTML='';
        [checkLevel1, checkLevel2, checkLevel3]= [true, false, false];
        randomNumInDifRange(lenghtLevel1, getRandom, numbersBomb);
        maxTry=lenghtLevel1 - numbersBomb.length;
        score=0;
        // console.log(maxTry);
        containerBig.className='width-1';
        maxDimension(lenghtLevel1,containerBig, createBox);

    }
});

level2.addEventListener('click', function(){
    if (!checkLevel2) {
        containerBig.innerHTML = '';
        [checkLevel1, checkLevel2, checkLevel3] = [false, true, false];
        randomNumInDifRange(lenghtLevel2, getRandom, numbersBomb);
        maxTry = lenghtLevel2 - numbersBomb.length;
        score = 0;
        containerBig.className = 'width-2';
        maxDimension(lenghtLevel2, containerBig, createBox);
    }
});

level3.addEventListener('click', function(){
    if(!checkLevel3){
        containerBig.innerHTML = '';
        [checkLevel1, checkLevel2, checkLevel3] = [false, false, true];
        randomNumInDifRange(lenghtLevel3, getRandom, numbersBomb);
        maxTry = lenghtLevel3 - numbersBomb.length;
        score = 0;

        containerBig.className = 'width-3';
        maxDimension(lenghtLevel3, containerBig, createBox);
    }
});

// questo bottone sarà visibile solo durante la schermata di Game Over
// serve per cominciare una nuova partita
buttonAgain.addEventListener('click', function(){
    finalBox.classList.remove('block');
    containerBig.innerHTML='';
    finalBox.classList.remove('win');
    finalBox.classList.remove('lose');
    numbersBomb=[];
    [checkLevel1, checkLevel2, checkLevel3] = [false, false, false];

})


