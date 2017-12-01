'use strict';
// Import libraries
import math from 'mathjs';

// Import models
import ProblemSchemaAnswer from './problemSchemaAnswer';
import Variable from './variable';

/**
 * ProblemSchema
 * - Describes an abstract template for a maths problem + answer
 * - Can be used to generate many random `Problem`s which can be marked
 */
export default class ProblemSchema {
  /**
   * Create a new ProblemSchema
   * @param {string} formula - The formula for generating a question from this schema
   * @param {ProblemSchemaAnswer[]} answers - Array of answer formulas 
   * @param {string} answerFormat - How to output the answer (like String format replacing numbers with answer with that index)
   */
  constructor(formula, answers, answerFormat) {
    this.formula = formula || '';
    // Populate array of ProblemSchemaAnswers
    this.answers = [];
    for (let i = 0; i < answers.length; i++) {
      if (typeof answers[i] === typeof ProblemSchemaAnswer) {
        this.answers.push(answers[i]);
      } else {
        this.answers.push(
          new ProblemSchemaAnswer(
            answers[i].hasOwnProperty('formula') ? answers[i].formula : '',
            answers[i].hasOwnProperty('text') ? answers[i].text : ''
          )
        );
      }
    }
    this.answerFormat = answerFormat || '0';
  }

  /**
   * Generate an array of Variables using the formula
   * @return {Variable[]}
   */
  generateVariables() {
    // Init an empty array
    let variables = [];
    // Use regex to find all curly braces (variable declarations)
    // - Template: {<name>=<value>}
    // - Eg: {x=24}
    let varDefs = this.formula.match(/{.+?}/g);
    // Create a new variable for each definition
    for (let i = 0; i < varDefs.length; i++) {
      let splitDef = varDefs[i]
        // Remove braces ({})
        .substring(1, varDefs[i].length - 1)
        // Split at the `=`
        .split('=');
      // Name is the first part of the definition
      let name = splitDef[0];
      // Value second part evaluated using `mathjs`
      let value = math.eval(splitDef[1]);
      // Create + push the variable
      variables.push(
        new Variable(name, value)
      );
    }
    return variables;
  }
}
