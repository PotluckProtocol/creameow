import styled from "styled-components";

export enum IconType {
    Open,
    Closed
}

export type IconProps = {
    className?: string;
    type: IconType;
}

const ICON_MAP: Record<IconType, string> = {
    [IconType.Open]: '/images/collapse/open.png',
    [IconType.Closed]: '/images/collapse/closed.png'
}

const Image = styled.img``;

const Icon: React.FC<IconProps> = ({
    className,
    type
}) => {
    return (
        <Image className={className} src={ICON_MAP[type]} />
    );
}

export default Icon;