import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { Account } from "./Account";
import { AccountContext } from "./AccountContext";
import { CHAIN_PUBLIC_RPC } from "./Chain";

export type ProviderOrSigner = ethers.providers.Provider | ethers.Signer;

const PUBLIC_PROVIDER = new ethers.providers.JsonRpcProvider(CHAIN_PUBLIC_RPC);

export type User = {
    account: Account | null;
    isInitialized: boolean;
    getSignerOrProvider(): ProviderOrSigner;
}

const useUser = (): User => {
    const accountContext = useContext(AccountContext);
    const { account, isInitialized } = accountContext;

    const getSignerOrProvider = (): ProviderOrSigner => {
        if (account) {
            console.log('Found account, using account.signer');
            return account.signer;
        } else {
            console.log('No account found, using public provider');
            return PUBLIC_PROVIDER;
        }
    }

    const [user, setUser] = useState<User>({
        account: null,
        isInitialized,
        getSignerOrProvider
    });

    const walletAddress = account?.walletAddress;

    useEffect(() => {
        setUser({ account, getSignerOrProvider, isInitialized });
    }, [walletAddress, isInitialized]);

    return user;
}

export default useUser;