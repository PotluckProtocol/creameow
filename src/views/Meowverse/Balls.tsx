import classNames from "classnames";
import Ball from "../../components/Ball";

export type BallsProps = {
    className?: string;
}

const Balls: React.FC<BallsProps> = ({
    className
}) => {
    const classes = classNames(className, 'flex', 'items-center', 'justify-center')
    return (
        <div className={classes}>
            <Ball className="mx-2" color="#FFC4D6" size={15} />
            <Ball className="mx-2" color="#FFC4D6" size={15} />
            <Ball className="mx-2" color="#FFC4D6" size={15} />
        </div>
    );
}

export default Balls;