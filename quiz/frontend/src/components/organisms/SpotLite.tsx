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
    onClickCorrect: () => void
    isTop: boolean
}

type PresenterProps = {
    genreList: string[]
    choiceList: number[]
    onClickGenre: (arg: number) => void
    onClickAnswer: (arg: number) => void
    progressString: string
    onClickBackToGenre: () => void
    onClickCorrect: () => void
}

const SpotLitePresenter: React.FC<PresenterProps> = ({genreList, choiceList, onClickGenre, onClickAnswer, onClickBackToGenre, onClickCorrect, ...props}) => (
    <div>
        { 
            genreList.map((text, index) => (
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
            {
                choiceList.length > 0
                ? <PrimaryButton onClick={onClickCorrect}>正解表示</PrimaryButton>
                : <span></span>
            }
        </p>
    </div>
)

const SpotLiteContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, choiceList, isTop, ...props}) => {
    let genreList: string[] | undefined = useCurrentQuizProgressContext().currentQuizProgress.currentQuizProgressMap.get(2)?.genreList
    if (!genreList || choiceList.length > 0 || isTop) genreList = []
    return presenter({genreList: genreList, choiceList, ...props})
}

const SpotLite: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    SpotLiteContainer,
    SpotLitePresenter
)

export default SpotLite
