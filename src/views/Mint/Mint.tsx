import classNames from "classnames";
import { useState } from "react";
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

enum MintViewState {
    Now,
    Soon
}

const Mint: React.FC<MintProps> = ({
    className
}) => {
    const mintDetails = useCreameowMintDetails();
    const user = useUser();
    const [selectedAmount, setSelectedAmount] = useState<number>(1);

    if (!mintDetails) {
        return <div>Loading...</div>
    }

    const mintViewState: MintViewState = (mintDetails.mintState === MintState.NotStarted)
        ? MintViewState.Soon
        : MintViewState.Now;

    const containerClasses = classNames('mt-12', 'mx-auto', className);
    const hasWalletConnected = !!user.account;

    const mintButtonDisabled = mintDetails.mintState === MintState.NotStarted || (
        mintDetails.mintState === MintState.Whitelist && mintDetails.whitelistSpots === 0
    );

    return (
        <Container className={containerClasses}>
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

            <div className="text-center mb-9">
                {hasWalletConnected ? (
                    <MintButton disabled={mintButtonDisabled} className="mx-auto ">MINT</MintButton>
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