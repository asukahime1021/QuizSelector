package com.asukahime.quiz.entity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreMstRepository extends JpaRepository<GenreMstEntity, Integer> {

	public GenreMstEntity findByGenreId(int genreId);
}
