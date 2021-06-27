import React, { useEffect } from 'react';
import { container, ContainerProps } from '../component';
import PanelDiv from '../atoms/PanelDiv';
import { useAppContext } from '../atoms/Context'
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
    console.log("AnswerArea Container")
    const {currentQuizCategory} = useAppContext();
    const [child, setChild] = React.useState<React.FC<{}>>(() => <div></div>);
    const [initialized, setInitialized] = React.useState(false);

    if ((currentQuizCategory.currentQuizCategoryId === null || currentQuizCategory.currentQuizCategoryId === 0) && !initialized) {
        setInitialized(true)
        console.log("Default panel")
        setChild(DefaultPanel);
    }

    useEffect(() => {
        console.log("changed categoryId")
        switch(currentQuizCategory.currentQuizCategoryId) {
            case 1: setChild(() => <div style={{backgroundColor: "#F00", width: "100%", height: "24vh"}}></div>);break;
            case 2: setChild(() => <div style={{backgroundColor: "#0FF", width: "100%", height: "24vh"}}></div>);break;
            case 3: setChild(() => <div style={{backgroundColor: "#F0F", width: "100%", height: "24vh"}}></div>);break;
            case 4: setChild(() => <div style={{backgroundColor: "#FF0", width: "100%", height: "24vh"}}></div>);break;
            default: setChild(DefaultPanel);
        }    
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
