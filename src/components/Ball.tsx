import styled from "styled-components";

export type BallProps = {
    color: string;
    size: number;
    className?: string;
}

type RootProps = {
    color: string;
    size: number;
}

const Root = styled.div<RootProps>`
    display: inline-block;
    background-color: ${props => props.color};
    border-radius: 50%;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
`;

const Ball: React.FC<BallProps> = (props) => {
    return <Root {...props} />
}

export default Ball;