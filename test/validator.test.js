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
      let validator;

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
      let validator;

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
      let validator;

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
    });

    describe('any type:', () => {
      let validator;

      beforeEach(() => {
        validator = new Validator([{id: 'a', type: 'any' }]);
      });

      it('should return undefined for correct string type', () => {
        var result = validator.validate({a: 'string'});
        expect(result).to.be.undefined;
      });

      it('should return undefined for correct number type', () => {
        var result = validator.validate({a: 1});
        expect(result).to.be.undefined;
      });

      it('should return undefined for correct object type', () => {
        var result = validator.validate({a: {}});
        expect(result).to.be.undefined;
      });

      it('should return undefined for correct array type', () => {
        var result = validator.validate({a: []});
        expect(result).to.be.undefined;
      });

      it('should return undefined for correct function type', () => {
        var result = validator.validate({a: x=>{}});
        expect(result).to.be.undefined;
      });
    });

    describe('implicit object type when node has children', () => {
      let validator;

      beforeEach(() => {
        validator = new Validator([{id: 'a', children: [{id: 'b', type: 'string'}] }]);
      });

      it('should return undefined for correct object type', () => {
        var result = validator.validate({a: {b: '1'}});
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
  });

  describe('required validation:', () => {
    describe('value provided:', () => {
      let validator;
      beforeEach(() => {
        validator = new Validator([{id: 'a', required: true, type: 'string'}])
      });

      it('should return undefined if correct type provided', () => {
        expect(validator.validate({a: 'hello'})).to.be.undefined;
      });

      it('should return type message if required member is of incorrect type', () => {
        const result = validator.validate({a: []});
        expect(result).length.to.be(1);
        expect(result[0].target).to.equal('a');
        expect(result[0].message).to.equal('a is not of type string (got array)');
      });
    });

    describe('required value not provided:', () => {
      describe('required is true:', () => {
        let validator;
        beforeEach(() => {
          validator = new Validator([{
            id: 'a',
            type: 'string',
            required: true
          }]);
        });

        it('should return default required message', () => {
          const result = validator.validate({});
          expect(result).length.to.be(1);
          expect(result[0].target).to.equal('a');
          expect(result[0].message).to.equal('a is required');
        });

      });

      describe('required is custom message string:', () => {
        let validator;
        beforeEach(() => {
          validator = new Validator([{
            id: 'a',
            type: 'string',
            required: 'Please provide $prop'
          }]);
        });

        it('should return custom required message', () => {
          const result = validator.validate({});
          expect(result).length.to.be(1);
          expect(result[0].target).to.equal('a');
          expect(result[0].message).to.equal('Please provide a');
        });
      });

      describe('required is resolvable:', () => {
        describe('resolvable resolves to true:', () => {
          let validator;
          beforeEach(() => {
            validator = new Validator([{
              id: 'a',
              type: 'string',
              required: {
                fn: 'returnTrue'
              }
            }], ctx)
          });

          it('should return default message', () => {
            const result = validator.validate({});
            expect(result).length.to.be(1);
            expect(result[0].target).to.equal('a');
            expect(result[0].message).to.equal('a is required');
          });
        });
      
        describe('resolvable resolves to false:', () => {
          let validator;
          beforeEach(() => {
            validator = new Validator([{
              id: 'a',
              type: 'string',
              required: {
                fn: 'returnFalse'
              }
            }], ctx)
          });

          it('should return undefined ', () => {
            expect(validator.validate({})).to.be.undefined;
          });
        });

        describe('resolvable resolves to string:', () => {
          let validator;
          beforeEach(() => {
            validator = new Validator([{
              id: 'a',
              type: 'string',
              required: {
                fn: 'returnMessage'
              }
            }], ctx)
          });

          it('should return custom message as returned by the resolvable', () => {
            const result = validator.validate({});
            expect(result).length.to.be(1);
            expect(result[0].target).to.equal('a');
            expect(result[0].message).to.equal('Please provide a');
          });
        });
      });
    });

    describe('nested required values', () => {
      describe('value provided', () => {
        let validator;

        beforeEach(() => {
          validator = new Validator([{
            id: 'a',
            children: [
              {id: 'b', required: true, type: 'number'}
            ]
          }]);
        });

        it('should return undefined', () => {
          expect(validator.validate({a: {b: 1}})).to.be.undefined;
        });
      });

      describe('value not provided', () => {
        let validator;

        beforeEach(() => {
          validator = new Validator([{
            id: 'a',
            children: [
              {id: 'b', required: true, type: 'string'}
            ]
          }]);
        });

        it('should return nested message', () => {
          const result = validator.validate({a: {}});
          expect(result).length.to.be(1);
          expect(result[0].target).to.equal('a.b');
          expect(result[0].message).to.equal('a.b is required');
        });
      });
    });

    describe('conditional required', () => {
      let validator;

      beforeEach(() => {
        validator = new Validator([{
          id: 'a',
          children: [
            {id: 'b', type: 'number'},
            {id: 'c', type: 'number', required: {fn: 'isEmpty', args: ['$.a.b'], message: '$prop is required because b is blank'}}
          ]
        }], ctx);
      });

      describe('value provided', () => {
        it('should return undefined', () => {
          expect(validator.validate({a: {b: 1}})).to.be.undefined;
        });
      });

      describe('value not provided', () => {
        it('should return message because conditional required is true', () => {
          const result = validator.validate({a: {}});
          expect(result).length.to.be(1);
          expect(result[0].target).to.equal('a.c');
          expect(result[0].message).to.equal('a.c is required because b is blank');
        });
      });
    });
  });

  describe('custom validation:', () => {
    describe('root-level validation', () => {
      let validator;

      beforeEach(() => {
        validator = new Validator([
          {
            id: 'a',
            type: 'string',
            validations: [
              {
                fn: 'lengthAtLeast',
                args: ['$value', 3],
                message: '$prop must be at least 3 chars'
              }
            ]
          }
        ], ctx);
      });

      describe('validation passes', () => {
        it('should return undefined if target satisfies validation', () => {
          expect(validator.validate({a: 'four'})).to.be.undefined;
        });
      });

      describe('validation does not pass', () => {
        it('should return correct error message', () => {
          const result = validator.validate({a: 'to'});
          expect(result).length.to.be(1);
          expect(result[0].target).to.equal('a');
          expect(result[0].message).to.equal('a must be at least 3 chars');
        });
      });
    });

    describe('nested validation', () => {
      let validator;

      beforeEach(() => {
        validator = new Validator([
          {
            id: 'a',
            children:[
              {
                id: 'b',
                type: 'string',
                validations: [
                  {
                    fn: 'lengthAtLeast',
                    args: ['$value', 3],
                    message: '$prop must be at least 3 chars'
                  }
                ]
              }
            ]
          }
        ], ctx);
      });

      describe('validation passes', () => {
        it('should return undefined if target satisfies validation', () => {
          expect(validator.validate({a: {b: 'four'}})).to.be.undefined;
        });
      });

      describe('validation does not pass', () => {
        it('should return correct error message', () => {
          const result = validator.validate({a: {b: 'to'}});
          expect(result).length.to.be(1);
          expect(result[0].target).to.equal('a.b');
          expect(result[0].message).to.equal('a.b must be at least 3 chars');
        });
      });
    });

    describe('array validation:', () => {
      let validator;

      beforeEach(() => {
        validator = new Validator([
          {
            id: 'a',
            type: 'array',
            children: {
              type: 'string',
              validations: [
                {
                  fn: 'lengthAtLeast',
                  args: ['$value', 3],
                  message: '$prop must be at least 3 chars'
                }
              ]
            }
          }
        ], ctx);
      });

      describe('validation passes', () => {
        it('should return undefined', () => {
          expect(validator.validate({a: ['One', 'Two']})).to.be.undefined;
        });
      });

      describe('validation fails', () => {
        it('should return correct path and message', () => {
          const result = validator.validate({a: ['on', 'two']});
          expect(result).length.to.be(1);
          expect(result[0].target).to.equal('a.0');
          expect(result[0].message).to.equal('a.0 must be at least 3 chars');
        });
  
        it('should return correct path and message', () => {
          const result = validator.validate({a: ['one', 'tw']});
          expect(result).length.to.be(1);
          expect(result[0].target).to.equal('a.1');
          expect(result[0].message).to.equal('a.1 must be at least 3 chars');
        });
      });
    });

    describe('multiple validation errors:', () => {
      let validator;

      beforeEach(() => {
        validator = new Validator([
          {
            id: 'a',
            type: 'string',
            required: true
          },
          {
            id: 'b',
            children: [
              {
                id: 'c',
                type: 'array',
                children: {
                  type: 'string',
                  validations: [
                    {
                      fn: 'lengthAtLeast',
                      args: ['$value', 3],
                      message: '$prop must be at least 3 chars'
                    }
                  ]
                }
              }
            ]
          },
          {
            id: 'd',
            type: 'number'
          }
        ], ctx);
      });

      describe('validation satisfied', () => {
        it('should return undefined', () => {
          const result = validator.validate({a: 'hello', b: {c: ['one', 'two']}, d: 1});
          expect(result).to.be.undefined;
        });
      });

      describe('validation failed', () => {
        it('should return correct collection of messages', () => {
          const result = validator.validate({b: {c: ['on', 'two']}, d: '1'});
          expect(result).length.to.be(3);
          expect(result[0].target).to.equal('a');
          expect(result[0].message).to.equal('a is required');
          expect(result[1].target).to.equal('b.c.0');
          expect(result[1].message).to.equal('b.c.0 must be at least 3 chars');
          expect(result[2].target).to.equal('d');
          expect(result[2].message).to.equal('d is not of type number (got string)');
        });
      });
    });
  });

  describe('complex validation:', () => {
    describe('array of object validation:', () => {
      let validator, validData;
      beforeEach(() => {
        validator = new Validator([
          {
            id: 'contacts',
            type: 'array',
            validations: [
              {
                fn: 'arrayMinLength',
                args: ['$value', 2],
                message: '$prop must contain at least 2 items'
              }
            ],
            children: {
              children: [
                {
                  id: 'contact_type',
                  type: 'string',
                  required: true,
                  validations: [
                    {
                      fn: 'inArray',
                      args: ['$value', ['phone', 'email']],
                      message: '$prop must be one of {phone | email}'
                    }
                  ]
                },
                {
                  id: 'value',
                  type: 'string',
                  required: true
                },
                {
                  id: 'functions',
                  type: 'array',
                  children: {
                    children: [
                      {
                        id: 'name',
                        type: 'string',
                        required: true
                      },
                      {
                        id: 'priority',
                        type: 'number',
                        required: true,
                        validations: [
                          {
                            fn: 'greaterThanOrEqual',
                            args: ['$value', 0],
                            message: '$prop must be greater than or equal to 0'
                          },
                          {
                            fn: 'lessThan',
                            args: ['$value', 3],
                            message: '$prop must be less than 3'
                          }
                        ]
                      }
                    ]
                  }
                }
              ]
            }
          }
        ], ctx);

        validData = {
          contacts: [
            {
              contact_type: 'phone',
              value: '020202020',
              functions: [
                {
                  name: 'Home',
                  priority: 1
                },
                {
                  name: 'Work',
                  priority: 2
                }
              ]
            },
            {
              contact_type: 'email',
              value: 'a@b.com',
              functions: [
                {
                  name: 'All',
                  priority: 1
                }
              ]
            }
          ]
        };
      });

      describe('min array length:', () => {
        it('should return undefined if min length of array met', () => {
          const result = validator.validate(validData);
          expect(result).to.be.undefined;
        });

        it('should return correct error message if array length is not met', () => {
          const result = validator.validate({
            contacts: []
          });
          expect(result.length).to.eql(1);
          expect(result[0].target).to.eql('contacts');
          expect(result[0].message).to.eql('contacts must contain at least 2 items');
        });
      });

      describe('array member validation', () => {
        it('should return correct error message if array contains invalid item', () => {
          const result = validator.validate({
            contacts: [
              {
                contact_type: 1,
                value: '03030'
              },
              {
                contact_type: 'phone',
                value: '0303030'
              }
            ]
          });
          expect(result.length).to.eql(1);
          expect(result[0].target).to.eql('contacts.0.contact_type');
          expect(result[0].message).to.eql('contacts.0.contact_type is not of type string (got number)');
        });

        it('should return correct error message if array contains multiple invalid items', () => {
          const result = validator.validate({
            contacts: [
              { contact_type: 1, value: 'test' },
              { contact_type: 'not in enum', value: 'test' }
            ]
          });
          expect(result.length).to.eql(2);
          expect(result[0].target).to.eql('contacts.0.contact_type');
          expect(result[0].message).to.eql('contacts.0.contact_type is not of type string (got number)');
          expect(result[1].target).to.eql('contacts.1.contact_type');
          expect(result[1].message).to.eql('contacts.1.contact_type must be one of {phone | email}');
        });

        it('should return correct errorm message for missing required field for optional parent', () => {
          const result = validator.validate({
            contacts: [ 
              { contact_type: 'phone', value: 'test', functions: [{name: '', priority: 'e'}]},
              { contact_type: 'email', value: 'test' }
            ]
          });

          expect(result.length).to.eql(2);
          expect(result[0].target).to.eql('contacts.0.functions.0.name');
          expect(result[0].message).to.eql('contacts.0.functions.0.name is required');
          expect(result[1].target).to.eql('contacts.0.functions.0.priority');
          expect(result[1].message).to.eql('contacts.0.functions.0.priority is not of type number (got string)');
        });
      });
    });
  });
});

const ctx = {
  returnTrue: ()=>true,
  returnFalse: ()=>false,
  returnMessage: ()=>'Please provide $prop',
  lengthAtLeast: (str, len) => str.length >= len,
  isEmpty: value => value === undefined,
  arrayMinLength: (arr, target) => arr.length >= target,
  inArray: (target, arr) => arr.indexOf(target) > -1,
  greaterThanOrEqual: (val, target) => val >= target,
  lessThan: (val, target) => val < target
};
