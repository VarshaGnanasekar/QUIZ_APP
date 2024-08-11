const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('Score');
console.log(choices);


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];


let questions =[
    {
        question: "Inside what do you put snacks?",
        choice1: "Box",
        choice2: "Floor",
        choice3: "Plate",
        choice4: "Fridge",
        answer: 1
    },
    {
        question: "What do you use to drink water?",
        choice1: "Shoe",
        choice2: "Bottle",
        choice3: "Laptop",
        choice4: "Desk",
        answer: 2
    },
    {
        question: "Where do you sit?",
        choice1: "Chair",
        choice2: "Oven",
        choice3: "Table",
        choice4: "Pillow",
        answer: 1
    },
    {
        question: "What do you use to write?",
        choice1: "Fork",
        choice2: "Knife",
        choice3: "Pen",
        choice4: "Spoon",
        answer: 3
    },
    {
        question: "Where do you sleep?",
        choice1: "Fridge",
        choice2: "Bed",
        choice3: "Window",
        choice4: "Desk",
        answer: 2
    },
    {
        question: "What do you use to cut paper?",
        choice1: "Scissors",
        choice2: "Spoon",
        choice3: "Brush",
        choice4: "Plate",
        answer: 1
    },
    {
        question: "Where do you store clothes?",
        choice1: "Microwave",
        choice2: "Wardrobe",
        choice3: "Sink",
        choice4: "Floor",
        answer: 2
    },
    {
        question: "What do you use to eat soup?",
        choice1: "Spoon",
        choice2: "Scissors",
        choice3: "Fork",
        choice4: "Pen",
        answer: 1
    },
    {
        question: "What do you use to watch movies?",
        choice1: "Television",
        choice2: "Toaster",
        choice3: "Washing Machine",
        choice4: "Fan",
        answer: 1
    },
    {
        question: "Where do you take a bath?",
        choice1: "Bed",
        choice2: "Chair",
        choice3: "Bathroom",
        choice4: "Desk",
        answer: 3
    }
];


const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};


getNewQuestion = () => {

    if(availableQuesions.length==0 || questionCounter>MAX_QUESTIONS)
    {
        return window.location.assign('end.html');
    }
    questionCounter++;
    questionCounterText.innerText=questionCounter+"/"+MAX_QUESTIONS;
    const questionindex=Math.floor(Math.random()*availableQuesions.length);
    currentQuestion=availableQuesions[questionindex];
    question.innerText=currentQuestion.question;

    choices.forEach(choice=>
    {
        const number=choice.dataset["number"];
        choice.innerText=currentQuestion["choice"+number];
    });

    availableQuesions.splice(questionindex,1);
    acceptingAnswers=true;


};

choices.forEach(choice=>
{
    choice.addEventListener("click",e=>
    {
        if(!acceptingAnswers) return;
        acceptingAnswers=false;
        const selectedchoice=e.target;
        const selectedanswer=selectedchoice.dataset["number"];

        const classtoApply=
        selectedanswer ==currentQuestion.answer ? "correct":"incorrect";
        if(classtoApply=="correct")
        {
            increementScore(CORRECT_BONUS);
        }
        selectedchoice.parentElement.classList.add(classtoApply);

        setTimeout(()=>
        {
            selectedchoice.parentElement.classList.remove(classtoApply);
            getNewQuestion();
        },600);
    });
});

increementScore = num =>{
    score+=num;
    scoreText.innerText=score;
};

startGame();