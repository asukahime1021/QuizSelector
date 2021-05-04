import React from 'react'
import styled from 'styled-components'
import { container, ContainerProps } from '../component'
import FlexGrowArea from '../atoms/FlexGrowArea';
import ControlAreaStyled from '../atoms/ControlAreaStyled';
import Grid from '@material-ui/core/Grid';
import TimerBgmControlArea from './TimerBgmControlArea';
import axios from 'axios';
import QuizCategoryAnchor from '../atoms/QuizCategoryAnchor';

type ComponentProps = {}

type PresenterProps = {
    categories: string[]
}

// TODO: onClick
const QuizCategoryAreaCall = (categories: string[]) => {
    const nodes = categories.map((category, index) => {
        return (
            <QuizCategoryAnchor key={index} text={category} onClick={() => alert(category)}/>
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
                    <div style={{backgroundColor: "#000", width: "100%", height: "24vh"}}></div>
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

// fetch用interface
interface QuizGetCategory {
    quizCategoryList: QuizCategory[],
    genreMstList: GenreMst[]
}

interface QuizCategory {
    categoryId: number,
    categoryText: string,
    quizMstList: QuizMst[]
}

interface GenreMst {
    genreId: number,
    genreText: string
}

interface QuizMst {
    quizId: number,
    quizCategoryId: number,
    quizText: string,
    choiceCount: number,
    choiceList: Choice[]
}

interface Choice {
    choiceId: number,
    quizMstId: number,
    quizCategoryId: number,
    choiceText: string,
    answerFlg: boolean,
    answerNum: number
}

interface CommonApiResponse {
    code: number,
    errorCode: string,
    message?: string,
    validationResults?: []
    response?: QuizGetCategory
}

const ControlAreaContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = (props) => {
    const [categoryList, setCategoryList] = React.useState([""])
    const [apiResult, setApiResult] = React.useState({})

    // APIコール
    // [] をセットすることで初回のみ取得
    React.useEffect(() => {
        const getCategory = async () => {
            await axios.get('/api/quizgetall')
            .then(response => {
                const result: CommonApiResponse = response.data
                setCategoryList(() => [])
                result.response?.quizCategoryList.map(quizCategory => categoryList.push(quizCategory.categoryText))
                setApiResult(() => result)
                setCategoryList(categoryList)
            })
            .catch(error => console.log(error))
        }
    
        getCategory();
        console.log("quizgetall called");
    }, [])

    return props.presenter({categories: categoryList, ...props})
}

const ControlArea: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    ControlAreaContainer,
    ControlAreaPresenter
)

export default ControlArea;
