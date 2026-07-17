import { createContext, useState } from 'react'
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../services/firebase'
import { analyzeConversation } from '../services/claude'

export const AnalysisContext = createContext(null)

export function AnalysisProvider({ children }) {
  const [analyses, setAnalyses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Trae el historial de análisis del usuario, sin ningún límite de cantidad
  const fetchAnalyses = async (uid) => {
    if (!uid) return
    setLoading(true)
    setError(null)
    try {
      const q = query(
        collection(db, 'analyses'),
        where('uid', '==', uid),
        orderBy('createdAt', 'desc')
      )
      const snapshot = await getDocs(q)
      const results = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setAnalyses(results)
    } catch (err) {
      setError('No se pudo cargar el historial.')
    } finally {
      setLoading(false)
    }
  }

  // Crea un nuevo análisis. Acceso ilimitado para todos los usuarios: no hay
  // conteo de usos, cuotas ni comprobación de plan/suscripción.
  const addAnalysis = async (uid, text) => {
    setLoading(true)
    setError(null)
    try {
      const result = await analyzeConversation(text)

      const docRef = await addDoc(collection(db, 'analyses'), {
        uid,
        text,
        result,
        createdAt: serverTimestamp(),
      })

      const newAnalysis = { id: docRef.id, uid, text, result, createdAt: new Date() }
      setAnalyses((prev) => [newAnalysis, ...prev])
      return newAnalysis
    } catch (err) {
      setError('No se pudo completar el análisis. Intenta de nuevo.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const value = { analyses, loading, error, fetchAnalyses, addAnalysis }

  return <AnalysisContext.Provider value={value}>{children}</AnalysisContext.Provider>
}
