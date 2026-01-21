const quiz = [
    { q: "Which country is considered the birthplace of modern field hockey?", options: ["India", "England", "Canada", "Australia"], ans: 1 },
    { q: "How many players are there in one field hockey team?", options: ["9", "10", "11", "12"], ans: 2 },
    { q: "Which organization governs international field hockey?", options: ["FIFA", "FIH", "IOC", "BCCI"], ans: 1 },
    { q: "Which nation has won the most Olympic gold medals in men’s field hockey?", options: ["Netherlands", "Germany", "Australia", "India"], ans: 3 },
    { q: "A standard hockey match is played for how many minutes?", options: ["60", "70", "80", "90"], ans: 2 },
    { q: "What type of surface is commonly used in modern hockey?", options: ["Grass", "Mud", "Artificial Turf", "Concrete"], ans: 2 },
    { q: "How many quarters are there in a field hockey match?", options: ["2", "3", "4", "5"], ans: 2 },
    { q: "What is awarded when a foul occurs inside the striking circle?", options: ["Free hit", "Penalty corner", "Goal kick", "Throw-in"], ans: 1 },
    { q: "Which material is commonly used for professional hockey sticks?", options: ["Wood", "Iron", "Carbon fiber", "Plastic"], ans: 2 },
    { q: "Which Indian player is known as the 'Wizard of Hockey'?", options: ["Dhyan Chand", "Sardar Singh", "Balbir Singh", "Dhanraj Pillay"], ans: 0 }
];

let index = 0;
let score = 0;
let userAnswers = new Array(quiz.length).fill(null);

const questionText = document.getElementById("question-text");
const answersDiv = document.getElementById("answer-buttons");
const resultMsg = document.getElementById("result-msg");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const skipBtn = document.getElementById("skipBtn");
const scoreText = document.getElementById("score");
const qno = document.getElementById("qno");
const quizArea = document.getElementById("quiz-area");
const finalArea = document.getElementById("final-area");
const finalScore = document.getElementById("final-score");
const finalAnswered = document.getElementById("final-answered");
const finalSkipped = document.getElementById("final-skipped");

loadQuestion();

function loadQuestion() {
    resultMsg.textContent = "";
    answersDiv.innerHTML = "";
    nextBtn.disabled = true;

    let current = quiz[index];
    questionText.textContent = current.q;
    qno.textContent = "Question " + (index + 1) + " / " + quiz.length;
    scoreText.textContent = "Score: " + score;

    current.options.forEach((opt, i) => {
        let btn = document.createElement("button");
        btn.textContent = opt;
        btn.className = "option";
        btn.onclick = function () {
            selectAnswer(i, btn);
        };
        answersDiv.appendChild(btn);
    });

    if (userAnswers[index] !== null) {
        showPreviousAnswer();
        nextBtn.disabled = false;
    }
}

function selectAnswer(selected, btn) {
    let correct = quiz[index].ans;
    let allBtns = document.querySelectorAll(".option");

    allBtns.forEach(b => b.disabled = true);

    userAnswers[index] = selected;

    if (selected === correct) {
        btn.classList.add("correct");
    } else {
        btn.classList.add("wrong");
        allBtns[correct].classList.add("correct");
    }

    // Show correct answer in text format
    resultMsg.textContent = "Answer: " + quiz[index].options[correct];

    updateScore();
    nextBtn.disabled = false;
}

function showPreviousAnswer() {
    let selected = userAnswers[index];
    let correct = quiz[index].ans;
    let allBtns = document.querySelectorAll(".option");

    allBtns.forEach(b => b.disabled = true);

    if (selected === correct) {
        allBtns[selected].classList.add("correct");
    } else {
        allBtns[selected].classList.add("wrong");
        allBtns[correct].classList.add("correct");
    }

    resultMsg.textContent = "Answer: " + quiz[index].options[correct];
}

function updateScore() {
    score = 0;
    userAnswers.forEach((ans, i) => {
        if (ans !== null && ans === quiz[i].ans) {
            score++;
        }
    });
    scoreText.textContent = "Score: " + score;
}

nextBtn.onclick = function () {
    if (index < quiz.length - 1) {
        index++;
        loadQuestion();
    } else {
        showResult();
    }
};

prevBtn.onclick = function () {
    if (index > 0) {
        index--;
        loadQuestion();
    }
};

skipBtn.onclick = function () {
    userAnswers[index] = null;
    if (index < quiz.length - 1) {
        index++;
        loadQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    quizArea.classList.add("hide");
    finalArea.classList.remove("hide");

    let answered = userAnswers.filter(a => a !== null).length;
    let skipped = quiz.length - answered;

    finalScore.textContent = "FINAL SCORE: " + score + "/" + quiz.length;
    finalAnswered.textContent = "Answered Questions: " + answered;
    finalSkipped.textContent = "Skipped Questions: " + skipped;
}

function restart() {
    index = 0;
    score = 0;
    userAnswers = new Array(quiz.length).fill(null);
    finalArea.classList.add("hide");
    quizArea.classList.remove("hide");
    loadQuestion();
}
