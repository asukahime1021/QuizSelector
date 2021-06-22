package com.asukahime.quiz.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import com.asukahime.quiz.base.AbstractService;
import com.asukahime.quiz.entity.ChoiceEntity;
import com.asukahime.quiz.entity.GenreMstEntity;
import com.asukahime.quiz.entity.QuizCategoryEntity;
import com.asukahime.quiz.entity.QuizMstEntity;

@Service
public class QuizService extends AbstractService {

	@Autowired
	private QuizCategoryService quizCategoryService;

	@Autowired
	private QuizMstService quizMstService;

	@Autowired
	private ChoiceService choiceService;

	@Autowired
	private GenreMstService genreMstService;


// ------------------------------
// クイズカテゴリ
// ------------------------------
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
	 * クイズカテゴリを登録/更新
	 * @param entity
	 * @return
	 */
	public QuizCategoryEntity saveQuizCategory(@NonNull final QuizCategoryEntity entity) {
		setCommonProperties(entity);
		return quizCategoryService.insertUpdate(entity);
	}

	/**
	 * クイズカテゴリを返却
	 * @param categoryId
	 * @return
	 */
	public QuizCategoryEntity getQuizCategory(@NonNull final Integer categoryId) {
		return quizCategoryService.getQuizCategoryById(categoryId);
	}

// ------------------------------
// クイズマスタ
// ------------------------------
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
	 * クイズマスタIDの採番
	 * @return
	 */
	public Integer getQuizMstNextId() {
		return quizMstService.getNextId();
	}

	/**
	 * 単一のQuizMstエンティティを返却
	 * @param quizMstId
	 * @return
	 */
	public QuizMstEntity getQuizMst(final int quizMstId) {
		return quizMstService.getQuizMstById(quizMstId);
	}

// ------------------------------
// 選択肢
// ------------------------------
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
	 * 選択肢の採番
	 * @return
	 */
	public Integer getChoiceNextId() {
		return choiceService.getNextId();
	}

// ------------------------------
// ジャンル
// ------------------------------
	/**
	 * ジャンルマスタのリストを取得
	 * @return
	 */
	public List<GenreMstEntity> getGenreMstList() {
		return genreMstService.getGenreMstList();
	}

	public GenreMstEntity getGenreMst(final int genreId) {
		return genreMstService.getGenreMst(genreId);
	}

	/**
	 * ジャンルマスタの採番
	 * @return
	 */
	public Integer getGenreMstNextId() {
		return genreMstService.getNextId();
	}

	/**
	 * ジャンルマスタの登録
	 * @param entity
	 * @return
	 */
	public GenreMstEntity saveGenreMst(@NonNull final GenreMstEntity entity) {
		return genreMstService.insert(entity);
	}

}
