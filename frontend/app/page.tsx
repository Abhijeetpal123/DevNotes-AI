import Navbar from "./components/Navbar";
import Hero from "./components/Hero"
import Features from "./components/Feature"
import HowItWorks from "./components/HowItWorks";
import Cta from "./components/Cta";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <Hero/>
        <Features />
        <HowItWorks/>
        <Cta/>
        <Footer/>
    </main>
  );
}