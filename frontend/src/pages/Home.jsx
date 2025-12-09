import HeroSection from "../components/LandingPage/HeroSection";
import CategorySection from "../components/LandingPage/CategorySection";  
import NewsletterSignup from "../components/LandingPage/NewsletterSignup";  
import Footer from "../components/LandingPage/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <NewsletterSignup />
      <Footer />
    </>
  );
}
