import React from 'react';
import Container from '@material-ui/core/Container'
import styled from 'styled-components'
import { ContainerProps, container } from '../component'

export type ComponentProps = {
    width?: number
    backgroundcolor?: string
    backgroundimage?: string
    children: React.ReactElement | React.ReactElement[]
}

type PresenterProps = ComponentProps & {
}

const AreaPresenter: React.FC<React.PropsWithChildren<PresenterProps>> = ({children, ...props}) => (
    <Container {...props}>
        {children}
    </Container>
)

const AreaStyled = styled(AreaPresenter)`
    width: ${props => props.width}%;
    background-color: ${props => props.backgroundcolor};
    background-image: url("${props => props.backgroundimage}");
`

const AreaContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, ...props}) => {
    return presenter(props)
}

const Area: React.FC<ComponentProps> = container(
    AreaContainer,
    AreaStyled
)

export default Area;