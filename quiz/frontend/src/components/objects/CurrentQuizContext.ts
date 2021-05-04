interface Choice {
    choiceId: number
    cohiceText: string
    answerFlg: boolean
    answerNum: number
}

export type CurrentQuizContext = {
    categoryId: number
    quizId: number
    quizText: string
    quizCount: number
    choiceList: Choice[]
}
