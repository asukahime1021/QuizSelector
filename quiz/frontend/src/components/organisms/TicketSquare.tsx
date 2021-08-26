import { Button } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import BlockLabel from '../atoms/BlockLabel'
import { useTicketContext } from '../atoms/Context'
import PanelDiv from '../atoms/PanelDiv'
import { container, ContainerProps } from '../component'
import { TicketInfo } from '../objects/interfaces'

type ComponentProps = {}

type PresenterProps = {
    onClickSet: () => void,
    onClickIncrement: () => void,
    onClickHide: () => void,
    onClickDecrement: () => void
}

const StyledInput = styled.input`
    width: 112px;
`

const StyledButton = styled(Button)`
    width: 60px;
    min-width: 41px;
    height: 21px;
    margin: 4px 3px;
    background: #3C86F5;
    border: 1px solid #3C86F5;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    font-size: 7px;
    line-height: 11px;
    color: #FFFFFF;
    :hover {
        background: #6CB6FF;
        border: 1px solid #6CB6FF;
    }
`

const InputMemo = React.memo(() => {
    return (
        <div style={{margin: "0px 7px"}}>
            <BlockLabel text={"パスチケット"}/>
            <StyledInput type="number" id="ticketInput"/>
        </div>
    )
})

type UpperButtonProps = {
    onClickSet: () => void,
    onClickIncrement: () => void
}
const UpperButtonMemo = React.memo<UpperButtonProps>((props) => {
    return (
        <div>
            <StyledButton onClick={props.onClickSet}>セット</StyledButton>
            <StyledButton onClick={props.onClickIncrement}>+</StyledButton>
        </div>
    )
})

type LowerButtonProps = {
    onClickHide: () => void,
    onClickDecrement: () => void
}
const LowerButtonMemo = React.memo<LowerButtonProps>((props) => {
    return (
        <div>
            <StyledButton onClick={props.onClickHide}>表示</StyledButton>
            <StyledButton onClick={props.onClickDecrement}>-</StyledButton>
        </div>
    )
})

const TicketSquarePresenter: React.FC<PresenterProps> = ({onClickSet, onClickIncrement, onClickHide, onClickDecrement}) => (
    <PanelDiv>
        <InputMemo />
        <UpperButtonMemo onClickSet={onClickSet} onClickIncrement={onClickIncrement}/>
        <LowerButtonMemo onClickHide={onClickHide} onClickDecrement={onClickDecrement} />
    </PanelDiv>
)

const TicketSquareContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, ...props}) => {
    const ticket = useTicketContext().ticket
    const newTicket: TicketInfo = {
        ticketNum: ticket.ticketInfo.ticketNum,
        ticketDispFlg: ticket.ticketInfo.ticketDispFlg
    }

    const onClickSet: () => void = () => {
        const input: HTMLInputElement = document.getElementById('ticketInput') as HTMLInputElement
        const ticketInput = input.value ? Number(input.value) : Number(0)
        newTicket.ticketNum = ticketInput
        setTicket()
    }

    const onClickIncrement: () => void = () => {
        newTicket.ticketNum += 1
        setTicket()
    }

    const onClickHide: () => void = () => {
        newTicket.ticketDispFlg = !newTicket.ticketDispFlg
        setTicket()
    }

    const onClickDecrement: () => void = () => {
        newTicket.ticketNum -= 1
        setTicket()
    }

    const setTicket = () => {
        ticket.setTicketInfo(newTicket)
    }

    return presenter({onClickSet, onClickIncrement, onClickHide, onClickDecrement, ...props})
}

const TicketSquare: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    TicketSquareContainer,
    TicketSquarePresenter
)

export default TicketSquare;
