package com.asukahime.quiz.view;

import java.util.List;

import com.asukahime.quiz.base.AbstractRequestForm;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuizEditForm extends AbstractRequestForm {

	public QuizEditForm() {
		this.rushAnswer = "1";
		this.spotAnswer = "1";
	}

	private String categoryId;

	private String quizText;

	private String genreName;

	private String rushAnswer;
	private String rushChoice1;
	private String rushChoice2;
	private String rushChoice3;
	private String rushChoice4;

	private String spotAnswer;
	private String spotChoice1;
	private String spotChoice2;
	private String spotChoice3;
	private String spotChoice4;
	private String spotChoice5;
	private String spotChoice6;

	private String libraOrder1;
	private String libraChoice1;
	private String libraOrder2;
	private String libraChoice2;
	private String libraOrder3;
	private String libraChoice3;
	private String libraOrder4;
	private String libraChoice4;
	private String libraOrder5;
	private String libraChoice5;
	private String libraOrder6;
	private String libraChoice6;

	private String finalOrder1;
	private String finalChoice1;
	private String finalOrder2;
	private String finalChoice2;
	private String finalOrder3;
	private String finalChoice3;
	private String finalOrder4;
	private String finalChoice4;
	private String finalOrder5;
	private String finalChoice5;
	private String finalOrder6;
	private String finalChoice6;
	private String finalOrder7;
	private String finalChoice7;
	private String finalOrder8;
	private String finalChoice8;
	private String finalOrder9;
	private String finalChoice9;
	private String finalOrder10;
	private String finalChoice10;
	private String finalOrder11;
	private String finalChoice11;

	public List<String> getRushChoiceList() {
		return List.of(rushChoice1, rushChoice2, rushChoice3, rushChoice4);
	}

	public List<String> getSpotChoiceList() {
		return List.of(spotChoice1, spotChoice2, spotChoice3, spotChoice4, spotChoice5, spotChoice6);
	}

	public List<String> getLibraOrderList() {
		return List.of(libraOrder1, libraOrder2, libraOrder3, libraOrder4, libraOrder5, libraOrder6);
	}

	public List<String> getLibraChoiceList() {
		return List.of(libraChoice1, libraChoice2, libraChoice3, libraChoice4, libraChoice5, libraChoice6);
	}

	public List<String> getFinalOrderList() {
		return List.of(finalOrder1, finalOrder2, finalOrder3, finalOrder4, finalOrder5, finalOrder6, finalOrder7, finalOrder8, finalOrder9, finalOrder10, finalOrder11);
	}

	public List<String> getFinalChoiceList() {
		return List.of(finalChoice1, finalChoice2, finalChoice3, finalChoice4, finalChoice5, finalChoice6, finalChoice7, finalChoice8, finalChoice9, finalChoice10, finalChoice11);
	}
}
