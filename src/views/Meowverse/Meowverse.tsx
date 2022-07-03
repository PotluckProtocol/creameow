import styled from "styled-components";

export type MeowverseProps = {
    className?: string;
}

const Container = styled.div`

`;

const Meowverse: React.FC<MeowverseProps> = ({
    className
}) => {
    return (
        <Container className={className}>

        </Container>
    );
}

export default Meowverse;