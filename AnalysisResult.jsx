import { formatDate } from '../utils/helpers'

export default function AnalysisResult({ analysis }) {
  if (!analysis) return null

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-primary">Resultado del análisis</h3>
        {analysis.createdAt && (
          <span className="text-xs text-gray-500">{formatDate(analysis.createdAt)}</span>
        )}
      </div>
      <p className="whitespace-pre-wrap text-gray-300">{analysis.result}</p>
    </div>
  )
}
