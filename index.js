const quizData = [
  { question: "Wie heißt die Hauptstadt in Österreich?", answer: "Wien" },
  { question: "Wie viele Bundesländer gibt es in Österreich?", answer: "9" },
  {
    question: "In welchem Bundesland liegt die Stadt Innsbruck?",
    answer: "Tirol",
  },
];

let antwortButton;
let repeatButton;
let antwortInput;
let responseMessage;
let frageBox;
let scoreBox;

let quizBox = document.querySelector(".quiz-box");
let currentIndex = 0;
let score = 0;
let delay = 1200;
let antwortSchonGegeben = false;
let resultat = `
  <h1>Du hast leider alle Fragen falsch beantwortet. Übe weiter!</h1>
  <div class="score"></div>
  <button class="repeatButton">Noch einmal</button>
`;
let startQuizHTML = `
    <h1>Willkommen zu meinem Quiz</h1>
    <div class="frage"></div>
    <input type="text" placeholder="Type your answer here..." />
    <div class="resultat"></div>
    <div class="score">Score: 0</div>
    <button class="submitButton">Antworten</button>
`;

function startQuiz() {
  quizBox.innerHTML = startQuizHTML;
  antwortButton = document.querySelector(".submitButton");
  antwortInput = document.querySelector("input");
  responseMessage = document.querySelector(".resultat");
  frageBox = document.querySelector(".frage");
  scoreBox = document.querySelector(".score");
  repeatButton = null;
  currentIndex = 0;
  score = 0;
  antwortSchonGegeben = false;

  document.querySelector(".frage").innerHTML = quizData[currentIndex].question;
  antwortInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      checkAntwort(currentIndex);
    }
  });
  antwortButton.addEventListener("click", () => checkAntwort(currentIndex));
}

function checkAntwort(index) {
  //Validation of emty input, multiple choises
  if (antwortInput.value === "") {
    responseMessage.innerHTML = "Screiben Sie bitte eine Antwort.";
    responseMessage.classList.add("wrong");
    return;
  }
  if (antwortSchonGegeben) return;
  antwortSchonGegeben = true;

  frageBox.innerHTML = quizData[index].question;
  let antwort = antwortInput.value;

  if (antwort === quizData[index].answer) {
    responseMessage.innerHTML = "Juhuuu!";
    responseMessage.classList.remove("wrong");
    responseMessage.classList.add("correct");
    score++;
  } else {
    responseMessage.innerHTML = "Die antwort ist leider falsch!";
    responseMessage.classList.remove("correct");
    responseMessage.classList.add("wrong");
  }

  if (currentIndex < quizData.length - 1) {
    currentIndex++;
    nextQuestion(currentIndex);
  } else {
    setTimeout(() => {
      if (score === 0) {
        showResultat(
          "Du hast leider alle Fragen falsch beantwortet. Übe weiter!"
        );
      } else if (score === quizData.length) {
        showResultat("Super! Gut gemacht! Alle Antworten sind richtig!");
      } else {
        showResultat(
          `Du hast ${score} von ${quizData.length} Fragen richtig beantwortet.`
        );
      }
      document.querySelector(".repeatButton").addEventListener("click", () => {
        startQuiz();
      });
    }, delay);
  }
  document.querySelector(".score").innerHTML = `Score: ${score}`;
}

function nextQuestion(index) {
  setTimeout(() => {
    antwortInput.value = "";
    frageBox.innerHTML = quizData[index].question;
    responseMessage.innerHTML = "";
    responseMessage.classList.remove("correct");
    responseMessage.classList.remove("wrong");
    antwortSchonGegeben = false;
  }, delay);
}

function showResultat(title) {
  quizBox.innerHTML = resultat;
  document.querySelector("h1").innerHTML = title;
  scoreBox.innerHTML = `Score ${score}`;
}

startQuiz();

// let answer1 = prompt(frage1);
// if(answer1 == "Wien") {
//   console.log("Juhuuu!")
// } else {
//   console.log("Die antwort ist leider falsch!")
// }
// let answer2 = prompt(frage1);
// if(answer1 == "9") {
//   console.log("Juhuuu!")
// } else {
//   console.log("Die antwort ist leider falsch!")
// }
// let answer3 = prompt(frage1);
// if(answer1 == "Tirol") {
//   console.log("Juhuuu!")
// } else {
//   console.log("Die antwort ist leider falsch!")
// }
