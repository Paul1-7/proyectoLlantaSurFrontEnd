import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import Settings from './components/settings';
import ThemePrimaryColor from './components/ThemePrimaryColor';
import Router from './routes';
import ThemeConfig from './theme';

export default function App() {
  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        <RtlLayout>
          {/* <Settings /> */}
          <ScrollToTop />
          <Router />
        </RtlLayout>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}
