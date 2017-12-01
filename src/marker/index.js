'use strict';

/**
 * The marker library
 * - Everything required for marking a Problem using its ProblemSchema
 */

// Import libraries
import math from 'mathjs';

// Import models
import Problem from './../models/problem';
import ProblemSchema from './../models/problemSchema';
import Result from './../models/result';

// Export API
export default {
    mark: mark,
};

/**
 * Mark a Problem
 * @param {string[]} answers - Given answers to problem
 * @param {Problem} problem - The problem to mark
 * @param {ProblemSchema} problemSchema - The schema this problem was generated from
 * @return {Result}
 */
function mark(answers, problem, problemSchema) {
    // Check type of Problem
    if (typeof problem !== typeof Problem)
        throw `Invalid type: Expected Problem not ${typeof problem}`;
    // Check type of ProblemSchema
    if (typeof problemSchema !== typeof ProblemSchema)
        throw `Invalid type: Expected ProblemSchema not ${typeof problemSchema}`;

    let correctAnswers = [];
    let correct = true;

    for (let i = 0; i < problemSchema.answers.length; i++) {
        // Replace variable definitions in answer formula with values
        let correctAnswerFormula = problemSchema.replaceVariables(problemSchema.answers[i].formula);
        // Eval formula to get correct answer
        let correctAnswer = math.eval(correctAnswerFormula);
        // Add to array of correct answers
        correctAnswers.push(correctAnswer);
        // Check this answer was answered correctly
        if (correct)
            correct = correctAnswer == answers[i];
    }

    return new Result(correct, correctAnswers);
}

/**
 * Format answer before output
 * @param {*} answer 
 * @param {*} format 
 */
function formatAnswer(answer, format) {
    let split = format.split("");
    for (let i = 0; i < split.length; i++) {
      if (!isNaN(split[i])) {
        split[i] = answer[split[i]];
      }
    }
    return split.join("");
}