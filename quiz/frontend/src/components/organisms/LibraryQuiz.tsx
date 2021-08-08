import React from 'react';
import { container, ContainerProps } from '../component';
import styled from 'styled-components'

type ComponentProps = {
    sentence: string
    choiceList: string[]
    selectedList: boolean[]
    orderList: number[]
}

type PresenterProps = ComponentProps & {
    pathList: string[]
}

const WrapperDiv = styled.div`
    color: white;
    font-family: 'timer';
    @font-face {
        font-family: 'timer';
        src: url('NitalagoRuika-06M.TTF');
    }
`

const SentenceStyled = styled.div`
    font-size: 3.5vh;
    height: 5.5vh;
    padding-top: 3vh;
    text-align: center;
    background-size: cover;
`

const BookAreaDiv = styled.div<{selected: boolean}>`
    visibility: ${props => props.selected ? 'hidden' : 'visible'};
    float: left;
    width: 20.4vh;
    height: 19vh;
`

const BookImg = styled.img`
    margin: 0 auto;
    height: 19vh;
`

const ChoiceDiv = styled.div<{top: number, left: number}>`
    width: 10vh;
    height: 20vh;
    writing-mode: vertical-rl;
    position: absolute;
    top: ${props => props.top}vh;
    left: ${props => props.left}vh;
    font-size: 3.1vh;
`

const ChoiceInnerDiv = styled.div<{selected: boolean}>`
    visibility: ${props => props.selected ? 'hidden' : 'visible'};
    position: absolute;
    display:inline;
    left: 50%;
    transform: translate(-50%, 5%);
`

const LibraryQuizPresenter: React.FC<PresenterProps> = ({sentence, choiceList, selectedList, orderList, pathList}) => (
    <WrapperDiv>
        <SentenceStyled>{sentence}</SentenceStyled>
        <ChoiceDiv top={31} left={8}><ChoiceInnerDiv selected={false}>{choiceList[0]}</ChoiceInnerDiv></ChoiceDiv>

        <ChoiceDiv top={31} left={28}>
            <ChoiceInnerDiv selected={false}>{choiceList[orderList[1]]}</ChoiceInnerDiv>
            <BookAreaDiv selected={!selectedList[orderList[1]]}>
                <BookImg src={pathList[0]} />
            </BookAreaDiv>
        </ChoiceDiv>
        <ChoiceDiv top={31} left={49}>
            <ChoiceInnerDiv selected={false}>{choiceList[orderList[2]]}</ChoiceInnerDiv>
            <BookAreaDiv selected={!selectedList[orderList[2]]}>
                <BookImg src={pathList[1]} />
            </BookAreaDiv>
        </ChoiceDiv>
        <ChoiceDiv top={31} left={69}>
            <ChoiceInnerDiv selected={false}>{choiceList[orderList[3]]}</ChoiceInnerDiv>
            <BookAreaDiv selected={!selectedList[orderList[3]]}>
                <BookImg src={pathList[2]} />
            </BookAreaDiv>
        </ChoiceDiv>
        <ChoiceDiv top={31} left={90}>
            <ChoiceInnerDiv selected={false}>{choiceList[orderList[4]]}</ChoiceInnerDiv>
            <BookAreaDiv selected={!selectedList[orderList[4]]}>
                <BookImg src={pathList[3]} />
            </BookAreaDiv>
        </ChoiceDiv>
        
        <ChoiceDiv top={31} left={110}><ChoiceInnerDiv selected={false}>{choiceList[choiceList.length - 1]}</ChoiceInnerDiv></ChoiceDiv>
        
        <div style={{paddingLeft: "10.5vh", display: "flex", justifyContent: "center"}}>
            <ChoiceDiv top={8.6} left={28}>
                <ChoiceInnerDiv selected={selectedList[1]}>{choiceList[1]}</ChoiceInnerDiv>
                <BookAreaDiv selected={selectedList[1]}>
                    <BookImg src="img/03_book01.png" />
                </BookAreaDiv>
            </ChoiceDiv>
            <ChoiceDiv top={8.6} left={49}>
                <ChoiceInnerDiv selected={selectedList[2]}>{choiceList[2]}</ChoiceInnerDiv>
                <BookAreaDiv selected={selectedList[2]}>
                    <BookImg src="img/03_book02.png" />
                </BookAreaDiv>
            </ChoiceDiv>
            <ChoiceDiv top={8.6} left={69}>
                <ChoiceInnerDiv selected={selectedList[3]}>{choiceList[3]}</ChoiceInnerDiv>
                <BookAreaDiv selected={selectedList[3]}>
                    <BookImg src="img/03_book03.png" />
                </BookAreaDiv>
            </ChoiceDiv>
            <ChoiceDiv top={8.6} left={90}>
                <ChoiceInnerDiv selected={selectedList[4]}>{choiceList[4]}</ChoiceInnerDiv>
                <BookAreaDiv selected={selectedList[4]}>
                    <BookImg src="img/03_book04.png" />
                </BookAreaDiv>
            </ChoiceDiv>
        </div>
    </WrapperDiv>
)

const LibraryQuizContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, orderList, ...props}) => {
    const pathList: string[] = []
    orderList.map(order => {
        console.log("order: " + order)
        if (order !== 0 && order !== 5) {
            pathList.push("img/03_book0" + order + ".png")
        }
    })
    return presenter({orderList, pathList, ...props})
}

const LibraryQuiz: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    LibraryQuizContainer,
    LibraryQuizPresenter
)

export default LibraryQuiz;
