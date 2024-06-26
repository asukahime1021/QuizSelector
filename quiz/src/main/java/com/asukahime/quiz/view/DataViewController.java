package com.asukahime.quiz.view;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import com.asukahime.quiz.base.ApplicationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.asukahime.quiz.entity.ChoiceEntity;
import com.asukahime.quiz.entity.ScenarioEntity;
import com.asukahime.quiz.service.QuizService;
import com.asukahime.quiz.service.ScenarioService;

import lombok.Getter;
import lombok.Setter;

@Controller
public class DataViewController {

	@Autowired
	private QuizService quizService;

	@Autowired
	private ScenarioService scenarioService;

	@RequestMapping(value = "top", method = RequestMethod.GET)
	public ModelAndView index() {
		final ModelAndView mav = new ModelAndView();
		mav.setViewName("dataview.html");

		final List<ScenarioEntity> scenarioEntityList = scenarioService.getScenarioList();
		final List<ScenarioResponseDto> scenarioList = new ArrayList<>();
		IntStream.range(1, scenarioEntityList.size() + 1)
			.mapToObj(i -> {
				final ScenarioEntity scenario = scenarioEntityList.get(i - 1);
				final int scenarioId = scenario.getScenarioId();
				final ScenarioResponseDto dto = new ScenarioResponseDto();
				dto.setRowNum(scenarioId);
				dto.setScenarioName(scenario.getScenarioName());

				dto.setRushList(createQuizTextList(scenarioId, 1));

				dto.setLiteList(createQuizTextList(scenarioId, 2));

				dto.setLibraList(createQuizTextList(scenarioId, 3));

				dto.setFinalList(createQuizTextList(scenarioId, 4));
				return dto;
			})
			.forEach(scenarioList::add);

		final List<Integer> scenarioIdList = scenarioEntityList
				.stream()
				.map(ScenarioEntity::getScenarioId)
				.collect(Collectors.toList());

		final List<RushResponseDto> rushList = quizService.getQuizList(1)
			.stream()
			.map(quiz -> {
				final RushResponseDto dto = new RushResponseDto(quiz.getQuizText());
				final List<ChoiceEntity> choices = quizService.getChoiceList(quiz.getQuizId(), 1);
				dto.setChoiceList(createChoiceList(choices, 4));
				dto.setAnswerNum(choices.stream().filter(ch -> "1".equals(ch.getAnswerFlg())).findFirst().get().getChoiceNum());
				return dto;
			})
			.collect(Collectors.toList());

		final List<LiteResponseDto> liteList = quizService.getQuizList(2)
			.stream()
			.map(quiz -> {
				final LiteResponseDto dto = new LiteResponseDto(quiz.getQuizText());
				final List<ChoiceEntity> choices = quizService.getChoiceList(quiz.getQuizId(), 2);
				dto.setChoiceList(createChoiceList(choices, 5));
				dto.setGenre(quizService.getGenreMst(quiz.getGenreId()).getGenreText());
				dto.setAnswerNum(choices.stream().filter(ch -> "1".equals(ch.getAnswerFlg())).findFirst().get().getChoiceNum());
				return dto;
			})
			.collect(Collectors.toList());

		final List<LibraResponseDto> libraList = quizService.getQuizList(3)
			.stream()
			.map(quiz -> {
				final LibraResponseDto dto = new LibraResponseDto(quiz.getQuizText());
				final List<ChoiceEntity> choices = quizService.getChoiceList(quiz.getQuizId(), 3);
				dto.setChoiceList(createChoiceList(choices, 5));
				dto.setAnswerOrderStr(generateAnswerOrderStr(choices));
				return dto;
			})
			.collect(Collectors.toList());

		final List<FinalResponseDto> finalList = quizService.getQuizList(4)
			.stream()
			.map(quiz -> {
				final FinalResponseDto dto = new FinalResponseDto(quiz.getQuizText());
				final List<ChoiceEntity> choices = quizService.getChoiceList(quiz.getQuizId(), 4);
				dto.setChoiceList(createChoiceList(choices, 11));
				dto.setAnswerOrderStr(generateAnswerOrderStr(choices));
				return dto;
			})
			.collect(Collectors.toList());

		mav.addObject("scenarioIdList", scenarioIdList);
		mav.addObject("scenarioList", scenarioList);
		mav.addObject("rushQuizList", rushList);
		mav.addObject("liteQuizList", liteList);
		mav.addObject("libraQuizList", libraList);
		mav.addObject("finalQuizList", finalList);
		mav.addObject("dataViewForm", new DataViewForm());
		return mav;
	}

	@RequestMapping(value = "scenariodelete", method = RequestMethod.POST)
	public ModelAndView delete(
			@NonNull final ModelAndView mav,
			@NonNull final DataViewForm form
	) {
		final String scenarioIdStr = form.getScenarioId();
		if (scenarioIdStr == null) {
			mav.addObject("error", "シナリオIDが不正です");
		}

		scenarioService.delete(Integer.parseInt(scenarioIdStr));

		mav.setViewName("redirect:top");
		return mav;
	}

	/**
	 * 問題文のリストを作成
	 *
	 * @param scenarioId
	 * @param categoryId
	 * @return
	 */
	private List<String> createQuizTextList(final int scenarioId, final int categoryId) {
		return scenarioService.getScenarioStepList(scenarioId, categoryId)
		.stream()
		.map(step -> cutQuizStringOrStay(step.getQuizMstId()))
		.collect(Collectors.toList());
	}

	/**
	 * クイズの問題文を取得し、20文字を超える場合は超えた分を"..."に置き換える
	 *
	 * @param quizMstId
	 * @return
	 */
	@NonNull
	private String cutQuizStringOrStay(final int quizMstId) {
		final String text = quizService.getQuizMst(quizMstId).getQuizText();
		if (text.length() > 20) {
			return text.substring(0, 20) + "...";
		}

		return text;
	}

	/**
	 * 選択肢リストを正答順序で並び替え、"→"で連結する
	 *
	 * @param choiceList
	 * @return
	 */
	@NonNull
	private String generateAnswerOrderStr(final List<ChoiceEntity> choiceList) {
		final List<String> ch = choiceList.stream()
		.sorted((c1, c2) -> c1.getAnswerOrder().compareTo(c2.getAnswerOrder()))
		.map(choice -> String.valueOf(choice.getChoiceNum()))
		.collect(Collectors.toList());

		return String.join(" → ", ch);
	}

	/**
	 * 与えられたChoiceリストから選択肢テキストのリストを作成し、要素数がcount に満たない場合は"-"で埋める
	 *
	 * @param choices
	 * @param count
	 * @return
	 */
	private List<String> createChoiceList(final List<ChoiceEntity> choices, final int count) {
		final List<String> choiceList = choices
				.stream()
				.map(ChoiceEntity::getChoiceText)
				.collect(Collectors.toList());

		if (choiceList.size() < count) {
			for (int i = choiceList.size(); i < count; i++) {
				choiceList.add("-");
			}
		}

		return choiceList;
	}

	@Getter
	@Setter
	public static class ScenarioResponseDto implements Serializable{
		private static final long serialVersionUID = 1L;

		private int rowNum;

		private String scenarioName;

		private String genreName;

		private List<String> rushList;

		private List<String> liteList;

		private List<String> libraList;

		private List<String> finalList;
	}

	@Getter
	@Setter
	public static class RushResponseDto implements Serializable {
		private static final long serialVersionUID = 1L;

		public RushResponseDto() {}
		public RushResponseDto(String quizText) {
			this.quizText = quizText;
		}

		private int rowNum;

		private String quizText;
		private Integer answerNum;
		private List<String> choiceList = new ArrayList<>();
	}

	@Getter
	@Setter
	public static class LiteResponseDto implements Serializable {
		private static final long serialVersionUID = 1L;

		public LiteResponseDto() {}
		public LiteResponseDto(String quizText) {
			this.quizText = quizText;
		}

		private int rowNum;

		private String quizText;
		private Integer answerNum;
		private String genre;
		private List<String> choiceList = new ArrayList<>();
	}

	@Getter
	@Setter
	public static class LibraResponseDto implements Serializable {
		private static final long serialVersionUID = 1L;

		public LibraResponseDto() {}
		public LibraResponseDto(String quizText) {
			this.quizText = quizText;
		}

		private int rowNum;

		private String quizText;
		private String answerOrderStr;
		private List<String> choiceList = new ArrayList<>();
	}

	@Getter
	@Setter
	public static class FinalResponseDto implements Serializable {
		private static final long serialVersionUID = 1L;

		public FinalResponseDto() {}
		public FinalResponseDto(String quizText) {
			this.quizText = quizText;
		}

		private int rowNum;

		private String quizText;
		private String answerOrderStr;
		private List<String> choiceList = new ArrayList<>();
	}
}
