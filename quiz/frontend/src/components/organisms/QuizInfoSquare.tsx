import React from 'react';
import { container, ContainerProps } from '../component';

type ComponentProps = {}
type PresenterProps = {}

const QuizInfoSquarePresenter: React.FC<PresenterProps> = () => (
    <div></div>
)

const QuizInfoSquareContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, ...props}) => {
    return presenter(props)
}

const QuizInfoSquare: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    QuizInfoSquareContainer,
    QuizInfoSquarePresenter
)

export default QuizInfoSquare;
