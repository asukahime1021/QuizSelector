import React, { useContext, useState } from 'react';
import { TimerContext } from '../objects/TimerContext'
import { QuizCategory } from '../objects/Entities';
import { CurrentQuizContext } from '../objects/CurrentQuizContext';

// Context で利用する変数をオブジェクトごとに定義
export type ContextProps = {
    timerContext: TimerContext
    quizContext?: QuizCategory
    currentQuizContext?: CurrentQuizContext
}

const Context = React.createContext<ContextProps>({
    timerContext: {
        time: 0,
        setTime: () => {},
        timerFlg: false,
        setTimerFlg: () => {},
        timerSetFlg: false,
        setTimerSetFlg: () => {},
        timerDispFlg: false,
        setTimerDispFlg: () => {},
    },
    quizContext: {
        categoryId: 0,
        categoryText: "DUMMY_QUIZ_CATEGORY",
        quizList: [{
            quizId: 0,
            quizCategoryId: 0,
            quizText: "DUMMY_QUIZ",
            choiceCount: 0,
            choiceList: [{
                choiceId: 0,
                quizId: 0,
                choiceText: "DUMMY_CHOICE",
                answerFlg: false,
                answerNum: 0,
            }],
        }],
    },
    currentQuizContext: {
        categoryId: 0,
        quizId: 0,
        quizText: 'default',
        quizCount: 0,
        choiceList: []
    }
})

const ContextProvider: React.FC = ({children}) => {
    const [timerFlg, setTimerFlg] = useState(false)
    const [time, setTime] = useState(0)
    const [timerSetFlg, setTimerSetFlg] = useState(false)
    const [timerDispFlg, setTimerDispFlg] = useState(false)

    const timerContext: TimerContext = {
        time: time,
        setTime: setTime,
        timerFlg: timerFlg,
        setTimerFlg: setTimerFlg,
        timerSetFlg: timerSetFlg,
        setTimerSetFlg: setTimerSetFlg,
        timerDispFlg: timerDispFlg,
        setTimerDispFlg: setTimerDispFlg
    }

    return (
        <Context.Provider value={{timerContext}}>
            {children}
        </Context.Provider>
    )
}

const useAppContext = () => useContext<ContextProps>(Context)

export { ContextProvider, useAppContext }