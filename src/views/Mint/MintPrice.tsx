import { BigNumber, ethers } from "ethers"
import styled from "styled-components";
import { useTokenPriceInUSD } from "../../hooks/useTokenPriceInUSD";

export type MintPriceProps = {
    weiPrice: BigNumber;
    amount: number;
}

const Container = styled.div`

`;

const ETHPrice = styled.div`
    font-family: Inter;
    font-size: 32px;
    font-weight: 700;
    color: #F9749E;
`;

const USDPrice = styled.div`
    font-family: Inter;
    font-size: 22px;
    font-weight: 600;
    color: #392E2C;
`;

const MintPrice: React.FC<MintPriceProps> = ({
    weiPrice,
    amount
}) => {
    const totalPriceWei = weiPrice.mul(amount);
    const ethPrice = ethers.utils.formatEther(totalPriceWei);
    const ethUSDPrice = useTokenPriceInUSD();
    const totalUSDPrice = ethUSDPrice !== null ? parseFloat(ethPrice) * ethUSDPrice : 0;

    return (
        <Container className="flex items-center justify-center">
            <ETHPrice>{ethPrice} ETH</ETHPrice>
            {ethUSDPrice !== null && (
                <USDPrice className="ml-3">(${totalUSDPrice.toFixed(2)})</USDPrice>
            )}
        </Container>
    )
}

export default MintPrice;