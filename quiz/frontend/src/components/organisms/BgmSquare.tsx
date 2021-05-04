import Slider from '@material-ui/core/Slider';
import React from 'react';
import { container, ContainerProps } from '../component';
import PanelDiv from '../atoms/PanelDiv';
import BlockLabel from '../atoms/BlockLabel';

type ComponentProps = {}
type PresenterProps = {}

const BgmSquarePresenter: React.FC<PresenterProps> = () => (
    <PanelDiv>
        <div style={{margin: "0px 7px"}}>
            <BlockLabel text={"BGM"}/>
        </div>
        <Slider value={10} style={{width: "150px"}}></Slider>
    </PanelDiv>
)

const BgmSquareContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, ...props}) => {
    return presenter({...props})
}

const BgmSquare: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    BgmSquareContainer,
    BgmSquarePresenter
)

export default BgmSquare;
