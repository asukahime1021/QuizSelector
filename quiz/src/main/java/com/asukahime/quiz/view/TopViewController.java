package com.asukahime.quiz.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class TopViewController {

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String index() {
		return "index.html";
	}
}
