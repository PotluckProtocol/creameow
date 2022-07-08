import { createPortal } from "react-dom";
import styled from "styled-components";
import { WalletType } from "../user/AccountContext";
import Button from "./Button";

export type ChooseWalletModalProps = {
    onWalletChosen: (walletType: WalletType) => void;
    onClose: () => void;
}

const Shroud = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100vh;
    z-index: 8999;
    background-color: rgba(0,0,0,0.21);
`;

const Container = styled.div`
    position: absolute;
    border-radius: 1.5rem;
    border: 4px solid #392e2c;
    background-color: #FFFDF7;
    top: 8rem;
    width: 452px;
    max-width: 95%;
    right: 50%;
    transform: translateX(50%);
`;

const FullWidthButton = styled(Button)`
    display: block;
    width: 100%;
`;

const Title = styled.h2`
    text-align: center;
    font-family: Inter;
    font-size: 32px;
    font-weight: 700;
`;

export const ChooseWalletModal: React.FC<ChooseWalletModalProps> = ({
    onWalletChosen,
    onClose
}) => {
    const content = (
        <Shroud>
            <Container className="py-9 px-4 md:px-16">
                <Title className="mb-4">Choose Wallet</Title>

                <FullWidthButton color='light' fontSize={32} className="mb-6" onClick={() => onWalletChosen('MetaMask')}>Metamask</FullWidthButton>
                <FullWidthButton color='light' fontSize={32} className="mb-9" onClick={() => onWalletChosen('WalletConnect')}>WalletConnect</FullWidthButton>

                <div className="flex justify-center">
                    <Button color='dark' fontSize={22} onClick={onClose}>Close</Button>
                </div>
            </Container>
        </Shroud>
    );

    return createPortal(content, document.body);

}