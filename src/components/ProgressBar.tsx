import { ComponentPropsWithRef } from "react";
import styled from "styled-components";

export type ProgressBarProps = {
    min: number;
    max: number;
    value: number;
}

type BarProps = ComponentPropsWithRef<'div'> & {
    percentageWidth: string
}

const RootContainer = styled.div`

`;

const BarContainer = styled.div`
    height: 25px;
    background-color: #FFE3EC;
    border: 4px solid #392E2C;
    border-radius: 1rem;
`;

const Bar = styled.div<BarProps>`
    background-color: #F9749E;
    border-radius: 1rem;
    border: 4px solid #392E2C;
    margin-left: -4px;
    margin-top: -4px;
    height: 100%;
    width: ${props => props.percentageWidth};
    height: 25px;
    transition: width .75s ease-in-out;
`;

const Count = styled.div`
    font-family: Inter;
    font-size: 18px;
`;

const ProgressBar: React.FC<ProgressBarProps> = ({
    min,
    max,
    value
}) => {
    const percentage = ((value === 0) ? value : (value / (max - min) * 100)).toFixed(2) + '%';
    return (
        <RootContainer>
            <BarContainer className="flex rounded-sm" role="progressbar">
                <Bar className="rounded-sm" percentageWidth={percentage} />
            </BarContainer>
            <div className="flex justify-between mt-1">
                <div />
                <Count>{value} / {max - min}</Count>
            </div>
        </RootContainer>
    )
}

export default ProgressBar