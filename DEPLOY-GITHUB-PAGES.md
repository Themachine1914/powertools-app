# PowerTools RD - GitHub Pages Deploy Guide

## 🚀 Guía de Deploy a GitHub Pages

### Paso 1: Crear repositorio en GitHub
1. Ve a: https://github.com/new
2. Nombre: `powertools-app`
3. Descripción: `Sistema de gestión empresarial PowerTools RD`
4. Público: ✅
5. NO inicializar con README
6. Clic "Create repository"

### Paso 2: Conectar repositorio local
```bash
git branch -M main
git remote add origin https://github.com/TU-USUARIO/powertools-app.git
git push -u origin main
```

### Paso 3: Configurar GitHub Pages
1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: "Deploy from a branch"
4. Branch: `main`
5. Folder: `/dist`
6. Save

### Paso 4: Acceder a tu app
Tu app estará disponible en:
`https://TU-USUARIO.github.io/powertools-app/`

## 🔗 URLs de ejemplo:
- Si tu usuario es "genesis123": https://genesis123.github.io/powertools-app/
- Si tu usuario es "powertools": https://powertools.github.io/powertools-app/

## 📱 Para acceso móvil:
Una vez publicada, podrás acceder desde cualquier dispositivo a la URL de GitHub Pages.

## 🔧 Comandos útiles:
```bash
# Actualizar la app después de cambios
git add .
git commit -m "Actualización PowerTools"
git push

# Deploy directo con gh-pages
npm run deploy
```

## ⚡ Alternativa rápida - Netlify:
1. Ve a: https://netlify.com
2. Arrastra la carpeta 'dist' 
3. ¡Listo en 30 segundos!

---
PowerTools RD © 2025
