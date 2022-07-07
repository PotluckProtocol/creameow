import classNames from "classnames";
import styled from "styled-components";
import Countdown from "../../components/Countdown/Countdown";
import ProgressBar from "../../components/ProgressBar";
import Title, { TitleType } from "../../components/Title";
import useUser from "../../user/useUser";
import MintButton from "./MintButton";
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
    font-size: 18px;
    font-family: Inter;
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

    if (!mintDetails) {
        return <div>Loading...</div>
    }

    const mintViewState: MintViewState = (mintDetails.mintState === MintState.NotStarted)
        ? MintViewState.Soon
        : MintViewState.Now;

    const containerClasses = classNames('mt-12', 'mx-auto', className);
    const hasWalletConnected = !!user.account;

    return (
        <Container className={containerClasses}>
            <Title type={mintViewState === MintViewState.Now ? TitleType.MintingNow : TitleType.MintingSoon} />

            <CountdownContainer>
                <Countdown to={mintDetails.mintWhitelistStartsAt} />
            </CountdownContainer>

            <Image className="mx-auto mb-3" src='/images/mint/meow.png' />

            <div className="mb-9">
                <Paragraph>
                    Adopt yourself a Creameow<br />
                    5,555 uniquely generated, cute and collectible meow with proof of ownership stored on the ETH blockchain.
                </Paragraph>
            </div>
            <div className="text-center mb-9">
                {hasWalletConnected ? (
                    <MintButton className="mx-auto ">MINT</MintButton>
                ) : (
                    <NotConnectedText>Not connected</NotConnectedText>
                )}
            </div>

            <ProgressBarContainer>
                <ProgressBar
                    min={0}
                    max={mintDetails.maxSupply}
                    value={mintDetails.mintedSupply}
                />
            </ProgressBarContainer>
        </Container>
    )
}

export default Mint;