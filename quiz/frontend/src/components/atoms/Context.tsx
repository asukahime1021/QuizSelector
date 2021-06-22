import React, { useContext, useState } from 'react';
import { TimerContext } from '../objects/TimerContext'
import axios from 'axios'
import { CommonApiResponse, QuizGetCategory, QuizCategory, QuizMst, GenreMst, Choice, Scenario, CurrentQuizContext } from '../objects/interfaces';

// Context で利用する変数をオブジェクトごとに定義
export type ContextProps = {
    timerContext: TimerContext
    quizContext: CommonApiResponse<Scenario>
    currentQuizContext: Map<number, QuizMst[]>
}

const useAppContext = () => useContext<ContextProps>(Context)

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
        code: "000",
        errorCode: "000",
        message: "sample",
        validationResults: [],
        response: {
            categoryList: [{
                categoryId: 0,
                categoryText: "DUMMY_QUIZ_CATEGORY",
                quizList: [{
                    quizId: 0,
                    quizCategoryId: 0,
                    quizText: "DUMMY_QUIZ",
                    choiceCount: 0,
                    choiceList: [{
                        choiceId: 0,
                        quizMstId: 0,
                        quizCategoryId: 0,
                        choiceText: "DUMMY_CHOICE",
                        answerFlg: false,
                        answerNum: 0,
                    }],
                }]    
            }]    
        }
    },
    currentQuizContext:new Map([
        [0, []]
    ])
})

const ContextProvider: React.FC = ({children}) => {
    // APIコール
    // [] をセットすることで初回のみ取得
    const [apiResult, setApiResult] = React.useState<CommonApiResponse<Scenario> | null>(null)
    React.useEffect(() => {
        const getCategory = async () => {
            const scenarioId = localStorage.getItem('scenario') === null ? 1 : localStorage.getItem('scenario');
            const uri = '/api/getScenarioQuizes?scenarioId=' + scenarioId;
            await axios.get(uri)
            .then(response => {
                const result: CommonApiResponse<Scenario> = response.data;
                setApiResult(() => result);
                console.log("successed ScenarioGet");
            })
            .catch(error => console.log(error))
        }
    
        getCategory();
        console.log("quizgetall called");
    }, [])

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

    const currentQuizContext: Map<number, QuizMst[]> = useAppContext().currentQuizContext

    const quizContextDefault = useAppContext().quizContext
    const quizContext: CommonApiResponse<Scenario> = apiResult === null || apiResult.code !== "200" || apiResult.response === null
        ? quizContextDefault
        : apiResult
    
    const [newMap, setNewMap] = React.useState(new Map<number, QuizMst[]>());
    quizContext.response?.categoryList.map(category => {
        newMap.set(category.categoryId, category.quizList)
    })
    
    return (
        <Context.Provider value={{timerContext, quizContext, currentQuizContext}}>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, useAppContext }