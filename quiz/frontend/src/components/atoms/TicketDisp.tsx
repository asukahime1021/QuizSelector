import React, { Component } from 'react'
import styled from 'styled-components'
import { container, ContainerProps } from '../component'
import { useTicketContext } from './Context'

type ComponentProps = {}

type PresenterProps = {
    ticketNum: number
    ticketVisible: boolean
}

const TicketDispPresenter: React.FC<PresenterProps> = ({ticketNum, ticketVisible}) => (
    <TicketStyled ticketVisible={ticketVisible}>
        <img src="img/00_time.png" style={{width: "100%"}}/>
        <div style={{position: "absolute", top: "0rem", right: "2%"}}>
            <SpanStyled>{ticketNum}</SpanStyled>
            <MaiLabel>枚</MaiLabel>
        </div>
    </TicketStyled>
)

const TicketStyled = styled.div<{ticketVisible: boolean}>`
    display: ${props => props.ticketVisible ? "block" : "none"};
    width: 19vh;
    height: 8vh;
    line-height: 8vh;
    z-index: 1;
    text-align: right;
    position: relative;
    font-family: 'timer';
    font-size: 5vh;
    color: red;
    @font-face {
        font-family: 'timer';
        src: url('font/NitalagoRuika-06M.TTF');
    }
`

const SpanStyled = styled.span`
    margin-left: 20px;
    margin-right: 1vh;
`

const MaiLabel = styled.label`
    color: #3e4b5d;
    font-size: 1.3rem;
    margin-right: 0.7vh;
`

const TicketDispContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, ...props}) => {
    const ticket = useTicketContext().ticket
    const ticketNum = ticket.ticketInfo.ticketNum
    const ticketDispFlg = ticket.ticketInfo.ticketDispFlg
    return presenter({ticketNum, ticketVisible: ticketDispFlg, ...props})
}

const TicketDisp: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    TicketDispContainer,
    TicketDispPresenter
)

export default TicketDisp;
