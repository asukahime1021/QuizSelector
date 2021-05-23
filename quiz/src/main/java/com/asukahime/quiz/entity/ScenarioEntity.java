package com.asukahime.quiz.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import com.asukahime.quiz.base.AbstractEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "SCENARIO")
public class ScenarioEntity extends AbstractEntity {

	@Id
	@Column(name = "SCENARIO_ID")
	private Integer scenarioId;

	@Column(name = "SCENARIO_NAME")
	private String scenarioName;
}
