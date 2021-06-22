package com.asukahime.quiz.base;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplicationException extends Exception {

	private String code;
	private String message;

	public ApplicationException(final String message, final Throwable exception) {
		super(message, exception);
	}

	public ApplicationException(final String code, final String message) {
		this.code = code;
		this.message = message;
	}
}
