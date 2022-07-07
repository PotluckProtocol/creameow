import styled from 'styled-components';
import { ConnectWalletButton } from './ConnectWalletButton';

export type NavigationLink = {
    text: string;
    navTo: string;
}

export type TopMenuProps = {
    navigationLinks: NavigationLink[];
}

const Placeholder = styled.div`
    height: 100px;
`;

const Nav = styled.nav`
    background-color: #FFFDF7;
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    position: fixed;
    top: 0;
    height: 100px;
    padding: 0 2rem;
`;

const Logo = styled.img`

`;

const Link = styled.a`
    font-family: Inter;
    font-size: 16px;
    margin: 0 1.5rem;
`;

const TopMenu: React.FC<TopMenuProps> = ({
    navigationLinks
}) => {
    return (
        <>
            <Placeholder>&nbsp;</Placeholder>
            <Nav className='md:flex md:items-center md:justify-between'>
                <Logo src={'/images/logo.png'} alt="Creameow Logo" />
                <div>
                    {navigationLinks.map((link, index) => (
                        <Link key={index} href={link.navTo}>{link.text}</Link>
                    ))}

                    <ConnectWalletButton className='ml-12' />
                </div>
            </Nav>
        </>
    );
}

export default TopMenu;