import React from 'react';
import Timer from '../atoms/Timer';
// import Grid from '@material-ui/core/Grid';
import { container, ContainerProps } from '../component';
import styled from 'styled-components';

type ComponentProps = {
    className?: string
}

type PresenterProps = ComponentProps & {
    background: string
}

const QuizAreaPresenter: React.FC<PresenterProps> = ({background, ...props}) => (
    <QuizAreaStyled background={background}>
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
    const filePath = "img/select_rush_png.png"

    return presenter({background: filePath, ...props})
}

const QuizArea: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    QuizAreaContainer, QuizAreaPresenter
)

export default QuizArea;
