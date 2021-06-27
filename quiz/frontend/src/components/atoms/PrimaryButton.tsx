import Button from '@material-ui/core/Button'
import styled from 'styled-components'

const PrimaryButton = styled(Button)`
    width: 60px;
    min-width: 41px;
    height: 21px;
    margin: 4px 3px;
    background: #3C86F5;
    border: 1px solid #3C86F5;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    font-size: 7px;
    line-height: 11px;
    color: #FFFFFF;
    :hover {
        background: #6CB6FF;
        border: 1px solid #6CB6FF;
    }
`

export default PrimaryButton;
