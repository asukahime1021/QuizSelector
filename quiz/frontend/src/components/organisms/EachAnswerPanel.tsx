import React from 'react'
import { classNames, container, ContainerProps } from '../component'
import PrimaryButton from '../atoms/PrimaryButton'
import { useAppContext } from '../atoms/Context'
import { CurrentQuizProgressDetail, QuizMst, Choice } from '../objects/interfaces'

type ComponentProps = {
    categoryId: number
}
type PresenterProps = {
    categoryId: number
    choiceList: number[]
    onClickAnswer: (arg: number) => void
    progressString: string
}

const EachAnswerPanelPresenter: React.FC<PresenterProps> = ({choiceList, onClickAnswer, categoryId, progressString, ...props}) => (
    <div>
        {
            choiceList.map((value, index) => (
                <PrimaryButton key={index} onClick={() => onClickAnswer(value)}>{value.toString()}</PrimaryButton>
            ))
        }
        <p></p>
        <label>
        {
            categoryId === 3 || categoryId === 4
            ?
                "現在の選択順序："
            :
                categoryId === 2
                ?
                    "現在のジャンル："
        　　    :
                    categoryId === 1
                        ?
                            "現在の進行状況："
                        :
                            ""
        }
        {progressString}
        {
            categoryId === 3
            ? 
            <p><PrimaryButton>決定</PrimaryButton></p>
            :
            <span></span>
        }
        </label>
        <p>
            <PrimaryButton>次へ</PrimaryButton>
        </p>
    </div>
)

const EachAnswerPanelContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, categoryId, ...props}) => {
    const {currentQuizContext, currentQuizProgress} = useAppContext()
    const tmpQuizProgressMap = new Map(currentQuizProgress.currentQuizProgressMap)

    const choiceCount = React.useRef(0);
    const answerNum = React.useRef(0);
    const answerOrder = React.useRef<number[]>([]);
    const choiceOrder = React.useRef<number[]>([]);
    const [progressString, setProgressString] = React.useState("");
    const [quizId, setQuizId] = React.useState(0)
    const [choiceList, setChoiceList] = React.useState<number[]>([])

    if (!tmpQuizProgressMap.has(categoryId)) {
        tmpQuizProgressMap.set(categoryId, { quizMstIndex: 0, correctedNum: 0})
    }
    const currentQuizProgressDetail: CurrentQuizProgressDetail = 
        tmpQuizProgressMap.get(categoryId)!!

    // クイズID変更時
    // 選択肢を作成
    // 選択順序を初期化
    const currentMap = currentQuizContext.categoryCurrentMap.get(categoryId)
    React.useEffect(() => {
        const newChoiceList: number[] = []
        for (let i = 0; i < choiceCount.current; i++) {
            newChoiceList.push(i + 1)
        }
        setChoiceList(newChoiceList)

        if (categoryId === 3 || categoryId === 4) {
            tmpQuizProgressMap.get(categoryId)!!.selectedOrder = []
        }
    }, [quizId])

    // カテゴリ選択時
    // カテゴリごとの現在のクイズを取り出し、選択肢を作成
    // 正答順序、正答番号を変更
    // クイズIDを変更
    React.useEffect(() => {
        if (categoryId !== 0 && currentMap) {
            const quizMstList = currentMap.quizMstList
            const newQuizMst: QuizMst = quizMstList[currentQuizProgressDetail.quizMstIndex]
    
            choiceCount.current = newQuizMst.choiceCount

            const compareChoice = (arg1: number[], arg2: number[]) => arg1[1] - arg2[1]
            answerOrder.current = newQuizMst.choiceList.map((value, index) => [index, value.order]).sort(compareChoice).map(pair => pair[0])
            choiceOrder.current = []
            answerNum.current = newQuizMst.choiceList.findIndex(choice => choice.answer)
            setQuizId(newQuizMst.quizId)
            setProgressString("")

            console.log(newQuizMst)
        }
    }, [categoryId])

    // 選択肢押下
    // 押下した選択肢の配列インデックスがわたってくる
    const checkAnswer: (arg: number) => void = (choiceNum: number) => {
        const choiceList = currentQuizContext.categoryCurrentMap.get(categoryId)?.quizMstList[currentQuizProgressDetail.quizMstIndex].choiceList
        const choiceIndex = choiceNum - 1

        if (answerNum) {
            if (choiceIndex === answerNum.current) {
                console.log("MATCH ANSWER")
                return
            }
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
            console.log(choiceOrder.current)
            setProgressString(createProgressString())
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
                console.log("match")
            } else {
                answerOrder.current.unshift(currentAnswer)
            }
            setProgressString(createProgressString())
            console.log(progressString)
            return
        }

        console.log("UNMATCH ANSWER OR ANSWER ORDER")
    }

    // const onClickNext: () => void = () => {
    //     if (currentMap) {
    //         currentMap.quizMstList[currentQuizProgressDetail.quizMstIndex].quizId
    //     }
    // }

    const createProgressString: () => string = () => {
        switch(categoryId) {
            case 1:
                return '未選択'
            case 2:
                return '未選択'
            case 3:
            case 4:
                return choiceOrder.current.map(n => n + 1).toString()
            default:
                return 'カテゴリを選択してください'
        }
    }

    return presenter({categoryId, choiceList, onClickAnswer: checkAnswer, progressString: progressString, ...props})
}

const EachAnswerPanel: React.FC<ComponentProps> = container(
    EachAnswerPanelContainer,
    EachAnswerPanelPresenter
)

export default EachAnswerPanel;
