import classNames from "classnames";
import styled from "styled-components"
import ImageCarousel from "../../components/ImageCarousel";
import SocialIcon, { SocialIconType } from "../../components/SocialIcon";
import commonViewClasses from "../commonViewClasses";
import ArtistVideo from "./ArtistVideo";

export type ArtistProps = {
    viewId: string;
    className?: string;
}

const Container = styled.div`
    background-image: url(/images/artist/bg.png);
    background-repeat: no-repeat;
    background-position: top center;
    padding-top: 8rem;
    padding-bottom: 8rem;
`;

const Image = styled.img``;

const TextContainer = styled.div`
    max-width: 1050px;
`;

const Paragraph = styled.p`
    text-align: center;
    font-size: 18px;
    font-family: Inter;
    margin: 0;
    padding: 0;
`;

const CAROUSEL_IMAGES = [
    '/images/previews/01.png',
    '/images/previews/02.png',
    '/images/previews/03.png',
    '/images/previews/04.png',
    '/images/previews/05.png',
    '/images/previews/06.png',
    '/images/previews/07.png',
    '/images/previews/08.png',
    '/images/previews/09.png',
    '/images/previews/10.png',
    '/images/previews/11.png',
    '/images/previews/12.png',
    '/images/previews/01.png',
    '/images/previews/02.png',
    '/images/previews/03.png',
    '/images/previews/04.png',
    '/images/previews/05.png',
    '/images/previews/06.png',
    '/images/previews/07.png',
    '/images/previews/08.png',
    '/images/previews/09.png',
    '/images/previews/10.png',
    '/images/previews/11.png',
    '/images/previews/12.png',
]

const Artist: React.FC<ArtistProps> = ({
    className,
    viewId
}) => {
    const classes = classNames(className, ...commonViewClasses);
    return (
        <Container id={viewId} className={classes}>
            <Image src='/images/artist/huyenle.png' className="mx-auto mb-8" />

            <div className="mb-12">
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

            <div className="text-center my-8">
                <SocialIcon className="mx-6" type={SocialIconType.Twitter} url='https://twitter.com/HeyunLe' />
                <SocialIcon className="mx-6" type={SocialIconType.Discord} url='https://discord.gg/potluckprotocol' />
                <SocialIcon className="mx-6" type={SocialIconType.Instagram} url='https://instagram.com/heyun.art' />
            </div>

            <div className="pt-16">
                <ImageCarousel
                    images={CAROUSEL_IMAGES}
                />
            </div>

        </Container>
    )
}

export default Artist;