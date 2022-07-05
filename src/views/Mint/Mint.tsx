import styled from "styled-components";
import ProgressBar from "../../components/ProgressBar";
import Title, { TitleType } from "../../components/Title";
import MintButton from "./MintButton";
import useCreameowMintDetails from "./useCreameowMintDetails";

export type MintProps = {
    className?: string;
}

const Container = styled.div`

`;

const ProgressBarContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
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

    return (
        <Container className={className}>

            <Title type={TitleType.MintingNow} />

            <Image className="mx-auto" src='/images/mint/meow.png' />

            <ProgressBarContainer>
                <ProgressBar
                    min={0}
                    max={mintDetails.maxSupply}
                    value={mintDetails.mintedSupply}
                />
            </ProgressBarContainer>

            <div className="text-center">
                <MintButton className="mx-auto ">MINT</MintButton>
            </div>
        </Container>
    )
}

export default Mint;