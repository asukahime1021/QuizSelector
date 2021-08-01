import React from 'react'
import PrimaryButton from '../atoms/PrimaryButton'
import { container, ContainerProps } from '../component'

type ComponentProps = {
    choiceList: number[]
    onClickAnswer: (arg: number) => void
    progressString: string
    finished: boolean
    onClickNext: () => void
}

type PresenterProps = ComponentProps

const FinalPresenter: React.FC<PresenterProps> = ({choiceList, onClickAnswer, progressString, finished, onClickNext, ...props}) => (
    <div>
        {
            choiceList.map((value, index) => (
                <PrimaryButton key={index} onClick={() => onClickAnswer(value)}>{value.toString()}</PrimaryButton>
            ))
        }
        <p></p>
        <label>
            現在の選択順序：
            {progressString}
        </label>
        {!finished
            ?
                <p>
                    <PrimaryButton onClick={onClickNext}>次へ</PrimaryButton>
                </p>
            :
                <span></span>
        }
    </div>
)

const FinalContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, ...props}) => {
    return presenter(props)
}

const Final: React.FC<ComponentProps> = container(FinalContainer, FinalPresenter)

export default Final;

