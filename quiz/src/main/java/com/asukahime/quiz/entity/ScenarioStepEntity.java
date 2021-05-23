package com.asukahime.quiz.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import com.asukahime.quiz.base.AbstractEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "SCENARIO_STEP")
public class ScenarioStepEntity extends AbstractEntity {

	@Id
	@Column(name = "SCENARIO_STEP_ID")
	private Integer scenarioStepId;

	@Column(name = "SCENARIO_ID")
	private Integer scenarioId;

	@Column(name = "QUIZ_CATEGORY_ID")
	private Integer quizCategoryId;

	@Column(name = "QUIZ_MST_ID")
	private Integer quizMstId;

	@Column(name = "DISP_ORDER")
	private Integer dispOrder;
}
