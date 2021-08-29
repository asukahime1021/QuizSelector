import React from 'react'
import styled from 'styled-components'
import { container, ContainerProps } from '../component'
import FlexGrowArea from '../atoms/FlexGrowArea';
import ControlAreaStyled from '../atoms/ControlAreaStyled';
import Grid from '@material-ui/core/Grid';
import TimerBgmControlArea from './TimerBgmControlArea';
import QuizCategoryAnchor from '../atoms/QuizCategoryAnchor';
import { ContextQuizMst } from '../objects/interfaces';
import { useCurrentQuizCategoryContext, useCurrentQuizContext, useCurrentQuizProgressContext } from '../atoms/Context'
import AnswerArea from './AnswerArea';
import InformationArea from './InformationArea';

type ComponentProps = {}

type Category = {
    id: number,
    text: string
}

type PresenterProps = {
    categories: Category[]
}

// TODO: onClick
const QuizCategoryAreaCall = (categories: Category[]) => {
    const newCategories = categories
    const nodes = newCategories.map((category, index) => {
        return (
            <QuizCategoryAnchor key={index} categoryId={category.id} text={category.text}/>
        )
    })

    return (
        <QuizCategoryArea>
            {nodes}
        </QuizCategoryArea>
    )
}

const ControlAreaPresenter: React.FC<PresenterProps> = ({categories}) => (
    <ControlAreaStyled>
        <FlexGrowArea width={100} backgroundcolor="#FFF">
            <Grid container>
                <Grid item xs={2}>
                    {/*クイズカテゴリー選択エリア */}
                    { QuizCategoryAreaCall(categories) }
                </Grid>
                <Grid item xs={2}>
                    {/*タイマー＆BGM管理エリア */}
                    <TimerBgmControlArea />
                </Grid>
                <Grid item xs={5}>
                    {/*回答エリア */}
                    <AnswerArea />
                    {/* <div style={{backgroundColor: "#000", width: "100%", height: "24vh"}}></div> */}
                </Grid>
                <Grid item xs={3}>
                    {/*情報エリア */}
                    {/* <div style={{backgroundColor: "#FFF", width: "100%", height: "24vh"}}></div> */}
                    <InformationArea />
                </Grid>
            </Grid>
        </FlexGrowArea>
        <audio id="correct_sound" preload="auto">
            <source src="sound/correct_answer.mp3" type="audio/mp3" />
        </audio>
        <audio id="wrong_buzzer" preload="auto">
            <source src="sound/wrong_buzzer.mp3" type="audio/mp3" />
        </audio>
        <audio id="clear_sound" preload="auto">
            <source src="sound/clear_sound.mp3" type="audio/mp3" />
        </audio>
    </ControlAreaStyled>
)

const QuizCategoryArea = styled.div`
    height: 23vh;
    overflow: scroll;
`

const ControlAreaContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = (props) => {
    const [categoryList, setCategoryList] = React.useState<Category[]>([{id: 0, text: ""}])
    const {currentQuizContext} = useCurrentQuizContext()
    const {currentQuizCategory} = useCurrentQuizCategoryContext()

    React.useEffect(() => {

        const newCategoryList: Category[] = new Array();
        const setCurrentQuizCategoryId = (value: ContextQuizMst, key: number) => {
            newCategoryList.push({id: key, text: value.categoryText})
        }
        currentQuizContext.categoryCurrentMap.forEach(setCurrentQuizCategoryId)
        setCategoryList(newCategoryList)
    },[currentQuizContext.initialized])

    return props.presenter({categories: categoryList, ...props})
}

const ControlArea: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    ControlAreaContainer,
    ControlAreaPresenter
)

export default ControlArea;
