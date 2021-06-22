package com.asukahime.quiz.api.quizget;

import java.util.List;

import com.asukahime.quiz.base.AbstractResponseDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScenarioGetDto extends AbstractResponseDto {

	private static final long serialVersionUID = 1L;

	private List<CategoryDto> categoryList;

	@Getter
	@Setter
	public static class CategoryDto extends AbstractResponseDto {

		private static final long serialVersionUID = 1L;

		private int categoryId;

		private String categoryText;

		private List<QuizDto> quizList;
	}

	@Getter
	@Setter
	public static class QuizDto extends AbstractResponseDto {

		private static final long serialVersionUID = 1L;

		private int quizId;

		private String quizText;

		private int choiceCount;

		private List<ChoiceDto> choiceList;
	}

	@Getter
	@Setter
	public static class ChoiceDto extends AbstractResponseDto {

		private static final long serialVersionUID = 1L;

		private int choiceId;

		private String choiceText;

		private boolean isAnswer;

		// ------ スポット用
		private Integer genreId;

		private String genreText;

		private boolean isPicture;
		// ------ スポット用

		// ------ バラバラ, final用
		private int order;
	}
}
