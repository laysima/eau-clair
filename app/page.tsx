import Navbar from './components/Navbar'
import Hero from './components/Hero'
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
        <AboutSection />
        <VideoShowcase />
        <WhyChooseUs />
        <ProductCatalog />
      </main>
      <HomeFooter />
    </>
  )
}
