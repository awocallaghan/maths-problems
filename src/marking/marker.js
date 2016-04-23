'use strict';
import {Result} from '../models';
import {insertVariables} from '../generate/variables';
import math from 'mathjs';

export function markQuestion(question, problem) {
  let result = new Result(true, []);
  for (let i = 0; i < problem.answer.length; i++) {
    let answer = insertVariables(problem.answer[i], question.variables);
    let answerValue = math.eval(answer); // evaluate expression using mathjs
    result.answer[i] = answerValue;
    if (result.correct)
      result.correct = answerValue == question.userAnswer[i];
  }
  return result;
}

export function getAnswer(question, problem) {
  let answerValues = [];
  for (let i = 0; i < problem.answer.length; i++) {
    let answer = insertVariables(problem.answer[i], question.variables);
    let answerValue = math.eval(answer);
    answer.push(answerValue);
  }
  return formatAnswer(problem.answerFormat, answerValues);
}

function formatAnswer(answer, format) {
  let split = format.split("");
  for (let i = 0; i < split.length; i++) {
    if (!isNaN(split[i])) {
      split[i] = answer[split[i]];
    }
  }
  return split.join("");
}
