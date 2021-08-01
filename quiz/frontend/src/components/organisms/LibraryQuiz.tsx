import React from 'react';
import { container, ContainerProps } from '../component';

type ComponentProps = {}

type PresenterProps = ComponentProps

const LibraryQuizPresenter: React.FC<PresenterProps> = () => (
    <div></div>
)

const LibraryQuizContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, ...props}) => {
    return presenter(props)
}

const LibraryQuiz: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    LibraryQuizContainer,
    LibraryQuizPresenter
)

export default LibraryQuiz;
