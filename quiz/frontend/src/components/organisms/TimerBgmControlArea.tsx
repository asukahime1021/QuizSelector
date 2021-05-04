import React from 'react';
import { container, ContainerProps } from '../component';
import TimerSquare from './TimerSquare';
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select';
import { ClassNameMap } from '@material-ui/styles';
import BgmSquare from './BgmSquare';

type ComponentProps = {}
type PresenterProps = {
    onChangeSelect: (event: React.ChangeEvent<{value: unknown}>) => void
    isTimer: boolean
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

const TimerBgmControlAreaPresenter: React.FC<PresenterProps> = ({onChangeSelect, isTimer, classes, ...props}) => (
    <div style={{marginLeft: "3vh"}} {...props}>
        <div style={{height: "110px"}}>
        {
            isTimer
            ?
            <TimerSquare />
            :
            <BgmSquare />
        }
        </div>
        <Select
          autoWidth 
          onChange={onChangeSelect}
          className={classes.panelselect}
          defaultValue="1"
          >
            <option value="1" style={{fontSize: "7px"}}>タイマー</option>
            <option value="2" style={{fontSize: "7px"}}>BGM</option>
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
        isTimer: currentComponent === "1",
        classes: classes,
         ...props})
}

const TimerBgmControlArea: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    TimerBgmControlAreaContainer,
    TimerBgmControlAreaPresenter
)

export default TimerBgmControlArea;