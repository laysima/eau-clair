import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BottleShowcase from './components/BottleShowcase'
import VideoShowcase from './components/VideoShowcase'
import AboutSection from './components/AboutSection'
import WhyChooseUs from './components/WhyChooseUs'
import ProductCatalog from './components/ProductCatalog'
import HomeFooter from './components/HomeFooter'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BottleShowcase />
        <AboutSection />
        <VideoShowcase />
        <ProductCatalog />
        <WhyChooseUs />
      </main>
      <HomeFooter />
    </>
  )
}
