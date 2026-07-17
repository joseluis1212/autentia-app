import { createContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth, googleProvider } from '../services/firebase'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const register = async (email, password) => {
    setError(null)
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      return cred.user
    } catch (err) {
      setError(traducirErrorFirebase(err.code))
      throw err
    }
  }

  const login = async (email, password) => {
    setError(null)
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      return cred.user
    } catch (err) {
      setError(traducirErrorFirebase(err.code))
      throw err
    }
  }

  const loginWithGoogle = async () => {
    setError(null)
    try {
      const cred = await signInWithPopup(auth, googleProvider)
      return cred.user
    } catch (err) {
      setError(traducirErrorFirebase(err.code))
      throw err
    }
  }

  const logout = () => signOut(auth)

  const value = { user, loading, error, register, login, loginWithGoogle, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Traduce los códigos de error de Firebase a mensajes legibles en español
function traducirErrorFirebase(code) {
  const mensajes = {
    'auth/email-already-in-use': 'Ese correo ya está registrado.',
    'auth/invalid-email': 'El correo no es válido.',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
    'auth/user-not-found': 'No existe una cuenta con ese correo.',
    'auth/wrong-password': 'Contraseña incorrecta.',
    'auth/invalid-credential': 'Correo o contraseña incorrectos.',
    'auth/popup-closed-by-user': 'Cerraste la ventana de Google antes de terminar.',
    'auth/too-many-requests': 'Demasiados intentos. Intenta de nuevo más tarde.',
  }
  return mensajes[code] || 'Ocurrió un error. Intenta de nuevo.'
}
