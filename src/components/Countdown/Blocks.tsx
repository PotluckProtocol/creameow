import styled from "styled-components";

export type Blocks = {
    num: number;
    label: string;
    isSmallScreen: boolean;
}

type BlockProps = React.ComponentPropsWithRef<'div'> & {
    isSmallScreen: boolean;
}

const Block = styled.div<BlockProps>`
    font-family: Inter;
    font-weight: 600;
    font-size: ${props => props.isSmallScreen ? 32 : 44}px;
    border-radius: ${props => props.isSmallScreen ? '.5' : '.75'}rem;
    line-height: 44px;
    background-color: #FFE3EC;
    margin: 0 .1rem;
    width: ${props => props.isSmallScreen ? 26 : 45}px;
    height:${props => props.isSmallScreen ? 46 : 60}px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Label = styled.div`
    text-align: center;
    font-family: Inter;
    font-size: 22px;
`;

const Blocks: React.FC<Blocks> = ({
    num,
    label,
    isSmallScreen
}) => {
    const strNum = (num < 10) ? `0${num}` : `${num}`;
    return (
        <div>
            <div className="flex">
                <Block isSmallScreen={isSmallScreen}>{strNum[0]}</Block>
                <Block isSmallScreen={isSmallScreen}>{strNum[1]}</Block>
            </div>
            <Label className="mt-2">{label}</Label>
        </div>
    )
}

export default Blocks;