const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1: message1, greet2: message2 });
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1: "Hello world", greet2: "Bon jour" });
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename: "./public/Apple_logo_black.svg", alt: "Apple Logo" });
});

app.get("/luck", (req, res) => {
  const num = Math.floor(Math.random() * 6 + 1);
  let luck = '';
  if (num == 1) luck = '大吉';
  else if (num == 2) luck = '中吉';
  console.log('あなたの運勢は' + luck + 'です');
  res.render('luck', { number: num, luck: luck });
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number(req.query.win);
  let total = Number(req.query.total);
  console.log({ hand, win, total });
  
  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = '';
  if (num == 1) cpu = 'グー';
  else if (num == 2) cpu = 'チョキ';
  else cpu = 'パー';


  let judgement = '';
  if (hand === cpu) {
    judgement = '引き分け';
  } else if (
    (hand === 'グー' && cpu === 'チョキ') ||
    (hand === 'チョキ' && cpu === 'パー') ||
    (hand === 'パー' && cpu === 'グー')
  ) {
    judgement = '勝ち';
    win += 1;
  } else {
    judgement = '負け';
  }
  
  total += 1;

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  };
  
  res.render('janken', display);
});



const playerCards = ["皇帝", "市民", "市民", "市民", "市民"];
const cpuCards = ["奴隷", "市民", "市民", "市民", "市民"];


const rules = {
  "皇帝": "市民",
  "市民": "奴隷",
  "奴隷": "皇帝"
};

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/ecard", (req, res) => {

  const playerChoice = req.query.card || playerCards[0];  
  const cpuChoice = cpuCards[Math.floor(Math.random() * cpuCards.length)]; 

  let result = '';
  if (playerChoice && cpuChoice) {
    if (playerChoice === cpuChoice) {
      result = "引き分け";
    } else if (rules[playerChoice] === cpuChoice) {
      result = "勝ち";
    } else {
      result = "負け";
    }
  }

  res.render('ecard', {
    playerChoice: playerChoice,
    cpuChoice: cpuChoice,
    result: result,
    playerCards: playerCards,
    cpuCards: cpuCards
  });
});


app.get("/quiz", (req, res) => {
 
  const quiz = {
    question: "HTMLの正しいタグはどれですか？",
    options: [
      { id: 1, answer: "<head>" },
      { id: 2, answer: "<title>" },
      { id: 3, answer: "<div>" },
      { id: 4, answer: "<main>" }
    ],
    correctAnswer: 3 
  };

  res.render('quiz', { quiz });
});


app.get("/quiz/result", (req, res) => {
  const userAnswer = parseInt(req.query.answer);  
  const quiz = {
    question: "HTMLの正しいタグはどれですか？",
    options: [
      { id: 1, answer: "<head>" },
      { id: 2, answer: "<title>" },
      { id: 3, answer: "<div>" },
      { id: 4, answer: "<main>" }
    ],
    correctAnswer: 3 
  };

  let resultMessage = '';
  if (userAnswer === quiz.correctAnswer) {
    resultMessage = '正解です！';
  } else {
    resultMessage = '不正解です。もう一度挑戦してみてください。';
  }

  res.render('quizResult', { resultMessage, correctAnswer: quiz.options[quiz.correctAnswer - 1].answer });
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));