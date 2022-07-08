import classNames from 'classnames';
import { useState } from 'react';
import styled from 'styled-components';
import useScreenSize from '../hooks/useScreenSize';
import scrollTo from '../utils/scrollTo';
import { ConnectWalletButton } from './ConnectWalletButton';

export type NavigationLink = {
    text: string;
    navTo: string;
}

export type TopMenuProps = {
    navigationLinks: NavigationLink[];
}

export const TOP_MENU_HEIGHT_PX = 100;

const Placeholder = styled.div`
    height: ${TOP_MENU_HEIGHT_PX}px;
`;

const Nav = styled.nav`
    background-color: #FFFDF7;
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    position: fixed;
    top: 0;
    height: ${TOP_MENU_HEIGHT_PX}px;
    padding: 0 2rem;
`;

const Logo = styled.img``;

const Link = styled.button`
    font-family: Inter;
    font-size: 16px;
`;

const MenuIcon = styled.img`
    width: 30px;
    height: 30px;
`;

const MenuContainer = styled.div`
    position: fixed;
    border-left: 4px solid #392e2c;
    background-color: #FFFDF7;
    top: 0;
    right: 0;
    padding: 0 .5rem;

    transform: translate3d(300px, 0, 0);
    height: 100vh;
    width: 230px;
    transition: transform .3s cubic-bezier(0, .52, 0, 1);
    z-index: 8889;
    box-shadow: 4px 0px 20px rgba(12, 105, 71, 0.3);

    &.open {
        transform: translate3d(0, 0, 0);
    }

    @media (min-width: 768px) {
        transform: translate3d(0, 0, 0);
        position: static;
        top: auto;
        left: auto;
        box-shadow: none;
    }
`;

const MenuShroud = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vh;
    z-index: 8888;
    background: rgba(0,0,0,0.65);
    animation: fadeIn .5s;

    @keyframes fadeIn {
        0% {opacity:0;}
        100% {opacity:1;}
    }

    @media (min-width: 768px) {
        display: none;
    }
`;

const TopMenu: React.FC<TopMenuProps> = ({
    navigationLinks
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleShroudClick = () => {
        setIsMenuOpen(false);
    }

    const createMenuLinkClickHandler = (navTo: string) => {
        return () => {
            setIsMenuOpen(false);
            scrollTo(navTo);
        }
    }

    const menuContainerClasses = classNames('pt-1', { open: isMenuOpen }, 'md:hidden');

    return (
        <>
            <Placeholder>&nbsp;</Placeholder>
            <Nav className='flex items-center justify-between'>
                <Logo src={'/images/logo.png'} alt="Creameow Logo" />
                <div className='hidden md:block'>
                    {navigationLinks.map((link, index) => (
                        <Link className='mx-7' key={index} onClick={() => scrollTo(link.navTo)}>
                            {link.text}
                        </Link>
                    ))}

                    <ConnectWalletButton className='ml-12' />
                </div>
                <div className='block md:hidden'>
                    <button onClick={() => setIsMenuOpen(true)}>
                        <MenuIcon src={'/images/menu-icon.svg'} />
                    </button>

                    <MenuContainer className={menuContainerClasses}>
                        <div className='text-center my-8'>
                            <ConnectWalletButton fontSize={20} />
                        </div>
                        {navigationLinks.map((link, index) => (
                            <Link className='block text-center w-full m-0 p-2' key={`menu-${index}`} onClick={createMenuLinkClickHandler(link.navTo)}>
                                {link.text}
                            </Link>
                        ))}
                    </MenuContainer>
                    {isMenuOpen && (
                        <MenuShroud className='md:hidden' onClick={handleShroudClick} />
                    )}
                </div>
            </Nav>
        </>
    );
}

export default TopMenu;