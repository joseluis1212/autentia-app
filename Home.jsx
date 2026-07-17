import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import Testimonials from '../components/Testimonials'
import Demo from '../components/Demo'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Autentia - Coach de comunicación con IA, 100% gratis</title>
        <meta
          name="description"
          content="Analiza tus conversaciones con IA y mejora tu comunicación. Sin límites, sin suscripciones, para siempre gratis."
        />
      </Helmet>
      <Hero />
      <Testimonials />
      <Demo />
    </>
  )
}
