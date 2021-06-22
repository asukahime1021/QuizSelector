package com.asukahime.quiz.base;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

public abstract class AbstractApiController<D extends AbstractResponseDto, F extends AbstractRequestForm> {

	abstract protected D mainProcess(@NonNull F form) throws ApplicationException;

	protected CommonResponseDto<D> process(@NonNull F form, @NonNull BindingResult br) {
		final var response = new CommonResponseDto<D>();

		if (br.hasErrors()) {
			response.setCode(String.valueOf(HttpStatus.BAD_REQUEST.value()));

			final var validationResults = new ArrayList<ValidationObject>();
			response.setValidationResults(validationResults);

			br.getAllErrors()
				.stream()
				.map(this::createValidationObject)
				.forEach(validationResults::add);

			return response;
		}

		try {
			response.setResponse(mainProcess(form));
		} catch (ApplicationException e) {
			response.setErrorCode(e.getCode());
			response.setMessage(e.getMessage());

			return response;
		}

		response.setCode(String.valueOf(HttpStatus.OK.value()));
		response.setErrorCode(Constant.SUCCESS);

		return response;
	}

	/**
	 * バリデーションエラーオブジェクトをフィールドごとに作成
	 * @param error
	 * @return
	 */
	@NonNull
	private ValidationObject createValidationObject(@NonNull ObjectError error) {
		var validationObject = new ValidationObject();
		validationObject.setCode(error.getCode());
		validationObject.setDefaultMessage(error.getDefaultMessage());
		return validationObject;
	}
}
