import { useContext, useState } from "react";
import { AccountContext, WalletType } from "../user/AccountContext";
import Button from "./Button";
import { ChooseWalletModal } from "./ChooseWalletModal";

export type ConnectWalletButtonProps = {
    className?: string;
    fontSize?: number;
}

const toShortWallet = (walletAddr: string): string => {
    return [
        walletAddr.substring(0, 4),
        walletAddr.substring(walletAddr.length - 4)
    ].join('...');
}

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
    className,
    fontSize
}) => {
    const accountContext = useContext(AccountContext);
    const [showChooseWalletModal, setShowChooseWalletModal] = useState(false);

    const handleButtonClick = () => {
        if (accountContext.account) {
            accountContext.disconnect();
        } else {
            setShowChooseWalletModal(true);
        }
    }

    const handleWalletTypeChosen = (walletType: WalletType) => {
        accountContext.connect(walletType);
        setShowChooseWalletModal(false);
    }

    let connectButtonText = 'Connect Wallet';
    if (accountContext.isConnecting) {
        connectButtonText = 'Connecting...';
    } else if (!!accountContext.account) {
        connectButtonText = toShortWallet(accountContext.account.walletAddress);
    }

    return (
        <>
            <Button color='light' fontSize={fontSize || 24} className={className} onClick={handleButtonClick}>
                {connectButtonText}
            </Button>

            {showChooseWalletModal && (
                <ChooseWalletModal
                    onClose={() => setShowChooseWalletModal(false)}
                    onWalletChosen={handleWalletTypeChosen}
                />
            )}
        </>
    )
}