import Layout from "./components/layout/Layout";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import { GlobalStyle } from "./style/global";
import { ThemeProvider } from "styled-components";
import { dark, light } from "./style/theme";

function App() {
    return (
        <>
            <ThemeProvider theme={light}>
                <GlobalStyle themeName="light" />
                <Layout>
                    <Home />
                    <Detail />
                </Layout>
            </ThemeProvider>
        </>
    );
}

export default App;
