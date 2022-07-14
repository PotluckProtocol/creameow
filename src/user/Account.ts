import { Signer } from "ethers";

export type Account = {
    walletAddress: string;
    signer: Signer;
    networkId: number;
}