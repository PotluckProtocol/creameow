import styled from "styled-components";

export type ArtistVideoProps = {
    className?: string;
}

const Container = styled.div`
    max-width: 864px;
    border: 3px solid #000;
    border-radius: 2rem;
    background-color: #FFC4D6;
    padding: 2rem;
`;

const InternalContainer = styled.div`
    border: 3px solid #000;
    border-radius: 2rem;
    height: 400px;
    background-color: white;
`;

const ArtistVideo: React.FC<ArtistVideoProps> = ({
    className
}) => {
    return (
        <Container className={className}>
            <InternalContainer>

            </InternalContainer>
        </Container>
    );
}

export default ArtistVideo;