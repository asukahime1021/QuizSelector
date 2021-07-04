import React, { useContext, useState } from 'react';
import { TimerContext } from '../objects/TimerContext'
import axios from 'axios'
import { CommonApiResponse, Scenario, CurrentQuizContext, CurrentQuizCategory, ContextQuizMst, CurrentQuizProgress, CurrentQuizProgressDetail, QuizMst, Choice } from '../objects/interfaces';

// Context で利用する変数をオブジェクトごとに定義
export type ContextProps = {
    timerContext: TimerContext
    currentQuizCategory: CurrentQuizCategory
    currentQuizContext: CurrentQuizContext
    currentQuizProgress: CurrentQuizProgress
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
    currentQuizCategory: {
        currentQuizCategoryId: 0,
        setCurrentQuizCategoryId: () => {}
    },
    currentQuizContext:{
        initialized: true,
        categoryCurrentMap: new Map([
            [0, { categoryText: "", quizMstList: []}]
        ]),
        setCategoryCurrentMap: () => {}
    },
    currentQuizProgress: {
        currentQuizProgressMap: new Map(),
        setCurrentQuizProgressMap: () => {}
    }
})

const ContextProvider: React.FC = ({children}) => {
    console.log("Context")
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

    const [categoryCurrentMap, setCategoryCurrentMap] = useState(useAppContext().currentQuizContext.categoryCurrentMap)
    const [initialized, setInitialized] = useState(false);
    const currentQuizContext: CurrentQuizContext = {
        initialized: initialized,
        categoryCurrentMap: categoryCurrentMap,
        setCategoryCurrentMap: setCategoryCurrentMap
    }

    const [currentQuizCategoryId, setCurrentQuizCategoryId] = useState(0)
    const currentQuizCategory: CurrentQuizCategory = {
        currentQuizCategoryId: currentQuizCategoryId,
        setCurrentQuizCategoryId: setCurrentQuizCategoryId
    }

    const [currentQuizProgressMap, setCurrentQuizProgressMap] = useState(new Map())
    const currentQuizProgress: CurrentQuizProgress = {
        currentQuizProgressMap: currentQuizProgressMap,
        setCurrentQuizProgressMap: setCurrentQuizProgressMap
    }

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
            })
            .catch(error => console.log(error))
        }
    
        getCategory();
        console.log("quizgetall called");
    }, [])

    const newCategoryCurrentMap = new Map<number, ContextQuizMst>();
    const newQuizProgressMap = new Map<number, CurrentQuizProgressDetail>();
    if (!(apiResult === null || apiResult.code !== "200" || apiResult.response === null) && !initialized) {
        apiResult.response?.categoryList.map(category => {
            newCategoryCurrentMap.set(category.categoryId, { categoryText: category.categoryText, quizMstList: category.quizList})

            const tmpDetail: CurrentQuizProgressDetail = {
                quizMstIndex: 0,
                correctedNum: 0,
                finishedGenreList: category.categoryId === 2 ? [] : undefined,
                selectedOrder: category.categoryId === 3 || category.categoryId === 4 ? [] : undefined
            }
            newQuizProgressMap.set(category.categoryId, tmpDetail)
            console.log("context quizList : ")
            console.log(category.quizList)
        })
        currentQuizContext.setCategoryCurrentMap(() => newCategoryCurrentMap)
        currentQuizProgress.setCurrentQuizProgressMap(() => newQuizProgressMap)
        setInitialized(true)
    }
    
    return (
        <Context.Provider value={{timerContext, currentQuizCategory, currentQuizContext, currentQuizProgress}}>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, useAppContext }
