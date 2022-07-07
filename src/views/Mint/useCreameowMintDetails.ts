import MintContract from "./useMintContract/MintContract";
import { useEffect, useState } from "react";
import useMintContract from "./useMintContract";
import { MintContractEvents, MintState } from "./useMintContract/MintContract";
import { BigNumber } from "ethers";

const PUBLIC_MINT_STARTS_AT: string = '2022-07-16T20:00:00Z';
const WHITELIST_MINT_STARTS_AT: string = '2022-07-15T20:00:00Z';
const MINT_CONTRACT_ADDRESS = '0xE3763f557933B3396795ad3920Dd7D191359CcEF'; // ROBOTO FTM!!

export type MintDetails = {
    maxSupply: number;
    mintedSupply: number;
    mintState: number;
    mintPrice: BigNumber;
    mintPublicStartsAt: Date;
    mintWhitelistStartsAt: Date;
    maxPerTx: number;
    mintContract: MintContract;
}

const useCreameowMintDetails = (): MintDetails | null => {
    const mintContract = useMintContract(MINT_CONTRACT_ADDRESS);
    const [mintDetails, setMintDetails] = useState<MintDetails | null>(null);

    useEffect(() => {
        const init = async () => {
            if (mintContract) {
                try {
                    console.log('Initializing mint details');

                    const [maxSupply, mintState, mintedSupply, maxPerTx, mintPrice] = await Promise.all([
                        mintContract.getMaxSupply(),
                        mintContract.getMintState(),
                        mintContract.getMintedSupply(),
                        mintContract.getMaxPerTx(),
                        mintContract.getMintPrice()
                    ]);

                    setMintDetails({
                        maxSupply,
                        mintContract,
                        mintedSupply,
                        mintState,
                        maxPerTx,
                        mintPrice,
                        mintPublicStartsAt: new Date(PUBLIC_MINT_STARTS_AT),
                        mintWhitelistStartsAt: new Date(WHITELIST_MINT_STARTS_AT)
                    });

                    mintContract.on(MintContractEvents.MintSupplyUpdated, (mintedSupply: number) => {
                        if (mintDetails) {
                            setMintDetails({
                                ...mintDetails,
                                mintedSupply
                            });
                        }
                    });

                    mintContract.on(MintContractEvents.MintStateUpdated, (mintState: MintState) => {
                        if (mintDetails) {
                            setMintDetails({
                                ...mintDetails,
                                mintState
                            });
                        }
                    });
                } catch (e) {
                    console.error('Initializing minting failed', e);
                    throw e;
                }
            }
        }

        init();

        return () => {
            mintContract?.clear();
        }
    }, [mintContract]);

    return mintDetails;
}

export default useCreameowMintDetails;