import { Helmet } from 'react-helmet-async'

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Política de privacidad — Autentia</title>
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 prose prose-invert">
        <h1>Política de privacidad</h1>
        <p className="text-gray-400">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>

        <h2 className="text-2xl mt-8">1. Qué datos recopilamos</h2>
        <p className="text-gray-300">
          Recopilamos tu correo electrónico (para la autenticación), y el texto de las
          conversaciones que decides analizar, junto con los resultados generados por la IA.
          Este contenido se guarda en tu historial personal para que puedas consultarlo después.
        </p>

        <h2 className="text-2xl mt-8">2. Cómo usamos tus datos</h2>
        <p className="text-gray-300">
          Usamos tus datos únicamente para ofrecerte el servicio: generar análisis, guardar tu
          historial y permitirte practicar en el modo Entrenamiento. No vendemos ni compartimos
          tu información con terceros con fines publicitarios.
        </p>

        <h2 className="text-2xl mt-8">3. Terceros involucrados</h2>
        <p className="text-gray-300">
          Usamos Firebase (Google) para autenticación y almacenamiento, y la API de Claude
          (Anthropic) para generar los análisis. El texto que envías se transmite a estos
          proveedores para poder procesar tu solicitud.
        </p>

        <h2 className="text-2xl mt-8">4. Tus derechos</h2>
        <p className="text-gray-300">
          Puedes solicitar la eliminación de tu cuenta y de tu historial en cualquier momento
          escribiéndonos a través de los canales de contacto de la aplicación.
        </p>

        <h2 className="text-2xl mt-8">5. Gratuidad del servicio</h2>
        <p className="text-gray-300">
          Autentia es un servicio 100% gratuito. No solicitamos datos de pago ni información
          financiera de ningún tipo.
        </p>
      </div>
    </>
  )
}
