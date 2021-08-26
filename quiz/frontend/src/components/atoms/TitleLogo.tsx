import React from 'react';
import styled from 'styled-components'
import { container, ContainerProps } from '../component';

type ComponentProps = {
    src: string
}

type PresenterProps = ComponentProps

const TitleLogoDiv = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 4;
`

const TitleLogoPresenter: React.FC<PresenterProps> = ({src}) => (
    <TitleLogoDiv>
        <img src={src} style={{width: "100%"}} />
    </TitleLogoDiv>
)

const TitleLogoContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, src, ...props}) => {
    return presenter({src, ...props})
}

const TitleLogo: React.FC<ComponentProps> = container(
    TitleLogoContainer,
    TitleLogoPresenter
)

export default TitleLogo;
