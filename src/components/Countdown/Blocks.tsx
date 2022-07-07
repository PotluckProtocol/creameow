import styled from "styled-components";

export type Blocks = {
    num: number;
    label: string;
}


const Block = styled.div`
    font-family: Inter;
    font-weight: 600;
    font-size: 44px;
    border-radius: .75rem;
    line-height: 44px;
    background-color: #FFE3EC;
    margin: 0 .1rem;
    width: 45px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Label = styled.div`
    text-align: center;
    font-family: Inter;
    font-size: 22px;
`;

const Blocks: React.FC<Blocks> = ({
    num,
    label
}) => {
    const strNum = (num < 10) ? `0${num}` : `${num}`;
    return (
        <div>
            <div className="flex">
                <Block>{strNum[0]}</Block>
                <Block>{strNum[1]}</Block>
            </div>
            <Label className="mt-2">{label}</Label>
        </div>
    )
}

export default Blocks;