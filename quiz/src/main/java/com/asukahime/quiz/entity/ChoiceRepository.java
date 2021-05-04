package com.asukahime.quiz.entity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

@Repository
public interface ChoiceRepository extends JpaRepository<ChoiceEntity, Integer> {

	@NonNull
	public List<ChoiceEntity> findByQuizIdAndQuizCategoryId(
			@NonNull final Integer quizId,
			@NonNull final Integer quizCategoryId);
}
