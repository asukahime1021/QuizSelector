import React from 'react'
import { container, ContainerProps } from '../component'
import PrimaryButton from '../atoms/PrimaryButton'
import { useAppContext } from '../atoms/Context'
import { CurrentQuizProgressDetail } from '../objects/interfaces'

type ComponentProps = {
    categoryId: number
}
type PresenterProps = {
    choiceList: number[]
    onClickAnswer: (arg: number) => void
}

const EachAnswerPanelPresenter: React.FC<PresenterProps> = ({choiceList, onClickAnswer, ...props}) => (
    <div>
        {choiceList.map((value, index) => {
            <PrimaryButton key={index} onClick={() => onClickAnswer(value)}>{value.toString()}</PrimaryButton>
        })}
    </div>
)

const EachAnswerPanelContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, categoryId, ...props}) => {
    const {currentQuizContext, currentQuizProgress} = useAppContext()
    const tmpQuizProgressMap = new Map(currentQuizProgress.currentQuizProgressMap)

    let choiceCount = 0;
    let answerNum: number | undefined;
    let answerOrder: number[] | undefined;
    if (!tmpQuizProgressMap.has(categoryId)) {
        const currentQuizProgressDetail: CurrentQuizProgressDetail = {
            quizMstIndex: 0,
            correctedNum: 0
        }
        tmpQuizProgressMap.set(categoryId, currentQuizProgressDetail)
    }

    const choiceList = Array(choiceCount)
    for (let i = 0; i < choiceCount; i++) {
        choiceList[i] = i + 1
    }

    const checkAnswer: (arg: number) => void = (choiceNum: number, choiceOrder?: number) => {
        if (answerNum !== undefined) {
            // TODO
            if (choiceNum === answerNum) {
                console.log("MATCH ANSWER")
            }
        }

        if (answerOrder !== undefined && choiceOrder !== undefined) {
            // TODO
            if (answerOrder[choiceOrder] === choiceNum) {
                console.log("MATCH ANSWER ORDER")
            }
        }

        console.log("UNMATCH ANSWER OR ANSWER ORDER")
    }

    return presenter({choiceList, onClickAnswer: checkAnswer, ...props})
}

const EachAnswerPanel: React.FC<ComponentProps> = container(
    EachAnswerPanelContainer,
    EachAnswerPanelPresenter
)

export default EachAnswerPanel;
