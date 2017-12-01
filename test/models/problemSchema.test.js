'use strict';
import should from 'should';

import ProblemSchema from './../../src/models/problemSchema';
import ProblemSchemaAnswer from './../../src/models/problemSchemaAnswer';

describe('problems.models.ProblemSchema', () => {
    describe('#constructor(formula, answers, answerFormat)', () => {
        it('should accept a string `formula`', () => {
            let string = 'example';
            let schema = new ProblemSchema(string, null, null);
            typeof schema.formula.should.equal(typeof string);
            schema.formula.should.equal(string);
        });
        it('should set default `formula` as empty string', () => {
            let schema = new ProblemSchema(null, null, null);
            schema.formula.should.equal('');
        });
        it('should accept an array of ProblemSchemaAnswers `answers`', () => {
            let answers = [
                new ProblemSchemaAnswer('test', 'testing1'),
                new ProblemSchemaAnswer('another', 'testing2')
            ];
            let schema = new ProblemSchema(null, answers, null);
            schema.answers.length.should.equal(answers.length);
            for (let i = 0; i < answers.length; i++) {
                typeof schema.answers[i].should.equal(typeof answers[i]);
                schema.answers[i].should.deepEqual(answers[i]);
            }
        });
        it('should accept and transform array of object `answers`', () => {
            let answers = [
                { formula: 'test', text: 'testing1' },
                { formula: 'another', text: 'testing2' }
            ];
            let schema = new ProblemSchema(null, answers, null);
            schema.answers.length.should.equal(answers.length);
            for (let i = 0; i < answers.length; i++) {
                typeof schema.answers[i].should.equal(typeof ProblemSchemaAnswer);
                let hasFormula = schema.answers[i].hasOwnProperty('formula');
                hasFormula.should.equal(answers[i].hasOwnProperty('formula'));
                if (hasFormula)
                    schema.answers[i].formula.should.equal(answers[i].formula);
                let hasText = schema.answers[i].hasOwnProperty('text');
                hasText.should.equal(answers[i].hasOwnProperty('text'));
                if (hasText)
                    schema.answers[i].text.should.equal(answers[i].text);
            }
        });
        it('should set default `answers` as empty array', () => {
            let schema = new ProblemSchema(null, null, null);
            schema.answers.should.equal([]);
        });
        it('should accept a string `answerFormat`', () => {
            let string = 'example';
            let schema = new ProblemSchema(null, null, string);
            typeof schema.answerFormat.should.equal(typeof string);
            schema.answerFormat.should.equal(string);
        });
        it('should set default `answerFormat` as empty string', () => {
            let schema = new ProblemSchema(null, null, null);
            schema.answerFormat.should.equal('');
        });
    });
});