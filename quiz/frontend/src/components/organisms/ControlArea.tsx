import React from 'react'
import styled from 'styled-components'
import { container, ContainerProps } from '../component'
import FlexGrowArea from '../atoms/FlexGrowArea';
import ControlAreaStyled from '../atoms/ControlAreaStyled';
import Grid from '@material-ui/core/Grid';
import TimerBgmControlArea from './TimerBgmControlArea';
import axios from 'axios';
import QuizCategoryAnchor from '../atoms/QuizCategoryAnchor';
import { CommonApiResponse, QuizGetCategory, QuizCategory, QuizMst, GenreMst, Choice, Scenario } from '../objects/interfaces';
import {useAppContext} from '../atoms/Context'
import AnswerArea from './AnswerArea';

type ComponentProps = {}

type PresenterProps = {
    categories: QuizCategory[]
}

// TODO: onClick
const QuizCategoryAreaCall = (categories: QuizCategory[]) => {
    const nodes = categories.map((category, index) => {
        return (
            <QuizCategoryAnchor key={index} categoryId={category.categoryId} text={category.categoryText}/>
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
                    <div style={{backgroundColor: "#0F0", width: "100%", height: "24vh"}}></div>
                </Grid>
            </Grid>
        </FlexGrowArea>
    </ControlAreaStyled>
)

const QuizCategoryArea = styled.div`
    height: 24vh;
    overflow: scroll;
    font-family: 'myfont';
    @font-face {
        font-family: 'myfont';
        src: url('../GD-TiVangerionJA-010.otf');
    }
`

const ControlAreaContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = (props) => {
    const [categoryList, setCategoryList] = React.useState<QuizCategory[]>([{categoryId: 0, categoryText: "", quizList: []}])
    const {quizContext} = useAppContext()
    React.useEffect(() => {
        console.log("control gets quiz data")
        setCategoryList(() => quizContext.response!.categoryList)    
    },[quizContext])
    console.log("control rendering");
    return props.presenter({categories: categoryList, ...props})
}

const ControlArea: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    ControlAreaContainer,
    ControlAreaPresenter
)

export default ControlArea;
