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
    onClickDetermine: () => void
}

type PresenterProps = ComponentProps

const FinalPresenter: React.FC<PresenterProps> = ({choiceList, onClickAnswer, progressString, finished, onClickNext, onClickPrev, onClickDetermine}) => (
    <div>
        <p>
            {
                choiceList.map((value, index) => (
                    index < 4 ?
                    <PrimaryButton key={index} onClick={() => onClickAnswer(value)}>{value.toString()}</PrimaryButton>
                    : <span key={index}></span>
                ))
            }
        </p>
        <p style={{marginTop: "1vh"}}>
            {
                choiceList.map((value, index) => (
                    index > 3 && index < 7 ?
                            <PrimaryButton key={index} onClick={() => onClickAnswer(value)}>{value.toString()}</PrimaryButton>
                    : <span key={index}></span>
                ))
            }
        </p>
        <p style={{marginTop: "1vh"}}>
            {
                choiceList.map((value, index) => (
                    index > 6 ?
                        <PrimaryButton key={index} onClick={() => onClickAnswer(value)}>{value.toString()}</PrimaryButton>
                    : <span key={index}></span>
                ))
            }
        </p>
        <p>
        <label>
            現在の選択順序：
            {progressString}
        </label>
        </p>
        {choiceList.length > 0
            ?
                <span>
                    <PrimaryButton onClick={onClickPrev}>戻る</PrimaryButton>
                </span>
            :
                <span></span>
        }
        {!finished
            ?
                <PrimaryButton onClick={onClickNext}>次へ</PrimaryButton>
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

