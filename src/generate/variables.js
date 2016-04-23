'use strict';
import {Variable} from '../models';
import math from 'mathjs';

/**
  * generateVariables for a question
  * @param question - question text string
  * @return array of variables
**/
export function generateVariables(question) {
  var variables = [];
  var variableDefinitions = question.match(/{.+?}/g);
  for (var i = 0; i < variableDefinitions.length; i++) {
    var splitDef = variableDefinitions[i].substring(1, variableDefinitions[i].length - 1).split("=");
    var variable = new Variable(splitDef[0], math.eval(splitDef[1]));
    variables.push(variable);
  }
  return variables;
}

/**
  * insertVariables into question text - replaces variable declaration with values
  * @param questionText - question text string
  * @param variables - array of generated variables
  * @return question - question text with variables inserted
**/
export function insertVariables(questionText, variables) {
  var chars = questionText.split("");
  var found = false;
  var name = null;
  var start = 0;
  for (var i = 0; i < chars.length; i++) {
    if (!found && chars[i] == "{") {
      found = true;
      start = i;
    } else if (found) {
      if (chars[i] == "=") {
        name = questionText.substring(start + 1, i);
      } else if (chars[i] == "}") {
        if (name == null) {
          name = questionText.substring(start + 1, i);
        }
        var vDef = questionText.substring(start, i + 1);
        var variable = findVariable(name, variables);
        questionText = questionText.replace(vDef, variable.value);
        found = false;
        name = null;
        i = start;
        chars = questionText.split("");
      }
    }
  }
  return questionText;
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
