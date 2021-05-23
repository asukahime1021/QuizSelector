package com.asukahime.quiz.view;

import static com.asukahime.quiz.util.QuizSelectorUtil.*;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.thymeleaf.util.StringUtils;

import com.asukahime.quiz.entity.GenreMstEntity;
import com.asukahime.quiz.service.QuizCreateService;
import com.asukahime.quiz.service.QuizService;

@Controller
public class QuizEditController {

	@Autowired
	private QuizService quizService;

	@Autowired
	private QuizCreateService quizCreateService;

	/**
	 * 事前入力画面に遷移
	 * @param mav
	 * @return
	 */
	@RequestMapping(value = "quizedit", method = RequestMethod.GET)
	public ModelAndView index(@NonNull final ModelAndView mav) {

		final List<GenreMstEntity> genreList = quizService.getGenreMstList();
		final Map<String, String> genreMap = new LinkedHashMap<>();
		genreMap.put("-", "-");
		genreList.forEach(genre -> {
			genreMap.put(genre.getGenreId().toString(), genre.getGenreText());
		});
		mav.addObject("genreMap", genreMap);
		commonAttribute(mav);
		return mav;
	}

	@RequestMapping(value = "quizinput", method = RequestMethod.GET)
	public String input(@NonNull final ModelAndView mav) {
		return "redirect:quizedit";
	}

	/**
	 * 事前登録処理
	 * @param mav
	 * @param form
	 * @return
	 */
	@RequestMapping(value = "quizinput", method = RequestMethod.POST)
	public ModelAndView input(
			@NonNull final ModelAndView mav,
			@NonNull final QuizEditForm form) {

		final List<String> errorList = validate(form);
		mav.addObject("isError", !errorList.isEmpty());
		if (!errorList.isEmpty()) {
			mav.addObject("errors", errorList);
			form.setCategoryId(null);
			commonAttribute(mav, form);
			return mav;
		}

		quizCreateService.create(form);

		form.setCategoryId(null);
		commonAttribute(mav, form);
		mav.addObject("success", true);
		return mav;
	}

	/**
	 * 入力値のバリデーション実施
	 * @param form
	 * @return
	 */
	private List<String> validate(@NonNull final QuizEditForm form) {
		final List<String> errorList = new ArrayList<>();

		validateCategoryId(form.getCategoryId(), errorList);
		validateQuizText(form.getQuizText(), errorList);
		validateChoice(form, errorList);

		return errorList;
	}

	/**
	 * カテゴリIDのバリデーション
	 * @param categoryId
	 * @param errorList
	 */
	private void validateCategoryId(@Nullable final String categoryId, @NonNull List<String> errorList) {
		if ("-".equals(categoryId)) {
			errorList.add("カテゴリを選択して下さい");
		}
	}

	/**
	 * 問題文のバリデーション
	 * @param quizText
	 * @param errorList
	 */
	private void validateQuizText(@Nullable final String quizText, @NonNull List<String> errorList) {
		if (StringUtils.isEmpty(quizText)) {
			errorList.add("問題文を入力して下さい");
		}
	}

	/**
	 * 選択肢のバリデーション
	 * @param form
	 * @param errorList
	 */
	private void validateChoice(@NonNull final QuizEditForm form, @NonNull List<String> errorList) {
		switch(form.getCategoryId()) {
			case "1": validateRush(form, errorList); break;
			case "2": validateSpot(form, errorList); break;
			case "3": validateLibra(form, errorList); break;
			case "4": validateFinal(form, errorList); break;
			default : errorList.add("カテゴリが不正です");
		}
	}

	/**
	 * セレクトラッシュ用の選択肢のバリデーション
	 * @param form
	 * @param errorList
	 */
	private void validateRush(@NonNull final QuizEditForm form, @NonNull List<String> errorList) {

		final boolean allEmpty = form.getRushChoiceList()
				.stream()
				.allMatch(choice -> isEmptyChoice(choice));

		if (allEmpty) {
			errorList.add("1つ以上の選択肢を入力して下さい");
			return;
		}

		boolean answerEmpty = false;
		switch(form.getRushAnswer()) {
			case "1": answerEmpty = isEmptyChoice(form.getRushChoice1());break;
			case "2": answerEmpty = isEmptyChoice(form.getRushChoice2());break;
			case "3": answerEmpty = isEmptyChoice(form.getRushChoice3());break;
			case "4": answerEmpty = isEmptyChoice(form.getRushChoice4());break;
			default: errorList.add("正答が不正な値です");
		}

		if (answerEmpty) {
			errorList.add("正答の選択肢は入力必須です");
		}
	}

	/**
	 * スポットlieト用の選択肢のバリデーション
	 * @param form
	 * @param errorList
	 */
	public void validateSpot(@NonNull final QuizEditForm form, @NonNull List<String> errorList) {

		if (isEmptyChoice(form.getGenreName())) {
			errorList.add("ジャンルは必須入力です");
		}

		final boolean allEmpty = form.getSpotChoiceList()
				.stream()
				.allMatch(choice -> isEmptyChoice(choice));

		if (allEmpty) {
			errorList.add("1つ以上の選択肢を入力して下さい");
			return;
		}

		boolean answerEmpty = false;
		switch(form.getSpotAnswer()) {
			case "1": answerEmpty = isEmptyChoice(form.getSpotChoice1());break;
			case "2": answerEmpty = isEmptyChoice(form.getSpotChoice2());break;
			case "3": answerEmpty = isEmptyChoice(form.getSpotChoice3());break;
			case "4": answerEmpty = isEmptyChoice(form.getSpotChoice4());break;
			case "5": answerEmpty = isEmptyChoice(form.getSpotChoice5());break;
			case "6": answerEmpty = isEmptyChoice(form.getSpotChoice6());break;
			default: errorList.add("正答が不正な値です");
		}

		if (answerEmpty) {
			errorList.add("正答の選択肢は入力必須です");
		}
	}

	/**
	 * バラバライブラリー用の選択肢のバリデーション
	 * @param form
	 * @param errorList
	 */
	public void validateLibra(@NonNull final QuizEditForm form, @NonNull List<String> errorList) {

		final List<String> libraOrderList = form.getLibraOrderList();
		final List<String> libraChoiceList = form.getLibraChoiceList();

		// 全選択肢の空チェック
		final boolean isOrderEmpty = libraOrderList.stream().allMatch(order -> isEmptyChoice(order));
		final boolean isChoiceEmpty = libraChoiceList.stream().allMatch(choice -> isEmptyChoice(choice));
		if (isOrderEmpty || isChoiceEmpty) {
			errorList.add("1つ以上の選択肢, 正答順序を入力して下さい");
			return;
		}

		// 正答順序, 選択肢の相関
		for (int i = 0; i < libraOrderList.size(); i++) {
			final String currentOrder = libraOrderList.get(i);
			if (isEmptyChoice(currentOrder) && !isEmptyChoice(libraChoiceList.get(i))) {
				errorList.add("選択肢が入力されている場合、正答順序は入力必須です");
				return;
			}
			if (!isEmptyChoice(currentOrder) && isEmptyChoice(libraChoiceList.get(i))) {
				errorList.add("正答順序が入力されている場合、選択肢は入力必須です");
				return;
			}

			if (isEmptyChoice(currentOrder)) {
				continue;
			}

			for (int j = i + 1; j < libraOrderList.size(); j++) {
				if (currentOrder.equals(libraOrderList.get(j))) {
					errorList.add("複数の選択肢を同じ正答順序にできません");
					return;
				}
			}
		}
	}

	/**
	 * ファイナル用の選択肢のバリデーション
	 * @param form
	 * @param errorList
	 */
	private void validateFinal(@NonNull final QuizEditForm form, @NonNull final List<String> errorList) {

		final List<String> finalOrderList = form.getFinalOrderList();
		final List<String> finalChoiceList = form.getFinalChoiceList();

		// 全選択肢の空チェック
		final boolean isOrderEmpty = finalOrderList.stream().allMatch(order -> isEmptyChoice(order));
		final boolean isChoiceEmpty = finalChoiceList.stream().allMatch(choice -> isEmptyChoice(choice));
		if (isOrderEmpty || isChoiceEmpty) {
			errorList.add("1つ以上の選択肢, 正答順序を入力して下さい");
			return;
		}

		// 正答順序, 選択肢の相関
		for (int i = 0; i < finalOrderList.size(); i++) {
			final String currentOrder = finalOrderList.get(i);
			if (isEmptyChoice(currentOrder) && !isEmptyChoice(finalChoiceList.get(i))) {
				errorList.add("選択肢が入力されている場合、正答順序は入力必須です");
				return;
			}
			if (!isEmptyChoice(currentOrder) && isEmptyChoice(finalChoiceList.get(i))) {
				errorList.add("正答順序が入力されている場合、選択肢は入力必須です");
				return;
			}

			if (isEmptyChoice(currentOrder)) {
				continue;
			}

			for (int j = i + 1; j < finalOrderList.size(); j++) {
				if (currentOrder.equals(finalOrderList.get(j))) {
					errorList.add("複数の選択肢を同じ正答順序にできません");
					return;
				}
			}
		}
	}
}
