package com.asukahime.quiz.util;

import java.sql.Timestamp;
import java.util.Date;

import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.web.servlet.ModelAndView;
import org.thymeleaf.util.StringUtils;

import com.asukahime.quiz.base.AbstractEntity;
import com.asukahime.quiz.view.QuizEditForm;
import com.asukahime.quiz.view.ScenarioEditForm;

public class QuizSelectorUtil {

	public static final Date CURRENT_DATE = new Date();
	public static final Timestamp CURRENT_STAMP = new Timestamp(CURRENT_DATE.getTime());

	public static boolean isEmptyChoice(@Nullable final String choice) {
		return StringUtils.isEmpty(choice) || "-".equals(choice);
	}

	public static void commonAttribute(@NonNull final ModelAndView mav) {
		commonAttribute(mav, null);
	}

	public static void commonAttribute(@NonNull final ModelAndView mav, @Nullable QuizEditForm form) {
		mav.addObject("form", form == null ? new QuizEditForm() : form);
		mav.setViewName("edit.html");
	}

	public static void commonScenarioAttribute(@NonNull final ModelAndView mav, @Nullable ScenarioEditForm form) {
		mav.addObject("form", form == null ? new ScenarioEditForm() : form);
		mav.setViewName("scenario.html");
	}

	public static void setCommonEntityProperties(@NonNull final AbstractEntity entity) {
		entity.setDelFlg("0");
		entity.setCreateDate(CURRENT_STAMP);
		entity.setLastupdateDate(CURRENT_STAMP);
	}
}
