import React, { useEffect } from 'react';
import { container, ContainerProps } from '../component';
import PanelDiv from '../atoms/PanelDiv';
import { useCurrentQuizCategoryContext } from '../atoms/Context'
import EachAnswerPanerl from '../organisms/EachAnswerPanel'

type ComponentProps = {
}
type PresenterProps = {}

const AnswerAreaPresenter: React.FC<PresenterProps> = ({children}) => (
    <PanelDiv>
        {children}
    </PanelDiv>
)

const AnswerAreaContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, ...props}) => {
    const currentQuizCategory = useCurrentQuizCategoryContext().currentQuizCategory;
    const [child, setChild] = React.useState<React.FC<{}>>(() => <div></div>);
    const [initialized, setInitialized] = React.useState(false);

    if ((currentQuizCategory.currentQuizCategoryId === null || currentQuizCategory.currentQuizCategoryId === 0) && !initialized) {
        setInitialized(true)
        console.log("Default panel")
        setChild(DefaultPanel);
    }

    useEffect(() => {
        setChild(() => <EachAnswerPanerl categoryId = {currentQuizCategory.currentQuizCategoryId} />)
    }, [currentQuizCategory.currentQuizCategoryId])
    
    return presenter({children: child, ...props})
}

const DefaultPanel: React.FC<{}> = () => (
    <div style={{backgroundColor: "#FFF", width: "100%", height: "24vh"}}></div>
)

const AnswerArea: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    AnswerAreaContainer,
    AnswerAreaPresenter
)

export default AnswerArea;
