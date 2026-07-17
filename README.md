# Autentia — Coach de comunicación con IA (100% gratis)

Aplicación web que analiza conversaciones de texto y ofrece sugerencias de comunicación,
impulsada por la API de Claude (Anthropic). **Sin límites de uso, sin suscripciones,
sin pasarela de pago.**

## Características

- ✅ Análisis ilimitado de conversaciones
- ✅ Modo entrenamiento con IA (simulador de chat)
- ✅ Historial guardado en la nube (Firestore)
- ✅ Autenticación con email/contraseña y Google (Firebase Auth)
- ✅ Diseño oscuro, mobile-first, acentos rosa/azul
- ✅ **Completamente gratuito**, sin límites ni suscripciones

## Instalación

1. Clona el repositorio y entra en la carpeta:
   ```bash
   cd autentia
   npm install
   ```
2. Copia `.env.example` a `.env` y completa tus credenciales:
   ```bash
   cp .env.example .env
   ```
   - Credenciales de Firebase: [console.firebase.google.com](https://console.firebase.google.com) → Configuración del proyecto → Tus apps.
   - API key de Claude: [console.anthropic.com](https://console.anthropic.com).

   ⚠️ **Importante — seguridad**: este proyecto llama a la API de Claude directamente
   desde el navegador para simplificar el desarrollo local. Esto expone tu API key en
   el bundle del cliente. **No lo despliegues así en producción.** Antes de publicar,
   mueve la llamada a `services/claude.js` detrás de un backend propio o una
   Cloud Function / Edge Function que guarde la key en el servidor. Configura también
   un límite de gasto en la consola de Anthropic como red de seguridad.

3. Arranca el entorno de desarrollo:
   ```bash
   npm run dev
   ```

## Reglas de Firestore recomendadas

Ya que no hay límites de uso, protege igualmente el acceso a los datos por usuario:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /analyses/{docId} {
      allow read, delete: if request.auth != null && request.auth.uid == resource.data.uid;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.uid;
    }
  }
}
```

## Despliegue

Sube a Vercel o Netlify, configurando las variables de entorno de `.env.example`
en el panel del proveedor (no subas nunca el archivo `.env`).

## Tecnologías

- React 18 + Vite
- Tailwind CSS
- Firebase Auth + Firestore
- Claude API (Anthropic)
- React Router v6, React Helmet Async, Framer Motion
