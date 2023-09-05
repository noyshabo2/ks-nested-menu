import {Fragment} from 'react';
import GlobalStyle from './theme/globalStyles';
import HomePage from './pages/HomePage/HomePage';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {deepPurple, purple} from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: purple,
        secondary: deepPurple,
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle/>
            <HomePage/>
        </ThemeProvider>
    );
}

export default App;
