import React from 'react';
import styled from 'styled-components';
import { container, ContainerProps } from '../component';

type ComponentProps = {
    width?: number
    height?: number
}

type PresenterProps = ComponentProps

const ReverseRectSquarePresenter: React.FC<PresenterProps> = () => (
    <StyledDiv>
        <StyledDiv1>
            round
        </StyledDiv1>
    </StyledDiv>
)

const StyledDiv = styled.div`
height: auto;
background:
  -webkit-radial-gradient(0 100%, circle, rgba(0,0,0,0) 14px, #5878b3 15px),
  // 右下
  -webkit-radial-gradient(100% 100%, circle, rgba(0,0,0,0) 14px, #5878b3 15px),
  // 右上
  -webkit-radial-gradient(100% 0, circle, rgba(0,0,0,0) 14px, #5878b3 15px),
  // 左上
  -webkit-radial-gradient(0 0, circle, rgba(0,0,0,0) 14px, #5878b3 15px);
background-position: bottom left, bottom right, top right, top left;
background-size: 50% 50%;
background-repeat: no-repeat;
`
const StyledDiv1 = styled.div`
height: auto;
background:
  -webkit-radial-gradient(0 100%, circle, rgba(0,0,0,0) 17px, #fff 18px),
  -webkit-radial-gradient(100% 100%, circle, rgba(0,0,0,0) 17px, #fff 18px),
  -webkit-radial-gradient(100% 0, circle, rgba(0,0,0,0) 17px, #fff 18px),
  -webkit-radial-gradient(0 0, circle, rgba(0,0,0,0) 17px, #fff 18px);
background-position: bottom left, bottom right, top right, top left;
background-size: 50% 50%;
background-repeat: no-repeat;
padding: 30px;
`

const ReverseRectSquareContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, ...props}) => {
    return presenter(props);
}

const ReverseRectSquare: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    ReverseRectSquareContainer,
    ReverseRectSquarePresenter
);

export default ReverseRectSquare;