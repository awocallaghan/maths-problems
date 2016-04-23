'use strict';
import assert from 'assert';
import should from 'should';

import {generateQuestions} from '../../lib/generate/questions';
import {markQuestion} from '../../lib/marking/marker';

// Simple addition problem with random numbers between 1 and 10
var additionProblem = {
  "question" : "What is {x=randomInt(1,10)} + {y=randomInt(1,10)}?",
  "answer" : ["{x}+{y}"],
  "answerFormat" : "0"
};

describe('marking.marker', () => {
  /**
   * markQuestion(Question question, Problem problem)
   * @param question : Question type
   * @param problem : Problem type
   * @return result : Result type
  **/
  describe('#markQuestion(question, problem)', function () {
    it('should reject an incorrect answer', function () {
      var question = generateQuestions([additionProblem], [1])[0];
      question.userAnswer = [];
      question.userAnswer[0] = 3000;
      var result = markQuestion(question, additionProblem);
      result.should.have.property('correct', false);
      result.answer[0].should.be.exactly(question.variables[0].value + question.variables[1].value);
    });
    it('should accept a correct answer', function () {
      var question = generateQuestions([additionProblem], [1])[0];
      question.userAnswer = [];
      question.userAnswer[0] = question.variables[0].value + question.variables[1].value;
      var result = markQuestion(question, additionProblem);
      result.should.have.property('correct', true);
    });
  })
});
