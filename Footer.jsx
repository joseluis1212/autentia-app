import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 gap-4">
        <p>© {new Date().getFullYear()} Autentia. 100% gratis, sin suscripciones.</p>
        <div className="flex gap-6">
          <Link to="/privacidad" className="hover:text-white transition">Privacidad</Link>
          <Link to="/terminos" className="hover:text-white transition">Términos</Link>
        </div>
      </div>
    </footer>
  )
}
