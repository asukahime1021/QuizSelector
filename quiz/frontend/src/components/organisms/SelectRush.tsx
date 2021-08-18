import React from 'react'
import PrimaryButton from '../atoms/PrimaryButton'
import { container, ContainerProps } from '../component'

type ComponentProps = {
    choiceList: number[]
    onClickAnswer: (arg: number) => void
    progressString: string
    finished: boolean
    onClickNext: () => void
    onClickPrev: () => void
    onClickReset: () => void
}
type PresenterProps = ComponentProps

const SelectRushPresenter: React.FC<PresenterProps> = ({choiceList, onClickAnswer, progressString, finished, onClickNext, onClickPrev, onClickReset, ...props}) => (
    <div>
        {
            choiceList.map((value, index) => (
                <PrimaryButton key={index} onClick={() => onClickAnswer(value)}>{value.toString()}</PrimaryButton>
            ))
        }
        <p></p>
        <label>
            現在の進行状況：
        </label>
        {progressString}
        <p>
        {choiceList.length > 0
            ?
                <PrimaryButton onClick={onClickPrev}>戻る</PrimaryButton>
            :
                <span></span>
        }
        {!finished
            ?
                <PrimaryButton onClick={onClickNext}>次へ</PrimaryButton>
            :
                <span></span>
        }
        <PrimaryButton onClick={onClickReset}>リセット</PrimaryButton>
        </p>
    </div>
)

const SelectRushContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, ...props}) => {
    return presenter(props)
}

const SelectRush: React.FC<ComponentProps> = container(SelectRushContainer, SelectRushPresenter)

export default SelectRush
