package com.asukahime.quiz.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import com.asukahime.quiz.base.AbstractEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "QUIZ_MST")
public class QuizMstEntity extends AbstractEntity {

	@Id
	private Integer quizId = 0;

	@Column(name = "quiz_category_id")
	private Integer quizCategoryId = 0;

	@Column(name = "quiz_text")
	private String quizText;

	@Column(name = "choice_count")
	private int choiceCount;

	@Column(name = "genreId")
	private int genreId;
}
