package com.asukahime.quiz.base;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public abstract class AbstractValidator<F> implements Validator {

	@Override
	public boolean supports(Class<?> clazz) {
		return true;
	}

	@SuppressWarnings("unchecked")
	@Override
	public void validate(Object target, Errors errors) {

		if (!errors.hasErrors()) {
			doValidate((F) target, errors);
		}
	}

	abstract protected void doValidate(final F form, final Errors errors);
}
