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
        <label onClick={onClick}>{text}</label>
    </p>
)

const QuizCategoryAnchorContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, categoryId, ...props}) => {
    const currentQuizCategory = useAppContext().currentQuizCategory

    const onClickAnchor = () => {
        currentQuizCategory.setCurrentQuizCategoryId(categoryId)
    }
    return presenter({onClick: onClickAnchor, ...props})
}

const QuizCategoryAnchor: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    QuizCategoryAnchorContainer,
    QuizCategoryAnchorPresenter
)

export default QuizCategoryAnchor;
