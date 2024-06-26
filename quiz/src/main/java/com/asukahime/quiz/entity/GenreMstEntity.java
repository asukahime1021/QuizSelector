package com.asukahime.quiz.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import com.asukahime.quiz.base.AbstractEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "GENRE_MST")
public class GenreMstEntity extends AbstractEntity{

	@Id
	@Column(name = "genre_id")
	private Integer genreId;

	@Column(name = "genre_text")
	private String genreText;
}
