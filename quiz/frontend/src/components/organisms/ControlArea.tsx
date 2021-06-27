import React from 'react'
import styled from 'styled-components'
import { container, ContainerProps } from '../component'
import FlexGrowArea from '../atoms/FlexGrowArea';
import ControlAreaStyled from '../atoms/ControlAreaStyled';
import Grid from '@material-ui/core/Grid';
import TimerBgmControlArea from './TimerBgmControlArea';
import axios from 'axios';
import QuizCategoryAnchor from '../atoms/QuizCategoryAnchor';
import { QuizMst, ContextQuizMst } from '../objects/interfaces';
import {useAppContext} from '../atoms/Context'
import AnswerArea from './AnswerArea';

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
    console.log("QuizCategoryAreaCall " + categories)
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
    console.log("ControlArea Container")
    const [categoryList, setCategoryList] = React.useState<Category[]>([{id: 0, text: ""}])
    const {currentQuizContext} = useAppContext()
    React.useEffect(() => {
        console.log("control gets quiz data")

        const newCategoryList: Category[] = new Array();
        const setCurrentQuizCategoryId = (value: ContextQuizMst, key: number) => {
            console.log("set categoryList categoryId " + key + ", categoryText " + value.categoryText)
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
