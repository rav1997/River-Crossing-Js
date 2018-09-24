const personStatus = [0,0,0,0,0,0];  // o for left, 1 for in boat, 2 for right.
const persons = document.getElementsByClassName('Person');
const personArray = [...persons];
const personLeft = [0,50,100,180,230,280];
const personTop = [140,140,140,200,200,200];
const positions = [null, null];
let numberOfPersons = 0;
let pushedPersonIndex = [];
let boatLeftPosition = 50;   //boat left value for left position.
let boatRightPosition = 550;  // boat right value for right position.
let boatStatus = 0;   // 0 for left, 1 for Right.
const boat = document.querySelector('.boat');
const button = document.querySelector('.start-button');
const statusShow = document.querySelector('.status-show');
const moveCounter = document.querySelector('.move-counter');
let no_of_moves = 0;
document.body.onload = init();

function init(){
    boat.style.left = boatLeftPosition + 'px';
    button.style.pointerEvents = 'none';
    for(let i = 0; i < 6; i++){
        const person = document.getElementById('Person-'+(i+1));
        person.style.left = personLeft[i]+'px';
        person.setAttribute('onclick','MoveInOutBoat(this)');
    }
}

function MoveInOutBoat(element){
    const index = personArray.indexOf(element);
    
    // boat-left  person- left   not in boat
    
    if(numberOfPersons< 2 && boatStatus === 0 && personStatus[index] === 0 ){
        numberOfPersons++;          
        personStatus[index] = 1;
        element.style.zIndex = "5";
        pushedPersonIndex.push(index);
        if(positions[0] === null){
            element.style.left = "150px";
            positions[0] = element;
        }
        else if(positions[1] === null){
            element.style.left = "250px";
            positions[1] = element;
        }
        else{
            return;
        }
      const classNameOfElement = element.className.split(' ')[1];
       if(classNameOfElement === 'munchkin'){
           element.style.top = "290px";
       }
       else{
           element.style.top = "230px";
       }

    }

    // boat-left  person-inboat
    
    else if(personStatus[index] === 1 && boatStatus === 0){
        console.log("Hey");
        element.style.left = personLeft[index];
        element.style.zIndex = '1';
        positions[positions.indexOf(element)] = null;
        element.style.removeProperty('top');
        personStatus[index] = 0;
        numberOfPersons--;
        pushedPersonIndex.splice(pushedPersonIndex.indexOf(index),1);
    }

    // boat-right person-right

    else if(numberOfPersons< 2 && boatStatus === 1 && personStatus[index] === 2 ){
        numberOfPersons++;          // Persons should be move In
        personStatus[index] = 1;
        pushedPersonIndex.push(index);
        element.style.zIndex = "5";
        if(positions[0] === null){
            element.style.left = "650px";
            positions[0] = element;
        }
        else if(positions[1] === null){
            element.style.left = "750px";
            positions[1] = element;
        }
        else{
            return;
        }
      const classNameOfElement = element.className.split(' ')[1];
       if(classNameOfElement === 'munchkin'){
           element.style.top = "290px";
       }
       else{
           element.style.top = "230px";
       }
    }

    // boat-right person- in boat

    else if(personStatus[index] ===1 && boatStatus === 1){
        positions[positions.indexOf(element)] = null;
        element.style.removeProperty('top');
        element.style.zIndex = '1';
        element.style.left = (personLeft[index] + 630) + 'px';
        personStatus[index] = 2;
        numberOfPersons--; 
        pushedPersonIndex.splice(pushedPersonIndex.indexOf(index),1);
    }
}

function moveBoat(){
    const p1 = personArray[pushedPersonIndex[0]];
    const p2 = personArray[pushedPersonIndex[1]];
    no_of_moves++;
    moveCounter.innerHTML  = no_of_moves;
    if(numberOfPersons>0){
        moveBoatWithAnimation(p1, p2);
        disabled();
    }
}

function checkWiningCondition(){
    let flag = true;
    for(x of personStatus){
        if(x === 0){
           flag = false;
           break;
        }
    }

    if(flag){
        statusShow.innerHTML = "You Won";
        disabled();
    }
}

function checkFailingCondition(){
    let numberOfMonsters = 0;
    let numberOfMonkeys = 0;
    let numberOfMonstersInAlternate = 0;
    let numberOfMonkeysInAlternate = 0;
    if(boatStatus === 0){
        for(let i=0;i<3;i++){
            if(personStatus[i] === 0 || personStatus[i] === 1){
                numberOfMonsters++;
            }
            else{
                numberOfMonstersInAlternate++;
            }
            if(personStatus[i+3] === 0 || personStatus[i+3] === 1){
                numberOfMonkeys++;
            }
            else{
                numberOfMonkeysInAlternate++;
            }
        }
    }
    else{
        for(let i=0;i<3;i++){
            if(personStatus[i] === 2 || personStatus[i] === 1){
                numberOfMonsters++;
            }
            else{
                numberOfMonstersInAlternate++;
            }
            if(personStatus[i+3] === 2 || personStatus[i+3] === 1){
                numberOfMonkeys++;
            }
            else{
                numberOfMonkeysInAlternate++;
            }
        }
    }
    if( (numberOfMonsters> numberOfMonkeys && numberOfMonsters!==0 && numberOfMonkeys!==0) || (numberOfMonstersInAlternate> numberOfMonkeysInAlternate && numberOfMonstersInAlternate!==0 && numberOfMonkeysInAlternate!==0)){
        statusShow.innerHTML =  'Monsters eats monkeys.... Try Again';
        // document.querySelector('.person').addClass('disabled');
          disabled();
        
    }
}

function reStart(){
    location.reload();
}

function disabled(){
    document.getElementById('mc').style.pointerEvents = 'none';
    button.style.pointerEvents = 'auto';
}
let pos=0;
function moveBoatWithAnimation(p1,p2){
    let ip1 = parseInt(p1.style.left,10);
    let ip2;
    console.log(p2);
    if(p2){ip2 = parseInt(p2.style.left,10);}
    
    let pos=0;
    var id = setInterval(myMove,5);
        function myMove(){
            if(pos === 500){
                console.log('Hii');
                document.getElementById('mc').style.pointerEvents = 'auto';
                clearInterval(id);
                if(boatStatus === 0){boatStatus=1;checkWiningCondition();}
                else{
                    boatStatus = 0;
                }
                checkFailingCondition();
            }

            else if(boatStatus === 0){
                pos++;
                boat.style.left = (boatLeftPosition + pos) + 'px';
                p1.style.left = (ip1+pos) + 'px';
                if(p2){
                    p2.style.left = (ip2+pos) + 'px';
                }
                
            }
            else if(boatStatus === 1){
                pos++;
                boat.style.left = (boatRightPosition - pos) + 'px';
                p1.style.left = (ip1-pos) + 'px';
                if(p2){
                    p2.style.left = (ip2-pos) + 'px';
                }
                
            }
        }
}
/*
function Feature_background(bshbdh){
csahbsbdhbsdb
}
*/
