import React from 'react';
import styled from 'styled-components';
import { container, ContainerProps } from '../component';

type ComponentProps = JSX.IntrinsicElements['label'] & {
    text: string
};

type PresenterProps = ComponentProps;

const BlockLabelPresenter: React.FC<PresenterProps> = ({text, ...props}) => (
    <label {...props}>
        {text}
    </label>
)

const StyledLabel = styled(BlockLabelPresenter)`
    display:block;
    font-size: 7px;
    letter-spacing: 2px;
    color: #C4C4C4;
`

const BlockLabelContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, ...props}) => {
    return presenter(props);
}

const BlockLabel: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    BlockLabelContainer,
    StyledLabel
)

export default BlockLabel;
