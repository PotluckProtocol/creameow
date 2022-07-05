import { ethers } from "ethers";
import { Account } from "./Account";

export type ProviderOrSigner = ethers.providers.Provider | ethers.Signer;

type User = {
    account: Account | null;
    isInitialized: boolean;
    getSignerOrProvider(): ProviderOrSigner;
}

export default User;
