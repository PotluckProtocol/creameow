import classNames from "classnames";
import styled from "styled-components";
import ProgressBar from "../../components/ProgressBar";
import Title, { TitleType } from "../../components/Title";
import MintButton from "./MintButton";
import useCreameowMintDetails from "./useCreameowMintDetails";

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


const Paragraph = styled.p`
    text-align: center;
    font-size: 18px;
    font-family: Inter;
    margin: 0;
    padding: 0;
`;

const Image = styled.img`

`;

const Mint: React.FC<MintProps> = ({
    className
}) => {
    const mintDetails = useCreameowMintDetails();

    if (!mintDetails) {
        return <div>Loading...</div>
    }

    console.log(mintDetails);

    const containerClasses = classNames('mt-12', 'mx-auto', className);

    return (
        <Container className={containerClasses}>
            <Title type={TitleType.MintingNow} />

            <Image className="mx-auto mb-3" src='/images/mint/meow.png' />

            <div className="mb-9">
                <Paragraph>
                    Adopt yourself a Creameow<br />
                    5,555 uniquely generated, cute and collectible meow with proof of ownership stored on the ETH blockchain.
                </Paragraph>
            </div>

            <div className="text-center mb-9">
                <MintButton className="mx-auto ">MINT</MintButton>
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