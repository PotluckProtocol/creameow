import styled from 'styled-components';

export enum SocialIconType {
    Instagram,
    Twitter,
    Discord
}

export type SocialIconProps = {
    type: SocialIconType;
    url: string;
    className?: string;
}

const ICON_MAP: Record<SocialIconType, string> = {
    [SocialIconType.Instagram]: '/images/social/instagram.png',
    [SocialIconType.Twitter]: '/images/social/twitter.png',
    [SocialIconType.Discord]: '/images/social/discord.png'
}

const Link = styled.a`
    display: inline-block;
`;

const SocialIcon: React.FC<SocialIconProps> = ({
    className,
    type,
    url
}) => {
    return (
        <Link className={className} href={url} target='_blank'>
            <img src={ICON_MAP[type]} />
        </Link>
    )
}

export default SocialIcon;