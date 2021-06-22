package com.asukahime.quiz.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.asukahime.quiz.entity.GenreMstEntity;
import com.asukahime.quiz.entity.GenreMstRepository;

@Service
public class GenreMstService {

	@Autowired
	private GenreMstRepository genreMstRepository;

	public List<GenreMstEntity> getGenreMstList() {
		return genreMstRepository.findAll();
	}

	public GenreMstEntity getGenreMst(final int genreId) {
		return genreMstRepository.findByGenreId(genreId);
	}

	public Integer getNextId() {
		return ((int)genreMstRepository.count()) + 1;
	}

	public GenreMstEntity insert(@NonNull final GenreMstEntity entity) {
		return genreMstRepository.save(entity);
	}
}
