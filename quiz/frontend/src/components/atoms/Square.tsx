import React from 'react';
import { ContainerProps, container } from '../component';
import styled from 'styled-components';

type ComponentProps = {
    text: string
    width?: number
    height?: number
}
type PresenterProps = {
    width?: number
    height?: number
    className: string
}

type StyledDivProps = PresenterProps
const StyledDiv = styled.div<StyledDivProps>`
        background-color: white;
        color: black;
        width: ${props => props.width ? props.width: 30}%;
        height: ${props => props.height? props.height: 3}rem;
        border-radius: 8px;
`

const SquarePresenter: React.FC<PresenterProps> = ({children, className, ...props}) => {
    return <StyledDiv className={className}{...props}>
        {children}
        </StyledDiv>
}

const SquareContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, children, text, ...props}) => {
    return presenter({
        children: text,
        className: "",
        ...props
    })
}

const Square: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    SquareContainer,
    SquarePresenter
)

export default Square;
