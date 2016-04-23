'use strict';
import assert from 'assert';
import should from 'should';

import {generateQuestions} from '../../lib/generate/questions';

// Simple addition problem with random numbers between 1 and 10
var additionProblem = {
  "question" : "What is {x=randomInt(1,10)} + {y=randomInt(1,10)}?",
  "answer" : ["{x}+{y}"],
  "answerFormat" : "0"
};

describe('generate.questions', () => {
  /**
   * generateQuestions(array<Problem> problems, array<Number> numbers)
   * @param problems : array of Problem type
   * @param numbers : array of integers
   * @return questions : array of Question type
  **/
  describe('#generateQuestions(problems, numbers)', () => {
    it('it should generate the correct number of questions for a single problem', () => {
      let numbers = [];
      for (let number = 0; number < 100; number++) {
        numbers[0] = number;
        let questions = generateQuestions([additionProblem], numbers);
        questions.length.should.equal(number);
      }
    });
  });
});
