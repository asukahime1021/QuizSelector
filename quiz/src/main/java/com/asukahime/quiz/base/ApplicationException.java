package com.asukahime.quiz.base;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplicationException extends Exception {

	private String code;

	public ApplicationException(final String message, final Throwable exception) {
		super(message, exception);
	}
}
