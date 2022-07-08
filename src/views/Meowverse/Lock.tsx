import classNames from "classnames";
import React from "react"

export type LockProps = {
    className?: string;
}

const LOCK_IMAGE = '/images/meowverse/lock.png';

const Lock: React.FC<LockProps> = ({
    className
}) => {
    const classes = classNames(className, 'flex', 'items-center', 'justify-center');
    return (

        <div className={classes}>
            <img src={LOCK_IMAGE} />
        </div>
    )
}

export default Lock;