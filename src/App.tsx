import { BrowserRouter, Routes, Route } from 'react-router';
import { LanguageProvider } from './i18n/LanguageContext';
import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';
import { ScrollToTop } from './components/shared/ScrollToTop';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-base text-text-primary">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
