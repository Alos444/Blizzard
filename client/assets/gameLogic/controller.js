const test = require("../gameLogic/logic");

console.log(test);

const quizOptions = document.querySelectorAll("#table .option");
console.log("quizOptions test", quizOptions[0]);

quizOptions[0].addEventListener("click", () => {
  console.log("This is option 1");
  test();
});

quizOptions[1].addEventListener("click", () => {
  console.log("This is option 2");
});

quizOptions[2].addEventListener("click", () => {
  console.log("This is option 3");
});
// https://blizzard-5jur.onrender.com/questions/1

const test = new gameState(fetchForUser);
