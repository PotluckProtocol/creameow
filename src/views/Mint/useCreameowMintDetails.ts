import MintContract from "./useMintContract/MintContract";
import { useEffect, useState } from "react";
import useMintContract from "./useMintContract";
import { MintContractEvents, MintState } from "./useMintContract/MintContract";

const MINT_CONTRACT_ADDRESS = '0xAc1c9E4033a6Fa42aB4F86B7BF8A6580F8756A30'; // ROBOTO FTM!!

export type MintDetails = {
    maxSupply: number;
    mintedSupply: number;
    mintState: number;
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

                    const [maxSupply, mintState, mintedSupply] = await Promise.all([
                        mintContract.getMaxSupply(),
                        mintContract.getMintState(),
                        mintContract.getMintedSupply()
                    ]);

                    setMintDetails({
                        maxSupply,
                        mintContract,
                        mintedSupply,
                        mintState
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