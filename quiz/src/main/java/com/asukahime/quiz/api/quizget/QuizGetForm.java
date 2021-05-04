package com.asukahime.quiz.api.quizget;

import com.asukahime.quiz.base.AbstractRequestForm;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuizGetForm extends AbstractRequestForm {

	private static final long serialVersionUID = 1L;

	private Integer quizCategoryId;

	private boolean onlyCategory = false;
}
