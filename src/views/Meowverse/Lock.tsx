import React from "react"

export type LockProps = {
    className?: string;
}

const LOCK_IMAGE = '/images/meowverse/lock.png';

const Lock: React.FC<LockProps> = ({
    className
}) => {
    return (
        <img className={className} src={LOCK_IMAGE} />
    )
}

export default Lock;