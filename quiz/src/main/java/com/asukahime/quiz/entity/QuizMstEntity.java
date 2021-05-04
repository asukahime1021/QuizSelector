package com.asukahime.quiz.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.asukahime.quiz.base.AbstractEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "QUIZ_MST")
public class QuizMstEntity extends AbstractEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer quizId;

	@Column(name = "quiz_category_id")
	private Integer quizCategoryId;

	@Column(name = "quiz_text")
	private String quizText;

	@Column(name = "choice_count", columnDefinition = "0")
	private int choiceCount;

	@Column(name = "genreId", columnDefinition = "0")
	private int genreId;
}
