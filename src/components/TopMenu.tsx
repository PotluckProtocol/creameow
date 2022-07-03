import styled from 'styled-components';

export type NavigationLink = {
    text: string;
    navTo: string;
}

export type TopMenuProps = {
    navigationLinks: NavigationLink[];
}

const Nav = styled.nav`
    height: 100px;
    padding: 0 2rem;
`;

const Logo = styled.img`

`;

const Link = styled.a`
    font-family: Inter;
    font-size: 16px;
    margin: 0 2rem;
`;

const TopMenu: React.FC<TopMenuProps> = ({
    navigationLinks
}) => {
    return (
        <Nav className='flex items-center justify-between'>
            <Logo src={'/images/logo.png'} alt="Creameow Logo" />
            <div>
                {navigationLinks.map((link, index) => (
                    <Link key={index} href={link.navTo}>{link.text}</Link>
                ))}
            </div>
        </Nav>
    );
}

export default TopMenu;