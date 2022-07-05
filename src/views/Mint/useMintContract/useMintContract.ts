import { useEffect, useState } from "react";
import useUser from "../../../user/useUser";
import MintContract from "./MintContract";

const MINT_STATE_REFRESH_INTERVAL_MS = 5000;
const MINTED_SUPPLY_REFRESH_INTERVAL_MS = 5000;
const FIXED_MAX_SUPPLY = undefined;

const useMintContract = (contractAddress: string) => {
    const user = useUser();
    const [mintContract, setMintContract] = useState<MintContract | null>(null);
    const walletAddress = user.account?.walletAddress;

    useEffect(() => {
        const init = async () => {
            const mintContract = new MintContract(contractAddress, user, {
                fixedMaxSupply: FIXED_MAX_SUPPLY,
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