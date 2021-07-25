import React from 'react'
import { container, ContainerProps } from '../component'
import styled from 'styled-components'

type ComponentProps = {
    genreList: string[]
    sentence: string
    choiceList: string[]
}

type PresenterProps = ComponentProps

const SentenceStyled = styled.div`
    font-size: 1.5rem;
    height: 12vh;
    color: white;
    padding-top: 3vh;
    text-align: center;
    font-family: 'timer';
    background-size: cover;
    @font-face {
        font-family: 'timer';
        src: url('NitalagoRuika-06M.TTF');
    }
`

const SpotLiteQuizPresenter: React.FC<PresenterProps> = ({sentence}) => (
    <div>
        <SentenceStyled>{sentence}</SentenceStyled>

    </div>
)

const SpotLiteQuizContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, sentence, genreList, choiceList, ...props}) => {
    return presenter({sentence, genreList, choiceList, ...props})
}

const SpotLiteQuiz: React.FC<ComponentProps> = container(
    SpotLiteQuizContainer,
    SpotLiteQuizPresenter
)

export default SpotLiteQuiz
