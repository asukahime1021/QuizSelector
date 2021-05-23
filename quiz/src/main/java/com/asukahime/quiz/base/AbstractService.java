package com.asukahime.quiz.base;

import java.sql.Timestamp;
import java.util.Date;

import org.springframework.lang.NonNull;

public abstract class AbstractService {

	/**
	 * 共通項目の設定
	 * @param entity
	 * @return
	 */
	protected AbstractEntity setCommonProperties(@NonNull final AbstractEntity entity) {

		// 現在時刻

		final Timestamp current = new Timestamp(new Date().getTime());
		// 日時の設定
		if (entity.getCreateDate() == null) {
			entity.setCreateDate(current);
		}
		entity.setLastupdateDate(current);
			// 削除フラグ
		if (entity.getDelFlg() == null) {
			entity.setDelFlg("0");
		}
			return entity;
	}
}
