package com.asukahime.quiz.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import com.asukahime.quiz.base.AbstractEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "CHOICE")
public class ChoiceEntity extends AbstractEntity{

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "choice_id")
	private Integer choiceId = 0;

	@Column(name = "quiz_id")
	private Integer quizId = 0;

	@Column(name = "quiz_category_id")
	private Integer quizCategoryId = 0;

	@Column(name = "choice_num")
	private Integer choiceNum;

	@Column(name = "choice_text")
	private String choiceText;

	@Column(name = "answer_flg")
	private String answerFlg;

	@Column(name = "answer_order")
	private Integer answerOrder;
}
