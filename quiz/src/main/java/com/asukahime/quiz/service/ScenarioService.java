package com.asukahime.quiz.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asukahime.quiz.base.AbstractService;
import com.asukahime.quiz.entity.ScenarioEntity;
import com.asukahime.quiz.entity.ScenarioRepository;
import com.asukahime.quiz.entity.ScenarioStepEntity;
import com.asukahime.quiz.entity.ScenarioStepRepository;
import com.asukahime.quiz.view.ScenarioEditForm;

@Service
public class ScenarioService extends AbstractService {

	@Autowired
	private ScenarioStepRepository scenarioStepRepository;

	@Autowired
	private ScenarioRepository scenarioRepository;

	public List<ScenarioEntity> getScenarioList() {
		return scenarioRepository.findAll();
	}

	public List<ScenarioStepEntity> getScenarioStepList(final int scenarioId, final int categoryId) {
		return scenarioStepRepository.findByScenarioIdAndQuizCategoryId(scenarioId, categoryId);
	}

	/**
	 * シナリオ作成
	 * @param form
	 */
	public List<String> create(final ScenarioEditForm form) {

		final List<String> errors = validate(form);
		if (!errors.isEmpty()) {
			return errors;
		}

		final ScenarioEntity scenario = new ScenarioEntity();
		setCommonProperties(scenario);
		scenario.setScenarioId(getNextScenarioId());
		scenario.setScenarioName(form.getScenarioName());
		scenarioRepository.save(scenario);

		IntStream.range(0, form.getScenarioSRList().size())
		.filter(i -> !form.getScenarioSRList().get(i).equals("0"))
		.forEach(i -> {
			createScenarioStepEntity(scenario.getScenarioId(),
					Integer.parseInt(form.getScenarioSRList().get(i)), 1, i);
		});

		IntStream.range(0, form.getScenarioSLList().size())
		.filter(i -> !form.getScenarioSLList().get(i).equals("0"))
		.forEach(i -> {
			createScenarioStepEntity(scenario.getScenarioId(),
					Integer.parseInt(form.getScenarioSLList().get(i)), 2, i);
		});

		IntStream.range(0, form.getScenarioLRList().size())
		.filter(i -> !form.getScenarioLRList().get(i).equals("0"))
		.forEach(i -> {
			createScenarioStepEntity(scenario.getScenarioId(),
					Integer.parseInt(form.getScenarioLRList().get(i)), 3, i);
		});

		IntStream.range(0, form.getScenarioFIList().size())
		.filter(i -> !form.getScenarioFIList().get(i).equals("0"))
		.forEach(i -> {
			createScenarioStepEntity(scenario.getScenarioId(),
					Integer.parseInt(form.getScenarioFIList().get(i)), 4, i);
		});

		return errors;
	}

	/**
	 * ScenarioEntity を登録
	 * @param scenario
	 * @return
	 */
	public ScenarioEntity insertScenario(final ScenarioEntity scenario) {
		return scenarioRepository.save(scenario);
	}

	/**
	 * ScenarioStepEntity のリストを登録
	 * @param scenarioStepList
	 * @return
	 */
	public List<ScenarioStepEntity> insertScenarioStepList(final List<ScenarioStepEntity> scenarioStepList) {
		return scenarioStepRepository.saveAll(scenarioStepList);
	}

	/**
	 * Scenario のID採番
	 * @return
	 */
	private int getNextScenarioId() {
		return (int)scenarioRepository.count() + 1;
	}

	/**
	 * ScenarioStep のID採番
	 * @return
	 */
	private int getNextScenarioStepId() {
		return (int)scenarioStepRepository.count() + 1;
	}

	/**
	 * ScenarioStepEntity を作成
	 * @param scenarioId
	 * @param quizMstId
	 * @param categoryId
	 * @param dispOrder
	 * @return
	 */
	private ScenarioStepEntity createScenarioStepEntity(
			final int scenarioId,
			final int quizMstId,
			final int categoryId,
			final int dispOrder) {

		final ScenarioStepEntity entity = new ScenarioStepEntity();
		setCommonProperties(entity);
		entity.setScenarioId(scenarioId);
		entity.setQuizMstId(quizMstId);
		entity.setQuizCategoryId(categoryId);
		entity.setScenarioStepId(getNextScenarioStepId());
		entity.setDispOrder(dispOrder);
		return scenarioStepRepository.save(entity);
	}

	private List<String> validate(final ScenarioEditForm form) {
		final List<String> errors = new ArrayList<>();

		if (form.getScenarioName() == null || "".equals(form.getScenarioName())) {
			errors.add("シナリオ名は必須です");
		}

		return errors;
	}
}
