package com.asukahime.quiz.base;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
public abstract class AbstractEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name = "create_date")
	private Timestamp createDate;

	@Column(name = "lastupdate_date")
	private Timestamp lastupdateDate;

	@Column(name = "del_flg")
	private String delFlg;

}
