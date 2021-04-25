import React from 'react'
import styled from 'styled-components'
import { container, ContainerProps } from '../component'
import FlexGrowArea from '../atoms/FlexGrowArea';
import ControlAreaStyled from '../atoms/ControlAreaStyled';
import Grid from '@material-ui/core/Grid';
import TimerBgmControlArea from './TimerBgmControlArea';

type ComponentProps = {}

type PresenterProps = {}

const ControlAreaPresenter: React.FC<PresenterProps> = () => (
    <ControlAreaStyled>
        <FlexGrowArea width={100} backgroundcolor="#FFF">
            <Grid container>
                <Grid item xs={2}>
                    <OverDiv>
                        <p>武器や防具は</p>
                        <p>123456</p>
                        <p>123456</p>
                        <p>123456</p>
                        <p>123456123456789012939</p>
                        <p>123456</p>
                        <p>123456</p>
                    </OverDiv>
                </Grid>
                <Grid item xs={2}>
                    {/*タイマー＆BGM管理エリア */}
                    <TimerBgmControlArea />
                </Grid>
                <Grid item xs={5}>
                    {/*回答エリア  次回、gitにあげておく*/}                    
                    <div style={{backgroundColor: "#000", width: "100%", height: "24vh"}}></div>
                </Grid>
                <Grid item xs={3}>
                    {/*情報エリア */}
                    <div style={{backgroundColor: "#0F0", width: "100%", height: "24vh"}}></div>
                </Grid>
            </Grid>
        </FlexGrowArea>
    </ControlAreaStyled>
)

const OverDiv = styled.div`
    height: 24vh;
    overflow: scroll;
`

const ControlAreaContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = (props) => {
    return props.presenter(props)
}

const ControlArea: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    ControlAreaContainer,
    ControlAreaPresenter
)

export default ControlArea;
