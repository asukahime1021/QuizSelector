import React from 'react';
import styled from 'styled-components';
import BlockLabel from '../atoms/BlockLabel';
import Button from '@material-ui/core/Button';
import { container, ContainerProps } from '../component';
import { useTimerContext, useSetTimerContext } from '../atoms/Context'
import PanelDiv from '../atoms/PanelDiv';
import { CurrentTimer, SetCurrentTimer } from '../objects/interfaces';

type ComponentProps = {}
type PresenterProps = {
    onClickStart: () => void
    onClickSet: () => void
    onClickStop: () => void
    onClickHide: () => void
}

const InputMemo = React.memo(() => {
    return (
        <div style={{margin: "0px 7px"}}>
            <BlockLabel text={"タイマー"}/>
            <StyledInput type="number" id="timerInput"/>
        </div>
    )
})

type UpperButtonProps = {onClickSet: () => void, onClickStart: () => void}
const UpperButtonMemo = React.memo<UpperButtonProps>((props) => {
    return (
        <div>
            <StyledButton onClick={props.onClickSet}>セット</StyledButton>
            <StyledButton onClick={props.onClickStart}>スタート</StyledButton>
        </div>
    )
})

type LowerButtonProps = {onClickHide: () => void, onClickStop: () => void}
const LowerButtonMemo = React.memo<LowerButtonProps>((props) => {
    return (
        <div>
            <StyledButton onClick={props.onClickHide}>表示</StyledButton>
            <StyledButton onClick={props.onClickStop}>ストップ</StyledButton>
        </div>
    )
})

const TimerSquarePresenter: React.FC<PresenterProps> = ({
    onClickSet,
    onClickStart,
    onClickHide,
    onClickStop,
}) => (
    <PanelDiv>
        <InputMemo />
        <UpperButtonMemo onClickSet={onClickSet} onClickStart={onClickStart}/>
        <LowerButtonMemo onClickHide={onClickHide} onClickStop={onClickStop} />
    </PanelDiv>
)

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

const TimerSquareContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, ...props}) => {
    // timer
    const timerContext: CurrentTimer = useTimerContext().timerContext
    const setTimerContext: SetCurrentTimer = useSetTimerContext().setTimerContext
    const {timerFlg} = timerContext
    const {setTime, setTimerFlg, setTimerSetFlg, setTimerDispFlg} = setTimerContext

    /* eslint-disable */
    const onClickStart: () => void = React.useCallback(() => {
            if (!timerFlg) {
                setTimerFlg(timerFlg => !timerFlg)
            }
    },[timerFlg])

    const onClickStop: () => void = React.useCallback(() => {
        if (timerFlg) {
            setTimerFlg(timerFlg => !timerFlg)
        }
    },[timerFlg])

    const onClickHide: () => void = React.useCallback(() => {
        setTimerDispFlg(timerDispFlg => !timerDispFlg);
    },[])

    const onClickSet: () => void = React.useCallback(() => {
        const input: HTMLInputElement = document.getElementById('timerInput') as HTMLInputElement
        const timerInput = input.value ? Number(input.value) : Number(0)
        setTime(timerInput)
        setTimerFlg(false)
        setTimerSetFlg(timerSetFlg => !timerSetFlg)
    },[])
    /* eslint-enable */

    // onClick でフラグを反転
    return presenter({ 
        onClickStart: onClickStart,
        onClickSet: onClickSet,
        onClickStop: onClickStop,
        onClickHide: onClickHide,
         ...props
        })
}

const TimerSquare: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    TimerSquareContainer,
    TimerSquarePresenter
)

export default TimerSquare;