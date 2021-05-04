package com.asukahime.quiz.entity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizMstRepository extends JpaRepository<QuizMstEntity, Integer> {

	public List<QuizMstEntity> findByQuizCategoryId(@NonNull final Integer quizCategoryId);
}
