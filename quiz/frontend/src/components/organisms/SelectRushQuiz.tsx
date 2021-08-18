import React from 'react';
import { container, ContainerProps } from '../component';
import styled from 'styled-components';
import SRProgress from '../molecules/SRProgress';

type ComponentProps = {
    sentence: string
    choiceList: string[]
    choicedAnswer: [number, number]
}

type PresenterProps = {
    sentence: string
    srChoiceList: SRChoice[]
    dispImgInfo: [number, string]
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

const CorrectWrongImg = styled.img`
    display: block;
    position: absolute;
    top: -3vh;
    left: -9vh;
    max-width: 50%;
    z-index: 1;
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

const SelectRushQuizPresenter: React.FC<PresenterProps> = ({sentence, srChoiceList, dispImgInfo}) => (
    <div style={{position: "relative", height: "100%"}}>
        <SentenceStyled>{sentence}</SentenceStyled>
        <UpperChoices>
        {srChoiceList.map((sr, index) => {
            if (index < 2) {
                return (
                    <ImgSpan key={index}>
                        {
                            dispImgInfo[0] === index
                            ? <CorrectWrongImg src={dispImgInfo[1]}/>
                            : <span></span>
                        }
                        <ImgImg src={sr.frame} />
                        <ImgLabel>{sr.text}</ImgLabel>
                    </ImgSpan>    
                )
            }
            return <span></span>
        })}
        </UpperChoices>
        <LowerChoices>
        {srChoiceList.map((sr, index) => {
            if (index > 1) {
                return (
                    <ImgSpan key={index}>
                        {
                            dispImgInfo[0] === index
                            ? <CorrectWrongImg src={dispImgInfo[1]}/>
                            : <span></span>
                        }
                        <ImgImg src={sr.frame} />
                        <ImgLabel>{sr.text}</ImgLabel>
                    </ImgSpan>    
                )
            }
            return <span></span>
        })}
        </LowerChoices>
        <div style={{position: "absolute", bottom: "25vh", paddingLeft: "5vh", paddingRight: "14vh"}}>
            <SRProgress />
        </div>
    </div>
)

const SelectRushQuizContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, sentence, choiceList, choicedAnswer, ...props}) => {
    const dispChoiceList: SRChoice[] = choiceList.map((text, index) => {
        const srChoice: SRChoice = {
            text: text,
            frame: "img/01_answer0" + (index + 1) + ".png"
        }
        return srChoice;
    })

    let dispImgInfo : [number, string] = [-1, ""]
    if (choicedAnswer[0] !== -1) {
        if (choicedAnswer[0] === choicedAnswer[1]) {
            dispImgInfo = [choicedAnswer[0], "img/correct_answer.png"]
        } else {
            dispImgInfo = [choicedAnswer[0], "img/wrong_answer.png"]
        }
    }

    return presenter({sentence: sentence, srChoiceList: dispChoiceList, dispImgInfo, ...props})
}

const SelectRushQuiz: React.FC<ComponentProps> = container(
    SelectRushQuizContainer,
    SelectRushQuizPresenter
);

export default SelectRushQuiz;
