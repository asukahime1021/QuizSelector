export type QuizCategory = {
    categoryId: number
    categoryText: string
    quizList: Quiz[]
}

export type Quiz = {
    quizId: number
    quizCategoryId: number
    quizText: string
    choiceCount: number
    choiceList: Choice[]
}

export type Choice = {
    choiceId: number
    quizId: number
    choiceText: string
    answerFlg: boolean
    answerNum: number
}
