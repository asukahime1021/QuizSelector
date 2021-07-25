import { Dispatch, SetStateAction } from "react";

export type CurrentTimer = {
    time: number
    setTime:  Dispatch<SetStateAction<number>>
    timerFlg: boolean
    setTimerFlg: Dispatch<SetStateAction<boolean>>
    timerSetFlg: boolean
    setTimerSetFlg: Dispatch<SetStateAction<boolean>>
    timerDispFlg: boolean
    setTimerDispFlg: Dispatch<SetStateAction<boolean>>
}