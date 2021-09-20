$(function(){

    window.onload = function(event) {
        newGame(event);
      };


//Global Variables
    const BASE_URL = 'https://pokeapi.co/';
    let idNum = Math.floor(Math.random() * 100);
    let pokeWeight1 = 0;
    let pokeWeight2 = 0;
    let pokeData;
    let correct=0;
    let incorrect=0;    


//HTML Element Variable assignment
    let $name1 =$('#leftPoke');
    let $name2 =$('#rightPoke');
    let $outcome = $('#response');
    let $inputNew = $('#midBtn');
    let $inputLeft = $('#btnLeft')
    let $inputRight = $('#btnRight')
    let $correct = $('#correct')
    let $inCorrect = $('#incorrect')

// buttons
$inputNew.on('click', newGame)
$inputLeft.on('click', result1)
$inputRight.on('click', result2)




//functions
    function newGame(event) {
        handleGetData1(event);
        handleGetData2(event);
    }
    
    function result1() {
        console.log('1push')
        if (pokeWeight1 > pokeWeight2){
            outcome = "You're a Pokemon Expert";
            $outcome.append( `
            <p id='response'>${outcome}</p>
            <button type='button' class='gameOn'>Keep going?</button>`)
            $outcome.show();
            addCorrect(1);
        } else if (pokeWeight1 < pokeWeight2) {
            outcome = "Oh dang! You're wrong.";
            $outcome.append( `
           <p id='response'>${outcome}</p>
            <button type='button' class='gameOn'>Try again?</button>`)
            $outcome.show();
            addIncorrect(1);
    } else {
        outcome = 'error'
        $outcome.append( `
            <p id='response'>${outcome}</p>`)
            $outcome.show();
    } 
    let $gameAgain = $('.gameOn');
    $gameAgain.on('click', cleanUp)
}
    
    function result2() {
        console.log('2push')
        let outcome = ('');
        if (pokeWeight2 > pokeWeight1){
            outcome = "You're a Pokemon Expert";
            $outcome.append( `
            <p id='response'>${outcome}</p>
            <button type='button' class='gameOn'>Keep going?</button>`)
            $outcome.show();
            addCorrect(1);
        } else if (pokeWeight2 < pokeWeight1) {
        outcome = "Oh dang! You're wrong.";
        $outcome.append( `
        <p id='response'>${outcome}</p>
        <button type='button' class='gameOn'>Try again?</button>`)
        $outcome.show();
        addIncorrect(1);
    } else {
        outcome = 'error'
        $outcome.append( `
            <p id='response'>${outcome}</p>`)
            $outcome.show();
    }
    let $gameAgain = $('.gameOn');
    $gameAgain.on('click', cleanUp)
    }
    
    function cleanUp(event) {
        $outcome.empty()
        newGame(event);
    }

// get data functions
    function handleGetData1(event) {
        event.preventDefault();
        getIdNum();
    
        $.ajax(`${BASE_URL}api/v2/pokemon/${idNum}/`).then(function(data) {
            pokeData = data;
            console.log(data)
           render1();
           pokeWeight1 = pokeData.weight;
           console.log(pokeWeight1)
        }, function (error) {
            console.log(error);
        } );
    }
    function handleGetData2(event) {
        event.preventDefault();
        getIdNum();

    
        $.ajax(`${BASE_URL}api/v2/pokemon/${idNum}/`).then(function(data) {
            pokeData = data;
            console.log(data)
           render2();
           pokeWeight2 = pokeData.weight;
           console.log(pokeWeight2)
        }, function (error) {
            console.log(error);
        } );
    }
    

    function getIdNum() {
        idNum = Math.floor(Math.random() * 100);
    }

// render functions
    function render1() {
        $name1.empty();
       $name1.append(`
            <div id='box'></div>
            <h4>${pokeData.name}</h4>
            <img id='lpkmn' class='pkmn' src=
            ${pokeData.sprites.front_default}> </img>`);
    }
    function render2() {
        $name2.empty();
       $name2.append(`
            <div id='box'></div>
            <h4>${pokeData.name}</h4>
            <img id='lpkmn' class='pkmn' src=
            ${pokeData.sprites.front_default}> </img>`);
    }

    function addCorrect(num) {
        correct = correct + num; 
        $correct.empty();
        $correct.text(`Correct: ${correct}`)
    }
    function addIncorrect(num) {
        incorrect = incorrect + num; 
        $inCorrect.empty();
        $inCorrect.text(`Incorrect: ${incorrect}`)
    }
    });