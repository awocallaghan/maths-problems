var assert = require('assert');
var should = require('should');

// load problem library
var problems = require('../problems');

// Simple addition problem with random numbers between 1 and 10
var additionProblem = {
  "question" : "What is {x=randomInt(1,10)} + {y=randomInt(1,10)}?",
  "answer" : ["{x}+{y}"],
  "answerFormat" : "0"
};

describe('Problems', function () {
  describe('#generateQuestions(problem,number)', function () {
    it('should generate a simple addition question', function () {
      var question = problems.generateQuestions([additionProblem], [1])[0];
      question.should.have.property('text');
      question.should.have.property('variables').with.lengthOf(2);
      question.variables[0].should.have.property('name', 'x');
      question.variables[0].should.have.property('value');
      question.variables[1].should.have.property('name', 'y');
      question.variables[1].should.have.property('value');
    });
    it('should generate correct number of questions for a single problem', function () {
      var numbers = [];
      for (var number = 0; number < 100; number++) {
        numbers[0] = number;
        var questions = problems.generateQuestions([additionProblem], numbers);
        questions.length.should.equal(number);
      }
    });
  });

  describe('#markQuestion(question, problem)', function () {
    it('should reject an incorrect answer', function () {
      var question = problems.generateQuestions([additionProblem], [1])[0];
      question.userAnswer = [];
      question.userAnswer[0] = 3000;
      var result = problems.markQuestion(question, additionProblem);
      result.should.have.property('correct', false);
      result.answer[0].should.be.exactly(question.variables[0].value + question.variables[1].value);
    });
    it('should accept a correct answer', function () {
      var question = problems.generateQuestions([additionProblem], [1])[0];
      question.userAnswer = [];
      question.userAnswer[0] = question.variables[0].value + question.variables[1].value;
      var result = problems.markQuestion(question, additionProblem);
      result.should.have.property('correct', true);
    });
  })
});
