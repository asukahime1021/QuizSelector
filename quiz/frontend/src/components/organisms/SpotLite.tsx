import React from 'react'
import { useCurrentQuizProgressContext } from '../atoms/Context'
import PrimaryButton from '../atoms/PrimaryButton'
import { container, ContainerProps } from '../component'

type ComponentProps = {
    choiceList: number[]
    onClickGenre: (arg: number) => void
    onClickAnswer: (arg: number) => void
    progressString: string
    onClickBackToGenre: () => void
}

type PresenterProps = {
    genreList: string[]
    choiceList: number[]
    onClickGenre: (arg: number) => void
    onClickAnswer: (arg: number) => void
    progressString: string
    onClickBackToGenre: () => void
}

const SpotLitePresenter: React.FC<PresenterProps> = ({genreList, choiceList, onClickGenre, onClickAnswer, onClickBackToGenre, ...props}) => (
    <div>
        { genreList.map((text, index) => (
            <PrimaryButton key={index} onClick={() => onClickGenre(index + 1)}>{text}</PrimaryButton>
            ))
        }
        {
            choiceList.map((value, index) => (
                <PrimaryButton key={index} onClick={() => onClickAnswer(value)}>{value.toString()}</PrimaryButton>
            ))
        }
        <p></p>
        <label>選択ジャンル：{props.progressString}</label>
        <p>
            <PrimaryButton onClick={onClickBackToGenre}>ジャンル選択</PrimaryButton>
        </p>
    </div>
)

const SpotLiteContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, choiceList, ...props}) => {
    let genreList: string[] | undefined = useCurrentQuizProgressContext().currentQuizProgress.currentQuizProgressMap.get(2)?.genreList
    if (!genreList || choiceList.length > 0) genreList = []
    return presenter({genreList: genreList, choiceList, ...props})
}

const SpotLite: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    SpotLiteContainer,
    SpotLitePresenter
)

export default SpotLite
