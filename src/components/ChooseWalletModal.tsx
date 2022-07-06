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
    background-color: rgba(0,0,0,0.75);
`;

const Container = styled.div`
    position: absolute;
    border-radius: 1.5rem;
    border: 4px solid #392e2c;
    background-color: #fdf6ea;
    top: 5rem;
    width: 300px;
    right: 50%;
    transform: translateX(50%);
`;

const FullWidthButton = styled(Button)`
    display: block;
    width: 100%;
`;

const Title = styled.h2`
    text-align: center;
    font-size: 1.5rem;
    font-weight: 600;
`;

export const ChooseWalletModal: React.FC<ChooseWalletModalProps> = ({
    onWalletChosen,
    onClose
}) => {

    const content = (
        <Shroud>
            <Container className="p-4">
                <Title className="mb-4">Choose Wallet</Title>

                <FullWidthButton className="mb-3" onClick={() => onWalletChosen('MetaMask')}>Metamask</FullWidthButton>
                <FullWidthButton className="mb-6" onClick={() => onWalletChosen('WalletConnect')}>WalletConnect</FullWidthButton>

                <div className="flex justify-center">
                    <Button onClick={onClose}>Close</Button>
                </div>
            </Container>
        </Shroud>
    )

    return createPortal(content, document.body);

}