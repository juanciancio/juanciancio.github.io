import { LanguageProvider } from './i18n/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Timeline } from './components/sections/Timeline';
import { Services } from './components/sections/Services';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-base text-text-primary">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Timeline />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
