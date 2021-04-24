package com.asukahime.quiz.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "QUIZ")
public class QuizEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@Column(name = "quiz_name")
	private String quizName;

	@Column(name = "choice_count")
	private int choiceCount;

	@Column(name = "create_date")
	private Timestamp createDate;

	@Column(name = "lastupdate_date")
	private Timestamp lastupdateDate;

}
