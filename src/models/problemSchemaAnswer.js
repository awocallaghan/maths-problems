'use strict';

/**
 * ProblemSchemaAnswer
 * - Formula for calculating an answer for a part of a ProblemSchema
 */
export default class ProblemSchemaAnswer {
    /**
     * Create a new ProblemSchemaAnswer
     * @param {string} formula - The formula for generating a correct answer
     * @param {string} text - Additional question text for this answer
     */
    constructor(formula, text) {
        this.formula = formula || '';
        this.text = text || '';
    }
}