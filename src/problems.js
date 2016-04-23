'use strict';

/**
 * math-problems
 * => generate a set of questions using a defined problem
 * => focusing specifically on generating maths questions using a general formula defined in problem
 */

/* Import and export data models */
import {Problem, Question, Variable, Result} from './models';
export const models = {
  Problem: Problem,
  Question: Question,
  Variable: Variable,
  Result: Result,
}

/* Export functions */
import {generateQuestions} from './generate/questions';
import {markQuestion} from './marking/marker';

export {generateQuestions}
export {markQuestion}
