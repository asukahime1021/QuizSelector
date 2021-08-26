import React from 'react';
import { container, ContainerProps } from '../component';
import TimerSquare from './TimerSquare';
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select';
import { ClassNameMap } from '@material-ui/styles';
import BgmSquare from './BgmSquare';
import TicketSquare from './TicketSquare';

type ComponentProps = {}
type PresenterProps = {
    onChangeSelect: (event: React.ChangeEvent<{value: unknown}>) => void
    selectNum: string
    classes: ClassNameMap
}

const useStyled = makeStyles(() => {
    return createStyles({
        panelselect: {
            minWidth: 120,
            fontSize: "7px"
        }
    })
})

const TimerBgmControlAreaPresenter: React.FC<PresenterProps> = ({onChangeSelect, selectNum, classes, ...props}) => (
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
    </div>
)


type ContainerComponentProps = ContainerProps<ComponentProps, PresenterProps>
const TimerBgmControlAreaContainer: React.FC<ContainerComponentProps> = ({presenter, ...props}) => {

    const [currentComponent, setCurrentComponent] = React.useState("1")
    const onChangeSelect = (event: React.ChangeEvent<{value: unknown}>) => {
        setCurrentComponent(event.target.value as string)
    }

    const classes = useStyled();

    return presenter({onChangeSelect: onChangeSelect,
        selectNum: currentComponent,
        classes: classes,
         ...props})
}

const TimerBgmControlArea: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    TimerBgmControlAreaContainer,
    TimerBgmControlAreaPresenter
)

export default TimerBgmControlArea;