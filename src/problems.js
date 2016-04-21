'use strict';

/**
 * math-problems
 * => generate a set of questions using a defined problem
 * => focusing specifically on generating maths questions using a general formula defined in problem
 */

var math = require('mathjs');
module.exports.math = math;

/* Import data models */
var Problem = require('./models/problem');
var Question = require('./models/question');
var Variable = require('./models/variable');

/* Export models */
module.exports.models = {
  Problem : Problem,
  Question : Question,
  Variable : Variable,
};

/* Import code */
var code = [
  require('./generate/variables'),
  require('./marking/marker'),
  require('./generate/questions'),
];

/* Export code */
code.forEach((thisModule) => {
  thisModule.functions.forEach((func) => {
    module.exports[func.name] = func.function;
  });
});

/* Import to modules */
code.forEach((thisModule) => { thisModule.import(); });
