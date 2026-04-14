import { BrowserRouter, Routes, Route } from 'react-router';
import { LanguageProvider } from './i18n/LanguageContext';
import { ToastProvider } from './hooks/useToast';
import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';
import { ScrollToTop } from './components/shared/ScrollToTop';

function App() {
  return (
    <LanguageProvider>
      <ToastProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen bg-base text-text-primary">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ToastProvider>
    </LanguageProvider>
  );
}

export default App;
