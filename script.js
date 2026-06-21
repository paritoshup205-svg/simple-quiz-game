document.addEventListener('DOMContentLoaded',function(){
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionCOntainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
      marks: 5
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
      marks:5
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
      marks:5
    },
  ];

  let totalMarks = 0;
  console.log(Array.isArray(questions));

  let currentQuestionIndex = 0; // tracking the question means looking were u are that to on a global level

  let score = 0;

  startBtn.addEventListener("click", startQuiz); //the startQuiz function does fully execute immediately when the code reaches that line.Not after the click.does NOT run the function immediately.It only gives the function reference to the browser.Then after the click startQuiz() is executed by the browser

  //startQuiz → pass function reference
// startQuiz() → execute immediately


function startQuiz() {
  startBtn.classList.add("hidden");
  resultContainer.classList.add("hidden");
  questionCOntainer.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  nextBtn.classList.add("hidden");
  questionText.textContent = questions[currentQuestionIndex].question;
  choicesList.innerHTML = ""; //becuase this method of show question will be used in the next question, where the previous question will be there
  questions[currentQuestionIndex].choices.forEach((choices) => {
    const li = document.createElement("li");
    li.textContent = choices;
    li.addEventListener("click", () => selectAnswer(choices)); //So the correct understanding is.The arrow function is stored firstAfter click, the arrow function executesInside it, selectAnswer(choice) executes.It is mainly being used as a wrapper function to delay execution and pass choice.
    
    // Meaning:
    
    // Create unnamed wrapper function
    // Store it
    // Wait for click
    // After click:
    // wrapper function runs
    // selectAnswer(choice) runs
    
    choicesList.appendChild(li);
  });
}

nextBtn.addEventListener('click',()=>{
  currentQuestionIndex++
  if(currentQuestionIndex<questions.length){
    showQuestion() //question,length = 3 and array (questions) habe index of 0,1,2 
  } else{
    showResult()
  }
})
  function selectAnswer(choices) {
    const correctAnswer = questions[currentQuestionIndex].answer
    if(choices===correctAnswer){
      score++
      totalMarks += questions[currentQuestionIndex].marks;
    } else totalMarks+=0
    nextBtn.classList.remove("hidden")
  }

  function showResult(){
    questionCOntainer.classList.add('hidden')
    resultContainer.classList.remove('hidden')
    scoreDisplay.textContent = `Correct Answers: ${score}/${questions.length}
Marks: ${totalMarks}/${questions.length * 5}`;
    
  }

  restartBtn.addEventListener('click',()=>{
    currentQuestionIndex=0
    score=0
    totalMarks=0
    resultContainer.classList.add('hidden')
    startQuiz()
  })


})

