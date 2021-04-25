import React, { useContext, useState } from 'react';
import { TimerContext } from '../objects/TimerContext'

// Context で利用する変数をオブジェクトごとに定義
type ContextProps = {
    timerContext: TimerContext
}

const Context = React.createContext<ContextProps>({
    timerContext: {
        time: 0,
        setTime: () => {},
        timerFlg: false,
        setTimerFlg: () => {},
        timerSetFlg: false,
        setTimerSetFlg: () => {},
        timerDispFlg: false,
        setTimerDispFlg: () => {},
    }
})

const ContextProvider: React.FC = ({children}) => {
    const [timerFlg, setTimerFlg] = useState(false)
    const [time, setTime] = useState(0)
    const [timerSetFlg, setTimerSetFlg] = useState(false)
    const [timerDispFlg, setTimerDispFlg] = useState(false)

    const timerContext: TimerContext = {
        time: time,
        setTime: setTime,
        timerFlg: timerFlg,
        setTimerFlg: setTimerFlg,
        timerSetFlg: timerSetFlg,
        setTimerSetFlg: setTimerSetFlg,
        timerDispFlg: timerDispFlg,
        setTimerDispFlg: setTimerDispFlg
    }

    return (
        <Context.Provider value={{timerContext}}>
            {children}
        </Context.Provider>
    )
}

const useAppContext = () => useContext(Context)

export { ContextProvider, useAppContext }