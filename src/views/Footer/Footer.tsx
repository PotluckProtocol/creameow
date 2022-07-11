import classNames from "classnames";
import React from "react";
import styled from "styled-components";
import SocialIcon, { SocialIconType } from "../../components/SocialIcon";
import commonViewClasses from "../commonViewClasses";

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
    const classes = classNames(className, ...commonViewClasses);
    return (
        <Container className={classes}>
            <Image src='/images/footer/icecreamcat.png' className="mx-auto" />

            <div className="text-center mt-8">
                <SocialIcon className="mx-6" type={SocialIconType.Twitter} url='https://twitter.com/HeyunLe' />
                <SocialIcon className="mx-6" type={SocialIconType.Discord} url='https://discord.gg/potluckprotocol' />
                <SocialIcon className="mx-6" type={SocialIconType.Instagram} url='https://instagram.com/heyun.art' />
            </div>
        </Container>
    );
}

export default Footer;