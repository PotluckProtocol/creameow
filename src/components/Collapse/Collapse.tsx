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
    font-size: 1.5rem;
    font-weight: 600;
`;

const Content = styled.button`
    text-align: left;
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
                <Content>
                    {content}
                </Content>
            );
        }
    }

    const containerClasses = classNames('flex', className);

    return (
        <Container onClick={onClick} id={id} className={containerClasses}>
            <div>
                <Icon className={'mt-2 mr-4'} type={open ? IconType.Open : IconType.Closed} />
            </div>
            <div>
                <Title>{title}</Title>
                {conditionallyRenderContent()}
            </div>
        </Container>
    );
}

export default Collapse;