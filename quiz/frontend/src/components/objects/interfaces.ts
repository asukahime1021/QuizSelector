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
    genreId: string,
    genreText: string,
    picture: boolean,
    answer: boolean,
    order: number
}

interface ContextQuizMst {
    quizMstList: QuizMst[],
    categoryText: string
}

interface CurrentQuiz {
    initialized: boolean
    categoryCurrentMap: Map<number, ContextQuizMst>
    setCategoryCurrentMap: Dispatch<SetStateAction<Map<number, ContextQuizMst>>>
}

interface CurrentQuizCategory {
    currentQuizCategoryId: number,
    setCurrentQuizCategoryId: Dispatch<SetStateAction<number>>
}

interface CurrentTimer {
    time: number
    timerFlg: boolean
    timerSetFlg: boolean
    timerDispFlg: boolean
}

interface SetCurrentTimer {
    setTime:  Dispatch<SetStateAction<number>>
    setTimerFlg: Dispatch<SetStateAction<boolean>>
    setTimerSetFlg: Dispatch<SetStateAction<boolean>>
    setTimerDispFlg: Dispatch<SetStateAction<boolean>>
}

interface CurrentQuizProgress {
    currentQuizProgressMap: Map<number, CurrentQuizProgressDetail>
    setCurrentQuizProgressMap: Dispatch<SetStateAction<Map<number, CurrentQuizProgressDetail>>>
}

interface CurrentQuizProgressDetail {
    // CurrentQuizContext.categoryCurrentMap.quizMstList のカテゴリごとの現在のインデックス
    quizMstIndex: number,
    // 正解表示フラグ
    showCorrect?: boolean,
    // 選んだ選択肢
    choicedAnswer: [number, number],
    // そこまでの正答数
    correctedNum: number,
    // 進捗数
    progressNum: number,
    // ジャンルリスト（スポット用）
    genreList?: string[],
    // トップ画面フラグ
    isTop?: boolean,
    // 終わったジャンルインデックスリスト（スポット用）
    finishedGenreList?: number[],
    // 選択中のジャンル
    selectedGenreIndex?: number,
    // 選択済み選択肢（ライブラ、ファイナル）
    selectedOrder?: number[],
    // 選択順位の正答判定
    orderResult?: boolean
    // 選択肢がランク外
    outside?: boolean
    // Finalのクリアフラグ
    clear?: boolean
    // 正解ナンバー
    answerNum?: number
    // 正解順位
    answerOrder?: number[]
    // Final失敗
    failed?: boolean
    wrongNum?: number
}

interface QuizResult {
    result: number
    setResult: Dispatch<SetStateAction<number>>
}

interface Ticket {
    ticketInfo: TicketInfo
    setTicketInfo: Dispatch<SetStateAction<TicketInfo>>
}

interface TicketInfo {
    ticketNum: number
    ticketDispFlg: boolean
}

export type { 
    CommonApiResponse,
    QuizGetCategory,
    QuizCategory,
    GenreMst,
    QuizMst,
    Choice,
    Scenario,
    CurrentQuiz,
    CurrentQuizCategory,
    ContextQuizMst,
    CurrentQuizProgress,
    CurrentQuizProgressDetail,
    QuizResult,
    CurrentTimer,
    SetCurrentTimer,
    Ticket,
    TicketInfo};
