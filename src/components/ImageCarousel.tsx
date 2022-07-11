import styled, { keyframes } from "styled-components"

export type ImageCarouselProps = {
    images: string[]
}

const scrollAnimation = keyframes`
    0% { transform: translateX(0%); }
    50% { transform: translateX(-100%); }
    100% { transform: translateX(0%); }
`;

const Container = styled.div`
`;

const InnerContainer = styled.div<{ itemCount: number }>`
    flex: 0 0 auto;
    min-width: 100%;
    animation: ${scrollAnimation} 100s linear 0s infinite;
    width: ${props => props.itemCount * 300}px
`;

const Left = styled.div`
    width: 50px;
    top: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    background: linear-gradient(
        to right, 
        rgba(255,253,247,1) 0%,
        rgba(0,0,0,0) 100%
    );
    z-index: 5;
`;

const Right = styled.div`
    width: 50px;
    top: 0;
    position: absolute;
    bottom: 0;
    right: 0;
    background: linear-gradient(
        to left, 
        rgba(255,253,247,1) 0%,
        rgba(0,0,0,0) 100%
    );
    z-index: 5;
`;

const ImageCarousel: React.FC<ImageCarouselProps> = ({
    images
}) => {

    return (
        <Container className="block overflow-x-hidden w-full relative">
            <Left />
            <InnerContainer className="flex" itemCount={images.length}>
                <div className='flex'>
                    {images.map((image, index) => (
                        <img key={index} src={image} />
                    ))}
                </div>
            </InnerContainer>
            <Right />
        </Container>
    )

}

export default ImageCarousel;