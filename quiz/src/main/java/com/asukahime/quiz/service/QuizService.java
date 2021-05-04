package com.asukahime.quiz.service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import com.asukahime.quiz.base.AbstractEntity;
import com.asukahime.quiz.entity.ChoiceEntity;
import com.asukahime.quiz.entity.GenreMstEntity;
import com.asukahime.quiz.entity.QuizCategoryEntity;
import com.asukahime.quiz.entity.QuizMstEntity;

@Service
public class QuizService {

	@Autowired
	private QuizCategoryService quizCategoryService;

	@Autowired
	private QuizMstService quizMstService;

	@Autowired
	private ChoiceService choiceService;

	@Autowired
	private GenreMstService genreMstService;

	/**
	 * クイズカテゴリリストを返却
	 * @return
	 */
	public List<QuizCategoryEntity> getQuizCategoryList() {
		return getQuizCategoryList(null);
	}

	public List<QuizCategoryEntity> getQuizCategoryList(@Nullable final Integer categoryId) {
		if (categoryId == null) {
			return quizCategoryService.getQuizCategories();
		}

		final QuizCategoryEntity entity = quizCategoryService.getQuizCategoryById(categoryId);
		if (entity != null) {
			return List.of(entity);
		}

		return List.of();
	}

	/**
	 * クイズカテゴリ内のクイズマスタを返却
	 * @param quizCategoryId
	 * @return
	 */
	public List<QuizMstEntity> getQuizList(@NonNull final Integer quizCategoryId) {
		return quizMstService.getQuizMstListByCategoryId(quizCategoryId);
	}

	/**
	 * クイズに紐づく選択肢リストを返却
	 * @param quizId
	 * @param quizCategoryId
	 * @return
	 */
	public List<ChoiceEntity> getChoiceList(@NonNull final Integer quizId, @NonNull final Integer quizCategoryId) {
		return choiceService.getChoiceListByQuizId(quizId, quizCategoryId);
	}

	/**
	 * クイズカテゴリを登録/更新
	 * @param entity
	 * @return
	 */
	public QuizCategoryEntity saveQuizCategory(@NonNull final QuizCategoryEntity entity) {
		setCommonProperties(entity);
		return quizCategoryService.insertUpdate(entity);
	}

	/**
	 * クイズマスタを登録/更新
	 * @param entity
	 * @return
	 */
	public QuizMstEntity saveQuizMst(@NonNull final QuizMstEntity entity) {
		setCommonProperties(entity);
		return quizMstService.insertUpdate(entity);
	}

	/**
	 * 選択肢を登録/更新
	 * @param entity
	 * @return
	 */
	public ChoiceEntity saveChoice(@NonNull final ChoiceEntity entity) {
		setCommonProperties(entity);
		return choiceService.insertUpdate(entity);
	}

	/**
	 * 選択肢リストを登録/更新
	 * @param entityList
	 * @return
	 */
	public List<ChoiceEntity> saveChoiceList(@NonNull final List<ChoiceEntity> entityList) {
		entityList.forEach(this::setCommonProperties);
		return choiceService.insertAll(entityList);
	}

	/**
	 * ジャンルマスタのリストを取得
	 * @return
	 */
	public List<GenreMstEntity> getGenreMstList() {
		return genreMstService.getGenreMstList();
	}

	/**
	 * 共通項目の設定
	 * @param entity
	 * @return
	 */
	private AbstractEntity setCommonProperties(@NonNull final AbstractEntity entity) {

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
