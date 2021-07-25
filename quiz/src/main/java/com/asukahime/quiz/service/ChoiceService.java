package com.asukahime.quiz.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.asukahime.quiz.entity.ChoiceEntity;
import com.asukahime.quiz.entity.ChoiceRepository;

@Service
public class ChoiceService {

	@Autowired
	private ChoiceRepository choiceRepository;

	/**
	 * quizId, quizCategoryId に紐づく選択肢リストを返却
	 * @param quizId
	 * @param quizCategoryId
	 * @return
	 */
	@NonNull
	public List<ChoiceEntity> getChoiceListByQuizId(
			@NonNull final Integer quizId,
			@NonNull final Integer quizCategoryId) {
		return choiceRepository.findByQuizIdAndQuizCategoryIdAndDelFlg(quizId, quizCategoryId, "0");
	}

	/**
	 * 与えられたエンティティの登録/更新
	 * @param entity
	 * @return
	 */
	public ChoiceEntity insertUpdate(@NonNull final ChoiceEntity entity) {
		return choiceRepository.save(entity);
	}

	/**
	 * 与えられた複数エンティティの登録/更新
	 * @param entities
	 * @return
	 */
	public List<ChoiceEntity> insertAll(@NonNull final List<ChoiceEntity> entities) {
		return choiceRepository.saveAll(entities);
	}

	/**
	 * 選択肢の採番
	 * @return
	 */
	public Integer getNextId() {
		return ((int)choiceRepository.count()) + 1;
	}
}
