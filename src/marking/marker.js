'use strict';

var math = module.parent.exports.math;

// Export functions
module.exports.functions = [
  {
    name: 'markQuestion',
    function: markQuestion
  },
  {
    name: 'getAnswer',
    function: getAnswer
  }
];

var insertVariables;
module.exports.import = function () {
  insertVariables = module.parent.exports.insertVariables;
};

function markQuestion(question, problem) {
  var result = {};
  result.answer = [];
  result.correct = true;
  for (var i = 0; i < problem.answer.length; i++) {
    var answer = insertVariables(problem.answer[i], question.variables);
    var answerValue = math.eval(answer); // evaluate expression using mathjs
    result.answer[i] = answerValue;
    if (result.correct)
      result.correct = answerValue == question.userAnswer[i];
  }
  return result;
}

function getAnswer(question, problem) {
  var answerValues = [];
  for (var i = 0; i < problem.answer.length; i++) {
    var answer = insertVariables(problem.answer[i], question.variables);
    var answerValue = math.eval(answer);
    answer.push(answerValue);
  }
  return formatAnswer(problem.answerFormat, answerValues);
}

function formatAnswer(answer, format) {
  var split = format.split("");
  for (var i = 0; i < split.length; i++) {
    if (!isNaN(split[i])) {
      split[i] = answer[split[i]];
    }
  }
  return split.join("");
}
