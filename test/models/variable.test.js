'use strict';
import should from 'should';

import Variable from './../../src/models/variable';

describe('problems.models.Variable', () => {
    describe('#constructor(text, value)', () => {
        it('should accept a string `text`', () => {
            let string = 'example';
            let variable = new Variable(string, null);
            typeof variable.text.should.equal(typeof string);
            variable.text.should.equal(string);
        });
        it('should accept a `value`', () => {
            let values = [
                1, 430034, 'dog', { val: 9001 }, -10
            ];
            for (let i = 0; i < values.length; i++) {
                let variable = new Variable(null, values[i]);
                typeof variable.value.should.equal(typeof values[i]);
                variable.value.should.deepEqual(values[i]);
            }
        });
    });
});