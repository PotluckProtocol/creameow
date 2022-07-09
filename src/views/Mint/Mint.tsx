import classNames from "classnames";
import { useState } from "react";
import styled from "styled-components";
import AmountSelector from "../../components/AmountSelector";
import Countdown from "../../components/Countdown/Countdown";
import Title, { TitleType } from "../../components/Title";
import useUser from "../../user/useUser";
import { isMinterApp } from "../../utils/getAppType";
import notify from "../../utils/notify";
import commonViewClasses from "../commonViewClasses";
import MintButton from "./MintButton";
import MintPrice from "./MintPrice";
import useCreameowMintDetails from "./useCreameowMintDetails";
import useMintContract from "./useMintContract";
import { MintState } from "./useMintContract/MintContract";
import moment from 'moment';

const MINT_CONTRACT_ADDRESS = '0xE3763f557933B3396795ad3920Dd7D191359CcEF'; // ROBOTO FTM!!

export type MintProps = {
    viewId: string;
    className?: string;
}

const Container = styled.div``;

const MintContainer = styled.div`
    max-width: 520px;
`;

const CountdownContainer = styled.div``;

const Paragraph = styled.p`
    text-align: center;
    font-size: 18px;
    font-family: Inter;
    margin: 0;
    padding: 0;
`;

const Image = styled.img``;

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

/*
const WhitelistSpots = styled.div`
    text-align: center;
    font-family: Inter;
    font-size: 32px;
    font-weight: 700;
    text-align: center;
`;
*/

const EarlyAccessContainer = styled.div`
    max-width: 730px;
`;

const EarlyAccessTime = styled.h3`
    color: #F9749E;
    font-family: Inter;
    font-weight: bold;
    font-size: 44px;
    text-align: center;
`;

const BoldParagraph = styled(Paragraph)`
    font-size: 22px;
    font-weight: 600;
`;

const Mint: React.FC<MintProps> = ({
    className,
    viewId
}) => {
    const mintContract = useMintContract(MINT_CONTRACT_ADDRESS);
    const mintDetails = useCreameowMintDetails(mintContract);
    const user = useUser();
    const [selectedAmount, setSelectedAmount] = useState<number>(1);
    const [isMinting, setIsMinting] = useState(false);

    if (!mintContract || !mintDetails) {
        return <div>Loading...</div>
    }

    const hasWalletConnected = !!user.account;
    //const isWhitelistSale = (mintDetails.mintState === MintState.Whitelist);
    const mintButtonDisabled = (
        isMinting ||
        mintDetails.mintState === MintState.NotStarted
        // (isWhitelistSale && mintDetails.whitelistSpots === 0)
    );

    const handleClickMintButton = async () => {
        setIsMinting(true);
        try {
            await mintContract.mint(selectedAmount);
            notify('success', 'Mint successful');
        } catch (e) {
            console.log(`Error on minting`, e);
            notify('error', 'Minting failed, please try again');
        } finally {
            setIsMinting(false);
        }
    };

    /*
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
    */

    const containerClasses = classNames('mt-12', 'mx-auto', className, ...commonViewClasses);
    return (
        <Container className={containerClasses} id={viewId}>
            <MintContainer className='mx-auto'>
                <Title type={isMinterApp() ? TitleType.MintingNow : TitleType.MintingSoon} />

                {isMinterApp() && (
                    <MintedAmount>
                        {mintDetails.mintedSupply} / {mintDetails.maxSupply}
                    </MintedAmount>
                )}

                {!isMinterApp() && (
                    <>
                        <BoldParagraph>Public mint on {moment(mintDetails.mintPublicStartsAt).utc().format('MMMM Do h a [UTC]')}</BoldParagraph>
                        <CountdownContainer className="mt-4 mx-auto">
                            <Countdown to={mintDetails.mintPublicStartsAt} />
                        </CountdownContainer>
                    </>
                )}

                <Image className="mx-auto mb-3" src='/images/mint/meow.png' />

                <div className="mb-9">
                    <Paragraph>
                        Adopt yourself a Creameow<br />
                        5,555 uniquely generated, cute and collectible meow with proof of ownership stored on the ETH blockchain.
                    </Paragraph>
                </div>

                {/* renderWhitelistSpots()*/}
                {isMinterApp() && (
                    <>
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
                    </>
                )}

                <MintPrice weiPrice={mintDetails.mintPrice} amount={selectedAmount} />
            </MintContainer>
            {!isMinterApp() && (
                <EarlyAccessContainer className='mx-auto mt-8'>
                    <Title type={TitleType.EarlyAccess} className='mb-2' />
                    <EarlyAccessTime className='mb-2'>• {moment(mintDetails.mintWhitelistStartsAt).utc().format('MMMM Do h a [UTC]')} •</EarlyAccessTime>
                    <BoldParagraph >To get your Creameow Access Pass: Join our discord for more info!</BoldParagraph>
                    <Image className="mx-auto mt-4" src='/images/mint/tickets.png' />
                </EarlyAccessContainer>
            )}


        </Container>
    )
}

export default Mint;