import React from "react";
import styled from "styled-components";
import SocialIcon, { SocialIconType } from "../../components/SocialIcon";

export type FooterProps = {
    className?: string;
}

const Container = styled.div`
    background-image: url(/images/footer/bg.png);
    background-repeat: no-repeat;
    background-position: top center;
    padding-top: 21rem;
    padding-bottom: 3rem;
`;

const Image = styled.img``;

const Footer: React.FC<FooterProps> = ({
    className
}) => {
    return (
        <Container className={className}>
            <Image src='/images/footer/icecreamcat.png' className="mx-auto" />

            <div className="text-center mt-8">
                <SocialIcon className="mx-6" type={SocialIconType.Twitter} url='' />
                <SocialIcon className="mx-6" type={SocialIconType.Discord} url='' />
                <SocialIcon className="mx-6" type={SocialIconType.Instagram} url='' />
            </div>
        </Container>
    );
}

export default Footer;