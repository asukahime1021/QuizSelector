package com.asukahime.quiz.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.asukahime.quiz.entity.QuizMstEntity;
import com.asukahime.quiz.entity.QuizMstRepository;

@Service
public class QuizMstService {

	@Autowired
	private QuizMstRepository quizMstRepository;

	/**
	 * quizMstId に紐づく単体のエンティティを返却
	 * @param quizMstId
	 * @return
	 */
	public QuizMstEntity getQuizMstById(@NonNull final Integer quizMstId) {
		return quizMstRepository.getOne(quizMstId);
	}

	/**
	 * quizCategoryId に紐づくエンティティのリストを返却
	 * @param quizCategoryId
	 * @return
	 */
	public List<QuizMstEntity> getQuizMstListByCategoryId(@NonNull final Integer quizCategoryId) {
		return quizMstRepository.findByQuizCategoryId(quizCategoryId);
	}

	/**
	 * 総件数+1を返却
	 * @return
	 */
	public Integer getNextId() {
		return ((int)quizMstRepository.count()) + 1;
	}

	/**
	 * 与えられたエンティティの登録/更新
	 * @param entity
	 * @return
	 */
	public QuizMstEntity insertUpdate(@NonNull final QuizMstEntity entity) {
		return quizMstRepository.save(entity);
	}
}
