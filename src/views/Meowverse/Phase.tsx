import styled from 'styled-components';

export type PhaseProps = {
    className?: string;
    title: string;
    description: React.ReactNode;
}

const PhaseTitle = styled.div`
    font-family: Inter;
    font-size: 32px;
    font-weight: 700;
    text-align: left;
    color: #FFC4D6;
`;

const PhaseDescription = styled.div`
    font-family: Inter;
    font-weight: 600;
    font-size: 22px;
    text-align: left;
`;

const Phase: React.FC<PhaseProps> = ({
    className,
    description,
    title
}) => {
    return (
        <div className={className}>
            <PhaseTitle>{title}</PhaseTitle>
            <PhaseDescription>
                {description}
            </PhaseDescription>
        </div>
    );
}

export default Phase;