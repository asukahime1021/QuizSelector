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

interface CurrentQuizContext {
    categoryCurrentMap: Map<number, QuizMst[]>
    setCategoryCurrentMap: Dispatch<SetStateAction<Map<number, QuizMst[]>>>
}

interface AnswerStateContext {
    answerCurrentMap: Map<number, number>

}

interface AnswerState {
    
}
export type { CommonApiResponse, QuizGetCategory, QuizCategory, GenreMst, QuizMst, Choice, Scenario, CurrentQuizContext};