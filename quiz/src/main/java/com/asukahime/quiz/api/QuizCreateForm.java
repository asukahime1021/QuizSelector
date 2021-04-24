package com.asukahime.quiz.api;

import java.util.List;

import com.asukahime.quiz.base.AbstractRequestForm;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuizCreateForm extends AbstractRequestForm {

	private static final long serialVersionUID = 1L;

	private String quizName;

	private List<ChoiceForm> choices;

	@Getter
	@Setter
	public static class ChoiceForm extends AbstractRequestForm {

		private static final long serialVersionUID = 1L;

		private Integer choiceNum;

		private String choiceString;

		private boolean isAnswer;
	}
}
