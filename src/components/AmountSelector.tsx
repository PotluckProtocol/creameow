import classNames from "classnames";
import styled from "styled-components";

export type AmountSelectorProps = {
    min: number;
    max: number;
    onChange: (value: number) => void;
    value: number;
    className?: string;
}

const BUTTON_WIDTH_PX = 60;

const Container = styled.div`
    color: #948D89;
    height: 62px;
    width: 300px;
    border: 4px solid #392E2C;
    border-radius: 2rem;
`;

const Amount = styled.div`
    text-align: center;
    font-family: Inter;
    font-size: 32px;
    font-weight: 700;
    margin-top: .25rem;
`;

const AmountButton = styled.button`
    display: block;
    width: ${BUTTON_WIDTH_PX}px;

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;

const Icon = styled.img`
    margin: 0 auto;
`;

const AmountSelector: React.FC<AmountSelectorProps> = ({
    className,
    min,
    max,
    onChange,
    value
}) => {
    const containerClasses = classNames(className, 'flex', 'justify-between')

    const handleDecrease = () => {
        const newValue = Math.max(value - 1, min);
        onChange(newValue);
    }

    const handleIncrease = () => {
        const newValue = Math.min(value + 1, max);
        onChange(newValue);
    }

    return (
        <Container className={containerClasses}>
            <AmountButton onClick={handleDecrease} disabled={value <= min}>
                <Icon src={'/images/amountselector/minus.svg'} />
            </AmountButton>
            <Amount>{value}</Amount>
            <AmountButton onClick={handleIncrease} disabled={value >= max}>
                <Icon src={'/images/amountselector/plus.svg'} />
            </AmountButton>
        </Container>
    )
}

export default AmountSelector;