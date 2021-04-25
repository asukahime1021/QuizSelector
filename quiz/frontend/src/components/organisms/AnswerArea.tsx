import React from 'react';
import { container, ContainerProps } from '../component';
import PanelDiv from '../atoms/PanelDiv';

type ComponentProps = {}
type PresenterProps = {}

const AnswerAreaPresenter: React.FC<PresenterProps> = () => (
    <PanelDiv>
        aaa
    </PanelDiv>
)

const AnswerAreaContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, ...props}) => {
    return presenter({...props})
}

const AnswerArea: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    AnswerAreaContainer,
    AnswerAreaPresenter
)

export default AnswerArea;
