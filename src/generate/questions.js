'use strict';

/**
  * Generating questions from problems
  */

import {Question, Variable} from '../models';
import {generateVariables, insertVariables} from './variables';

/**
  * generateQuestions from an array of problems
  * @param problems - array of Problems
  * @param numbers - array of integers = number of questions to generate for each problem
  * @return array of Questions
**/
export function generateQuestions(problems, numbers) {
  if (problems == null) {
    throw "Invalid parameters <generateQuestions> => problems are undefined";
  }
  if (numbers == null) {
    throw "Invalid parameters <generateQuestions> => number of questions to generate undefined";
  }
  if (numbers.length !== problems.length) {
    throw "Invalid parameters <generateQuestions> => numbers.length != problems.length"
  }
  var questions = [];
  // Loop through each problem
  for (var i = 0; i < problems.length; i++) {
    var thisProblem = problems[i];
    var thisNumber = numbers[i];
    // Generate specified number of questions using this problem
    for (var j = 0; j < thisNumber; j++) {
      questions.push(generateQuestion(thisProblem, questions.length + 1));
    }
  }
  return questions;
}

/**
  * generateQuestion from a Problem
  * @param problem - Problem template
  * @param number - question number
  * @return question
**/
function generateQuestion (problem, number) {
  if (problem.question == null) {
    throw "Invalid problem => question is undefined";
  }

  var variables = generateVariables(problem.question);
  if (variables.length == 0) {
    // No variables, simple question and answer
    return new Question(problem.question, variables);
  } else {
    return new Question(insertVariables(problem.question, variables), variables, number);
  }
}
