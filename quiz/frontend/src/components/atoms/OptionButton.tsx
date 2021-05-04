import React from 'react';
import Button from '@material-ui/core/Button';
import { container, ContainerProps } from '../component';

type ComponentProps = {
    buttonText?: string
}
type PresenterProps = {
    buttonText: string
}

const OptionButtonPresenter: React.FC<PresenterProps> = ({buttonText, ...props}) => (
    <Button {...props}>
        {buttonText}
    </Button>
)

const OptionButtonContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, buttonText, ...props}) => {
    let text = ""
    if (buttonText === null) {
        text = "D"
    }

    return presenter({
        buttonText: text,
        ...props
    })
}

const OptionButton: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    OptionButtonContainer,
    OptionButtonPresenter
)

export default OptionButton;
