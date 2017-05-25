const assert = require('assert');
const { find, isEmpty, assign, get } = require('lodash');
const resolve = require('data-resolver');

const defaultContext = require('./context');

const TARGET_PROP = 'target';
const MESSAGE_PROP = 'message';

const Validator = function (constraintConfiguration, ctx = {}) {
  validateConstraintConfiguration(constraintConfiguration);
	const context = assign({}, defaultContext, ctx);
	this.validate = function (data) {
		// For each constraint member:
		// 1. Ensure type correct (allow undefined - will be caught by required)
		// 2. Check for fn: required validation in `validations` (return message if failed)
		// 3. if children, childValidationMessages = validate(children). If childValidationMessages, return childValidationMessages 
		// 4. for each remaining validation:
		//   a) validateMessage = resolveValidation(validation, data)
		//   b) if validateMessage, return validateMessage
		// 5. return undefined
		const validationMessages = [];
		constraintConfiguration.forEach(constraint => {
			const path = constraint.id;
			const validations = constraint.validations || [];
			validateNode(constraint, path, data, validationMessages);
		});
		return validationMessages.length ? validationMessages : undefined;
	};

	this.meta = function () {
		return constraintConfiguration;
	};

	function validateNode(constraint, path, data, validationMessages) {
		const targetData = get(data, path);
		// validate type
		if (!isType(targetData, constraint)) {
			validationMessages.push({
				[TARGET_PROP]: path,
				[MESSAGE_PROP]: `${path} is not of type ${constraint.type || 'object'} (got ${getType(targetData)})`
			});
			return; // One validation message per constraint member
		}

		// validate required
		const required = constraint.required;
		if (required && isBlank(targetData)) {
			if (!required.fn) {
				addRequiredValidationMessage(required, validationMessages, path);
				return;
			}
			// required is a resolvable
			const resolvedRequired = resolve(required, data, context, path);
			if (resolvedRequired) {
				addRequiredValidationMessage(resolvedRequired, validationMessages, path);
				return;
			}
		}

		// Other validations

		// recurse down
    const { children } = constraint;
		if (Array.isArray(children)) {
			children.forEach(childConstraint => {
				validateNode(childConstraint, path + '.' + childConstraint.id, data, validationMessages);
			});
		}
	}
}

function getType(data) {
	const type = typeof data;
	if (type === 'object' && Array.isArray(data)) return 'array';
	return type;
}

function isType(data, constraint) {
  const { type } = constraint;
  if (constraint.children && getType(data) === 'object') return true;
	return getType(data) === type || data === undefined;
}

function isBlank(data) {
	return data === undefined || data === null || data === '' || (typeof data === 'object' && isEmpty(data));
}

function addRequiredValidationMessage(required, messages, prop) {
	messages.push({
		[TARGET_PROP]: prop,
		[MESSAGE_PROP]: constructRequiredMessage(required, prop)
	});
}

function constructRequiredMessage(required, prop) {
	let message;
	if (typeof required === 'string') {
		message = required;
	}
	else if (typeof required.message === 'string') {
		message = required.message;
	}
	else {
		return `${prop} is required`;
	}
	return replacePropPlaceholder(message, prop);
}

function replacePropPlaceholder(string, prop) {
	return string.replace(/\$prop/g, prop);
}

function validateConstraintConfiguration(config) {
	if (!Array.isArray(config)) {
		throw new Error('Configuration must be array');
	}

	// recursively ensure each node has a type
	config.forEach(constraint => {
		ensureHasType(constraint);
	});
}

function ensureHasType(constraint) {
	if (!constraint.type && !constraint.children) {
		throw new Error(`${constraint.id} does not have a type`);
	}
	if (constraint.children) {
		constraint.children.forEach(c => ensureHasType(c))
	}
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
				args: [{ fn: 'returnTrue' }],
				message: 'Argument b is required'
			}
		]
	}
];

// const validator = new Validator(constraints);

// Valid
// assert.equal(validator.validate({a: 1, b:1}), undefined);

// Invalid a - not provided
// assert.equal(validator.validate({b: 0}), [{target: 'a', message: 'Argument a is required'}]);

// Invalid a - not a number
// assert.equal(validator.validate({a: 'string', b: 1}), [{target: 'a', message: 'a must be a number (got "string")'}])

// Invalid b - not provided
// assert.equal(validator.validate({a: 1}), [{target: 'b', message: 'Argument b is required'}]);

// Invalid b - not a number
// assert.equal(validator.validate({b: 'string', a: 1}), [{target: 'b', message: 'b must be a number (got "string")'}])
