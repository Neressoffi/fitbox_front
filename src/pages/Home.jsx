import Hero from '../components/home/Hero'
import Advantages from '../components/home/Advantages'
import OutfitOfTheDay from '../components/weather/OutfitOfTheDay'
import BestSellers from '../components/home/BestSellers'
import BoxPromo from '../components/home/BoxPromo'
import Testimonials from '../components/home/Testimonials'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Home() {
  usePageTitle()

  return (
    <>
      <Hero />
      <Advantages />
      <OutfitOfTheDay />
      <BestSellers />
      <BoxPromo />
      <Testimonials />
    </>
  )
}
