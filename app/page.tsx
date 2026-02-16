import Navbar from './components/Navbar'
import Hero from './components/Hero'
import VideoShowcase from './components/VideoShowcase'
import AboutSection from './components/AboutSection'
import WhyChooseUs from './components/WhyChooseUs'
import ProductCatalog from './components/ProductCatalog'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <VideoShowcase />
      <AboutSection />
      <WhyChooseUs />
      <ProductCatalog />
      <Footer />
    </>
  )
}