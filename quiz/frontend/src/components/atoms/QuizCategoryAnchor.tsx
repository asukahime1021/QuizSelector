import React from 'react'
import { container, ContainerProps } from '../component'

type ComponentProps = {
    text: string
    onClick: () => void
}

type PresenterProps = ComponentProps

const QuizCategoryAnchorPresenter: React.FC<PresenterProps> = ({text, onClick}) => (
    <p>
        <a onClick={onClick}>{text}</a>
    </p>
)

const QuizCategoryAnchorContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, ...props}) => {
    return presenter(props)
}

const QuizCategoryAnchor: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    QuizCategoryAnchorContainer,
    QuizCategoryAnchorPresenter
)

export default QuizCategoryAnchor;
