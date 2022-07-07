import classNames from "classnames";
import { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import AmountSelector from "../../components/AmountSelector";
import Countdown from "../../components/Countdown/Countdown";
import ProgressBar from "../../components/ProgressBar";
import Title, { TitleType } from "../../components/Title";
import { useTokenPriceInUSD } from "../../hooks/useTokenPriceInUSD";
import useUser from "../../user/useUser";
import MintButton from "./MintButton";
import MintPrice from "./MintPrice";
import useCreameowMintDetails from "./useCreameowMintDetails";
import { MintState } from "./useMintContract/MintContract";

export type MintProps = {
    viewId: string;
    className?: string;
}

const Container = styled.div`
    max-width: 520px;
`;

const ProgressBarContainer = styled.div`
    max-width: 420px;
    margin: 0 auto;
`;

const CountdownContainer = styled.div`
    margin: 0 auto;
`;

const Paragraph = styled.p`
    text-align: center;
    font-size: 18px;
    font-family: Inter;
    margin: 0;
    padding: 0;
`;

const Image = styled.img`

`;

const NotConnectedText = styled.p`
    text-align: center;
    font-family: Inter;
    font-size: 44px;
    font-weight: 800;
    text-align: center;
`;

const MintedAmount = styled.div`
    font-family: Inter;
    font-size: 44px;
    font-weight: 800;
    text-align: center;
`;

const WhitelistSpots = styled.div`
    text-align: center;
    font-family: Inter;
    font-size: 32px;
    font-weight: 700;
    text-align: center;
`;

enum MintViewState {
    Now,
    Soon
}

const Mint: React.FC<MintProps> = ({
    className,
    viewId
}) => {
    const mintDetails = useCreameowMintDetails();
    const user = useUser();
    const [selectedAmount, setSelectedAmount] = useState<number>(1);
    const [isMinting, setIsMinting] = useState(false);

    if (!mintDetails) {
        return <div>Loading...</div>
    }

    console.log('Mint details', mintDetails);

    const mintViewState: MintViewState = (mintDetails.mintState === MintState.NotStarted)
        ? MintViewState.Soon
        : MintViewState.Now;
    const containerClasses = classNames('mt-12', 'mx-auto', className);
    const hasWalletConnected = !!user.account;
    const isWhitelistSale = (mintDetails.mintState === MintState.Whitelist);
    const mintButtonDisabled = (
        isMinting ||
        mintDetails.mintState === MintState.NotStarted ||
        (isWhitelistSale && mintDetails.whitelistSpots === 0)
    );

    const handleClickMintButton = async () => {
        setIsMinting(true);
        try {
            await mintDetails.mintContract.mint(selectedAmount);
            toast('Mint successful', { theme: 'colored', type: 'success' });
        } catch (e) {
            console.log(`Error on minting`, e);
            toast('Minting failed, please try again', { theme: 'colored', type: 'error' });
        } finally {
            setIsMinting(false);
        }
    }

    const renderWhitelistSpots = () => {
        if (hasWalletConnected && isWhitelistSale) {
            const text = (mintDetails.whitelistSpots > 0)
                ? `You have ${mintDetails.whitelistSpots} whitelist spots left.`
                : `This wallet is not eligible for whitelist spot.`;
            return (
                <WhitelistSpots className="mb-8">{text}</WhitelistSpots>
            )
        }
    }

    return (
        <Container className={containerClasses} id={viewId}>
            <Title type={mintViewState === MintViewState.Now ? TitleType.MintingNow : TitleType.MintingSoon} />

            {mintViewState === MintViewState.Soon && (
                <CountdownContainer>
                    <Countdown to={mintDetails.mintWhitelistStartsAt} />
                </CountdownContainer>
            )}
            {mintViewState === MintViewState.Now && (
                <MintedAmount>
                    {mintDetails.mintedSupply} / {mintDetails.maxSupply}
                </MintedAmount>
            )}

            <Image className="mx-auto mb-3" src='/images/mint/meow.png' />

            <div className="mb-9">
                <Paragraph>
                    Adopt yourself a Creameow<br />
                    5,555 uniquely generated, cute and collectible meow with proof of ownership stored on the ETH blockchain.
                </Paragraph>
            </div>

            {renderWhitelistSpots()}

            <div className="text-center mb-9">
                {hasWalletConnected ? (
                    <MintButton onClick={handleClickMintButton} disabled={mintButtonDisabled} className="mx-auto">
                        {isMinting ? 'MINTING...' : 'MINT'}
                    </MintButton>
                ) : (
                    <NotConnectedText>Connect your wallet to mint!</NotConnectedText>
                )}
            </div>

            <AmountSelector
                className="mx-auto mb-8"
                min={1}
                max={mintDetails.maxPerTx}
                value={selectedAmount}
                onChange={(value: number) => setSelectedAmount(value)}
            />

            <MintPrice weiPrice={mintDetails.mintPrice} amount={selectedAmount} />
        </Container>
    )
}

export default Mint;