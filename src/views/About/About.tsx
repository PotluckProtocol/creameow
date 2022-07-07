import styled from "styled-components"

export type AboutProps = {
    className?: string;
    viewId: string;
}

const Container = styled.div`
    background-image: url(/images/about/bg.png);
    background-repeat: no-repeat;
    background-position: top center;
    padding-top: 13rem;
    padding-bottom: 26rem;
`;

const Image = styled.img``;

const TextContainer = styled.div`
    max-width: 738px;
`;

const Paragraph = styled.p`
    font-size: 18px;
    font-family: Inter;
    text-align: center;
    margin: 0;
    padding: 0;
`;

const About: React.FC<AboutProps> = ({
    className,
    viewId
}) => {
    return (
        <Container className={className} id={viewId}>
            <Image src='/images/about/creameow.png' className="mx-auto mb-4" />

            <TextContainer className="mx-auto">
                <Paragraph>In the year 2197, the human kind had gone extinct. The only intelligent life form left on the planet Earth is a chimera species whose genes are a mix between cats and foods.</Paragraph>
                <Paragraph>Meet your first MeowVerse creature: Creameow.</Paragraph>
                <Paragraph>Explore all 5555 unique Creameows on New Earth with their quirkiness and overloaded cuteness.</Paragraph>
            </TextContainer>
        </Container>
    )
}

export default About;