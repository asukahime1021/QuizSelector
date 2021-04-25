import React from 'react';
import {ContainerProps, container} from '../component'
import Square from '../atoms/Square';
import Box from '@material-ui/core/Box'

type ComponentProps = {
    squareText: string
    buttonText: string
}

type PresenterProps = ComponentProps

const SquareButtonPresenter: React.FC<PresenterProps> = (props) => (
    <Box>
        <Square text={props.squareText}/>
        <button>{props.buttonText}</button>
    </Box>
)

const SquareButtonContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, ...props}) => {
    return presenter(props)
}

const SquareButton: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    SquareButtonContainer,
    SquareButtonPresenter
)

export default SquareButton;
