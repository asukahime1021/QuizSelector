package com.asukahime.quiz.view;

import static com.asukahime.quiz.util.QuizSelectorUtil.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.asukahime.quiz.entity.QuizCategoryEntity;
import com.asukahime.quiz.service.QuizService;
import com.asukahime.quiz.service.ScenarioService;

@Controller
public class ScenarioEditController {

	@Autowired
	private QuizService quizService;

	@Autowired
	private ScenarioService scenarioCreateService;

	@RequestMapping(value = "scenarioedit", method = RequestMethod.GET)
	public ModelAndView index(@NonNull final ModelAndView mav) {
		commonScenarioAttribute(mav, new ScenarioEditForm());

		setQuizMap(mav);

		return mav;
	}

	@RequestMapping(value = "scenarioinput", method = RequestMethod.GET)
	public String doGet() {
		return "redirect:scenarioedit";
	}

	@RequestMapping(value = "scenarioinput", method = RequestMethod.POST)
	public ModelAndView doPost(@NonNull final ModelAndView mav,
			@NonNull final ScenarioEditForm form) {
		commonScenarioAttribute(mav, form);

		final List<String> errors = scenarioCreateService.create(form);
		if (!errors.isEmpty()) {
			mav.addObject("errors", errors);
			mav.addObject("isError", true);
		}
		setQuizMap(mav);
		mav.addObject("success", true);
		return mav;
	}

	private void setQuizMap(final ModelAndView mav) {
		final Map<Integer, List<Pair<Integer, String>>> quizMap = new HashMap<>();

		final List<QuizCategoryEntity> categoryList = quizService.getQuizCategoryList();
		for (final QuizCategoryEntity category : categoryList) {
			@SuppressWarnings("null")
			final List<Pair<Integer, String>> quizMstList = quizService
					.getQuizList(category.getQuizCategoryId())
					.stream()
					.map(quizMst -> {
						final String text = quizMst.getQuizText();
						if (text.length() > 20) {
							return Pair.of(quizMst.getQuizId(), text.substring(0, 20) + "...");
						}
						return Pair.of(quizMst.getQuizId(), text);
					})
					.collect(Collectors.toList());
			quizMap.put(category.getQuizCategoryId(), quizMstList);
		}
		mav.addObject("quizMap", quizMap);

	}
}
