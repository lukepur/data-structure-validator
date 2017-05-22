const Validator = function constraintConfiguration () {
    this.validate = function (data) {
        return data.a + data.b;
    };
    this.meta = function () {
        return constraintConfiguration;
    };
}

module.exports = Validator;

// example
const constraints = [
    {
        id: 'a',
        type: 'number',
        validations: [
            {
                fn: 'required',
                args: [true],
                message: 'Argument a is required'
            }
        ]
    },
    {
        id: 'b',
        type: 'number',
        validations: [
            {
                fn: 'required',
                args: [{fn: 'returnTrue'}],
                message: 'Argument b is required'
            }
        ]
    }
];

const validator = new Validator(constraints);

console.log('validate {a: 1, b:1}:', validator.validate({a: 1, b: 1}));

process.exit();