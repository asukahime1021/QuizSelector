import React from 'react';
import styled from 'styled-components';
import SentenceInnerStyled from '../atoms/SentenceInnerStyled';
import TitleLogo from '../atoms/TitleLogo';
import { container, ContainerProps } from '../component';

type ComponentProps = {
    sentence: string
    choiceList: string[]
    selectedList: boolean[]
    orderList: number[]
    answeredList: boolean[]
    outside: boolean | undefined
    clear: boolean
}

type PresenterProps = {
    sentence: string
    choiceList: string[]
    selectedList: boolean[]
    orderList: number[]
    answeredList: boolean[]
    outside: boolean
    clear: boolean
}

const WrapperDiv = styled.div`
    color: #283c52;
    font-family: 'timer';
    @font-face {
        font-family: 'timer';
        src: url('font/NitalagoRuika-06M.TTF');
    }
`

const SentenceStyled = styled.div`
    font-size: 3.5vh;
    height: 5.5vh;
    padding-top: 3vh;
    text-align: center;
    background-size: cover;
`

const AnswerImg = styled.img`
    width: 24%;
`

const SelectBase = styled.img`
    width: 98%;
`

type AnswerPProps = {
    selected: boolean,
    top: number,
    left: number
}

const AnswerP = styled.p<AnswerPProps>`
    font-size: 2.8vh;
    width: 20vh;
    text-align: left;
    word-break: break-all;
    visibility: ${props => props.selected ? 'visible' : 'hidden'};
    position: absolute;
    top: ${props => props.top}vh;
    left: ${props => props.left}vh;
`

type SelectPProps = {
    top: number,
    left: number
}

const SelectP = styled.p<SelectPProps>`
    font-size: 2.0vh;
    width: 25vh;
    text-align: center;
    word-break: break-all;
    position: absolute;
    top: ${props => props.top}vh;
    left: ${props => props.left}vh;
`

const AnswerWrapperDiv = styled.div`
    text-align: center;
`

type SelectedImgProps = {
    selected: boolean,
    top: number,
    left: number
}

const SelectedImg = styled.img<SelectedImgProps>`
    width: 25vh;
    visibility: ${props => props.selected ? 'visible' : 'hidden'};
    position: absolute;
    top: ${props => props.top}vh;
    left: ${props => props.left}vh;
    z-index: 1;
`

const WrongImg = styled.img<{wrong: boolean}>`
    display: block;
    visibility: ${props => props.wrong ? 'visible' : 'hidden'};
    max-width: 50%;
    position: absolute;
    top: 20vh;
    left: 30vh;
    z-index: 3;
`

const FinalQuizPresenter: React.FC<PresenterProps> = ({
    sentence,
    choiceList,
    selectedList,
    orderList,
    answeredList,
    outside,
    clear}) => (

        <div>
        {
            choiceList.length === 0
            ? <TitleLogo src="img/04_logo.png" />
            :
            <WrapperDiv>
                {
                    clear
                    ? <TitleLogo src="img/04_clear.png" />
                    : <span></span>
                }
                <SentenceStyled>
                    <SentenceInnerStyled>
                        {sentence}
                    </SentenceInnerStyled>
                </SentenceStyled>
                <WrongImg src="img/wrong_answer.png" wrong={outside} />
                <AnswerWrapperDiv>
                    <AnswerImg src="img/04_select01.png" />
                    <AnswerP selected={selectedList[9]} top={7} left={23}>{choiceList[orderList[9]]}</AnswerP>
                    <AnswerImg src="img/04_select02.png" />
                    <AnswerP selected={selectedList[8]} top={7} left={53.5}>{choiceList[orderList[8]]}</AnswerP>
                    <AnswerImg src="img/04_select03.png" />
                    <AnswerP selected={selectedList[7]} top={7} left={84}>{choiceList[orderList[7]]}</AnswerP>
                </AnswerWrapperDiv>
                <AnswerWrapperDiv>
                    <AnswerImg src="img/04_select04.png" />
                    <AnswerP selected={selectedList[6]} top={17} left={8}>{choiceList[orderList[6]]}</AnswerP>
                    <AnswerImg src="img/04_select05.png" />
                    <AnswerP selected={selectedList[5]} top={17} left={38.5}>{choiceList[orderList[5]]}</AnswerP>
                    <AnswerImg src="img/04_select06.png" />
                    <AnswerP selected={selectedList[4]} top={17} left={69}>{choiceList[orderList[4]]}</AnswerP>
                    <AnswerImg src="img/04_select07.png" />
                    <AnswerP selected={selectedList[3]} top={17} left={99.5}>{choiceList[orderList[3]]}</AnswerP>
                </AnswerWrapperDiv>
                <AnswerWrapperDiv>
                    <AnswerImg src="img/04_select08.png" />
                    <AnswerP selected={selectedList[2]} top={27} left={23}>{choiceList[orderList[2]]}</AnswerP>
                    <AnswerImg src="img/04_select09.png" />
                    <AnswerP selected={selectedList[1]} top={27} left={53.5}>{choiceList[orderList[1]]}</AnswerP>
                    <AnswerImg src="img/04_select10.png" />
                    <AnswerP selected={selectedList[0]} top={27} left={84}>{choiceList[orderList[0]]}</AnswerP>
                </AnswerWrapperDiv>
                <div style={{textAlign:"center"}}>
                    <SelectBase src="img/04_selectbase.png" />
                    <AnswerWrapperDiv>
                        <SelectedImg src="img/04_selected.png" selected={answeredList[0]} top={41.25} left={8}/>
                        <SelectP top={38.5} left={8}>{choiceList[0]}</SelectP>
                        <SelectedImg src="img/04_selected.png" selected={answeredList[1]} top={41.25} left={37}/>
                        <SelectP top={38.5} left={37}>{choiceList[1]}</SelectP>
                        <SelectedImg src="img/04_selected.png" selected={answeredList[2]} top={41.25} left={66}/>
                        <SelectP top={38.5} left={66}>{choiceList[2]}</SelectP>
                        <SelectedImg src="img/04_selected.png" selected={answeredList[3]} top={41.25} left={95}/>
                        <SelectP top={38.5} left={95}>{choiceList[3]}</SelectP>
                    </AnswerWrapperDiv>
                    <AnswerWrapperDiv>
                        <SelectedImg src="img/04_selected.png" selected={answeredList[4]} top={44.75} left={22.5}/>
                        <SelectP top={42} left={22.5}>{choiceList[4]}</SelectP>
                        <SelectedImg src="img/04_selected.png" selected={answeredList[5]} top={44.75} left={51.5}/>
                        <SelectP top={42} left={51.5}>{choiceList[5]}</SelectP>
                        <SelectedImg src="img/04_selected.png" selected={answeredList[6]} top={44.75} left={80.5}/>
                        <SelectP top={42} left={80.5}>{choiceList[6]}</SelectP>
                    </AnswerWrapperDiv>
                    <AnswerWrapperDiv>
                        <SelectedImg src="img/04_selected.png" selected={answeredList[7]} top={48.25} left={8}/>
                        <SelectP top={45.5} left={8}>{choiceList[7]}</SelectP>
                        <SelectedImg src="img/04_selected.png" selected={answeredList[8]} top={48.25} left={37}/>
                        <SelectP top={45.5} left={37}>{choiceList[8]}</SelectP>
                        <SelectedImg src="img/04_selected.png" selected={answeredList[9]} top={48.25} left={66}/>
                        <SelectP top={45.5} left={66}>{choiceList[9]}</SelectP>
                        <SelectedImg src="img/04_selected.png" selected={answeredList[10]} top={48.25} left={95}/>
                        <SelectP top={45.5} left={95}>{choiceList[10]}</SelectP>
                    </AnswerWrapperDiv>
                </div>
            </WrapperDiv>
        }
        </div>
)

const FinalQuizContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, outside, ...props}) => {
    let newOutside = false
    if (outside) {
        newOutside = outside
    }
    return presenter({outside: newOutside, ...props})
}

const FinalQuiz: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    FinalQuizContainer,
    FinalQuizPresenter
)

export default FinalQuiz;
