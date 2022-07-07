export type TimeBetween = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * 60;
const SECONDS_IN_DAY = SECONDS_IN_HOUR * 24;

const getTimeBetween = (from: Date, to: Date) => {
    if (to.valueOf() < from.valueOf()) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    }

    const timeBetweenSeconds = Math.floor((to.valueOf() - from.valueOf()) / 1000);
    const days = Math.floor(timeBetweenSeconds / SECONDS_IN_DAY);
    const afterDaysSeconds = timeBetweenSeconds % SECONDS_IN_DAY;
    const hours = Math.floor(afterDaysSeconds / SECONDS_IN_HOUR);
    const afterHoursSeconds = afterDaysSeconds % SECONDS_IN_HOUR;
    const minutes = Math.floor(afterHoursSeconds / SECONDS_IN_MINUTE);
    const seconds = afterDaysSeconds % SECONDS_IN_MINUTE;

    return {
        days,
        hours,
        minutes,
        seconds
    }
}

export default getTimeBetween;