import React from 'react'
import PrimaryButton from '../atoms/PrimaryButton'
import { container, ContainerProps } from '../component'

type ComponentProps = {
    genreList?: string[]
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

const SpotLiteContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, ...props}) => {
    const newGenreList: string[] = props.genreList ? props.genreList.map((text, index) => index.toString()) : []
    return presenter({genreList: newGenreList, ...props})
}

const SpotLite: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    SpotLiteContainer,
    SpotLitePresenter
)

export default SpotLite
