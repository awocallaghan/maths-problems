'use strict';

/**
 * A generated maths problem
 */
export default class Problem {
  /**
   * Create a new maths problem
   * @param {ProblemSchema} schema - Schema to generate problem from
   */
  constructor(problemSchema) {
    // Use schema to generate environment of variables
    this.variables = problemSchema.generateVariables();
    // Replace variable definitions with values in this environment
    this.text = this.replaceVariables(problemSchema.formula);
    this.partTexts = problemSchema.answers
      .map(a => this.replaceVariables(a.text));
  }

  /**
   * Replace variables in text with values
   * @param text - text to replace variables in
   * @return {string}
   **/
  replaceVariables(text) {
    let chars = text.split("");
    let found = false;
    let name = null;
    let start = 0;
    for (let i = 0; i < chars.length; i++) {
      if (!found && chars[i] == "{") {
        found = true;
        start = i;
      } else if (found) {
        if (chars[i] == "=") {
          name = text.substring(start + 1, i);
        } else if (chars[i] == "}") {
          if (name == null) {
            name = text.substring(start + 1, i);
          }
          let vDef = text.substring(start, i + 1);
          let variable = findVariable(name, this.variables);
          text = text.replace(vDef, variable.value);
          found = false;
          name = null;
          i = start;
          chars = text.split("");
        }
      }
    }
    return text;
  }
}

/**
 * findVariable - find a variable in an array of variables
 * @param variableName - string variable name
 * @param variables - array of variables
 * @return variable where variable.name = variableName
 **/
function findVariable(variableName, variables) {
  for (var i = 0; i < variables.length; i++) {
    if (variables[i].name == variableName) return variables[i];
  }
  return null;
}

