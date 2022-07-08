import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import TopMenu, { NavigationLink } from './components/TopMenu';
import About from './views/About';
import Meowverse from './views/Meowverse';
import Artist from './views/Artist';
import FAQ from './views/FAQ';
import Footer from './views/Footer';
import Mint from './views/Mint';
import { useContext } from 'react';
import { AccountContext } from './user/AccountContext';

const VIEW_ID_MINT = 'mint';
const VIEW_ID_ABOUT = 'about';
const VIEW_ID_MEOWVERSE = 'meowverse';
const VIEW_ID_ARTIST = 'artist';
const VIEW_ID_FAQ = 'faq';

const NAVIGATION_LINKS: NavigationLink[] = [{
    text: 'Mint',
    navTo: VIEW_ID_MINT
}, {
    text: 'About',
    navTo: VIEW_ID_ABOUT
}, {
    text: 'Meowverse',
    navTo: VIEW_ID_MEOWVERSE
}, {
    text: 'Artist',
    navTo: VIEW_ID_ARTIST
}, {
    text: 'FAQ',
    navTo: VIEW_ID_FAQ
}];

const AppContainer = styled.div`
    background-color: #FFFDF7;
    max-width: 1440px;
    margin: 0 auto;
`;

const ViewContent = styled.div``;

const App = () => {

    // Wait for accountContext to be initialized before proceeding
    const accountContext = useContext(AccountContext);
    if (!accountContext) {
        return <div>Loading...</div>
    }

    return (
        <>
            <AppContainer>

                <TopMenu
                    navigationLinks={NAVIGATION_LINKS}
                />

                <ViewContent>
                    <Mint viewId={VIEW_ID_MINT} />
                    <About viewId={VIEW_ID_ABOUT} />
                    <Meowverse viewId={VIEW_ID_MEOWVERSE} />
                    <Artist viewId={VIEW_ID_ARTIST} />
                    <FAQ viewId={VIEW_ID_FAQ} />
                    <Footer />
                </ViewContent>

            </AppContainer>
            <ToastContainer />
        </>
    );
}

export default App;
