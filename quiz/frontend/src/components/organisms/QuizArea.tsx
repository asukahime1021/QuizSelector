import React, {useMemo} from 'react';
import Timer from '../atoms/Timer';
import { container, ContainerProps } from '../component';
import styled from 'styled-components';
import { useCurrentQuizCategoryContext, useCurrentQuizProgressContext, useCurrentQuizContext } from '../atoms/Context';
import SelectRushQuiz from './SelectRushQuiz';
import SpotLiteQuiz from './SpotLiteQuiz';
import LibraryQuiz from './LibraryQuiz';

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
}


const QuizAreaPresenter: React.FC<PresenterProps> = ({categoryId, background, sentence, choiceList, genreList, selectedGenre, selectedList, orderList}) => (
    <QuizAreaStyled background={background}>
        <TimerArea>
            <Timer />
        </TimerArea>
        { categoryId === 1 && <SelectRushQuiz sentence={sentence} choiceList={choiceList} />}
        { categoryId === 2 && <SpotLiteQuiz genreList={genreList} sentence={sentence} choiceList={choiceList} selectedGenre={selectedGenre} />}
        { categoryId === 3 && <LibraryQuiz sentence={sentence} choiceList={choiceList} selectedList={selectedList} orderList={orderList} />}
    </QuizAreaStyled>
)

const TimerArea = styled.div`
    position: absolute;
    top:0.5rem;
    right:0%;
`

type QuizAreaStyledProps = {
    background: string
}
const QuizAreaStyled = styled.div<QuizAreaStyledProps>`
    position: relative;
    height: 72vh;
    width: 128vh;
    margin: 0 auto;
    background-color: #b2b5e0;
    background-image: url(${props => props.background});
    background-size: contain;
`

const QuizAreaContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, ...props}) => {
    console.log("QUIZAREA")
    const categoryId = useCurrentQuizCategoryContext().currentQuizCategory.currentQuizCategoryId
    const progressDetail = useCurrentQuizProgressContext().currentQuizProgress.currentQuizProgressMap.get(categoryId)
    const quizContext = useCurrentQuizContext().currentQuizContext.categoryCurrentMap

    let sentence: string = ""
    const choiceList: string[] = []
    const genreList: string[] = []
    const selectedList: boolean[] = [false, false, false, false, false, false]
    const orderList: number[] = []
    let selectedGenreIndex: number | undefined;
    if (progressDetail) {
        const index = progressDetail.quizMstIndex

        // 問題文
        const quiz = quizContext.get(categoryId)!!.quizMstList[index]
        if (quiz!!.quizText.length > 0) sentence = "Q." + quiz!!.quizText
        if (categoryId === 2 && quiz.choiceList.length === 0) sentence = 'ジャンル選択'

        // 選択肢
        quiz.choiceList.map(choice => choiceList.push(choice.choiceText))

        // ジャンル
        if (progressDetail.genreList && quiz.choiceList.length === 0) progressDetail.genreList.map(genre => genreList.push(genre))
        if (progressDetail.selectedGenreIndex !== undefined) selectedGenreIndex = progressDetail.selectedGenreIndex

        if (progressDetail.selectedOrder) {
            console.log(progressDetail.selectedOrder)
            progressDetail.selectedOrder.map(order => {
                selectedList[order] = true
                orderList.push(order)
            })
            console.log(selectedList)
        }
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
