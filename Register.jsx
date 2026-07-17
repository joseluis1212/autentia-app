import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { isValidEmail } from '../utils/helpers'

export default function Register() {
  const { register, loginWithGoogle, error } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)

    if (!isValidEmail(email)) {
      setFormError('Ingresa un correo válido.')
      return
    }
    if (password.length < 6) {
      setFormError('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    setLoading(true)
    try {
      await register(email, password)
      navigate('/dashboard')
    } catch (err) {
      // el error ya se guarda en el AuthContext
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setLoading(true)
    try {
      await loginWithGoogle()
      navigate('/dashboard')
    } catch (err) {
      // el error ya se guarda en el AuthContext
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Crear cuenta gratis — Autentia</title>
      </Helmet>
      <div className="max-w-md mx-auto px-4 py-16">
        <h1 className="text-center mb-2">Crear cuenta</h1>
        <p className="text-center text-gray-400 mb-8">Gratis para siempre, sin límites de uso.</p>
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm text-gray-400 block mb-1">Correo</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-dark/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm text-gray-400 block mb-1">Contraseña</label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-dark/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            {(formError || error) && (
              <p className="text-red-400 text-sm" role="alert">{formError || error}</p>
            )}
            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
              {loading ? 'Creando cuenta...' : 'Crear cuenta gratis'}
            </button>
          </form>
          <div className="flex items-center gap-3 my-5">
            <div className="flex-grow h-px bg-white/10" />
            <span className="text-xs text-gray-500">O</span>
            <div className="flex-grow h-px bg-white/10" />
          </div>
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="btn-secondary w-full disabled:opacity-50"
          >
            Continuar con Google
          </button>
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-primary hover:underline">Inicia sesión</Link>
        </p>
      </div>
    </>
  )
}
