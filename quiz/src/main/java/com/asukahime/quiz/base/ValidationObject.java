package com.asukahime.quiz.base;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ValidationObject implements Serializable{

	private static final long serialVersionUID = 1L;

	private String code;

	private String defaultMessage;
}
