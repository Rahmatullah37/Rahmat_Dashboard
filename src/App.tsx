import { MotionConfig } from 'framer-motion';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardPage } from './pages/DashboardPage';
import { useHashPage } from './hooks/useHashPage';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function Shell() {
  const { page, go } = useHashPage();
  const { settings } = useTheme();
  return (
    <MotionConfig reducedMotion={settings.motion ? 'user' : 'always'}>
      <DashboardLayout page={page} onNavigate={go}>
        <DashboardPage page={page} />
      </DashboardLayout>
    </MotionConfig>
  );
}

export default function App() {
  return <ThemeProvider><Shell /></ThemeProvider>;
}
