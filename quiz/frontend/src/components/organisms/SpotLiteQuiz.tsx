import React from 'react'
import { container, ContainerProps } from '../component'
import styled from 'styled-components'

type ComponentProps = {
    genreList: string[]
    sentence: string
    choiceList: string[]
    selectedGenre: number| undefined
}

type PresenterProps = ComponentProps

const SentenceStyled = styled.div`
    font-size: 3.5vh;
    height: 12vh;
    color: white;
    padding-top: 3vh;
    text-align: center;
    font-family: 'timer';
    background-size: cover;
    @font-face {
        font-family: 'timer';
        src: url('NitalagoRuika-06M.TTF');
    }
`

const GenreLi = styled.li`
    width: 22%;
    margin: 1vh;
    position: relative;
    display: flex;
    justify-content: center;
`

const SelectLi = styled.li`
    width: 25%;
    margin: 1vh;
    position: relative;
    display: flex;
    justify-content: center;
`

const GenreP = styled.p`
    position: absolute;
    text-align: center;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    color: #ffffff;
    font-size: 3vh;
    font-family: 'timer';
    @font-face {
        font-family: 'timer';
        src: url('NitalagoRuika-06M.TTF');
    }
`

const GenreImg = styled.img`
    width: 100%;
`

const LightImg = styled.img`
    position: absolute;
    width: 100%;
    z-index: 1;
`

const SpotLightDiv = styled.div`
    width: 63%;
    margin-top: auto;
    margin-left: 25vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    z-index: 2;
`

const SpotLightImg = styled.img`
    width: 100%;
`

const SpotLiteParent = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-bottom: 0.1vh;
`

const SpotLiteQuizPresenter: React.FC<PresenterProps> = ({sentence, genreList, choiceList, selectedGenre}) => (
    <SpotLiteParent>
        <SentenceStyled>{sentence}</SentenceStyled>
        {
            genreList.length > 0 ?
            <div>
                <ul style={{display: 'flex', justifyContent: 'center', listStyle: 'none', flexWrap: 'wrap', marginLeft: '-3vh'}}>
                {genreList.map((text, index) => {
                    if (index < 3) {
                        const lightNum = index + 1
                        const lightSrc = "img/02_genrelight0" + lightNum + ".png"
                        return (
                        <GenreLi key={index}>
                            <GenreImg src="img/02_genre.png" />
                            {selectedGenre !== undefined && selectedGenre === index
                            ?
                                <LightImg src={lightSrc} />
                            :
                                <span></span>
                            }
                            <GenreP>
                                <label>{text}</label>
                            </GenreP>
                        </GenreLi>
                        )
                    }
                })}
            </ul>
            <ul style={{display: 'flex', justifyContent: 'center', listStyle: 'none', flexWrap: 'wrap', marginLeft: '-3vh'}}>
                {genreList.map((text, index) => {
                    if (index > 2 && index < 7) {
                        const lightNum = index + 1
                        const lightSrc = "img/02_genrelight0" + lightNum + ".png"
                        return (
                        <GenreLi key={index}>
                            <GenreImg src="img/02_genre.png" />
                            {selectedGenre !== undefined && selectedGenre === index
                            ?
                                <LightImg src={lightSrc} />
                            :
                                <span></span>
                            }
                            <GenreP>
                                <label>{text}</label>
                            </GenreP>
                        </GenreLi>
                        )
                    }
                })}
            </ul>
        </div>
        : <span></span>
    }
    {
        choiceList.length > 0 ?
        <div>
            <ul style={{display: 'flex', justifyContent: 'center', listStyle: 'none', flexWrap: 'wrap', marginLeft: '-3vh'}}>
                {choiceList.map((text, index) => {
                    if (index < 2) {
                        return (
                        <SelectLi key={index}>
                            <GenreImg src="img/02_select.png" />
                            <GenreP>
                                <label>{text}</label>
                            </GenreP>
                        </SelectLi>
                        )
                    }
                })}
            </ul>
            <ul style={{display: 'flex', justifyContent: 'center', listStyle: 'none', flexWrap: 'wrap', marginLeft: '-3vh'}}>
                {choiceList.map((text, index) => {
                    if (index > 1) {
                        return (
                        <SelectLi key={index}>
                            <GenreImg src="img/02_select.png" />
                            <GenreP>
                                <label>{text}</label>
                            </GenreP>
                        </SelectLi>
                        )
                    }
                })}
            </ul>
        </div>
        :<span></span>
    }
        <SpotLightDiv>
            <SpotLightImg src="img/02_spotlight.png" />
        </SpotLightDiv>
    </SpotLiteParent>
)

const SpotLiteQuizContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, sentence, genreList, choiceList, selectedGenre, ...props}) => {
    return presenter({sentence, genreList, choiceList, selectedGenre, ...props})
}

const SpotLiteQuiz: React.FC<ComponentProps> = container(
    SpotLiteQuizContainer,
    SpotLiteQuizPresenter
)

export default SpotLiteQuiz
