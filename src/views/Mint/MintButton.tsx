import { ComponentPropsWithRef } from "react";
import styled from "styled-components";

const Button = styled.button`
    background-color: #FFC4D6;
    border: 4px solid #392E2C;
    border-radius: 35px;
    width: 300px;
    height: 89px;
`;

const InternalButton = styled.div`
    background-color: #FFE3EC;
    border: 4px solid #392E2C;
    border-radius: 35px;
    width: 300px;
    height: 89px;
    font-size: 44px;
    font-family: Inter;
    font-weight: 800;
    margin-left: -15px;
    margin-top: -19px;
`;

const MintButton: React.FC<ComponentPropsWithRef<'button'>> = (props) => {
    const { children, ...rest } = props;
    return (
        <Button {...rest}>
            <InternalButton className="flex justify-center items-center">
                {children}
            </InternalButton>
        </Button>
    )
}

export default MintButton;