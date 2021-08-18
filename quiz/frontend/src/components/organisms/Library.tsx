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

const LibraryPresenter: React.FC<PresenterProps> = ({
    choiceList,
    onClickAnswer,
    progressString,
    finished,
    onClickNext,
    onClickPrev,
    onClickDetermine}) => (
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
        <p>
        {choiceList.length > 0
            ?
                <span>
                    <PrimaryButton onClick={onClickPrev}>戻る</PrimaryButton>
                    <PrimaryButton onClick={onClickDetermine}>決定</PrimaryButton>
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
        </p>
    </div>
)

const LibraryContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, ...props}) => {
    return presenter(props)
}

const Library: React.FC<ComponentProps> = container(LibraryContainer, LibraryPresenter)

export default Library;

