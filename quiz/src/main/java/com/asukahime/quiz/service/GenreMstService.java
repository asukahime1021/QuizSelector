package com.asukahime.quiz.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
}
