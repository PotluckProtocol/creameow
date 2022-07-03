import styled from "styled-components";
import classNames from 'classnames';
import Icon, { IconType } from "./Icon";

export type CollapseProps = {
    className?: string;
    content: React.ReactNode;
    id: string;
    onClick: () => void;
    open: boolean;
    title: string;
}

const Container = styled.div`
    background-color: #FDF6EA;
    border: 3px solid #392E2C;
    border-radius: 2rem;
    padding: 1.5rem;
`;

const Title = styled.div`
    font-size: 32px;
    font-family: Inter;
    font-weight: 600;
`;

const Content = styled.button`
    text-align: left;
    font-size: 22px;
    font-family: Inter;
    font-weight: 600;
`;

const PositionedIcon = styled(Icon)`
    margin-top: .8rem;
    margin-right: 1.5rem;
`;

const Collapse: React.FC<CollapseProps> = ({
    className,
    content,
    id,
    onClick,
    open,
    title,
}) => {

    const conditionallyRenderContent = () => {
        if (open) {
            return (
                <Content className="mt-4">
                    {content}
                </Content>
            );
        }
    }

    const containerClasses = classNames('flex', className);

    return (
        <Container onClick={onClick} id={id} className={containerClasses}>
            <div>
                <PositionedIcon type={open ? IconType.Open : IconType.Closed} />
            </div>
            <div>
                <Title>{title}</Title>
                {conditionallyRenderContent()}
            </div>
        </Container>
    );
}

export default Collapse;