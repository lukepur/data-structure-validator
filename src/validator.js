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
		const { required, validations } = constraint;
		// validate type
		if (!isType(targetData, constraint)) {
			validationMessages.push({
				[TARGET_PROP]: path,
				[MESSAGE_PROP]: `${path} is not of type ${constraint.type || 'object'} (got ${getType(targetData)})`
			});
			return; // One validation message per constraint member
		}

		// validate required
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
    if (validations) {
      for (let i = 0; i < validations.length; i += 1) {
        const validation = validations[i];
        let result;
				if (constraint.type === 'array') {
					for (let j = 0; j < targetData.length; j += 1) {
            const arrPath = `${path}.${j}`;
						result = resolve(validation, data, context, arrPath);
						if (!result) {
							validationMessages.push({
								[TARGET_PROP]: arrPath,
								[MESSAGE_PROP]: validation.message ? replacePropPlaceholder(validation.message, arrPath) : `${arrPath} is invalid (${validation.fn})`
							});
							return;
						}
					}
				}
				else {
					result = resolve(validation, data, context, path);
					if (!result) {
						validationMessages.push({
							[TARGET_PROP]: path,
							[MESSAGE_PROP]: validation.message ? replacePropPlaceholder(validation.message, path) : `${path} is invalid (${validation.fn})`
						});
						return;
					}
				}
			}
		}
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
