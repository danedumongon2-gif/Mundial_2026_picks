# ⚽ Picks Mundial 2026

App para analizar picks de apuestas del Mundial 2026 con datos reales 2024-2025.

---

## 🚀 CÓMO SUBIR A INTERNET (Vercel, gratis, 10 minutos)

### Paso 1 — Obtén tu Groq API Key gratis
1. Ve a https://console.groq.com
2. Crea cuenta con tu email (sin tarjeta)
3. Click en "API Keys" → "Create API Key"
4. Copia la key (empieza con `gsk_...`)

### Paso 2 — Sube el proyecto a GitHub
1. Ve a https://github.com y crea cuenta gratuita
2. Click en "New repository" → nombre: `mundial-picks` → Create
3. Sube todos los archivos de esta carpeta (arrastra y suelta en la web)

### Paso 3 — Despliega en Vercel
1. Ve a https://vercel.com y crea cuenta (con tu GitHub)
2. Click "Add New Project" → importa `mundial-picks`
3. Antes de hacer Deploy, ve a **Environment Variables** y agrega:
   - **Name:** `GROQ_API_KEY`
   - **Value:** `gsk_tukey...` (la que copiaste)
4. Click **Deploy**
5. ¡Listo! Vercel te da una URL como `mundial-picks.vercel.app`

### Paso 4 — Instala en tu teléfono
**iPhone (Safari):**
1. Abre tu URL en Safari
2. Toca compartir (↑) → "Añadir a pantalla de inicio"

**Android (Chrome):**
1. Abre tu URL en Chrome
2. Menú (⋮) → "Añadir a pantalla de inicio"

---

## 📁 Estructura del proyecto

```
mundial-picks/
├── api/
│   └── team.js          ← Función serverless que llama a Groq
├── public/
│   ├── index.html       ← App completa
│   └── manifest.json    ← Para instalar como app
├── vercel.json          ← Configuración de Vercel
└── README.md
```

---

## 💰 Costos

- **Vercel hosting:** GRATIS (tier gratuito generoso)
- **Groq API:** GRATIS (~1,000 análisis/día sin pagar nada)
- **Total:** $0

---

## ⚠️ Disclaimer

Solo para entretenimiento y análisis. Las apuestas implican riesgo económico. Juega con responsabilidad.
