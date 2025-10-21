import Navigation from '@/react-app/components/Navigation';
import Hero from '@/react-app/components/Hero';
import Services from '@/react-app/components/Services';
import Manifesto from '@/react-app/components/Manifesto';
import Process from '@/react-app/components/Process';
import Portfolio from '@/react-app/components/Portfolio';
import Contact from '@/react-app/components/Contact';
import Footer from '@/react-app/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <section id="home">
          <Hero />
        </section>
        <Services />
        <Manifesto />
        <Process />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
