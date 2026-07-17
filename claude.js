// Cliente para la API de Claude (Anthropic).
//
// ⚠️ NOTA DE SEGURIDAD: esta implementación llama a la API directamente desde
// el navegador usando una API key expuesta en el bundle (VITE_CLAUDE_API_KEY).
// Es válido para desarrollo local, pero antes de desplegar en producción debes
// mover esta llamada detrás de tu propio backend o de una función serverless
// (Cloud Function, Vercel/Netlify Function) que guarde la key del lado del
// servidor. Nunca publiques una app con la key de Claude visible en el cliente.

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages'
const CLAUDE_MODEL = 'claude-sonnet-4-6'

async function callClaude(systemPrompt, userMessage) {
  const apiKey = import.meta.env.VITE_CLAUDE_API_KEY

  if (!apiKey) {
    throw new Error('Falta configurar VITE_CLAUDE_API_KEY en tu archivo .env')
  }

  const response = await fetch(CLAUDE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Error de la API de Claude (${response.status}): ${errorBody}`)
  }

  const data = await response.json()
  const textBlock = data.content?.find((block) => block.type === 'text')
  return textBlock?.text ?? ''
}

// Analiza una conversación: tono, emociones, sentimiento y sugerencias.
export async function analyzeConversation(conversationText) {
  const systemPrompt = `Eres un coach de comunicación experto en relaciones personales.
Analiza la conversación que te comparte el usuario y responde SIEMPRE en español, con:
1. Tono general de la conversación.
2. Emociones detectadas en ambas partes.
3. Nivel de autenticidad y conexión.
4. 2-3 sugerencias concretas y accionables para mejorar la comunicación, sin dar frases prefabricadas para "conquistar", sino consejos genuinos.
Usa un formato claro con encabezados cortos. Sé cálido pero directo.`

  return callClaude(systemPrompt, conversationText)
}

// Genera la siguiente respuesta del "entrenador" en el modo Entrenamiento.
export async function trainingReply(history, scenario) {
  const systemPrompt = `Eres un simulador de conversación para practicar habilidades de comunicación
en el escenario: "${scenario}". Responde en español, en el papel del interlocutor,
de forma realista y natural, en 1-3 frases. No rompas el personaje ni des consejos meta
dentro de la conversación.`

  const conversationAsText = history
    .map((m) => `${m.role === 'user' ? 'Usuario' : 'Interlocutor'}: ${m.content}`)
    .join('\n')

  return callClaude(systemPrompt, conversationAsText)
}
