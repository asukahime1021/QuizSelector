import React, {useMemo} from 'react';
import Timer from '../atoms/Timer';
import { container, ContainerProps } from '../component';
import styled from 'styled-components';
import { useCurrentQuizCategoryContext, useCurrentQuizProgressContext, useCurrentQuizContext } from '../atoms/Context';
import SelectRushQuiz from './SelectRushQuiz';
import SpotLiteQuiz from './SpotLiteQuiz';
import LibraryQuiz from './LibraryQuiz';
import FinalQuiz from './FinalQuiz';
import TicketDisp from '../atoms/TicketDisp';

const BG_SELECT: string = "img/01_bg.jpg"
const BG_SPOT: string = "img/02_bg.jpg"
const BG_LIBRA: string = "img/03_bg.jpg"
const BG_FINAL: string = "img/04_bg.jpg"

type ComponentProps = {
    className?: string
}

type PresenterProps = ComponentProps & {
    categoryId: number
    background: string
    sentence: string
    choiceList: string[]
    genreList: string[]
    selectedGenre: number | undefined
    selectedList: boolean[]
    orderList: number[]
    answeredList: boolean[]
    choicedAnswer: [number, number]
    finishedGenreList: number[]
    correctWrongFlg: boolean | undefined
    outside: boolean | undefined
    showCorrect: boolean
    clear: boolean
}


const QuizAreaPresenter: React.FC<PresenterProps> = ({
    categoryId,
    background,
    sentence,
    choiceList,
    genreList,
    selectedGenre,
    selectedList,
    orderList,
    answeredList,
    choicedAnswer,
    finishedGenreList,
    correctWrongFlg,
    outside,
    showCorrect,
    clear}) => (

    <QuizAreaStyled background={background}>
        <TimerArea>
            <Timer />
        </TimerArea>
        <TicketArea>
            <TicketDisp />
        </TicketArea>
        { categoryId === 1 && <SelectRushQuiz sentence={sentence} choiceList={choiceList} choicedAnswer={choicedAnswer} />}
        { categoryId === 2 && <SpotLiteQuiz genreList={genreList} sentence={sentence} choiceList={choiceList} selectedGenre={selectedGenre} choicedAnswer={choicedAnswer} finishedGenreList={finishedGenreList} showCorrect={showCorrect} />}
        { categoryId === 3 && <LibraryQuiz sentence={sentence} choiceList={choiceList} selectedList={selectedList} orderList={orderList} correctWrongFlg={correctWrongFlg} />}
        { categoryId === 4 && <FinalQuiz sentence={sentence} choiceList={choiceList} selectedList={selectedList} orderList={orderList} answeredList={answeredList} outside={outside} clear={clear} />}
    </QuizAreaStyled>
)

const TimerArea = styled.div`
    position: absolute;
    top:0.5rem;
    right:-0%;
`

const TicketArea = styled.div`
    position: absolute;
    top: 4rem;
    right: -0%;
`

type QuizAreaStyledProps = {
    background: string
}

const QuizAreaStyled = styled.div<QuizAreaStyledProps>`
    position: relative;
    height: 72vh;
    width: 128vh;
    margin: 0 auto;
    margin-top: 1vh;
    background-color: #b2b5e0;
    background-image: url(${props => props.background});
    background-size: contain;
`

const QuizAreaContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, ...props}) => {
    const categoryId = useCurrentQuizCategoryContext().currentQuizCategory.currentQuizCategoryId
    const progressDetail = useCurrentQuizProgressContext().currentQuizProgress.currentQuizProgressMap.get(categoryId)
    const quizContext = useCurrentQuizContext().currentQuizContext.categoryCurrentMap

    let sentence: string = ""
    const choiceList: string[] = []
    const genreList: string[] = []
    const selectedList: boolean[] = 
        categoryId === 3
            ? [false, false, false, false, false, false]
            : [false, false, false, false, false, false, false, false, false, false, false]
    const answeredList: boolean[] = [false, false, false, false, false, false, false, false, false, false, false]
    const orderList: number[] = []
    let choicedAnswerNumber: [number, number] = [-1, -1]
    let selectedGenreIndex: number | undefined;
    let finishedGenreList: number[] = []
    let correctWrongFlg: boolean | undefined = undefined
    let outside: boolean | undefined = undefined
    let showCorrect: boolean = false
    let clear: boolean = false
    if (progressDetail) {
        const index = progressDetail.quizMstIndex

        // 問題文
        const quiz = quizContext.get(categoryId)!!.quizMstList[index]
        if (quiz!!.quizText.length > 0) sentence = "Q." + quiz!!.quizText
        if (categoryId === 2 && quiz.choiceList.length === 0 && !progressDetail.isTop) sentence = 'ジャンル選択'

        // 選択肢
        quiz.choiceList.map(choice => choiceList.push(choice.choiceText))

        // 選択回答
        choicedAnswerNumber = progressDetail.choicedAnswer

        // ジャンル
        if (progressDetail.genreList && quiz.choiceList.length === 0 && !progressDetail.isTop) progressDetail.genreList.map(genre => genreList.push(genre))
        if (progressDetail.selectedGenreIndex !== undefined) selectedGenreIndex = progressDetail.selectedGenreIndex
        if (progressDetail.finishedGenreList) finishedGenreList = progressDetail.finishedGenreList

        if (progressDetail.selectedOrder && categoryId === 3) {
            progressDetail.selectedOrder.map(order => {
                selectedList[order] = true
                orderList.push(order)
                return true
            })
            if (progressDetail.orderResult !== undefined) {
                correctWrongFlg = progressDetail.orderResult
            }
        }

        if (progressDetail.selectedOrder && categoryId === 4) {
            progressDetail.selectedOrder.map((order, index, arr) => {
                selectedList[index] = true
                answeredList[order] = true
                return true
            })

            if (progressDetail.answerOrder) {
                progressDetail.answerOrder.map(order => {
                    orderList.push(order)
                })
            }

            if (progressDetail.failed && progressDetail.wrongNum !== undefined) {
                const answerIndex = progressDetail.answerOrder!!.indexOf(progressDetail.wrongNum)
                selectedList[answerIndex] = true
            }

            for (let i = orderList.length; i < choiceList.length; i++) {
                orderList.push()
            }

            if (progressDetail.orderResult !== undefined) {
                correctWrongFlg = progressDetail.orderResult
            }
            if (progressDetail.outside !== undefined) {
                outside = progressDetail.outside
            }
        }

        if (progressDetail.showCorrect) showCorrect = progressDetail.showCorrect

        if (progressDetail.clear) clear = progressDetail.clear
    }

    const filePath = useMemo(() => getFilePath(categoryId), [categoryId])
    
    return presenter({
        categoryId,
        background: filePath,
        sentence,
        choiceList,
        genreList,
        selectedGenre: selectedGenreIndex,
        selectedList,
        orderList,
        answeredList,
        choicedAnswer: choicedAnswerNumber,
        finishedGenreList,
        correctWrongFlg,
        outside,
        showCorrect,
        clear,
        ...props})
}

const getFilePath = (categoryId: number) => {
    switch(categoryId) {
        case 1: return BG_SELECT;
        case 2: return BG_SPOT;
        case 3: return BG_LIBRA;
        case 4: return BG_FINAL;
        default: return "";
    }
}

const QuizArea: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    QuizAreaContainer, QuizAreaPresenter
)

export default QuizArea;
