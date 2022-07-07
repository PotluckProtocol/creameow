import { BigNumber, Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import useUser from "../../user/useUser";
import useInterval from "../useInterval";
import { abi } from "./abi";
import { CHAINLINK_PRICE_FEED_CONTRACT } from "./ChainLinkPriceFeedContracts";
import { PriceFeedCache } from "./PriceFeedCache";

const CACHE_EXPIRE_TIME_MS = 60000;
const REFETCH_PRICE_DATA_INTERVAL_MS = 60000;

const priceFeedCache = new PriceFeedCache(CACHE_EXPIRE_TIME_MS);

export const useTokenPriceInUSD = () => {

    const user = useUser();
    const [price, setPrice] = useState<number | null>(null);

    const fetchPrice = async () => {
        const cachedValue = priceFeedCache.get('ETH');
        if (cachedValue !== null) {
            setPrice(cachedValue);
        } else {
            try {
                const { contractAddress, decimals } = CHAINLINK_PRICE_FEED_CONTRACT;
                const contract = new Contract(
                    contractAddress,
                    abi,
                    user.getSignerOrProvider()
                );

                const answer: BigNumber = await contract.latestAnswer();
                const price = parseFloat(ethers.utils.formatUnits(answer, decimals));

                setPrice(price);
                priceFeedCache.add('ETH', price);
            } catch (e) {
                console.log(`Error on fetching price feed for ETH`, e);
            }
        }
    }

    useEffect(() => {
        setPrice(null);
        fetchPrice();
    }, []);

    useInterval(() => {
        fetchPrice();
    }, REFETCH_PRICE_DATA_INTERVAL_MS);

    return price;
}