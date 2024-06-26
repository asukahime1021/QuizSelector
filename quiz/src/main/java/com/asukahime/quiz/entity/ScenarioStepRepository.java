package com.asukahime.quiz.entity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ScenarioStepRepository extends JpaRepository<ScenarioStepEntity, Integer> {

	public List<ScenarioStepEntity> findByScenarioIdAndQuizCategoryId(int scenarioId, int quizCategoryId);

	public List<ScenarioStepEntity> findByScenarioId(int scenarioId);

	@Query(
			value = "SELECT max(scenario_step_id) from SCENARIO_STEP"
			,nativeQuery = true
	)
	public Integer getMaxId();
}
