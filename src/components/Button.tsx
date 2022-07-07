
import { ComponentPropsWithRef } from "react";
import styled from "styled-components";

export type ButtonProps = ComponentPropsWithRef<'button'> & {
    color: 'light' | 'dark';
    fontSize: number;
}

const Button = styled.button<ButtonProps>`
    padding: .5rem 1.5rem;
    background-color: ${props => props.color === 'dark' ? '#FFC4D6' : '#FFE3EC'};
    border-radius: 1.5rem;
    color: #392e2c;
    border: 3px solid #392e2c;
    font-family: Inter;
    font-size: ${props => props.fontSize}px;
`;

export default Button;