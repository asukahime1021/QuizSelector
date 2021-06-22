package com.asukahime.quiz.base;

import java.io.Serializable;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommonResponseDto<D extends AbstractResponseDto> implements Serializable{

	private static final long serialVersionUID = 1L;

	private String code;

	private String errorCode;

	private String message;

	private List<ValidationObject> validationResults;

	private D response;

}
