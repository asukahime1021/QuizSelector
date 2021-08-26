package com.asukahime.quiz.view;

import java.util.List;

import com.asukahime.quiz.base.AbstractRequestForm;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScenarioEditForm extends AbstractRequestForm {

	private static final long serialVersionUID = 1L;

	private String scenarioName;

	private String scenarioSR1;
	private String scenarioSR2;
	private String scenarioSR3;
	private String scenarioSR4;
	private String scenarioSR5;
	private String scenarioSR6;
	private String scenarioSR7;
	private String scenarioSR8;
	private String scenarioSR9;
	private String scenarioSR10;
	private String scenarioSR11;
	private String scenarioSR12;
	private String scenarioSR13;
	private String scenarioSR14;
	private String scenarioSR15;
	private String scenarioSR16;
	private String scenarioSR17;
	private String scenarioSR18;
	private String scenarioSR19;
	private String scenarioSR20;

	private String scenarioSL1;
	private String scenarioSL2;
	private String scenarioSL3;
	private String scenarioSL4;
	private String scenarioSL5;
	private String scenarioSL6;
	private String scenarioSL7;
	private String scenarioSL8;

	private String scenarioLR1;
	private String scenarioLR2;
	private String scenarioLR3;
	private String scenarioLR4;
	private String scenarioLR5;
	private String scenarioLR6;
	private String scenarioLR7;
	private String scenarioLR8;

	private String scenarioFI1;
	private String scenarioFI2;
	private String scenarioFI3;
	private String scenarioFI4;
	private String scenarioFI5;
	private String scenarioFI6;
	private String scenarioFI7;
	private String scenarioFI8;

	public List<String> getScenarioSRList() {
		return List.of(scenarioSR1, scenarioSR2, scenarioSR3, scenarioSR4, scenarioSR5, scenarioSR6, scenarioSR7, scenarioSR8, scenarioSR9, scenarioSR10, scenarioSR11, scenarioSR12, scenarioSR13, scenarioSR14, scenarioSR15, scenarioSR16, scenarioSR17, scenarioSR18, scenarioSR19, scenarioSR20);
	}

	public List<String> getScenarioSLList() {
		return List.of(scenarioSL1, scenarioSL2, scenarioSL3, scenarioSL4, scenarioSL5, scenarioSL6, scenarioSL7, scenarioSL8);
	}

	public List<String> getScenarioLRList() {
		return List.of(scenarioLR1, scenarioLR2, scenarioLR3, scenarioLR4, scenarioLR5, scenarioLR6, scenarioLR7, scenarioLR8);
	}

	public List<String> getScenarioFIList() {
		return List.of(scenarioFI1, scenarioFI2, scenarioFI3, scenarioFI4, scenarioFI5, scenarioFI6, scenarioFI7, scenarioFI8);
	}
}
