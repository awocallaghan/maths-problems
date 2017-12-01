'use strict';
import should from 'should';

import models from './../../src/models';

import ProblemSchema from './../../src/models/problemSchema';
import Question from './../../src/models/question';
import Variable from './../../src/models/variable';
import Result from './../../src/model/result';

describe('problems.models', () => {
    it('should be an object', () => {
        models.should.not.equal(null);
        (typeof models).should.equal('object');
    });
    it('should have property `ProblemSchema` with model', () => {
        models.hasOwnProperty('ProblemSchema').should.equal(true);
        models.ProblemSchema.should.deepEqual(ProblemSchema);
    });
    it('should have property `Question` with model', () => {
        models.hasOwnProperty('Question').should.equal(true);
        models.Question.should.deepEqual(Question);
    });
    it('should have property `Variable` with model', () => {
        models.hasOwnProperty('Variable').should.equal(true);
        models.Variable.should.deepEqual(Variable);
    });
    it('should have property `Result` with model', () => {
        models.hasOwnProperty('Result').should.equal(true);
        models.Result.should.deepEqual(Result);
    });
});