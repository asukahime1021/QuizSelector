package com.asukahime.quiz.service;

import static com.asukahime.quiz.util.QuizSelectorUtil.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asukahime.quiz.entity.ChoiceEntity;
import com.asukahime.quiz.entity.GenreMstEntity;
import com.asukahime.quiz.entity.QuizMstEntity;
import com.asukahime.quiz.view.QuizEditForm;

@Service
public class QuizCreateService {

	@Autowired
	private QuizService quizService;

	@Transactional
	public boolean create(@NonNull final QuizEditForm form) {

		final Integer categoryId = Integer.parseInt(form.getCategoryId());

		final GenreMstEntity genreMst = createGenreMstEntity(categoryId, form);
		final QuizMstEntity quizMst = createQuizMstEntity(categoryId, form, genreMst);
		final List<ChoiceEntity> choiceList = createChoiceEntities(categoryId, quizMst.getQuizId(), form);

		quizService.saveQuizMst(quizMst);
		quizService.saveChoiceList(choiceList);
		if (genreMst != null)
			quizService.saveGenreMst(genreMst);

		return true;
	}

	@NonNull
	private List<ChoiceEntity> createChoiceEntities(
			final int categoryId,
			final int quizId,
			@NonNull final QuizEditForm form) {

		switch(categoryId) {
		case 1: return createChoices(
					categoryId,
					quizId,
					Integer.parseInt(form.getRushAnswer()),
					List.of(),
					form.getRushChoiceList());
		case 2: return createChoices(
					categoryId,
					quizId,
					Integer.parseInt(form.getSpotAnswer()),
					List.of(),
					form.getSpotChoiceList());
		case 3: return createChoices(
					categoryId,
					quizId,
					0,
					form.getLibraOrderList(),
					form.getLibraChoiceList());
		case 4: return createChoices(
					categoryId,
					quizId,
					0,
					form.getFinalOrderList(),
					form.getFinalChoiceList());
		default: return new ArrayList<>();
		}
	}

	/**
	 * 選択肢エンティティの作成
	 * @param categoryId
	 * @param quizId
	 * @param form
	 * @return
	 */
	@NonNull
	private List<ChoiceEntity> createChoices(
			final int categoryId,
			final int quizId,
			final int answer,
			final List<String> orderList,
			final List<String> choiceList) {

		final boolean useOrder = !orderList.isEmpty();

		List<Integer> orderNumList = null;
		if (useOrder) {
			orderNumList = orderList
				.stream()
				.map(order -> {
					if (isEmptyChoice(order)) {
						return 0;
					}
					return Integer.parseInt(order);
				})
				.collect(Collectors.toList());
			orderNumList = sortOrderNumListWithoutBlank(orderNumList, new ArrayList<Integer>(), 0);
		} else {
			orderNumList = List.of();
		}

		final List<ChoiceEntity> entityList = new ArrayList<>();
		int choiceId = quizService.getChoiceNextId();

		int choiceNum = 1;
		for (int i = 0; i < choiceList.size(); i++) {
			if (isEmptyChoice(choiceList.get(i)))
				continue;

			final ChoiceEntity entity = new ChoiceEntity();
			entity.setQuizCategoryId(categoryId);
			entity.setQuizId(quizId);
			entity.setChoiceNum(choiceNum);
			entity.setChoiceId(choiceId++);
			entity.setChoiceText(choiceList.get(i));
			entity.setAnswerFlg(answer == i + 1 ? "1" : "0");
			entity.setAnswerOrder(useOrder ? orderNumList.get(i) : 0);
			setCommonEntityProperties(entity);
			entityList.add(entity);
			choiceNum++;
		}

		return entityList;
	}

	/**
	 * ジャンルマスタエンティティの作成
	 * @param categoryId
	 * @param form
	 * @return
	 */
	@Nullable
	private GenreMstEntity createGenreMstEntity(
			final int categoryId,
			@NonNull final QuizEditForm form) {

		if (categoryId == 2) {
			final GenreMstEntity genreMst = new GenreMstEntity();
			genreMst.setGenreId(quizService.getGenreMstNextId());
			genreMst.setGenreText(form.getGenreName());
			setCommonEntityProperties(genreMst);
			return genreMst;
		}

		return null;
	}

	/**
	 * クイズマスタエンティティの作成
	 * @param categoryId
	 * @param form
	 * @return
	 */
	@NonNull
	private QuizMstEntity createQuizMstEntity(
			final int categoryId,
			@NonNull final QuizEditForm form,
			@Nullable final GenreMstEntity genreMst) {

		final QuizMstEntity quizMst = setCommonProperties(categoryId, form);
		if (genreMst != null) {
			quizMst.setGenreId(genreMst.getGenreId());
		}

		return quizMst;
	}

	/**
	 * クイズマスタの共通設定
	 * @param categoryId
	 * @param form
	 * @return
	 */
	@NonNull
	private QuizMstEntity setCommonProperties(
			final int categoryId,
			@NonNull final QuizEditForm form) {

		final QuizMstEntity quizMst = new QuizMstEntity();
		quizMst.setQuizCategoryId(categoryId);
		quizMst.setQuizId(quizService.getQuizMstNextId());
		quizMst.setQuizText(form.getQuizText());
		setCommonEntityProperties(quizMst);

		return quizMst;
	}

	/**
	 *
	 * @param numList 元のリスト
	 * @param excludeIndexList 計算済みリスト
	 * @param count コールした時点での最小値
	 * @return
	 */
	private List<Integer> sortOrderNumListWithoutBlank(final List<Integer> numList, final List<Integer> excludeIndexList, int currentMin) {

		// 最小値とそのインデックスを取得
		int min = 0;
		int minIndex = 0;
		for (int i = 0; i < numList.size(); i++) {
			if (numList.get(i) == 0) {
				continue;
			}

			// 計算済みリストに含まれていればスキップ
			if (excludeIndexList.contains(i)) {
				continue;
			}

			// 初回or最小値更新の場合は更新
			if (min == 0 || min >= numList.get(i)) {
				min = numList.get(i);
				minIndex = i;
			}
		}

		// 最小値がcurrentMin より大きい場合、currentMin + 1 を最小値として設定
		if (min > currentMin) {
			numList.set(minIndex, currentMin + 1);
		}

		// すべてのインデックスが計算済リストに含まれる場合は元のリストを返却
		excludeIndexList.add(minIndex);
		if (numList.size() == excludeIndexList.size()) {
			return numList;
		}

		// 計算していない値が残っている場合はcurrentMin をインクリメントして再計算
		return sortOrderNumListWithoutBlank(numList, excludeIndexList, ++currentMin);
	}

}
