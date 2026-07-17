import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useAnalysis } from '../hooks/useAnalysis'
import AnalysisForm from './AnalysisForm'
import AnalysisResult from './AnalysisResult'
import HistoryList from './HistoryList'
import TrainingMode from './TrainingMode'

export default function Dashboard() {
  const { user } = useAuth()
  const { analyses, fetchAnalyses, addAnalysis, error } = useAnalysis()
  const [selectedAnalysis, setSelectedAnalysis] = useState(null)

  useEffect(() => {
    if (user) fetchAnalyses(user.uid)
  }, [user])

  const handleNewAnalysis = async (text) => {
    const result = await addAnalysis(user.uid, text)
    setSelectedAnalysis(result)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl">
          Hola, {user?.displayName || user?.email?.split('@')[0]} 👋
        </h1>
        <p className="text-gray-400 mt-1">Acceso ilimitado. Analiza todo lo que quieras.</p>
      </div>
      {error && <p className="mb-6 text-red-400 text-sm" role="alert">{error}</p>}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <AnalysisForm onAnalyze={handleNewAnalysis} />
          {selectedAnalysis && <AnalysisResult analysis={selectedAnalysis} />}
          <TrainingMode />
        </div>
        <div>
          <HistoryList analyses={analyses} onSelect={setSelectedAnalysis} />
        </div>
      </div>
    </div>
  )
}
