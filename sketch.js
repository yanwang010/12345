let questions = [
  { question: "1 + 1 = ?", options: [2, 3, 4], answer: 2 },
  { question: "2 + 2 = ?", options: [3, 4, 5], answer: 4 },
  { question: "3 + 3 = ?", options: [5, 6, 7], answer: 6 },
  { question: "4 + 4 = ?", options: [7, 8, 9], answer: 8 },
  { question: "5 + 5 = ?", options: [9, 10, 11], answer: 10 },
];

let currentQuestion = 0;
let userAnswers = Array(questions.length).fill(null);
let showResults = false;

function setup() {
  createCanvas(windowWidth, windowHeight); // 填滿整個視窗
}

function draw() {
  background(50, 50, 150); // 深藍色背景

  if (showResults) {
    displayResults();
  } else {
    displayQuestion();
    displayButtons();
  }
}

function displayQuestion() {
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255, 255, 0); // 黃色文字
  text(questions[currentQuestion].question, width / 2, height / 4);

  for (let i = 0; i < questions[currentQuestion].options.length; i++) {
    let x = width / 2;
    let y = height / 2 + i * 50;
    let option = questions[currentQuestion].options[i];

    if (userAnswers[currentQuestion] === option) {
      fill(0, 255, 0); // 綠色高亮
    } else {
      fill(255, 0, 0); // 紅色選項
    }
    rectMode(CENTER);
    rect(x, y, 200, 40, 10); // 圓角矩形
    fill(255);
    text(option, x, y);
  }
}

function displayButtons() {
  textSize(20);
  textAlign(CENTER, CENTER);

  // Previous Button
  if (currentQuestion > 0) {
    fill(0, 200, 255); // 藍色按鈕
    rect(100, height - 100, 120, 50, 10);
    fill(0);
    text("上一題", 100, height - 100);
  }

  // Next Button
  if (currentQuestion < questions.length - 1) {
    fill(0, 200, 255); // 藍色按鈕
    rect(width - 100, height - 100, 120, 50, 10);
    fill(0);
    text("下一題", width - 100, height - 100);
  }

  // Submit Button
  if (!userAnswers.includes(null)) {
    fill(255, 165, 0); // 橙色按鈕
    rect(width / 2, height - 100, 120, 50, 10);
    fill(0);
    text("送出答案", width / 2, height - 100);
  }
}

function displayResults() {
  let correct = 0;
  let incorrect = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      correct++;
    } else {
      incorrect++;
    }
  }

  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255, 255, 0); // 黃色文字
  text(`答對題數: ${correct}`, width / 2, height / 3);
  text(`答錯題數: ${incorrect}`, width / 2, height / 2);
}

function mousePressed() {
  if (showResults) return;

  // Check option selection
  for (let i = 0; i < questions[currentQuestion].options.length; i++) {
    let x = width / 2;
    let y = height / 2 + i * 50;

    if (
      mouseX > x - 100 &&
      mouseX < x + 100 &&
      mouseY > y - 20 &&
      mouseY < y + 20
    ) {
      userAnswers[currentQuestion] = questions[currentQuestion].options[i];
    }
  }

  // Check Previous Button
  if (
    currentQuestion > 0 &&
    mouseX > 40 &&
    mouseX < 160 &&
    mouseY > height - 125 &&
    mouseY < height - 75
  ) {
    currentQuestion--;
  }

  // Check Next Button
  if (
    currentQuestion < questions.length - 1 &&
    mouseX > width - 160 &&
    mouseX < width - 40 &&
    mouseY > height - 125 &&
    mouseY < height - 75
  ) {
    currentQuestion++;
  }

  // Check Submit Button
  if (
    !userAnswers.includes(null) &&
    mouseX > width / 2 - 60 &&
    mouseX < width / 2 + 60 &&
    mouseY > height - 125 &&
    mouseY < height - 75
  ) {
    showResults = true;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布
}
