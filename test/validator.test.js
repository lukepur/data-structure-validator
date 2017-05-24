const { expect } = require('chai');
const validator = require('../src/validator');

describe('validator', () => {
  it('should exist', () => {
    expect(validator).to.be.a('function');
  });
});
