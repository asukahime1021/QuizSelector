import React from 'react'
import { container, ContainerProps } from '../component'
import {useAppContext} from '../atoms/Context'

type ComponentProps = {
    categoryId: number
    text: string
}

type PresenterProps = {
    text: string
    onClick: () => void
}

const QuizCategoryAnchorPresenter: React.FC<PresenterProps> = ({text, onClick}) => (
    <p>
        <a onClick={onClick}>{text}</a>
    </p>
)

const QuizCategoryAnchorContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, categoryId, ...props}) => {
    const currentQuizContext = useAppContext().currentQuizContext
    const onClickAnchor = () => {
        currentQuizContext.setCategoryId(() => categoryId)
    }
    return presenter({onClick: onClickAnchor, ...props})
}

const QuizCategoryAnchor: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    QuizCategoryAnchorContainer,
    QuizCategoryAnchorPresenter
)

export default QuizCategoryAnchor;
