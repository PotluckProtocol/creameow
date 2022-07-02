import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import TopMenu, { NavigationLink } from './components/TopMenu';
import FAQ from './views/FAQ/FAQ';

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

                <FAQ />

            </AppContainer>
            <ToastContainer />
        </>
    );
}

export default App;
