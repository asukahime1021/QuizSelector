import { Dispatch, SetStateAction } from "react";

interface CommonApiResponse<T> {
    code: string,
    errorCode: string,
    message?: string,
    validationResults?: []
    response?: T
}

interface Scenario {
    categoryList: QuizCategory[]
}

// fetch用interface
interface QuizGetCategory {
    quizCategoryList: QuizCategory[],
    genreMstList: GenreMst[]
}

interface QuizCategory {
    categoryId: number,
    categoryText: string,
    quizList: QuizMst[]
}

interface GenreMst {
    genreId: number,
    genreText: string
}

interface QuizMst {
    quizId: number,
    quizCategoryId: number,
    quizText: string,
    choiceCount: number,
    choiceList: Choice[]
}

interface Choice {
    choiceId: number,
    quizMstId: number,
    quizCategoryId: number,
    choiceText: string,
    answerFlg: boolean,
    answerNum: number
}

interface ContextQuizMst {
    quizMstList: QuizMst[],
    categoryText: string
}

interface CurrentQuizContext {
    initialized: boolean
    categoryCurrentMap: Map<number, ContextQuizMst>
    setCategoryCurrentMap: Dispatch<SetStateAction<Map<number, ContextQuizMst>>>
}

interface CurrentQuizCategory {
    currentQuizCategoryId: number,
    setCurrentQuizCategoryId: Dispatch<SetStateAction<number>>
}

interface CurrentQuizProgress {
    currentQuizProgressMap: Map<number, CurrentQuizProgressDetail>
    setCurrentQuizProgressMap: Dispatch<SetStateAction<Map<number, CurrentQuizProgressDetail>>>
}

interface CurrentQuizProgressDetail {
    // CurrentQuizContext.categoryCurrentMap.quizMstList のカテゴリごとの現在のインデックス
    quizMstIndex: number,
    // そこまでの正答数
    correctedNum: number,
    // 終わったジャンルリスト（スポット用）
    finishedGenreList?: number[],
    // 選択済み選択肢（ライブラ、ファイナル）
    selectedOrder?: number[],
}

export type { CommonApiResponse,
     QuizGetCategory,
     QuizCategory,
     GenreMst,
     QuizMst,
     Choice,
     Scenario,
     CurrentQuizContext,
     CurrentQuizCategory,
     ContextQuizMst,
     CurrentQuizProgress,
     CurrentQuizProgressDetail};
