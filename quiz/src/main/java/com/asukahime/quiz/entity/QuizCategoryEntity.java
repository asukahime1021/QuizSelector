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
@Entity(name = "QUIZ_CATEGORY")
public class QuizCategoryEntity extends AbstractEntity {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "quiz_category_id", nullable = false)
	private Integer quizCategoryId;

	@Column(name = "category_text")
	private String categoryText;
}
