const { expect } = require('chai');
const Validator = require('../src/validator');

describe('validator:', () => {
  it('should exist', () => {
    expect(Validator).to.be.a('function');
  });

  describe('type validation:', () => {
    it('should return undefined for undefined data (required validation takes precedence)', () => {
        const validator = new Validator([{id: 'a', type: 'string' }]);
        var result = validator.validate({a: undefined});
        expect(result).to.be.undefined;
    });

    describe('string type:', () => {
      let validator;

      beforeEach(() => {
        validator = new Validator([{id: 'a', type: 'string' }]);
      });

      it('should return undefined for correct string type', () => {
        expect(validator.validate({a: 'hello'})).to.be.undefined;
      });
    
      it('should return correct message for number instead of string', () => {
        const result = validator.validate({a: 1});
        expect(result).length.to.be(1);
        expect(result[0].target).to.equal('a');
        expect(result[0].message).to.equal('a is not of type string (got number)');
      });

      it('should return correct message for object instead of string', () => {
        const result = validator.validate({a: {}});
        expect(result).length.to.be(1);
        expect(result[0].target).to.equal('a');
        expect(result[0].message).to.equal('a is not of type string (got object)');
      });

      it('should return correct message for array instead of string', () => {
        const result = validator.validate({a: []});
        expect(result).length.to.be(1);
        expect(result[0].target).to.equal('a');
        expect(result[0].message).to.equal('a is not of type string (got array)');
      });
 
      it('should return correct message for function instead of string', () => {
        const result = validator.validate({a: x=>{}});
        expect(result).length.to.be(1);
        expect(result[0].target).to.equal('a');
        expect(result[0].message).to.equal('a is not of type string (got function)');
      });
    });

    describe('number type:', () => {
      let validator;

      beforeEach(() => {
        validator = new Validator([{id: 'a', type: 'number' }]);
      });

      it('should return undefined for correct number type', () => {
        var result = validator.validate({a: 1});
        expect(result).to.be.undefined;
      });

      it('should return correct message for string instead of number', () => {
        const result = validator.validate({a: '1'});
        expect(result).length.to.be(1);
        expect(result[0].target).to.equal('a');
        expect(result[0].message).to.equal('a is not of type number (got string)');
      });

      it('should return correct message for object instead of number', () => {
        const result = validator.validate({a: {}});
        expect(result).length.to.be(1);
        expect(result[0].target).to.equal('a');
        expect(result[0].message).to.equal('a is not of type number (got object)');
      });

      it('should return correct message for array instead of number', () => {
        const result = validator.validate({a: []});
        expect(result).length.to.be(1);
        expect(result[0].target).to.equal('a');
        expect(result[0].message).to.equal('a is not of type number (got array)');
      });

      it('should return correct message for function instead of number', () => {
        const result = validator.validate({a: x=>{}});
        expect(result).length.to.be(1);
        expect(result[0].target).to.equal('a');
        expect(result[0].message).to.equal('a is not of type number (got function)');
      });
    });

    describe('object type:', () => {
      beforeEach(() => {
        validator = new Validator([{id: 'a', type: 'object' }]);
      });

      it('should return undefined for correct object type', () => {
        var result = validator.validate({a: {b: 1}});
        expect(result).to.be.undefined;
      });

      it('should return correct message for string instead of object', () => {
        const result = validator.validate({a: '1'});
        expect(result).length.to.be(1);
        expect(result[0].target).to.equal('a');
        expect(result[0].message).to.equal('a is not of type object (got string)');
      });

      it('should return correct message for number instead of object', () => {
        const result = validator.validate({a: 1});
        expect(result).length.to.be(1);
        expect(result[0].target).to.equal('a');
        expect(result[0].message).to.equal('a is not of type object (got number)');
      });

      it('should return correct message for array instead of object', () => {
        const result = validator.validate({a: []});
        expect(result).length.to.be(1);
        expect(result[0].target).to.equal('a');
        expect(result[0].message).to.equal('a is not of type object (got array)');
      });

      it('should return correct message for function instead of object', () => {
        const result = validator.validate({a: x=>{}});
        expect(result).length.to.be(1);
        expect(result[0].target).to.equal('a');
        expect(result[0].message).to.equal('a is not of type object (got function)');
      });
    });

    describe('array type:', () => {
      beforeEach(() => {
        validator = new Validator([{id: 'a', type: 'array' }]);
      });

      it('should return undefined for correct array type', () => {
        var result = validator.validate({a: []});
        expect(result).to.be.undefined;
      });

      it('should return correct message for string instead of array', () => {
        const result = validator.validate({a: '1'});
        expect(result).length.to.be(1);
        expect(result[0].target).to.equal('a');
        expect(result[0].message).to.equal('a is not of type array (got string)');
      });

      it('should return correct message for number instead of array', () => {
        const result = validator.validate({a: 1});
        expect(result).length.to.be(1);
        expect(result[0].target).to.equal('a');
        expect(result[0].message).to.equal('a is not of type array (got number)');
      });

      it('should return correct message for object instead of array', () => {
        const result = validator.validate({a: {}});
        expect(result).length.to.be(1);
        expect(result[0].target).to.equal('a');
        expect(result[0].message).to.equal('a is not of type array (got object)');
      });

      it('should return correct message for function instead of array', () => {
        const result = validator.validate({a: x=>{}});
        expect(result).length.to.be(1);
        expect(result[0].target).to.equal('a');
        expect(result[0].message).to.equal('a is not of type array (got function)');
      });
    });

    describe('function type:', () => {
      beforeEach(() => {
        validator = new Validator([{id: 'a', type: 'function' }]);
      });

      it('should return undefined for correct function type', () => {
        var result = validator.validate({a: x=>{}});
        expect(result).to.be.undefined;
      });

      it('should return correct message for string instead of function', () => {
        const result = validator.validate({a: '1'});
        expect(result).length.to.be(1);
        expect(result[0].target).to.equal('a');
        expect(result[0].message).to.equal('a is not of type function (got string)');
      });

      it('should return correct message for number instead of function', () => {
        const result = validator.validate({a: 1});
        expect(result).length.to.be(1);
        expect(result[0].target).to.equal('a');
        expect(result[0].message).to.equal('a is not of type function (got number)');
      });

      it('should return correct message for object instead of function', () => {
        const result = validator.validate({a: {}});
        expect(result).length.to.be(1);
        expect(result[0].target).to.equal('a');
        expect(result[0].message).to.equal('a is not of type function (got object)');
      });

      it('should return correct message for array instead of function', () => {
        const result = validator.validate({a: []});
        expect(result).length.to.be(1);
        expect(result[0].target).to.equal('a');
        expect(result[0].message).to.equal('a is not of type function (got array)');
      });
    });    it('should return undefined for correct function type', () => {
      const validator = new Validator([{id: 'a', type: 'function' }]);
      var result = validator.validate({a: a=>{}});
      expect(result).to.be.undefined;
    });
  });
});
