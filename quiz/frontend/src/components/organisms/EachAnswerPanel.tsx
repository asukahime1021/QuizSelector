import React from 'react'
import { container, ContainerProps } from '../component'
import { useCurrentQuizContext, useCurrentQuizProgressContext, useQuizResultContext, useSetTimerContext, useTimerContext } from '../atoms/Context'
import { CurrentQuizProgressDetail, CurrentTimer, QuizMst, SetCurrentTimer } from '../objects/interfaces'
import styled from 'styled-components'
import SelectRush from './SelectRush'
import Library from './Library'
import Final from './Final'
import SpotLite from './SpotLite'

type ComponentProps = {
    categoryId: number
}
type PresenterProps = {
    categoryId: number
    choiceList: number[]
    onClickAnswer: (arg: number) => void
    progressString: string
    finished: boolean
    onClickNext: () => void
    onClickPrev: () => void
    onClickReset: () => void
    // スポット用
    onClickGenre: (arg: number) => void
    onClickBackToGenre: () => void
    // ライブラ、Final用
    onClickDetermine: () => void
    onClickCorrect: () => void
    isTop: boolean
}
interface QuizId {
    quizId: number
}

const EachAnswerPanelPresenter: React.FC<PresenterProps> = ({
    choiceList,
    onClickAnswer,
    categoryId,
    progressString,
    finished,
    onClickNext,
    onClickPrev,
    onClickReset,
    onClickGenre,
    onClickBackToGenre,
    onClickDetermine,
    onClickCorrect,
    isTop}) => (

    <EachAnswerPanelDiv>
        {
            categoryId === 1
            ? <SelectRush choiceList={choiceList} onClickAnswer={onClickAnswer} progressString={progressString} finished={finished} onClickNext={onClickNext} onClickPrev={onClickPrev} onClickReset={onClickReset}/>
            : categoryId === 2
            ? <SpotLite choiceList={choiceList} onClickAnswer={onClickAnswer} progressString={progressString} onClickBackToGenre={onClickBackToGenre} onClickGenre={onClickGenre} onClickCorrect={onClickCorrect} isTop={isTop} />
            : categoryId === 3
            ? <Library choiceList={choiceList} onClickAnswer={onClickAnswer} progressString={progressString} finished={finished} onClickNext={onClickNext} onClickPrev={onClickPrev} onClickDetermine={onClickDetermine} onClickCorrect={onClickCorrect} />
            : categoryId === 4
            ? <Final choiceList={choiceList} onClickAnswer={onClickAnswer} progressString={progressString} finished={finished} onClickNext={onClickNext} onClickPrev={onClickPrev} onClickDetermine={onClickDetermine}/>
            : <span></span>
        }
    </EachAnswerPanelDiv>
)

const EachAnswerPanelDiv = styled.div`
    margin-top: 2vh;
`

const EachAnswerPanelContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, categoryId, ...props}) => {
    const currentQuizContext = useCurrentQuizContext().currentQuizContext
    const currentQuizProgress = useCurrentQuizProgressContext().currentQuizProgress
    const quizResult = useQuizResultContext().quizResult
    const timerContext: CurrentTimer = useTimerContext().timerContext
    const setTimerContext: SetCurrentTimer = useSetTimerContext().setTimerContext
    const tmpQuizProgressMap = new Map(currentQuizProgress.currentQuizProgressMap)

    const choiceCount = React.useRef(0);
    const answerNum = React.useRef(0);
    const answerOrder = React.useRef<number[]>([]);
    const choiceOrder = React.useRef<number[]>([]);
    const outsider = React.useRef(0)
    const isTop = React.useRef(true)
    const [genreList, setGenreList] = React.useState<string[]>([])
    const [progressString, setProgressString] = React.useState("");
    const [quizId, setQuizId] = React.useState<QuizId>({quizId:0})
    const [choiceList, setChoiceList] = React.useState<number[]>([])
    const [finished, setFinished] = React.useState(true)

    // 正誤音源
    const correctAnswerMp3 = document.getElementById("correct_sound") as HTMLAudioElement;
    const wrongBuzzerMp3 = document.getElementById("wrong_buzzer") as HTMLAudioElement;
    const clearMp3 = document.getElementById("clear_sound") as HTMLAudioElement;

    if (!tmpQuizProgressMap.has(categoryId)) {
        tmpQuizProgressMap.set(categoryId, { quizMstIndex: 0, correctedNum: 0, progressNum: 1, choicedAnswer: [-1, -1]})
    }
    const currentQuizProgressDetail: CurrentQuizProgressDetail = 
        tmpQuizProgressMap.get(categoryId)!!

    // クイズID変更時
    // 選択肢を作成
    // 選択順序を初期化
    // 正答順序、正答番号を変更
    const currentMap = currentQuizContext.categoryCurrentMap.get(categoryId)
    React.useEffect(() => {
        if (!currentMap) {
            return
        }

        const quizMstList = currentMap.quizMstList
        const newQuizMst: QuizMst = quizMstList[currentQuizProgressDetail.quizMstIndex]
        if (!newQuizMst) {
            return
        }

        if (categoryId === 2) {
            if (quizId.quizId === -2) {
                currentQuizProgressDetail.isTop = true
                isTop.current = true
            }
            if (quizId.quizId === -1) {
                const newGenreList = currentQuizProgressDetail.genreList!!
                setGenreList(newGenreList)
            }
        }
    
        choiceCount.current = newQuizMst.choiceCount

        const compareChoice = (arg1: number[], arg2: number[]) => arg1[1] - arg2[1]
        answerOrder.current = newQuizMst.choiceList.map((value, index) => [index, value.order]).sort(compareChoice).map(pair => pair[0])
        choiceOrder.current = []
        answerNum.current = newQuizMst.choiceList.findIndex(choice => choice.answer)
        currentQuizProgressDetail.answerNum = answerNum.current
        currentQuizProgressDetail.answerOrder = answerOrder.current.slice()
        currentQuizProgressDetail.answerOrderCurrent = answerOrder.current;
    
        const newChoiceList: number[] = []
        for (let i = 0; i < choiceCount.current; i++) {
            newChoiceList.push(i + 1)
        }
        setChoiceList(newChoiceList)

        if (categoryId === 3 || categoryId === 4) {
            tmpQuizProgressMap.get(categoryId)!!.selectedOrder = []
            if (categoryId === 4) {
                outsider.current = answerOrder.current[answerOrder.current.length - 1]
            }
            setProgressString("")
        }


        if (!currentMap || currentQuizProgressDetail.quizMstIndex + 1 >= currentMap.quizMstList.length) {
            setFinished(true)
        } else {
            setFinished(false)
        }

        setProgressDetail(categoryId)
    }, [quizId])

    // カテゴリ選択時
    // カテゴリごとの現在のクイズを取り出し、選択肢を作成
    // クイズIDを変更
    React.useEffect(() => {
        if (categoryId !== 0 && currentMap) {
            const quizMstList = currentMap.quizMstList
            const newQuizMst: QuizMst = quizMstList[currentQuizProgressDetail.quizMstIndex]
    
            setQuizId({quizId : newQuizMst.quizId})
            setProgressString("")
        }
    }, [categoryId])

    // 選択肢押下
    // 押下した選択肢の配列インデックスがわたってくる
    const CheckAnswer: (arg: number) => void = (choiceNum: number) => {

        currentQuizProgressDetail.showCorrect = undefined
        const choiceIndex = choiceNum - 1

        if (categoryId === 1 || categoryId === 2) {
            // タイマーストップ
            timerStop()

            if (choiceIndex === answerNum.current) {
                quizResult.setResult(1)
                playSE(correctAnswerMp3)
                currentQuizProgressDetail.correctedNum += 1
                currentQuizProgressDetail.progressNum += 1

                if (categoryId === 1) setProgressString(createProgressString())
            } else {
                playSE(wrongBuzzerMp3)
            }
            currentQuizProgressDetail.choicedAnswer = [choiceIndex, answerNum.current]
            setProgressDetail(categoryId)
            return 
        }

        // バラバラ
        // answerOrder.current にはorder 順に並べたインデックスを用意
        if (categoryId === 3) {
            // 選択されたインデックスをchoiceOrder に蓄積
            // すでに選択済みの場合は何もしない
            const index = choiceOrder.current.indexOf(choiceIndex)
            if (index === -1) {
                choiceOrder.current.push(choiceIndex)
            } else {
                choiceOrder.current.splice(index, 1)
            }
            setProgressString(createProgressString())

            currentQuizProgressDetail.selectedOrder = choiceOrder.current
            setProgressDetail(categoryId)
            return
        }

        // FINAL
        // answerOrder.current にはorder 順に並べたインデックスを用意
        if (categoryId === 4 && answerOrder.current.length > 0) {

            // 現在の正解インデックスを先頭から取り出し
            const currentAnswer: number = answerOrder.current.shift()!!

            // 選択されたインデックスを比較
            // 誤っている場合は、取り出したインデックスを先頭に戻す
            if (currentAnswer === choiceIndex) {
                choiceOrder.current.push(choiceIndex)
                currentQuizProgressDetail.outside = undefined
                currentQuizProgressDetail.wrongNum = undefined
                
                if (choiceOrder.current.length === 9) {
                    currentQuizProgressDetail.clear = true
                    timerStop()
                    playSE(clearMp3)
                } else {
                    playSE(correctAnswerMp3)
                }
            } else if (outsider.current === choiceIndex) {
                answerOrder.current.unshift(currentAnswer)
                currentQuizProgressDetail.outside = true
                timerStop()
                playSE(wrongBuzzerMp3)
            } else {
                let beforeAnswer = currentQuizProgressDetail.selectedOrder!!.pop() 
                if (beforeAnswer !== undefined) {
                    if (beforeAnswer === choiceIndex){
                        playSE(correctAnswerMp3)
                    } else {
                        currentQuizProgressDetail.failed = true
                        currentQuizProgressDetail.wrongNum = choiceIndex
                        timerStop()
                        playSE(wrongBuzzerMp3)
                    }
                    currentQuizProgressDetail.selectedOrder!!.push(beforeAnswer)
                } else {
                    currentQuizProgressDetail.failed = true
                    currentQuizProgressDetail.wrongNum = choiceIndex
                    timerStop()
                    playSE(wrongBuzzerMp3)
                }
                answerOrder.current.unshift(currentAnswer)
                currentQuizProgressDetail.outside = undefined
            }
            setProgressString(createProgressString())

            currentQuizProgressDetail.selectedOrder = choiceOrder.current
            setProgressDetail(categoryId)
            return
        }
    }

    const onClickNext: () => void = () => {
        currentQuizProgressDetail.quizMstIndex += 1
        currentQuizProgressDetail.selectedOrder = undefined
        currentQuizProgressDetail.choicedAnswer = [-1, -1]
        currentQuizProgressDetail.orderResult = undefined
        currentQuizProgressDetail.outside = undefined
        currentQuizProgressDetail.clear = false
        currentQuizProgressDetail.failed = false
        currentQuizProgressDetail.wrongNum = undefined

        if (currentQuizProgressDetail.progressNum % 7 === 0) {
            currentQuizProgressDetail.progressNum += 1
        }
        setProgressDetail(categoryId)

        if (currentMap) {
            setQuizId({quizId: currentMap.quizMstList[tmpQuizProgressMap.get(categoryId)!!.quizMstIndex].quizId})
            setProgressString(createProgressString())
        }
    }

    const onClickPrev: () => void = () => {
        if (currentQuizProgressDetail.quizMstIndex > -1) {
            currentQuizProgressDetail.quizMstIndex -= 1
            currentQuizProgressDetail.selectedOrder = undefined
            currentQuizProgressDetail.choicedAnswer = [-1, -1]
            currentQuizProgressDetail.orderResult = undefined
            currentQuizProgressDetail.outside = undefined
            currentQuizProgressDetail.clear = false
            currentQuizProgressDetail.failed = false
            currentQuizProgressDetail.wrongNum = undefined
            setProgressDetail(categoryId)

            if (currentMap) {
                setQuizId({quizId: currentMap.quizMstList[tmpQuizProgressMap.get(categoryId)!!.quizMstIndex].quizId})
            }
        } 
    }

    const onClickReset: () => void = () => {
        currentQuizProgressDetail.quizMstIndex = 0
        currentQuizProgressDetail.correctedNum = 0
        currentQuizProgressDetail.progressNum = 1
        setProgressDetail(categoryId)

        if (currentMap) {
            setQuizId({quizId: currentMap.quizMstList[tmpQuizProgressMap.get(categoryId)!!.quizMstIndex].quizId})
            setProgressString(createProgressString())
        }
    }

    const onClickGenre: (arg: number) => void = (index : number) => {
        if (currentQuizProgressDetail.selectedGenreIndex === undefined || currentQuizProgressDetail.selectedGenreIndex !== index - 1) {
            currentQuizProgressDetail.selectedGenreIndex = index - 1
            currentQuizProgressDetail.choicedAnswer = [-1, -1]
            setProgressDetail(categoryId)
            return;
        } else {
            currentQuizProgressDetail.quizMstIndex = index
            currentQuizProgressDetail.finishedGenreList!!.push(index)
            currentQuizProgressDetail.selectedGenreIndex = undefined
            setProgressDetail(categoryId)
        }

        if (currentMap) {
            setProgressString(createProgressString(genreList[index - 1]))
            setGenreList([])
            setQuizId({quizId: currentMap.quizMstList[index].quizId})
        }
    }

    const onClickBackToGenre: () => void = () => {
        isTop.current = false
        currentQuizProgressDetail.isTop = false
        currentQuizProgressDetail.quizMstIndex = 0
        currentQuizProgressDetail.showCorrect = false
        setProgressDetail(categoryId)

        setQuizId({quizId: -1})
        setProgressString(createProgressString())
    }

    const onClickDetermine: () => void = () => {
        const tmpOrder = currentQuizProgressDetail.selectedOrder
        let result = true;
        tmpOrder!!.map((val, index) => {
            if (val !== answerOrder.current[index]) {
                result = false;
            }
            return true
        })

        if (result) {
            playSE(correctAnswerMp3)
        } else {
            playSE(wrongBuzzerMp3)
        }

        timerStop()

        currentQuizProgressDetail.orderResult = result
        setProgressDetail(categoryId)
    }

    const onClickCorrect: () => void = () => {
        currentQuizProgressDetail.showCorrect = true
        currentQuizProgressDetail.orderResult = undefined
        if (categoryId === 2) 
            currentQuizProgressDetail.choicedAnswer = [answerNum.current, answerNum.current]
        if (categoryId === 3)
            currentQuizProgressDetail.selectedOrder = answerOrder.current
        setProgressDetail(categoryId)
    }

    const createProgressString: (arg?: string) => string = (str?: string) => {
        switch(categoryId) {
            case 1:
                return currentQuizProgressDetail.correctedNum.toString()
            case 2:
                return str ? str : ''
            case 3:
            case 4:
                if (currentQuizProgressDetail.wrongNum !== undefined) {
                    if (choiceOrder.current.length === 0) {
                        return (currentQuizProgressDetail.wrongNum + 1).toString()
                    }
                    return choiceOrder.current.map(n => n + 1).toString() + "," + (currentQuizProgressDetail.wrongNum + 1)
                }
                return choiceOrder.current.map(n => n + 1).toString()
            default:
                return 'カテゴリを選択してください'
        }
    }

    const timerStop = () => {
        // タイマーストップ
        const {timerFlg} = timerContext
        const {setTimerFlg} = setTimerContext
        if (timerFlg) {
            setTimerFlg(timerFlg => !timerFlg)
        }
    }

    const setProgressDetail: (arg: number) => void = (categoryId: number) => {
        tmpQuizProgressMap.set(categoryId, currentQuizProgressDetail)
        const newMap = new Map(tmpQuizProgressMap)
        currentQuizProgress.setCurrentQuizProgressMap(newMap)
    }

    const playSE = (audio: HTMLAudioElement) => {
        audio.currentTime = 0
        audio.play()
    }

    return presenter({
        categoryId,
        choiceList,
        onClickAnswer: CheckAnswer,
        progressString: progressString,
        finished,
        onClickNext,
        onClickPrev,
        onClickReset,
        onClickGenre,
        onClickBackToGenre,
        onClickDetermine,
        onClickCorrect,
        isTop: isTop.current,
        ...props})
}

const EachAnswerPanel: React.FC<ComponentProps> = container(
    EachAnswerPanelContainer,
    EachAnswerPanelPresenter
)

export default EachAnswerPanel;
