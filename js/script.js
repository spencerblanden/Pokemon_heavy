$(function(){

    // window.onload = function() {
    //     render1(event);
    //   };
myStorage = window.localStorage;
localStorage.setItem('generation', 1)

//Global Variables
    const BASE_URL = 'https://pokeapi.co/';
    let idNum = Math.floor(Math.random() * 100);
    let pokeData;
    let correct=0;
    let incorrect=0;  
    let gennn = 1;  

    
    

    //Poke Heavy Variables
    let pokeWeight1 = 0;
    let pokeWeight2 = 0;

    //Poke Height Variables
    let pokeHeight1 = 0;
    let pokeHeight2 = 0;

    let pokeType= '';

    let randomizedChoiceTypes = [];
      let actualType;

//HTML Element Variable assignment
let $outcome = $('#response');
let $inputNew = $('.midBtn');
let $inputNewMC = $('#btnMCStart')
let $inputLeft = $('#btnLeft')
let $inputRight = $('#btnRight')
let $correct = $('#correct')
let $inCorrect = $('#incorrect')
let $inputHL =$('#btnLeft_height')
let $inputHR =$('#btnRight_height')
let $reset =$('#btnMCReset')


let $gen1 = $('#btnGen1')
let $gen2 = $('#btnGen2')
let $gen3 = $('#btnGen3')
let $gen4 = $('#btnGen4')
let $genAll = $('#btnGen0')


let $choiceA = $('#btnA');
let $choiceB = $('#btnB');
let $choiceC = $('#btnC');
let $choiceD = $('#btnD');

let $form =$('form');
let $input = $('input[type="text"]');
let $nameData = $('#nameData')

//Poke Heavy HTML Element Variable Assignment
let $name1 =$('#leftPoke');
let $name2 =$('#rightPoke');
let $name = $('#poke')

//Poke Height HTML ELement Variable Assignment
let $name_choices =$('.pkmn_choices');



// buttons
$inputNew.on('click', clearScoreNormal)
$inputLeft.on('click', function(){result1(pokeWeight1, pokeWeight2)})
$inputRight.on('click', function(){result2(pokeWeight1, pokeWeight2)})
$inputHL.on('click', function(){result1(pokeHeight1, pokeHeight2)})
$inputHR.on('click', function(){result2(pokeHeight1, pokeHeight2)})
$inputNewMC.on('click', handleGetDataType)
$reset.on('click', clearScore)

$gen1.on('click', function(){setGen(1)})
$gen2.on('click', function(){setGen(2)})
$gen3.on('click', function(){setGen(3)})
$gen4.on('click', function(){setGen(4)})
$genAll.on('click', function(){setGen(5)})

$form.on('submit', handleGetDataName)



//functions
    function newGame(event) {
        $inputNew.text('Reset?')
        handleGetData1(event);
        handleGetData2(event);
        
        
    }

    function newMP(event) {
       createMP(event);
       $reset.empty();
       $outcome.empty();
       $reset.append(`<button id='btnMCReset' type="submit" >Reset?</button>`)
       $inputNewMC.hide();
    }

    // get data functions
        function handleGetData1(event) {
            event.preventDefault();
            gennn = 1;
            gennn = localStorage.getItem('generation');
            getIdNum(gennn);
        
            $.ajax(`${BASE_URL}api/v2/pokemon/${idNum}/`).then(function(data) {
                pokeData = data;
                console.log(data)
               render1();
               pokeWeight1 = pokeData.weight;
               pokeHeight1 = pokeData.height;
            }, function (error) {
                console.log(error);
            } );
        }
        function handleGetData2(event) {
            event.preventDefault();
            gennn = 1;
            gennn = localStorage.getItem('generation');
            getIdNum(gennn);
    
        
            $.ajax(`${BASE_URL}api/v2/pokemon/${idNum}/`).then(function(data) {
                pokeData = data;
                console.log(data)
               render2();
               pokeWeight2 = pokeData.weight;
               pokeHeight2 = pokeData.height;
               console.log(pokeHeight2)
            }, function (error) {
                console.log(error);
            } );
        }
        function handleGetDataType(event) {
            event.preventDefault();
            gennn = 1;
            gennn = localStorage.getItem('generation');
            getIdNum(gennn);
        
            $.ajax(`${BASE_URL}api/v2/pokemon/${idNum}/`).then(function(data) {
                pokeData = data;
                console.log(data)
               render1();
               newMP(event);
            }, function (error) {
                console.log(error);
            } );}

            function handleGetDataName(event) {
                event.preventDefault();

                const pokeSearch = $input.val();
                $input.val("");

                $.ajax(`${BASE_URL}api/v2/pokemon/${pokeSearch}/`).then(function(data) {
                    pokeData = data;
                    console.log(data)
                   pokeWeight2 = pokeData.weight;
                   pokeHeight2 = pokeData.height;
                   pokeType= getType(pokeData).join(', ');
                //    pokeGen = pokeData.
                renderFacts();
                   console.log(pokeHeight2)
                }, function (error) {
                    console.log(error);
                } );
            }
    
    function result1(pokePoint1, pokePoint2) {
        console.log('1push')
        if (pokePoint1 > pokePoint2){
            outcome = "You're a Pokemon Expert";
            $outcome.append( `
            <p id='response'>${outcome}</p>
            <button type='button' class='gameOn'>Keep going?</button>`)
            $outcome.show();
            addCorrect(1);
        } else if (pokePoint1 < pokePoint2) {
            outcome = "Oh dang! You're wrong.";
            $outcome.append( `
           <p id='response'>${outcome}</p>
            <button type='button' class='gameOn'>Try again?</button>`)
            $outcome.show();
            addIncorrect(1);
    } else {
        outcome = 'same'
        $outcome.append( `
            <p id='response'>Tricked ya! Those are the ${outcome}!</p>
            <button type='button' class='gameOn'>Keep going?</button>`)
            $outcome.show();
    } 
    let $gameAgain = $('.gameOn');
    $gameAgain.on('click', cleanUp)
}
    
    function result2(pokePoint1, pokePoint2) {
        console.log('2push')
        let outcome = ('');
        if (pokePoint2 > pokePoint1){
            outcome = "You're a Pokemon Expert";
            $outcome.append( `
            <p id='response'>${outcome}</p>
            <button type='button' class='gameOn'>Keep going?</button>`)
            $outcome.show();
            addCorrect(1);
        } else if (pokePoint2 < pokePoint1) {
        outcome = "Oh dang! You're wrong.";
        $outcome.append( `
        <p id='response'>${outcome}</p>
        <button type='button' class='gameOn'>Try again?</button>`)
        $outcome.show();
        addIncorrect(1);
    } else {
        outcome = 'same'
        $outcome.append( `
        <p id='response'>Tricked ya! Those are the ${outcome}!</p>
        <button type='button' class='gameOn'>Keep going?</button>`)
            $outcome.show();
    }
    let $gameAgain = $('.gameOn');
    $gameAgain.on('click', cleanUp)
    }
    
    function cleanUp(event) {
        $outcome.empty()
        $inputLeft.css("visibility", "visible")
        $inputRight.css("visibility", "visible")
        $inputHL.css("visibility", "visible")
        $inputHR.css("visibility", "visible")   
        newGame(event);
    }

    function setGen(num) {
        console.log(num)
       
        if (num === 5){
            localStorage.setItem('generation', 5)
    }else if(num === 1) {
        localStorage.setItem('generation', 1)
    }else if(num === 2) {
        localStorage.setItem('generation', 2)
    }else if(num === 3) {
        localStorage.setItem('generation', 3)
    }else if(num === 4) {
        localStorage.setItem('generation', 4)
    }
    console.log(localStorage.getItem('generation'))
    let genNow;
    if (num === 5) {
        genNow = 'all';
    } else if(num === 1){
        genNow = 'one';
    } else if(num === 2){
        genNow = 'two';
    } else if(num === 3){
        genNow = 'three';
    } else if(num === 4){
        genNow = 'four';
    }
    else {console.log('bigerror')}
    $correct.empty();
        $correct.text(`Current Gen: ${genNow}`)
    }

    function getIdNum(num) {
        console.log(num)
        if (num === false) {
            num = 1;
        }
        console.log(num)
        if (num == 5){
            idNum = Math.floor(Math.random() * 493);
        }else if(num == 1) {
            idNum = Math.floor(Math.random() * 151);
            console.log('what?')
        }else if(num == 2) {
            idNum = Math.floor(Math.random()*(251-152+1)+152);
        }else if(num == 3) {
            idNum = Math.floor(Math.random()*(386-252+1)+252);
        }else if(num == 4) {
            idNum = Math.floor(Math.random()*(492-387+1)+387);
        }
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
            <img id='rpkmn' class='pkmn' src=
            ${pokeData.sprites.front_default}> </img>`);
    }

    function renderFacts() {
        $name.empty();
       $name.append(`
            <div id='box'></div>
            <h4>${pokeData.name}</h4>
            <img id='cpkmn' class='pkmn' src=
            ${pokeData.sprites.front_default}> </img>`)
        $nameData.empty();
       $nameData.append(`
            <h6>Weight:  ${pokeWeight2}</h6>
            <h6>Height:  ${pokeHeight2}</h6>
            <h6>Type:  ${pokeType}</h6>`);
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
   
    // Category code
    function createMP(event) {
        let pokeTypes= ['normal','fire','water','grass',
                        'electric','ice','fighting','poison',
                        'ground','flying','psychic','bug',
                        'rock','ghost','dark','dragon',
                        'steel','fairy' ];

      
        let typeGroup = getType(pokeData);
        console.log(typeGroup)
        let num= typeGroup.length;
        
        if (num === 2){
            let type1 = typeGroup[0]
            let type2 = typeGroup[1]
            typeIndex= pokeTypes.indexOf(type1)
            actualType=pokeTypes[typeIndex]
            pokeTypes.splice(typeIndex, 1)
            typeIndex2= pokeTypes.indexOf(type2)
            let actualType2=pokeTypes[typeIndex2]
            pokeTypes.splice(typeIndex2, 1)
            console.log(actualType, actualType2)
            console.log(pokeTypes)
            } else {
                let type1 = typeGroup[0]
                typeIndex= pokeTypes.indexOf(type1)
            actualType=pokeTypes[typeIndex]
            pokeTypes.splice(typeIndex, 1)
            console.log(actualType)
            console.log(pokeTypes)
            }
            let randNum =Math.floor(Math.random() * 16)
            let choiceTypes = []
            choiceTypes.push(pokeTypes.splice(randNum, 1))
            randNum =Math.floor(Math.random() * 15)
          
            choiceTypes.push(pokeTypes.splice(randNum, 1))
            randNum =Math.floor(Math.random() * 14)
            
            choiceTypes.push(pokeTypes.splice(randNum, 1))
            choiceTypes.push(actualType)

            console.log(choiceTypes)

            
            randomizedChoiceTypes = shuffle(choiceTypes)
            $name_choices.empty();
           
            $name_choices.append(`<button type="button" class='pkmn_c' id='btnA'>A</button>
            <p class='choice'>${randomizedChoiceTypes[0]}</p>
            <button type="button" class='pkmn_c' id='btnB'>B</button>
            <p class='choice'>${randomizedChoiceTypes[1]}</p>
            <button type="button" class='pkmn_c' id='btnC'>C</button>
            <p class='choice'>${randomizedChoiceTypes[2]}</p>
            <button type="button" class='pkmn_c' id='btnD'>D</button>
            <p class='choice'>${randomizedChoiceTypes[3]}</p>
            `)
            $choiceA = $('#btnA');
            $choiceB = $('#btnB');
            $choiceC = $('#btnC');
            $choiceD = $('#btnD');
            $choiceA.on('click', function(){mpCheck(randomizedChoiceTypes[0], actualType)})
            $choiceB.on('click', function(){mpCheck(randomizedChoiceTypes[1], actualType)})
            $choiceC.on('click', function(){mpCheck(randomizedChoiceTypes[2], actualType)})
            $choiceD.on('click', function(){mpCheck(randomizedChoiceTypes[3], actualType)})


        }


        function mpCheck(choice, proof) {
            console.log('2push')
            $name_choices.empty();


            let outcome = ('');
            if (choice === proof){
                console.log('yes')
                outcome = "You're a Pokemon Expert";
                $outcome.append( `
                <p id='response'>${outcome}</p>
                <button type='button' class='gameOn'>Keep going?</button>`)
                $outcome.show();
                addCorrect(1);
            } else if (choice !== proof) {
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
        $gameAgain.on('click', cleanUpType)
    }

    function cleanUpType(event) {
        $outcome.empty()
        handleGetDataType(event);
        newMP();
    }

        function shuffle(array) {
            let currentIndex = array.length,  randomIndex;
          
            while (currentIndex != 0) {
          
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex--;
          
              [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
            }
          
            return array;
          }
    
    function getType(data) {
        let typeGroup = [];
    
    let currentType = data.types;
    let currType1 = currentType.slice(0,1);
  
    let pokeType1 = currType1[0];
    let type1 = pokeType1.type['name']
   typeGroup.push(type1)


   if (currentType.length === 2) {

    let currType2= currentType.slice(1,2);

    let pokeType2 = currType2[0];
    

        let type2 = pokeType2.type['name']
        typeGroup.push(type2)
        console.log(typeGroup)

    } 
    return typeGroup;
    }

    function clearScore(){
        correct = 0;
        $correct.empty();
        $correct.text(`Correct: 0`)
        incorrect = 0;
        $inCorrect.empty();
        $inCorrect.text(`Incorrect: 0`)

        handleGetDataType(event)
    }
    function clearScoreNormal() {
        correct = 0;
        $correct.empty();
        $correct.text(`Correct: 0`)
        incorrect = 0;
        $inCorrect.empty();
        $inCorrect.text(`Incorrect: 0`)

        cleanUp(event);


    } 
    });
  


    