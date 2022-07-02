import classNames from "classnames";

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

    const classes = classNames('text-center', className);

    return (
        <div className={classes}>
            <img src={TITLE_IMAGE_MAP[type]} />
        </div>
    );
}

export default Title;