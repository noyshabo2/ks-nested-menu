import {Fragment} from 'react';
import GlobalStyle from './theme/globalStyles';
import HomePage from './pages/HomePage';

function App() {
    return (
        <Fragment>
            <GlobalStyle/>
            <HomePage/>
        </Fragment>
    );
}

export default App;
