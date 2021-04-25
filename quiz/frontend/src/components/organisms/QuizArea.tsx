import React from 'react';
import Timer from '../atoms/Timer';
// import Grid from '@material-ui/core/Grid';
import { container, ContainerProps } from '../component';
import styled from 'styled-components';

type ComponentProps = {
    className?: string
}

type PresenterProps = ComponentProps

const QuizAreaPresenter: React.FC<PresenterProps> = () => (
    <QuizAreaStyled>
        <TimerArea>
            <Timer />
        </TimerArea>
    </QuizAreaStyled>
)

const TimerArea = styled.div`
    position: absolute;
    top:75px;
    right:0px;
`

const QuizAreaStyled = styled.div`
    position: relative;
    height: 72vh;
    width: 128vh;
    margin: 0 auto;
    background-color: #b2b5e0;
    background-image: url("select_rush_png.png");
    background-size: contain;
`
// const GridStyled = styled(Grid)`
//     height: 72vh;
//     display: flex;
//     flex-direction: column;
// `

const QuizAreaContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, ...props}) => {
    console.log("quizArea")
    return presenter(props)
}

const QuizArea: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    QuizAreaContainer, QuizAreaPresenter
)

export default QuizArea;
