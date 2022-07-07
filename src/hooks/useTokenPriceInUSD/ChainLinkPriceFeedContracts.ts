export type PriceFeedItem = {
    contractAddress: string;
    decimals: number;
}

export const CHAINLINK_PRICE_FEED_CONTRACT: PriceFeedItem = {
    contractAddress: '0x11DdD3d147E5b83D01cee7070027092397d63658',
    decimals: 8,
}