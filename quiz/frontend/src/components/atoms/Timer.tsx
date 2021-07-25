import React, { useState, useEffect, useRef } from 'react';
import { ContainerProps, container } from '../component';
import styled from 'styled-components';
import { useTimerContext, useSetTimerContext } from './Context'

export type ComponentProps = {
}

type PresenterProps = {
    timervisible: string
    time: number
    timerStr: string
}

const TimerPresenter: React.FC<PresenterProps> = (
    {time, timerStr, ...props}
) => (
    <div {...props}>
        <div>
            <span>{timerStr}</span>
        </div>
    </div>
)

const TimerStyled = styled(TimerPresenter)`
    div {
        display: ${props => props.timervisible === "true" ? "block" : "none"};
        width: 19vh;
        height: 8vh;
        line-height: 8vh;
        z-index: 1;
        position: relative;
        background-image: url("00_second.png"), url("00_time.png");
        background-repeat: no-repeat;
        background-size: 3vh, cover;
        background-position: 15vh 4vh, 0 0;
        font-family: 'timer';
        font-size: 5vh;
        color: red;
        @font-face {
            font-family: 'timer';
            src: url('NitalagoRuika-06M.TTF');
        }
    }
    span {
        margin-left: 20px;
    }
`


const TimerContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, ...props}) => {
    /* eslint-disable */
    const timerContext = useTimerContext().timerContext
    const setTimerContext = useSetTimerContext().setTimerContext

    const [localTime, setLocalTime] = useState(timerContext.time)
    const [visible, setVisible] = useState(false)
    const timeIntervalRef = useRef(0)
    const timeRef = useRef(localTime)

    // 時間セットしたときに、同じ数字だと変更だと判定されない
    useEffect(() => {
        setLocalTime(timerContext.time)
        timeRef.current = timerContext.time
    }, [timerContext.timerSetFlg])

    useEffect(() => {
        timeRef.current = localTime
    }, [localTime])

    useEffect(() => {
        if (timerContext.timerDispFlg) {
            setVisible(true)
            return
        }
        setVisible(false)
    }, [timerContext.timerDispFlg])

    useEffect(() => {
        if (timerContext.timerFlg) {
            setTimerContext.setTimerSetFlg(false)
            timeIntervalRef.current = setInterval(tick, 1000) as unknown as number;
            return;
        }
        clearInterval(timeIntervalRef.current)
        setLocalTime(timeRef.current)
    }, [timerContext.timerFlg])
    /* eslint-enable */
    
    const tick = () => {
        if (timeRef.current === 0) {
            clearInterval(timeIntervalRef.current);
            return;
        }
        setLocalTime(currentTime => currentTime -1)
    }

    const timeStr = zeroFill(localTime.toString());

    return presenter({timervisible: visible ? "true" : "false",
        time: localTime,
        timerStr: timeStr,
        ...props})
}

const zeroFill: (arg: string) => string = (arg: string) => {
    switch(arg.length) {
        case 1: return "00" + arg;
        case 2: return "0" + arg;
        case 3: return arg;
        default: return "999";
    }
}

const Timer: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(TimerContainer, TimerStyled)

export default Timer;