package com.asukahime.quiz.api;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import com.asukahime.quiz.base.AbstractValidator;

@Component
public class QuizCreateValidator extends AbstractValidator<QuizCreateForm>{

	@Override
	protected void doValidate(QuizCreateForm form, Errors errors) {
		final var innerFormList = form.getChoices();
		for (int i = 0; i < innerFormList.size(); i++) {
			final var current = innerFormList.get(i);
			for (int j = i + 1; j < innerFormList.size(); j++) {
				final var target = innerFormList.get(j);
				if (current.getChoiceNum() == target.getChoiceNum()) {
					errors.rejectValue("choiceNum", "選択肢番号は同じにできません");
				}
			}
		}
	}
}
