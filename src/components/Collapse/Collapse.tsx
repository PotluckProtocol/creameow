import styled from "styled-components";
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
    width: 100%;
    background-color: #FDF6EA;
    border: 3px solid #392E2C;
    border-radius: 2rem;
    padding: 1.5rem;
`;

const Button = styled.button``;

const Title = styled.div`
    text-align: left;
    font-size: 32px;
    font-family: Inter;
    font-weight: 600;
`;

const Content = styled.div`
    padding-left: 3.6rem;
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

    return (
        <Container id={id} className={className}>
            <Button onClick={onClick} className='flex'>
                <PositionedIcon type={open ? IconType.Open : IconType.Closed} />
                <Title>{title}</Title>
            </Button>
            {conditionallyRenderContent()}
        </Container>
    );
}

export default Collapse;