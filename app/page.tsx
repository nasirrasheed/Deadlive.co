import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Events from '@/components/Events';
import Journal from '@/components/Journal';
import Services from '@/components/Services';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="scroll-smooth">
      <Header />
      <Hero />
      <Events />
      <Journal />
      <Services />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}