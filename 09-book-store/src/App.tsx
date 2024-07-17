import Layout from "./components/layout/Layout";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import { BookStoreThemeProvider } from "./context/themeContext";
import ThemeSwitcher from "./components/header/ThemeSwitcher";

function App() {
    return (
        <>
            <BookStoreThemeProvider>
                <ThemeSwitcher />
                <Layout>
                    <Home />
                    <Detail />
                </Layout>
            </BookStoreThemeProvider>
        </>
    );
}

export default App;
