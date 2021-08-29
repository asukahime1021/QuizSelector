import React from 'react';
import { container, ContainerProps } from '../component';
import TimerSquare from './TimerSquare';
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select';
import { ClassNameMap } from '@material-ui/styles';
import BgmSquare from './BgmSquare';
import TicketSquare from './TicketSquare';
import PrimaryButton from '../atoms/PrimaryButton';
import { CurrentTimer, SetCurrentTimer, TicketInfo } from '../objects/interfaces';
import { useSetTimerContext, useTicketContext, useTimerContext } from '../atoms/Context';

type ComponentProps = {}
type PresenterProps = {
    onChangeSelect: (event: React.ChangeEvent<{value: unknown}>) => void
    selectNum: string
    classes: ClassNameMap
    onClickBothDisp: () => void
}

const useStyled = makeStyles(() => {
    return createStyles({
        panelselect: {
            minWidth: 120,
            fontSize: "7px"
        }
    })
})

const TimerBgmControlAreaPresenter: React.FC<PresenterProps> = ({onChangeSelect, selectNum, classes, onClickBothDisp, ...props}) => (
    <div style={{marginLeft: "3vh"}} {...props}>
        <div style={{height: "110px"}}>
        {selectNum === "1" && <TimerSquare />}
        {selectNum === "2" && <TicketSquare />}
        {selectNum === "3" && <BgmSquare /> }
        </div>
        <Select
          autoWidth 
          onChange={onChangeSelect}
          className={classes.panelselect}
          defaultValue="1"
          >
            <option value="1" style={{fontSize: "7px"}}>タイマー</option>
            <option value="2" style={{fontSize: "7px"}}>パスチケット</option>
            <option value="3" style={{fontSize: "7px"}}>BGM</option>
        </Select>
        <PrimaryButton onClick={onClickBothDisp}>両方表示</PrimaryButton>
    </div>
)


type ContainerComponentProps = ContainerProps<ComponentProps, PresenterProps>
const TimerBgmControlAreaContainer: React.FC<ContainerComponentProps> = ({presenter, ...props}) => {

    const [currentComponent, setCurrentComponent] = React.useState("1")
    const setTimerContext: SetCurrentTimer = useSetTimerContext().setTimerContext
    const ticket = useTicketContext().ticket
    const newTicket: TicketInfo = {
        ticketNum: ticket.ticketInfo.ticketNum,
        ticketDispFlg: ticket.ticketInfo.ticketDispFlg
    }

    const onChangeSelect = (event: React.ChangeEvent<{value: unknown}>) => {
        setCurrentComponent(event.target.value as string)
    }

    const classes = useStyled();

    const onClickBothDisp = () => {
        setTimerContext.setTimerDispFlg(timerDispFlg => !timerDispFlg);
        newTicket.ticketDispFlg = !newTicket.ticketDispFlg
        ticket.setTicketInfo(newTicket)
    }

    return presenter({onChangeSelect: onChangeSelect,
        selectNum: currentComponent,
        classes: classes,
        onClickBothDisp,
        ...props})
}

const TimerBgmControlArea: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    TimerBgmControlAreaContainer,
    TimerBgmControlAreaPresenter
)

export default TimerBgmControlArea;