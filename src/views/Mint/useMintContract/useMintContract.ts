import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import useUser from "../../../user/useUser";
import MintContract from "./MintContract";

const MINT_STATE_REFRESH_INTERVAL_MS = 5000;
const MINTED_SUPPLY_REFRESH_INTERVAL_MS = 5000;
const FIXED_MAX_SUPPLY = 5555;
const FIXED_MINT_PRICE = BigNumber.from('30000000000000000');
const FIXED_MAX_PER_TX = 5;

const useMintContract = (contractAddress: string) => {
    const user = useUser();
    const [mintContract, setMintContract] = useState<MintContract | null>(null);
    const walletAddress = user.account?.walletAddress;

    useEffect(() => {
        const init = async () => {
            console.log('Init minting contract');
            const mintContract = new MintContract(contractAddress, user, {
                fixedMaxSupply: FIXED_MAX_SUPPLY,
                fixedMaxPerTx: FIXED_MAX_PER_TX,
                fixedMintPrice: FIXED_MINT_PRICE,
                mintStateRefreshIntervalMs: MINT_STATE_REFRESH_INTERVAL_MS,
                mintSupplyRefreshIntervalMs: MINTED_SUPPLY_REFRESH_INTERVAL_MS
            });
            setMintContract(mintContract);
        }

        init();
    }, [contractAddress, walletAddress])

    return mintContract;
}

export default useMintContract;