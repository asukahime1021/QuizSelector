import React, { useContext, useState } from 'react';
import axios from 'axios'
import { 
    CommonApiResponse,
    Scenario,
    CurrentQuiz,
    CurrentTimer, SetCurrentTimer,
    CurrentQuizCategory, ContextQuizMst, CurrentQuizProgress, CurrentQuizProgressDetail, QuizResult, QuizMst } from '../objects/interfaces';

// Context で利用する変数をオブジェクトごとに定義
export type TimerContextProps = {
    timerContext: CurrentTimer
}

export type SetTimerContextProps = {
    setTimerContext: SetCurrentTimer
}

export type CurrentQuizCategoryContextProps = {
    currentQuizCategory: CurrentQuizCategory
}

export type CurrentQuizContextProps = {
    currentQuizContext: CurrentQuiz
}

export type CurrentQuizProgressContextProps = {
    currentQuizProgress: CurrentQuizProgress
}

export type QuizResultContextProps = {
    quizResult: QuizResult
}

const TimerContext = React.createContext<TimerContextProps>({
    timerContext: {
        time: 0,
        timerFlg: false,
        timerSetFlg: false,
        timerDispFlg: false,
    },
});

const SetTimerContext = React.createContext<SetTimerContextProps>({
    setTimerContext: {
        setTime: () => {},
        setTimerFlg: () => {},
        setTimerSetFlg: () => {},
        setTimerDispFlg: () => {},
    }
})

const CurrentQuizCategoryContext = React.createContext<CurrentQuizCategoryContextProps>({
    currentQuizCategory: {
        currentQuizCategoryId: 0,
        setCurrentQuizCategoryId: () => {}
    }});

const CurrentQuizContext = React.createContext<CurrentQuizContextProps>({
    currentQuizContext:{
        initialized: true,
        categoryCurrentMap: new Map([
            [0, { categoryText: "", quizMstList: []}]
        ]),
        setCategoryCurrentMap: () => {}
    }});

const CurrentQuizProgressContext = React.createContext<CurrentQuizProgressContextProps>({
    currentQuizProgress: {
        currentQuizProgressMap: new Map(),
        setCurrentQuizProgressMap: () => {}
    }});

const QuizResultContext = React.createContext<QuizResultContextProps>({
    quizResult: {
        result: 0,
        setResult: () => {}
    }});

const ContextProvider: React.FC = ({children}) => {
    console.log("Context")

    // タイマー
    const [timerFlg, setTimerFlg] = useState(false)
    const [time, setTime] = useState(0)
    const [timerSetFlg, setTimerSetFlg] = useState(false)
    const [timerDispFlg, setTimerDispFlg] = useState(false)

    const timerContext: CurrentTimer = {
        time: time,
        timerFlg: timerFlg,
        timerSetFlg: timerSetFlg,
        timerDispFlg: timerDispFlg,
    }

    const setTimerContext: SetCurrentTimer = {
        setTime: setTime,
        setTimerFlg: setTimerFlg,
        setTimerSetFlg: setTimerSetFlg,
        setTimerDispFlg: setTimerDispFlg
    }

    const [categoryCurrentMap, setCategoryCurrentMap] = useState(useCurrentQuizContext().currentQuizContext.categoryCurrentMap)
    const [initialized, setInitialized] = useState(false);
    const currentQuizContext: CurrentQuiz = {
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
            const scenarioId = localStorage.getItem('scenario') === null ? 3 : localStorage.getItem('scenario');
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
    if ((apiResult !== null && apiResult.code === "200" && apiResult.response !== null) && !initialized) {
        apiResult.response?.categoryList.map(category => {

            // ダミークイズ挿入
            let quizMstList = category.quizList
            const dummyQuiz: QuizMst = {
                quizId: -1,
                quizCategoryId: category.categoryId,
                quizText: "",
                choiceCount: 0,
                choiceList: []
            }
            if (quizMstList[0].quizId > -1) {
                quizMstList.unshift(dummyQuiz)
            }

            const genreList: string[] = []
            if (category.categoryId === 2) {
                quizMstList
                .filter(quiz => quiz.choiceList.length > 0)
                .map(quiz => quiz.choiceList[0])
                .map(choice => genreList.push(choice.genreText))
            }

            // カテゴリIDをkey にカテゴリ名とクイズリストをセット
            newCategoryCurrentMap.set(category.categoryId, { categoryText: category.categoryText, quizMstList: quizMstList})

            // カテゴリIDをkey に各カテゴリの進捗初期値をセット
            const tmpDetail: CurrentQuizProgressDetail = {
                quizMstIndex: 0,
                choicedAnswer: [-1, -1],
                correctedNum: 0,
                genreList: category.categoryId === 2 ? genreList : undefined,
                finishedGenreList: category.categoryId === 2 ? [] : undefined,
                selectedOrder: category.categoryId === 3 || category.categoryId === 4 ? [] : undefined
            }
            newQuizProgressMap.set(category.categoryId, tmpDetail)
            console.log(quizMstList)
        })
        currentQuizContext.setCategoryCurrentMap(() => newCategoryCurrentMap)
        currentQuizProgress.setCurrentQuizProgressMap(() => newQuizProgressMap)
        setInitialized(true)
    }

    const [result, setResult] = React.useState<number>(0)
    const quizResult = {
        result: result,
        setResult: setResult
    }
    
    return (
        <CurrentQuizCategoryContext.Provider value={{currentQuizCategory}}>
            <CurrentQuizContext.Provider value={{currentQuizContext}}>
                <CurrentQuizProgressContext.Provider value={{currentQuizProgress}}>
                    <QuizResultContext.Provider value={{quizResult}}>
                        <TimerContext.Provider value={{timerContext}}>
                            <SetTimerContext.Provider value={{setTimerContext}}>
                            {children}
                            </SetTimerContext.Provider>
                        </TimerContext.Provider>
                    </QuizResultContext.Provider>
                </CurrentQuizProgressContext.Provider>
            </CurrentQuizContext.Provider>
        </CurrentQuizCategoryContext.Provider>
    )
}

const useTimerContext = () => useContext<TimerContextProps>(TimerContext)
const useSetTimerContext = () => useContext<SetTimerContextProps>(SetTimerContext)
const useCurrentQuizCategoryContext = () => useContext<CurrentQuizCategoryContextProps>(CurrentQuizCategoryContext)
const useCurrentQuizContext = () => useContext<CurrentQuizContextProps>(CurrentQuizContext)
const useCurrentQuizProgressContext = () => useContext<CurrentQuizProgressContextProps>(CurrentQuizProgressContext)
const useQuizResultContext = () => useContext<QuizResultContextProps>(QuizResultContext)

export { ContextProvider,
    useTimerContext, useSetTimerContext,
    useCurrentQuizCategoryContext, useCurrentQuizContext, useCurrentQuizProgressContext, useQuizResultContext }
