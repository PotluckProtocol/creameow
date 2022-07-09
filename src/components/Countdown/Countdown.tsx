import { ComponentPropsWithRef, useEffect, useState } from "react";
import styled from "styled-components";
import useScreenSize from "../../hooks/useScreenSize";
import Blocks from "./Blocks";
import getTimeBetween, { TimeBetween } from "./getTimeBetween";

export type CountdownProps = {
    to: Date;
}

const Container = styled.div`

`;

type SeparatorProps = ComponentPropsWithRef<'div'> & {
    isSmallScreen: boolean;
}

const Separator = styled.div<SeparatorProps>`
    font-family: Inter;
    font-weight: 600;
    font-size: ${props => props.isSmallScreen ? 26 : 44}px; 
    line-height: ${props => props.isSmallScreen ? 26 : 44}px; 
    display: flex;
    padding-top: .5rem;
    margin: 0 .5rem;
    justify-content: center;
`;


const Countdown: React.FC<CountdownProps> = ({
    to
}) => {
    const screenSize = useScreenSize();
    const isSmallScreen = ['xs', 'sm'].includes(screenSize);
    const [timeBetween, setTimeBetween] = useState<TimeBetween | null>(null);

    useEffect(() => {
        const refresh = () => {
            setTimeBetween(
                getTimeBetween(new Date(), to)
            );
        }

        const handle = setInterval(() => {
            refresh();
        }, 1000);

        refresh();

        return () => clearInterval(handle);
    }, []);

    if (!timeBetween) {
        return null;
    }

    const { days, hours, minutes, seconds } = timeBetween;

    return (
        <Container className="flex justify-center">
            <Blocks isSmallScreen={isSmallScreen} num={days} label='DAY' />
            <Separator isSmallScreen={isSmallScreen}>:</Separator>
            <Blocks isSmallScreen={isSmallScreen} num={hours} label='HOUR' />
            <Separator isSmallScreen={isSmallScreen}>:</Separator>
            <Blocks isSmallScreen={isSmallScreen} num={minutes} label='MIN' />
            <Separator isSmallScreen={isSmallScreen}>:</Separator>
            <Blocks isSmallScreen={isSmallScreen} num={seconds} label='SEC' />
        </Container >
    );
}

export default Countdown;