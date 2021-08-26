import React from 'react';
import { container, ContainerProps } from '../component';
import styled from 'styled-components'
import { useCurrentQuizProgressContext } from '../atoms/Context';

type ComponentProps = {
    progress: number
}

type PresenterProps = {
}

const ProgressImage = styled.img`
    width: 100%;
`

const ProgressGetImage = styled.img<{left: number}>`
    position: absolute;
    top: -2vh;
    left: ${(props) => props.left}vh;
    width: 9vh;
`

const NowImage = styled.img `
    position: absolute;
    top: -5vh;
    left: 4.2vh;
    width: 7vh;
`

const calcGetImg = (progress: number) => {

    const offsetCount: number = progress < 7 ? 0
    : progress === 7 ? 0.5 
    : progress > 7 && progress < 14 ? 1.1
    : progress === 14 ? 1.9
    : progress > 14 && progress < 21 ? 2.1
    : 3.0

    const offset = offsetCount * 2

    return progress * 5.2 + offset - 1
}

const SRProgressPresenter: React.FC<PresenterProps> = () => (
    <div>
        <ProgressImage src="img/01_get_base.png" />
        <ProgressGetImage src="img/01_get.png" left={35.5}/>
        <ProgressGetImage src="img/01_get.png" left={74.5}/>
        <ProgressGetImage src="img/01_get.png" left={113}/>
        <NowImage id="now" src="img/01_now.png" />
    </div>
)

const SRProgressContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, progress, ...props}) => {

    const NowElement = document.getElementById('now')
    if (NowElement) {
        const leftNum = calcGetImg(progress)
        NowElement.style.left = leftNum + "vh"
    }

    return presenter(props)
}

const SRProgress: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    SRProgressContainer,
    SRProgressPresenter
)

export default SRProgress;
