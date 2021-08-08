import React from 'react';
import styled from 'styled-components';
import { container, ContainerProps } from '../component';

type ComponentProps = {
    sentence: string
    choiceList: string[]
}

type PresenterProps = ComponentProps

const FinalQuizPresenter: React.FC<PresenterProps> = () => (
    <div>

    </div>
)

const FinalQuizContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, ...props}) => {
    return presenter(props)
}

const FinalQuiz: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    FinalQuizContainer,
    FinalQuizPresenter
)

export default FinalQuiz;
