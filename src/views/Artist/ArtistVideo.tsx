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

const Video = styled.video`
    border-radius: 2rem;
    border: 3px solid #000;
`;

const ArtistVideo: React.FC<ArtistVideoProps> = ({
    className
}) => {
    return (
        <Container className={className}>
            <Video className="w-full" controls autoPlay={false} loop={false}>
                <source src="/videos/intro.mov" type="video/mp4" />
            </Video>
        </Container>
    );
}

export default ArtistVideo;