var problems = require('../lib/problems');
var prompt = require('prompt');

// Define a simple addition problem
var additionProblem = new problems.models.Problem(
  "What is {x=randomInt(1,10)} + {y=randomInt(1,10)}?",
  ["{x}+{y}"],
  "0"
);

var answerSchema = {
  properties: {
    answer: {
      required: true,
      message: "Please provide a number answer"
    }
  }
};

console.log("*** A simple addition example");
console.log(" => Type 'exit' at any time to quit");
console.log("\n");

var total = 0; // total questions asked
var correct = 0; // correctly answered questions

askQuestion(total, correct);

function askQuestion (total, correct) {
  // generate a random question using the defined problem
  var question = problems.generateQuestions([additionProblem], [1])[0];
  console.log("** Question " + (total + 1));
  console.log(" - " + question.text);

  prompt.start();
  prompt.get(answerSchema, function (err, result) {
    if (!result || result.answer == "exit") {
      return process.exit(0);
    }
    question.userAnswer = [];
    question.userAnswer[0] = result.answer;
    var result = problems.markQuestion(question, additionProblem);
    total++;
    if (result.correct) {
      correct++;
      console.log("** Correct! [" + correct + "/" + total + "]\n");
    } else {
      console.log("** Incorrect [" + correct + "/" + total + "]")
      console.log(" - Correct answer = " + result.answer[0] + "\n");
    }
    askQuestion(total, correct);
  });
}
