package com.asukahime.quiz.api.quizget;

import static java.util.stream.Collectors.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.asukahime.quiz.api.quizget.QuizGetDto.GenreMstDto;
import com.asukahime.quiz.api.quizget.QuizGetDto.QuizCategoryDto;
import com.asukahime.quiz.api.quizget.QuizGetDto.QuizChoiceDto;
import com.asukahime.quiz.api.quizget.QuizGetDto.QuizMstDto;
import com.asukahime.quiz.base.AbstractApiController;
import com.asukahime.quiz.base.ApplicationException;
import com.asukahime.quiz.base.CommonResponseDto;
import com.asukahime.quiz.entity.ChoiceEntity;
import com.asukahime.quiz.entity.GenreMstEntity;
import com.asukahime.quiz.entity.QuizCategoryEntity;
import com.asukahime.quiz.entity.QuizMstEntity;
import com.asukahime.quiz.service.QuizService;

@RestController
public class QuizGetController extends AbstractApiController<QuizGetDto, QuizGetForm>{

	@Autowired
	private QuizService quizService;

	@RequestMapping(value = "/api/quizgetone", method = RequestMethod.POST)
	public CommonResponseDto<QuizGetDto> doPost(
			@RequestBody @NonNull final QuizGetForm form,
			@NonNull final BindingResult br) throws Exception {

		return super.process(form, br);
	}

	@RequestMapping(value = "/api/quizgetcategory", method = RequestMethod.GET)
	public CommonResponseDto<QuizGetDto> doGet_getCategories(
			@NonNull final QuizGetForm form,
			@NonNull final BindingResult br) throws Exception {

		form.setOnlyCategory(true);
		return super.process(form, br);
	}

	@RequestMapping(value = "/api/quizgetall", method = RequestMethod.GET)
	public CommonResponseDto<QuizGetDto> doGet_getOne(
			@NonNull final QuizGetForm form,
			@NonNull final BindingResult br) throws Exception {

		return super.process(form, br);
	}

	@Override
	protected QuizGetDto mainProcess(@NonNull final QuizGetForm form) throws ApplicationException {
		if (form.getScenarioId() == null) {
			return createQuizGetDto(form.getQuizCategoryId(), form.isOnlyCategory());
		}

		return new QuizGetDto();
	}

	/**
	 * QuizGetDto を作成します
	 * @param categoryList
	 * @return
	 */
	@SuppressWarnings("null")
	@Nullable
	private QuizGetDto createQuizGetDto(@Nullable final Integer categoryId, final boolean isOnlyCategory) {

		final List<QuizCategoryEntity> categoryList = quizService.getQuizCategoryList(categoryId);
		if (categoryList.isEmpty()) {
			return null;
		}

		final QuizGetDto quizGetDto = new QuizGetDto();

		// クイズカテゴリをレスポンスに設定
		categoryList
			.stream()
			.map(category -> {
				final QuizCategoryDto categoryDto = new QuizCategoryDto();
				categoryDto.setCategoryId(category.getQuizCategoryId());
				categoryDto.setCategoryText(category.getCategoryText());
				categoryDto.setQuizMstList(isOnlyCategory
						? List.of()
						: createQuizMstDtoList(category.getQuizCategoryId()));
				return categoryDto;
			})
			.forEach(quizGetDto.getQuizCategoryList()::add);

		// ジャンルマスタをレスポンスに設定
		final List<GenreMstEntity> genreList = quizService.getGenreMstList();
		genreList
			.stream()
			.map(genre -> {
				final GenreMstDto genreMstDto = new GenreMstDto();
				genreMstDto.setGenreId(genre.getGenreId());
				genreMstDto.setGenreText(genre.getGenreText());
				return genreMstDto;
			})
			.forEach(quizGetDto.getGenreMstList()::add);

		return quizGetDto;
	}

	/**
	 * クイズカテゴリID からQuizMstDto のリストを作成
	 * @param categoryId
	 * @return
	 */
	@SuppressWarnings("null")
	private List<QuizMstDto> createQuizMstDtoList(@NonNull final Integer categoryId) {

		final List<QuizMstEntity> quizMstList = quizService.getQuizList(categoryId);

		return quizMstList
			.stream()
			.map(quizMst -> {
				final QuizMstDto quizMstDto = new QuizMstDto();
				quizMstDto.setQuizCategoryId(categoryId);
				quizMstDto.setQuizId(quizMst.getQuizId());
				quizMstDto.setQuizText(quizMst.getQuizText());
				quizMstDto.setChoiceCount(quizMst.getChoiceCount());
				quizMstDto.setGenreId(quizMst.getGenreId());
				quizMstDto.setChoiceList(createQuizChoiceDtoList(quizMst.getQuizId(), categoryId));
				return quizMstDto;
			})
			.collect(toList());
	}

	/**
	 * クイズカテゴリID, クイズID からQuizChoiceDto のリストを作成
	 * @param quizId
	 * @param categoryId
	 * @return
	 */
	private List<QuizChoiceDto> createQuizChoiceDtoList(@NonNull final Integer quizId, @NonNull final Integer categoryId) {

		final List<ChoiceEntity> choiceList = quizService.getChoiceList(quizId, categoryId);

		return choiceList
				.stream()
				.map(choice -> {
					final QuizChoiceDto quizChoiceDto = new QuizChoiceDto();
					quizChoiceDto.setQuizCategoryId(categoryId);
					quizChoiceDto.setQuizMstId(quizId);
					quizChoiceDto.setChoiceId(choice.getChoiceId());
					quizChoiceDto.setChoiceText(choice.getChoiceText());
					quizChoiceDto.setAnswerFlg(choice.getAnswerFlg().equals("1"));
					quizChoiceDto.setAnswerNum(choice.getAnswerOrder());
					return quizChoiceDto;
				})
				.collect(toList());
	}
}
