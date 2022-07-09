export enum AppType { Marketing, Minter };
const getAppType = (): AppType => {
    console.log(process.env);
    const appTypeStr = (process.env.REACT_APP_TYPE || '').toLocaleLowerCase();
    if (appTypeStr === 'minter') {
        return AppType.Minter;
    } else if (appTypeStr === 'marketing') {
        return AppType.Marketing
    } else {
        throw new Error(`Unknown app type ${process.env.REACT_APP_TYPE}`);
    }
}

export const isMinterApp = () => getAppType() === AppType.Minter;

export default getAppType;

