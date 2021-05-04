package com.asukahime.quiz.api.quizget;

import java.util.ArrayList;
import java.util.List;

import com.asukahime.quiz.base.AbstractResponseDto;

import lombok.Getter;
import lombok.Setter;

/**
 * クイズ情報取得API用レスポンスDTO
 * @author asuka
 *
 */
@Getter
@Setter
public class QuizGetDto extends AbstractResponseDto {

	private static final long serialVersionUID = 1L;

	private List<QuizCategoryDto> quizCategoryList = new ArrayList<>();

	private List<GenreMstDto> genreMstList = new ArrayList<>();

	/**
	 * クイズカテゴリー用DTO
	 * @author asuka
	 *
	 */
	@Getter
	@Setter
	public static class QuizCategoryDto extends AbstractResponseDto{

		private static final long serialVersionUID = 1L;

		private Integer categoryId;

		private String categoryText;

		private List<QuizMstDto> quizMstList = new ArrayList<>();
	}

	/**
	 * ジャンルマスタ用DTO
	 * @author asuka
	 *
	 */
	@Getter
	@Setter
	public static class GenreMstDto extends AbstractResponseDto {

		private Integer genreId;

		private String genreText;
	}

	/**
	 * クイズマスタ用DTO
	 * @author asuka
	 *
	 */
	@Getter
	@Setter
	public static class QuizMstDto extends AbstractResponseDto {

		private static final long serialVersionUID = 1L;

		private Integer quizId;

		private Integer quizCategoryId;

		private String quizText;

		private Integer choiceCount;

		private Integer genreId;

		private List<QuizChoiceDto> choiceList = new ArrayList<>();
	}

	/**
	 * 選択肢用DTO
	 * @author asuka
	 *
	 */
	@Getter
	@Setter
	public static class QuizChoiceDto extends AbstractResponseDto {

		private static final long serialVersionUID = 1L;

		private Integer choiceId;

		private Integer quizMstId;

		private Integer quizCategoryId;

		private String choiceText;

		private Boolean answerFlg;

		private Integer answerNum;

	}
}
