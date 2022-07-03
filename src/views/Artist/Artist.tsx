import styled from "styled-components"
import ArtistVideo from "./ArtistVideo";

export type ArtistProps = {
    className?: string;
}

const Container = styled.div`
    background-image: url(/images/artist/bg.png);
    background-repeat: no-repeat;
    background-position: top center;
    padding-top: 8rem;
    padding-bottom: 26rem;
`;

const Image = styled.img``;

const TextContainer = styled.div`
    max-width: 738px;
`;

const Paragraph = styled.p`
    text-align: center;
    margin: 0;
    padding: 0;
`;

const Artist: React.FC<ArtistProps> = ({
    className
}) => {
    return (
        <Container className={className}>
            <Image src='/images/artist/huyenle.png' className="mx-auto" />

            <div className="mb-24">
                <TextContainer className="mx-auto mb-4">
                    <Paragraph>Heyun is Huyen Le, an artist from HCM city, Viet Nam who specializes in digital artwork in a variety of art styles. During the last 3 years she has found her best style - line 2d art, which enables her to freely express and deliver her art no matter what medium or content, be it horror or fantasy or any other genre.</Paragraph>
                    <Paragraph>She first knew about NFTs in August, 2021 when a friend introduced her to a public NFT discord server. By her self interest, she dug deeper into the NFT world and found that it's the perfect platform for her art to call home.</Paragraph>
                </TextContainer>

                <TextContainer className="mx-auto">
                    <Paragraph>With her extensive experience as a former illustrator, she wants to contribute her art style to the NFT community through high-quality projects and bring more positive impacts to the NFT community.</Paragraph>
                    <Paragraph>She is known for PhantasMeow and Phantasm Box  collections, which have all been received very well by the community. Her next project "Creameow" is her first generative project, which features the first kind of the cute citizen of MeowVerse</Paragraph>
                </TextContainer>
            </div>

            <ArtistVideo className="mx-auto" />
        </Container>
    )
}

export default Artist;