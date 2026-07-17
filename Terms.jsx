import { Helmet } from 'react-helmet-async'

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Términos de servicio — Autentia</title>
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 prose prose-invert">
        <h1>Términos de servicio</h1>
        <p className="text-gray-400">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>

        <h2 className="text-2xl mt-8">1. Descripción del servicio</h2>
        <p className="text-gray-300">
          Autentia es una herramienta gratuita que utiliza inteligencia artificial para analizar
          conversaciones de texto y ofrecer sugerencias de comunicación. El servicio es
          completamente gratuito: no existen planes de pago, suscripciones ni límites de uso.
        </p>

        <h2 className="text-2xl mt-8">2. Uso responsable</h2>
        <p className="text-gray-300">
          Te comprometes a no usar Autentia para acosar, manipular o vulnerar la voluntad de
          otras personas. La herramienta está pensada para mejorar tu comunicación genuina, no
          para manipular a terceros.
        </p>

        <h2 className="text-2xl mt-8">3. Contenido generado por IA</h2>
        <p className="text-gray-300">
          Las sugerencias que ofrece Autentia son generadas por un modelo de IA y tienen carácter
          orientativo. No sustituyen el consejo de un profesional de la salud mental o de las
          relaciones humanas.
        </p>

        <h2 className="text-2xl mt-8">4. Cuentas</h2>
        <p className="text-gray-300">
          Eres responsable de mantener la confidencialidad de tu cuenta y contraseña.
        </p>

        <h2 className="text-2xl mt-8">5. Cambios en el servicio</h2>
        <p className="text-gray-300">
          Podemos actualizar estos términos ocasionalmente. Seguiremos ofreciendo Autentia de
          forma gratuita como principio central del proyecto.
        </p>
      </div>
    </>
  )
}
