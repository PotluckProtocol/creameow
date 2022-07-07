import { useEffect, useState } from "react";
import styled from "styled-components";
import Blocks from "./Blocks";
import getTimeBetween, { TimeBetween } from "./getTimeBetween";

export type CountdownProps = {
    to: Date;
}

const Container = styled.div`

`;

const Separator = styled.div`
    font-family: Inter;
    font-weight: 600;
    font-size: 44px; 
    line-height: 44px;
    display: flex;
    padding-top: .5rem;
    margin: 0 .5rem;
    justify-content: center;
`;


const Countdown: React.FC<CountdownProps> = ({
    to
}) => {
    const [timeBetween, setTimeBetween] = useState<TimeBetween | null>(null);

    useEffect(() => {
        const refresh = () => {
            const timeBetween = getTimeBetween(new Date(), to);
            setTimeBetween(timeBetween);
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
            <Blocks num={days} label='DAY' />
            <Separator>:</Separator>
            <Blocks num={hours} label='HOUR' />
            <Separator>:</Separator>
            <Blocks num={minutes} label='MIN' />
            <Separator>:</Separator>
            <Blocks num={seconds} label='SEC' />
        </Container >
    );
}

export default Countdown;