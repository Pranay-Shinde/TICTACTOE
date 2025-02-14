// Concept Used :-
// Array
// Boolean
// dom manipulation
// event listener
// enable disabledBoxes



//To Acess items 
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-Btn");
let NewGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

//variable for turn player X or O
let turnX = true;
//variable if game draw / to track draw
let count = 0;

const winPattern =[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

// Function For New Game
const resetGame = ()=>{
    turnX = true;
    enableBoxes();
    msgContainer.classList.add('hide');
};

// DOM MANIPULATION FUCNTION fOR PLAYING GAME
boxes.forEach((box)=>{
    box.addEventListener('click',()=>{
        console.log('clicked');
        if(turnX){
            box.innerText = 'X';
            turnX = false;
        }
        else{
            box.innerText = 'O';
            turnX = true;
        }
        box.disabled = true;
        count++;
        let iswinner = checkWinner();   
        if(count === 9 && !iswinner){
           gamedraw();
        }

        checkWinner();
    });
});

//GAME DRAW FUNCTION
const gamedraw = ()=>{
    msg.innerText = 'Game Draw';
    msgContainer.classList.remove('hide');
    disabledBoxes();
};

//Disable All Boxes aFter GETTING Winner

const disabledBoxes = ()=>{
    for (let box of boxes){
        box.disabled = true;
    };
};

//Enable All Boxes aFter GETTING Winner
const enableBoxes = ()=>{
    for (let box of boxes){
        box.disabled = false;
        box.innerText = '';
    };
};

//SHOW WINNER MSG
const showWinner=(winner)=>{
    msg.innerText = `Congrats , Player  ${winner}  Is The Winner`;
    msgContainer.classList.remove('hide');
    disabledBoxes();
}

//CHECKING WINNER
const checkWinner = ()=>{
    for (let pattern of winPattern){    
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if(pos1val != "" || pos2val != "" || pos3val != ""){
        if(pos1val == pos2val && pos2val == pos3val){
            console.log('winner', pos1val);
            showWinner(pos1val);

            // boxes[pattern[0]].style.backgroundColor = 'green';
            // boxes[pattern[1]].style.backgroundColor = 'green';
            // boxes[pattern[2]].style.backgroundColor = 'green';
             }
        }   
    }
};

//Event Listener For New Game Button And Reset Button 
NewGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

