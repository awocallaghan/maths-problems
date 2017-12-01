'use strict';

/**
 * A variable belonging to a generated Problem
 */
export default class Variable {
  /**
   * Create a new variable
   * @param {string} name 
   * @param {*} value 
   */
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}
