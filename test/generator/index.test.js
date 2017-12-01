'use strict';
import should from 'should';

import generator from './../../src/generator';

// Import models
import ProblemSchema from './../../src/models/problemSchema';

describe('problems.generator', () => {
    describe('#generate(problemSchema, count)', () => {
        it('should only accept a ProblemSchema type', () => {
            let schemas = [
                new ProblemSchema(null, null, null),
                'invalid string',
                { invalid: 'object' },
                25
            ];
            for (let i = 0; i < schemas.length; i++) {
                let errorThrown = false;
                try {
                    generator.generate(schemas[i], null);
                } catch (e) {
                    errorThrown = true;
                }
                // Throw error if type isn't ProblemSchema
                errorThrown.should.equal(typeof schemas[i] === typeof ProblemSchema);
            }
        });
        it('should create `count` problems', () => {
            let maxCount = 10;
            let schema = new ProblemSchema(null, null, null);
            for (let count = 0; count < maxCount; count++) {
                let problems = generator.generate(schema, count);
                problems.length.should.equal(count);
            }
        });
        it('should default `count` to 1 when not a number', () => {
            let counts = [
                null, 'dog', { weird: 'thing' }
            ];
            let schema = new ProblemSchema(null, null, null);
            for (let i = 0; i < counts.length; i++) {
                let problems = generator.generate(schema, counts[i]);
                problems.length.should.equal(1);
            }
        });
    });
});