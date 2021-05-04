import React, { useState, useEffect, useRef } from 'react';
import { ContainerProps, container } from '../component';
import styled from 'styled-components';
import { useAppContext } from './Context'

export type ComponentProps = {
}

type PresenterProps = {
    timervisible: string
    time: number
    tenSrc: string
    oneSrc: string
}

const TimerPresenter: React.FC<PresenterProps> = (
    {time, tenSrc, oneSrc, ...props}
) => (
    <div {...props}>
        <div>
        <img src={tenSrc} alt="ten"/>
        <img src={oneSrc} alt="one"/>
        </div>
    </div>
)

const TimerStyled = styled(TimerPresenter)`
    div {
        display: ${props => props.timervisible === "true" ? "block" : "none"};
        width: 150px;
        height: 62px;
        position: relative;
        color: black;
        text-align: center;
        background-image: url("timer_base.png");
    }
    img {
        padding: 3px;
        max-width: auto;
        max-height: 90%;
    }
`


const TimerContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, ...props}) => {
    /* eslint-disable */
    const {timerContext} = useAppContext()

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
            timerContext.setTimerSetFlg(false)
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
    const tenSrc = "num" + timeStr.substr(0,1) + ".png";
    const oneSrc = "num" + timeStr.substr(1,2) + ".png";

    return presenter({timervisible: visible ? "true" : "false",
        time: localTime,
        tenSrc: tenSrc,
        oneSrc: oneSrc,
        ...props})
}

const zeroFill: (arg: string) => string = (arg: string) => {
    if (arg.length === 1) {
        return "0" + arg;
    }
    return arg;
}

const Timer: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(TimerContainer, TimerStyled)

export default Timer;