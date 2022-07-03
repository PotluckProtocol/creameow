import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import TopMenu, { NavigationLink } from './components/TopMenu';

import About from './views/About';
import Meowverse from './views/Meowverse';
import Artist from './views/Artist';
import FAQ from './views/FAQ';
import Footer from './views/Footer';

const NAVIGATION_LINKS: NavigationLink[] = [{
    text: 'Mint',
    navTo: ''
}, {
    text: 'About',
    navTo: ''
}, {
    text: 'Meowverse',
    navTo: ''
}, {
    text: 'Artist',
    navTo: ''
}, {
    text: 'FAQ',
    navTo: ''
}];

const AppContainer = styled.div`
    background-color: #FFFDF7;
    max-width: 1440px;
    margin: 0 auto;
`;

const App = () => {
    return (
        <>
            <AppContainer>

                <TopMenu
                    navigationLinks={NAVIGATION_LINKS}
                />

                <About />
                <Meowverse />
                <Artist />
                <FAQ />
                <Footer />

            </AppContainer>
            <ToastContainer />
        </>
    );
}

export default App;
