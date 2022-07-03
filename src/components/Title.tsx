export enum TitleType {
    MintingNow,
    Meowverse,
    FAQ
}

export type TitleProps = {
    className?: string;
    type: TitleType;
}

const TITLE_IMAGE_MAP: Record<TitleType, string> = {
    [TitleType.MintingNow]: '/images/titles/mintingnow.png',
    [TitleType.Meowverse]: '/images/titles/meowverse.png',
    [TitleType.FAQ]: '/images/titles/faq.png'
}

const Title: React.FC<TitleProps> = ({
    className,
    type
}) => {
    return (
        <div className={className}>
            <img src={TITLE_IMAGE_MAP[type]} className="mx-auto" />
        </div>
    );
}

export default Title;