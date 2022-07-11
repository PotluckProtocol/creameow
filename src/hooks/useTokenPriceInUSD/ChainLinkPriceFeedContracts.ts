export type PriceFeedItem = {
    contractAddress: string;
    decimals: number;
}

export const CHAINLINK_PRICE_FEED_CONTRACT: PriceFeedItem = {
    contractAddress: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
    decimals: 8,
}