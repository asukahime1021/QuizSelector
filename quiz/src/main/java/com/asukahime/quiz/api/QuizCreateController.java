package com.asukahime.quiz.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asukahime.quiz.base.AbstractApiController;
import com.asukahime.quiz.base.ApplicationException;
import com.asukahime.quiz.base.CommonResponseDto;

@RestController
public class QuizCreateController extends AbstractApiController<QuizCreateDto, QuizCreateForm> {

	@Autowired
	private QuizCreateValidator validator;

	@InitBinder("form")
	public void validatorBinder(WebDataBinder binder) {
		binder.addValidators(validator);
	}

	@PostMapping(value = "/api/quizCreate")
	public CommonResponseDto<QuizCreateDto> doPost(@NonNull QuizCreateForm form,
			@NonNull final BindingResult br) {

		return process(form, br);
	}

	@Override
	protected QuizCreateDto mainProcess(QuizCreateForm form) throws ApplicationException {
		return null;
	}
}
