import React from 'react';
import { container, ContainerProps } from '../component';
import styled from 'styled-components';
import SRProgress from '../molecules/SRProgress';

type ComponentProps = {
    sentence: string
    choiceList: string[]
}

type PresenterProps = {
    sentence: string
    srChoiceList: SRChoice[]
}

const SentenceStyled = styled.div`
    font-size: 3.5vh;
    height: 12vh;
    color: white;
    padding-top: 3vh;
    text-align: center;
    font-family: 'timer';
    background-image: url("img/01_question.png");
    background-size: cover;
    @font-face {
        font-family: 'timer';
        src: url('NitalagoRuika-06M.TTF');
    }
`

const ImgSpan = styled.div`
    width: 50%;
    font-size: 3.5vh;
    position: relative;
`

const ImgLabel = styled.div`
    position: absolute;
    top: 3vh;
    left: 13vh;
    color: #202020;
    font-family: 'timer';
    @font-face {
        font-family: 'timer';
        src: url('NitalagoRuika-06M.TTF');
    }
`

const ImgImg = styled.img`
    width: 100%;
`

const UpperChoices = styled.div`
    display: flex;
    padding-left: 5vh;
    padding-right: 5vh;
`

const LowerChoices = styled.div`
    display: flex;
    margin-top: -3vh;
    padding-left: 5vh;
    padding-right: 5vh;
`

interface SRChoice {
    text: string
    frame: string
}

const SelectRushQuizPresenter: React.FC<PresenterProps> = ({sentence, srChoiceList, ...props}) => (
    <div style={{position: "relative", height: "100%"}}>
        <SentenceStyled>{sentence}</SentenceStyled>
        <UpperChoices>
        {srChoiceList.map((sr, index) => {
            if (index < 2) {
                return (
                    <ImgSpan key={index}>
                        <ImgImg src={sr.frame} />
                        <ImgLabel>{sr.text}</ImgLabel>
                    </ImgSpan>    
                )
            }
        })}
        </UpperChoices>
        <LowerChoices>
        {srChoiceList.map((sr, index) => {
            if (index > 1) {
                return (
                    <ImgSpan key={index}>
                        <ImgImg src={sr.frame} />
                        <ImgLabel>{sr.text}</ImgLabel>
                    </ImgSpan>    
                )
            }
        })}
        </LowerChoices>
        <div style={{position: "absolute", bottom: "25vh", paddingLeft: "5vh", paddingRight: "14vh"}}>
            <SRProgress />
        </div>
    </div>
)

const SelectRushQuizContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, sentence, choiceList, ...props}) => {
    const dispChoiceList: SRChoice[] = choiceList.map((text, index) => {
        const srChoice: SRChoice = {
            text: text,
            frame: "img/01_answer0" + (index + 1) + ".png"
        }
        return srChoice;
    })

    return presenter({sentence: sentence, srChoiceList: dispChoiceList, ...props})
}

const SelectRushQuiz: React.FC<ComponentProps> = container(
    SelectRushQuizContainer,
    SelectRushQuizPresenter
);

export default SelectRushQuiz;
