// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { AuthContextProvider } from './store/auth-context';
// ----------------------------------------------------------------------

export default function App() {
  return (
    <AuthContextProvider>
      <ThemeConfig>
        <ScrollToTop />
        <GlobalStyles />
        <BaseOptionChartStyle />
        <Router />
      </ThemeConfig>
    </AuthContextProvider>
  );
}
