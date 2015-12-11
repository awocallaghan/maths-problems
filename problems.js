/**
 * problemlang v1.0
 * => generate a set of questions using a defined problem
 * => focusing specifically on generating maths questions using a general formula defined in problem
 */

var math = require('mathjs');

var generateQuestions = function (problems, numbers) {
  if (problems == null) {
    throw "Invalid parameters <generateQuestions> => problems are undefined";
  }
  if (numbers == null) {
    throw "Invalid parameters <generateQuestions> => number of questions to generate undefined";
  }
  if (numbers.length < problems.length) {
    throw "Invalid parameters <generateQuestions> => numbers.length < problems.length"
  }
  var questions = [];
  // Loop through each problem
  for (var i = 0; i < problems.length; i++) {
    var thisProblem = problems[i];
    var thisNumber = numbers[i];
    // Generate specified number of questions using this problem
    for (var j = 0; j < thisNumber; j++) {
      var question = generateQuestion(thisProblem);
      questions.push(question);
    }
  }
  return questions;
};
module.exports.generateQuestions = generateQuestions;

var markQuestion = function (question, problem) {
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
};
module.exports.markQuestion = markQuestion;

var getAnswer = function (question, problem) {
  var answerValues = [];
  for (var i = 0; i < problem.answer.length; i++) {
    var answer = insertVariables(problem.answer[i], question.variables);
    var answerValue = math.eval(answer);
    answer.push(answerValue);
  }
  return formatAnswer(problem.answerFormat, answerValues);
};
module.exports.getAnswer = getAnswer;

function formatAnswer(answer, format) {
  var split = format.split("");
  for (var i = 0; i < split.length; i++) {
    if (!isNaN(split[i])) {
      split[i] = answer[split[i]];
    }
  }
  return split.join("");
}

function generateQuestion (problem) {
  var question = {};

  var originalQuestion = problem.question;
  if (originalQuestion == null) {
    throw "Invalid problem => question is undefined";
  }
  question.variables = generateVariables(originalQuestion);
  if (question.variables.length == 0) {
    // If there are no variables it is a simple given question and answer
    question.text = problem.question;
  } else {
    question.text = insertVariables(originalQuestion, question.variables);
  }
  return question;
}

function generateVariables (question) {
  var variables = [];
  var variableDefinitions = question.match(/{.+?}/g);
  for (var i = 0; i < variableDefinitions.length; i++) {
    var splitDef = variableDefinitions[i].substring(1, variableDefinitions[i].length - 1).split("=");
    var variable = {
      name: splitDef[0],
      value: math.eval(splitDef[1])
    };
    variables.push(variable);
  }
  return variables;
}

function insertVariables(question, variables) {
  var chars = question.split("");
  var found = false;
  var name = null;
  var start = 0;
  for (var i = 0; i < chars.length; i++) {
    if (!found && chars[i] == "{") {
      found = true;
      start = i;
    } else if (found) {
      if (chars[i] == "=") {
        name = question.substring(start + 1, i);
      } else if (chars[i] == "}") {
        if (name == null) {
          name = question.substring(start + 1, i);
        }
        var vDef = question.substring(start, i + 1);
        var variable = findVariable(name, variables);
        question = question.replace(vDef, variable.value);
        found = false;
        name = null;
        i = start;
        chars = question.split("");
      }
    }
  }
  return question;
}

function findVariable(variableName, variables) {
  for (var i = 0; i < variables.length; i++) {
    if (variables[i].name == variableName) return variables[i];
  }
  return null;
}
