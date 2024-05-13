let ques = document.querySelector("#question");
let timer = document.querySelector("#timer");
let options = document.querySelectorAll("p");
let wrapper = document.querySelector("#wrapper");
let currentQues = document.querySelector('#questionTimeline');
// const controller = new AbortController();
// const { signal } = controller;
let regex = /\.jpg$/;

const questions = [
  {
    q: ["2+2"],
    a: 4,
    opt: [1, 2, 33, 4],
  },
  {
    q: ["Identify the !ball"],
    a: "d2.jpg",
    opt: ["ball.jpg", "d2.jpg", "ball.jpg", "ball.jpg"],
  },
  {
    q: ["ball.jpg", "Identify the object"],
    a: "Ball",
    opt: ["Red", "Ball", "Bat", "Hello"],
  },
  {
    q: ["2+2+2"],
    a: 6,
    opt: [5, 6, 7, 8],
  },
  {
    q: ["2+2+2+2"],
    a: 8,
    opt: [6, 7, 8, 2222],
  },
  {
    q: ["2+2+2+2+2"],
    a: 10,
    opt: [10, 12, 13, 14],
  },
];

let queNo = 0;

timers();

let interval = setInterval(() => {
  if (queNo > questions.length - 1) {
    clearInterval(interval);
    localStorage.setItem("score", result)
    console.log(localStorage.getItem("score"));
    // queNo = 0
    wrapper.innerHTML = result
    // + "<br><button class = 'restart'>Restart Quiz?</button>";
    // let restartQuiz = document.createElement('button')
    // restartQuiz.classList.add('restart')
    // restartQuiz.innerHTML="Restart Quiz";
    // wrapper.append('restartQuiz')
    // document.querySelector('.restart').addEventListener('click',() => {
    //   printQuestions();
    // });
  } else {
    printQuestions();
    options.forEach((option) => {
      option.classList.remove("correct", "incorrect");
    });
    timers();
  }
}, 5000);

printQuestions();

function printQuestions() {

  if (questions[queNo].q.length === 1) {
    ques.innerHTML = questions[queNo].q;
  }

  else {
    let image = document.createElement('img');
    image.src = questions[queNo].q[0];
    ques.innerHTML = questions[queNo].q[1] + "<br>";
    ques.append(image);
  }
  printOptions(questions[queNo].opt);
  queNo++;
}

function printOptions(arr) {
  options.forEach(option => option.innerText = "");

  options.forEach((option, index) => {
    if (regex.test(arr[index])) {
      let optImg = document.createElement('img');
      optImg.classList.add("optImg")
      optImg.src = arr[index];
      // option.innerHTML = arr[index + 4];
      option.append(optImg);
      // optImg.addEventListener("click",checkAns)
    } else {
      option.innerHTML = arr[index];
    }
    option.addEventListener("click", checkAns)
  });
}

function timers() {
  let count = 5;
  timer.innerHTML = count;
  let inter = setInterval(() => {
    count--;
    timer.innerHTML = count;
    if (count == 1) {
      clearInterval(inter);
      count = 5;
    }
  }, 1000);
}

let result = 0;
function checkAns(e) {
  let checkans = queNo - 1;
  let toCheck = e.target;
  if (e.target.nodeName === "IMG") {
    toCheck = e.target.parentElement
    if (toCheck.children[0].src === questions[checkans].a) {
      toCheck.classList.add("correct");
      let tick = document.createElement('i');
      tick.classList.add("fa-regular", "fa-circle-check");
      toCheck.append(tick)
      result++;
    }
  }
  if (toCheck.innerText == questions[checkans].a) {
    console.log(toCheck.innerText)
    toCheck.classList.add("correct");
    let tick = document.createElement('i');
    tick.classList.add("fa-regular", "fa-circle-check");
    toCheck.append(tick)
    result++;
  } else {
    toCheck.classList.add("incorrect");
    let cross = document.createElement('i');
    cross.classList.add("fa-regular", "fa-circle-xmark");
    options.forEach((option) => {
      if (option.innerText == questions[checkans].a) {
        option.classList.add('correct');
        let tick = document.createElement('i');
        tick.classList.add("fa-regular", "fa-circle-check");
        option.append(tick)
      }
      toCheck.append(cross);
    })
  }
  options.forEach((option) => {
    option.removeEventListener('click', checkAns)
  })
}

