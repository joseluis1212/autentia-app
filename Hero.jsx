import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-sm font-semibold mb-6"
        >
          🎁 100% gratis · Sin suscripciones · Sin límites
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="leading-tight"
        >
          Conquista desde la{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            autenticidad
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Analiza tus conversaciones con IA y recibe sugerencias para conectar de verdad.
          Sin trucos, sin fórmulas mágicas. Solo comunicación genuina.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <Link to="/register" className="btn-primary text-lg">Empieza gratis</Link>
          <a href="#demo" className="btn-secondary text-lg">Prueba la demo</a>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-sm text-gray-500"
        >
          +8,000 usuarios ya confían en Autentia
        </motion.p>
      </div>
    </section>
  )
}
