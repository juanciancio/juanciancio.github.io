import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Projects } from '../components/sections/Projects';
import { Timeline } from '../components/sections/Timeline';
import { Services } from '../components/sections/Services';
import { Contact } from '../components/sections/Contact';

export function Home() {
  return (
    <>
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
    </>
  );
}
