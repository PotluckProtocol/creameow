import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import useUser from "../../../user/useUser";
import { isMinterApp } from "../../../utils/getAppType";
import MintContract, { MintContractOpts } from "./MintContract";

const MINT_GAS_LIMIT = 300000;
const MINT_STATE_REFRESH_INTERVAL_MS = 5000;
const MINTED_SUPPLY_REFRESH_INTERVAL_MS = 5000;
const FIXED_MAX_SUPPLY = 5555;
const FIXED_MINT_PRICE = BigNumber.from('30000000000000000');
const FIXED_MAX_PER_TX = 5;

const useMintContract = (contractAddress?: string) => {
    const user = useUser();
    const [mintContract, setMintContract] = useState<MintContract | null>(null);
    const walletAddress = user.account?.walletAddress;

    useEffect(() => {
        const init = async () => {
            console.log('Init minting contract');

            const mintContractOpts: MintContractOpts = {
                contractAddress,
                user,
                mintGasLimit: MINT_GAS_LIMIT,
                fixedMaxSupply: FIXED_MAX_SUPPLY,
                fixedMaxPerTx: FIXED_MAX_PER_TX,
                fixedMintPrice: FIXED_MINT_PRICE
            }

            if (isMinterApp() && contractAddress) {
                mintContractOpts['mintStateRefreshIntervalMs'] = MINT_STATE_REFRESH_INTERVAL_MS;
                mintContractOpts['mintSupplyRefreshIntervalMs'] = MINTED_SUPPLY_REFRESH_INTERVAL_MS;
            }

            const mintContract = new MintContract(mintContractOpts);

            console.log('new minting contract', mintContract);

            setMintContract(mintContract);
        }

        init();
    }, [contractAddress, walletAddress])

    return mintContract;
}

export default useMintContract;