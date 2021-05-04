package com.asukahime.quiz.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.asukahime.quiz.entity.QuizCategoryEntity;
import com.asukahime.quiz.entity.QuizCategoryRepository;

@Service
public class QuizCategoryService {

	@Autowired
	private QuizCategoryRepository quizCategoryRepository;

	/**
	 * 全エンティティを返却
	 * @return
	 */
	public List<QuizCategoryEntity> getQuizCategories() {
		return quizCategoryRepository.findAll();
	}

	/**
	 * quizCategoryId に紐づく単体のエンティティを返却
	 * @param quizCategoryId
	 * @return
	 */
	public QuizCategoryEntity getQuizCategoryById(@NonNull final Integer quizCategoryId) {
		return quizCategoryRepository.getOne(quizCategoryId);
	}

	/**
	 * 与えられたエンティティの登録/更新
	 * @param entity
	 * @return
	 */
	public QuizCategoryEntity insertUpdate(@NonNull final QuizCategoryEntity entity) {
		return quizCategoryRepository.save(entity);
	}
}
