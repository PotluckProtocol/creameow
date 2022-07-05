import styled from "styled-components";
import useCreameowMintDetails from "./useCreameowMintDetails";

export type MintProps = {
    className?: string;
}

const Container = styled.div`

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

        </Container>
    )
}

export default Mint;