package com.asukahime.quiz.view;

import com.asukahime.quiz.base.AbstractRequestForm;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DataViewForm extends AbstractRequestForm {

    private static final long serialVersionUID = 1L;

    private String scenarioId;
}
