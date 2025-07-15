import Navbar from "@/components/Navbar";
import DivinationSection from "@/components/DivinationSection";
import IntroSection from "@/components/IntroSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#1A1A1A]">
      <Navbar />
      <main className="flex-grow">
        <DivinationSection />
        <div className="py-8"></div>
        <IntroSection />
      </main>
      <Footer />
    </div>
  );
}