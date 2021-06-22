package com.asukahime.quiz.api.quizget;

import static com.asukahime.quiz.base.Constant.*;

import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.asukahime.quiz.api.quizget.ScenarioGetDto.CategoryDto;
import com.asukahime.quiz.api.quizget.ScenarioGetDto.ChoiceDto;
import com.asukahime.quiz.api.quizget.ScenarioGetDto.QuizDto;
import com.asukahime.quiz.base.AbstractApiController;
import com.asukahime.quiz.base.ApplicationException;
import com.asukahime.quiz.base.CommonResponseDto;
import com.asukahime.quiz.entity.ChoiceEntity;
import com.asukahime.quiz.entity.GenreMstEntity;
import com.asukahime.quiz.entity.QuizCategoryEntity;
import com.asukahime.quiz.entity.QuizMstEntity;
import com.asukahime.quiz.entity.ScenarioStepEntity;
import com.asukahime.quiz.service.QuizService;
import com.asukahime.quiz.service.ScenarioService;

@RestController
public class ScenarioGetController extends AbstractApiController<ScenarioGetDto, ScenarioGetForm>{

	@Autowired
	private ScenarioService scenarioService;

	@Autowired
	private QuizService quizService;

	@RequestMapping(value = "/api/getScenarioQuizes", method = RequestMethod.GET)
	public CommonResponseDto<ScenarioGetDto> doGet_getScenario(
			@NonNull final ScenarioGetForm form,
			@NonNull final BindingResult br) throws Exception {

		return super.process(form, br);
	}

	@SuppressWarnings("null")
	@Override
	protected ScenarioGetDto mainProcess(@NonNull ScenarioGetForm form) throws ApplicationException {

		final ScenarioGetDto response = new ScenarioGetDto();

		if (!validate(form.getScenarioId())) {
			new ApplicationException(VALIDATION_ERROR, "scenarioId は必須です");
		}

		final List<ScenarioStepEntity> stepList = scenarioService.getScenarioStepList(form.getScenarioId());
		final Map<Integer, List<ScenarioStepEntity>> categoryScenarioMap =
				stepList.stream().collect(Collectors.groupingBy(ScenarioStepEntity::getQuizCategoryId));

		final List<CategoryDto> categoryList = categoryScenarioMap
			.entrySet()
			.stream()
			.map(entry -> createCategoryDto(entry.getKey(), entry.getValue()))
			.collect(Collectors.toList());

		response.setCategoryList(categoryList);

		return response;
	}

	private boolean validate(@Nullable Integer scenarioId) {
		return scenarioId != null;
	}

	private CategoryDto createCategoryDto(
			@NonNull final Integer categoryId,
			@NonNull final List<ScenarioStepEntity> stepList) {

		final QuizCategoryEntity category = quizService.getQuizCategory(categoryId);
		final CategoryDto dto = new CategoryDto();
		dto.setCategoryId(categoryId);
		dto.setCategoryText(category.getCategoryText());
		final List<QuizDto> quizList = stepList
				.stream()
				.map(step -> quizService.getQuizMst(step.getQuizMstId()))
				.map(quiz -> createQuizDto(quiz))
				.collect(Collectors.toList());
		dto.setQuizList(quizList);
		return dto;
	}

	private QuizDto createQuizDto(@NonNull final QuizMstEntity quiz) {

		final QuizDto dto = new QuizDto();
		dto.setQuizId(quiz.getQuizId());
		dto.setQuizText(quiz.getQuizText());
		dto.setChoiceCount(quiz.getChoiceCount());
		final GenreMstEntity genre = quizService.getGenreMst(quiz.getGenreId());
		final List<ChoiceEntity> choices = quizService.getChoiceList(quiz.getQuizId(), quiz.getQuizCategoryId());
		final List<ChoiceDto> choiceDtoList = choices
			.stream()
			.map(choice ->
				createChoiceDto(
					quiz,
					genre,
					choice))
			.collect(Collectors.toList());
		dto.setChoiceList(choiceDtoList);
		return dto;
	}

	private ChoiceDto createChoiceDto(
			@NonNull final QuizMstEntity quiz,
			@Nullable final GenreMstEntity genre,
			@NonNull final ChoiceEntity choice) {

		final int categoryId = quiz.getQuizCategoryId();
		final ChoiceDto dto = new ChoiceDto();
		dto.setChoiceId(choice.getChoiceId());
		dto.setChoiceText(choice.getChoiceText());
		if (categoryId == SPOT && genre != null) {
			dto.setGenreId(genre.getGenreId());
			dto.setGenreText(genre.getGenreText());
			dto.setPicture(isPictureChoice(choice.getChoiceText()));
		}
		if (categoryId == RUSH || categoryId == SPOT) {
			dto.setAnswer("1".equals(choice.getAnswerFlg()));
		}
		if (categoryId == LIBRARY || categoryId == FINAL) {
			dto.setOrder(choice.getAnswerOrder());
		}
		return dto;
	}

	/**
	 * 選択肢文字列が画像パスか判定
	 * @param choiceText
	 * @return
	 */
	private boolean isPictureChoice(@NonNull final String choiceText) {
		final Matcher matcher = PIC_PATTERN.matcher(choiceText);
		return matcher.matches();
	}
}
