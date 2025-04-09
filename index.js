const fragen = [
  "Wie heißt die Hauptstadt in Österreich?",
  "Wie viele Bundesländer gibt es in Österreich?",
  "In welchem Bundesland liegt die Stadt Innsbruck?",
];
const antworten = ["Wien", "9", "Tirol"];

let antwortButton;
let repeatButton;
let antwortInput;
let responseMessage;

let currentIndex = 0;
let score = 0;
let quizBox = document.querySelector(".quiz-box");
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
  repeatButton = null;
  antwortInput = document.querySelector("input");
  responseMessage = document.querySelector(".resultat");
  currentIndex = 0;
  score = 0;
  antwortSchonGegeben = false;

  document.querySelector(".frage").innerHTML = fragen[currentIndex];
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
    responseMessage.innerHTML = "Screiben Sie bitte ein Antwort.";
    responseMessage.classList.add("wrong");
    return;
  }
  if (antwortSchonGegeben) return;
  antwortSchonGegeben = true;

  document.querySelector(".frage").innerHTML = fragen[index];
  let antwort = document.querySelector("input").value;

  if (antwort === antworten[index]) {
    responseMessage.innerHTML = "Juhuuu!";
    responseMessage.classList.remove("wrong");
    responseMessage.classList.add("correct");
    score++;
  } else {
    responseMessage.innerHTML = "Die antwort ist leider falsch!";
    responseMessage.classList.remove("correct");
    responseMessage.classList.add("wrong");
  }

  if (currentIndex < fragen.length - 1) {
    currentIndex++;
    nextQuestion(currentIndex);
  } else {
    setTimeout(() => {
      if (score === 0) {
        quizBox.innerHTML = resultat;
        document.querySelector("h1").innerHTML =
          "Du hast leider alle Fragen falsch beantwortet. Übe weiter!";
        document.querySelector(".score").innerHTML = `Score: ${score}`;
      } else if (score === fragen.length) {
        quizBox.innerHTML = resultat;
        document.querySelector("h1").innerHTML =
          "Super! Gut gemacht! Alle Antworten sind richtig!";
        document.querySelector(".score").innerHTML = `Score: ${score}`;
      } else {
        quizBox.innerHTML = resultat;
        document.querySelector(
          "h1"
        ).innerHTML = `Du hast ${score} von ${fragen.length} Fragen richtig beantworten.`;
        document.querySelector(".score").innerHTML = `Score: ${score}`;
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
    document.querySelector(".frage").innerHTML = fragen[index];
    document.querySelector(".resultat").innerHTML = "";
    responseMessage.classList.remove("correct");
    responseMessage.classList.remove("wrong");
    antwortSchonGegeben = false;
  }, delay);
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
