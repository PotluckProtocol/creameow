import MintContract from "./useMintContract/MintContract";
import { useCallback, useEffect, useRef, useState } from "react";
import useMintContract from "./useMintContract";
import { MintContractEvents, MintState } from "./useMintContract/MintContract";
import { BigNumber } from "ethers";

const PUBLIC_MINT_STARTS_AT: string = '2022-07-16T20:00:00Z';
const WHITELIST_MINT_STARTS_AT: string = '2022-07-15T20:00:00Z';

export type MintDetails = {
    maxSupply: number;
    mintedSupply: number;
    mintState: number;
    mintPrice: BigNumber;
    mintPublicStartsAt: Date;
    mintWhitelistStartsAt: Date;
    maxPerTx: number;
    whitelistSpots: number;
}

const useCreameowMintDetails = (mintContract: MintContract | null): MintDetails | null => {
    const [mintDetails, setMintDetails] = useState<MintDetails | null>(null);

    const mintedSupplyCallback = (mintedSupply: number) => {
        if (mintDetails) {
            setMintDetails({ ...mintDetails, mintedSupply });
        }
    }

    const mintStateCallback = (mintState: MintState) => {
        if (mintDetails) {
            setMintDetails({ ...mintDetails, mintState });
        }
    }

    const savedMintedSupplyCallback = useRef(mintedSupplyCallback)
    const savedMintStateCallback = useRef(mintStateCallback);

    useEffect(() => {
        savedMintedSupplyCallback.current = mintedSupplyCallback;
    }, [mintedSupplyCallback]);

    useEffect(() => {
        savedMintStateCallback.current = mintStateCallback;
    }, [mintStateCallback]);

    useEffect(() => {
        const init = async () => {
            if (mintContract) {
                try {
                    console.log('Initializing mint details', mintContract);

                    const [maxSupply, mintState, mintedSupply, maxPerTx, mintPrice, whitelistSpots] = await Promise.all([
                        mintContract.getMaxSupply(),
                        mintContract.getMintState(),
                        mintContract.getMintedSupply(),
                        mintContract.getMaxPerTx(),
                        mintContract.getMintPrice(),
                        mintContract.getWhitelistSpots()
                    ]);

                    setMintDetails({
                        maxSupply,
                        mintedSupply,
                        mintState,
                        maxPerTx,
                        whitelistSpots,
                        mintPrice,
                        mintPublicStartsAt: new Date(PUBLIC_MINT_STARTS_AT),
                        mintWhitelistStartsAt: new Date(WHITELIST_MINT_STARTS_AT)
                    });

                    mintContract.on(MintContractEvents.MintSupplyUpdated, mintedSupplyCallback);
                    mintContract.on(MintContractEvents.MintStateUpdated, mintStateCallback);
                } catch (e) {
                    console.error('Initializing minting failed', e);
                    throw e;
                }
            }
        }

        init();

        return () => mintContract?.clear();
    }, [mintContract]);

    return mintDetails;
}

export default useCreameowMintDetails;