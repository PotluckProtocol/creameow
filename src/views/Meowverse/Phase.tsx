import classNames from 'classnames';
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
    color: #FFC4D6;
`;

const PhaseDescription = styled.div`
    font-family: Inter;
    font-weight: 600;
    font-size: 22px;
`;

const Phase: React.FC<PhaseProps> = ({
    className,
    description,
    title
}) => {
    const classes = classNames(className, 'flex', 'items-center', 'justify-center');
    return (
        <div className={classes}>
            <div>
                <PhaseTitle>{title}</PhaseTitle>
                <PhaseDescription>
                    {description}
                </PhaseDescription>
            </div>
        </div>
    );
}

export default Phase;