'use strict';

/**
 * The generator library
 * - Everything required for transforming ProblemSchemas -> Problem
 */

// Import models
import ProblemSchema from './../models/problemSchema';
import Problem from './../models/problem';

// Export API
export default {
    generate: generate,
};

/**
 * Generate Problems from a ProblemSchema
 * @param {ProblemSchema} problemSchema - The schema to use to generate Problems
 * @param {number} count - Number of Problems to generate
 * @return {Problem[]} - Generated Problems
 */
function generate(problemSchema, count) {
    // Type check problemSchema
    if (typeof problemSchema !== typeof ProblemSchema)
        throw `Invalid type: Expected ProblemSchema not ${typeof problemSchema}`;
    // If not a number default count is 1
    if (isNaN(count))
        count = 1;

    let problems = [];
    for (let i = 0; i < count; i++) {
        problems.push(new Problem(problemSchema));
    }
    return problems;
}