# webpro_06

## app5.jsについて
##　　起動方法
・必要な環境　Node.js
  1.リポジトリのクローン
```
git clone https://github.com/username/app5.git
cd app5
```
 2.パッケージのインストール
 ```
 npm install
 ```

 3.サーバーの起動
 ```
node app5.js

 ```
## 機能一覧
機能 | 説明　| 手順
-|-|-|
Hello World ページ (/hello1, /hello2)  | 「Hello world」や「Bon jour」のような挨拶を表示する | /hello1 または /hello2 にアクセスする(http://localhost:8080/hello1),(http://localhost:8080/hello2)。どちらの URL でも同じメッセージ（Hello world と Bon jour）が表示される。
アイコン表示 (/icon) |　Appleのロゴ画像を表示する。　|/icon(http://localhost:8080/icon) にアクセスする。ロゴ画像 (Apple_logo_black.svg)が表示されるページが表示される。
運勢占い (/luck) |　ランダムで運勢（大吉、中吉など）を決定し、その結果を表示する | /luck(http://localhost:8080/luck) にアクセスする。ページにランダムに選ばれた運勢（大吉、中吉など）が表示される。
じゃんけんゲーム (/janken) |　プレイヤーがじゃんけんの手を選び、コンピュータと対戦する。| (http://localhost:8080/janken)でアクセスする。hand はユーザーの手（グー、チョキ、パー）で、win と total はゲームの結果（勝ち数と試行回数）。プレイヤーの手とコンピュータの手が対戦し、結果（勝ち、負け、引き分け）が表示される。
Eカード (/ecard) | プレイヤーとコンピュータがカード（「皇帝」「市民」「奴隷」）を使って対戦する。| (http://localhost:8080/ecard)にアクセスします。card パラメータでプレイヤーのカードを指定できます。プレイヤーとコンピュータがカードを選び、勝敗が決まる。カードの選択には「皇帝」「市民」「奴隷」がある。
クイズ (/quiz と /quiz/result) | クイズを表示し、正解か不正解かを判定する。| (http://localhost:8080/quiz)にアクセスします。クイズが表示され、ユーザーは回答を選択する。クイズの答えをURLパラメータとして送信する。送信された答えが正解か不正解かを判定し、その結果を表示する。

##　git管理
1.コミット対象として選択
```
git add .
```
2.変更をコミット
```
git commit -m "変更内容"
```
3.リポジトリへのプッシュ
```
git push
```

[githubへ←←←](https://github.com/watanabe10GOD/webpro_06/blob/main/app5.js)

## ソースコード(app5.js全体)
```
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
```
