'use strict';

export default class Problem {
  constructor(question, answer, answerFormat) {
    this.question = question || '';
    this.answer = answer || [];
    this.answerFormat = answerFormat || '0';
  }
}
