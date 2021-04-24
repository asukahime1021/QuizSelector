package com.asukahime.quiz.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.asukahime.quiz.entity.QuizEntity;
import com.asukahime.quiz.entity.QuizRepository;

@RestController
public class QuizGetController{

	@Autowired
	private QuizRepository quizRepository;

	@RequestMapping(value = "/api/quizget", method = RequestMethod.GET)
	public List<QuizEntity> doGet(final ModelAndView mav) throws Exception {

		return quizRepository.findAll();
	}
}
