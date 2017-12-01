'use strict';
import should from 'should';

import Problem from './../../src/models/problem';
import Variable from './../../src/models/variable';

describe('problems.models.Problem', () => {
    describe('#constructor(variables, text, partTexts)', () => {
        it('should accept an array `variables`', () => {
            let variables = [
                new Variable('x', 1),
                new Variable('y', 2)
            ];
            let problem = new Problem(variables, null, null);
            problem.variables.length.should.equal(variables.length);
            for (let i = 0; i < variables.length; i++) {
                typeof problem.variables[i].should.equal(typeof variables[i]);
                problem.variables[i].should.deepEqual(variables[i]);
            }
        });
        it('should accept a string `text`', () => {
            let string = 'example';
            let problem = new Problem(null, string, null);
            typeof problem.text.should.equal(typeof string);
            problem.text.should.equal(string);
        });
        it('should accept an array of strings `partTexts`', () => {
            let partTexts = ['example1', 'example2'];
            let problem = new Problem(null, null, partTexts);
            problem.partTexts.length.should.equal(partTexts.length);
            for (let i = 0; i < partTexts.length; i++) {
                typeof problem.partTexts[i].should.equal(typeof partTexts[i]);
                problem.partTexts[i].should.equal(partTexts[i]);
            }
        });
    });
});