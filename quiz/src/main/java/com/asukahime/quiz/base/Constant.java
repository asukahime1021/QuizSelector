package com.asukahime.quiz.base;

import java.util.regex.Pattern;

public class Constant {

	public static final String VALIDATION_ERROR = "001";

	public static final String SUCCESS = "000";

	public static final Integer RUSH = 1;

	public static final Integer SPOT = 2;

	public static final Integer LIBRARY = 3;

	public static final Integer FINAL = 4;

	public static final Pattern PIC_PATTERN = Pattern.compile("^img/.+\\.jpg$ | ^img/.+\\.png");
}
