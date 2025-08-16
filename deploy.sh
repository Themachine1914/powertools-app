#!/bin/bash

# Script de deploy automático para GitHub Pages
# PowerTools App - Deploy Script

echo "🚀 Iniciando deploy de PowerTools App a GitHub Pages..."

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json no encontrado. Ejecuta este script desde la raíz del proyecto."
    exit 1
fi

echo "📦 Instalando dependencias..."
npm install

echo "🔨 Creando build de producción..."
npx expo export -p web

# Verificar que el build se creó correctamente
if [ ! -d "dist" ]; then
    echo "❌ Error: El build no se creó correctamente."
    exit 1
fi

echo "✅ Build creado exitosamente en la carpeta 'dist'"

echo "🌐 Desplegando a GitHub Pages..."

# Verificar si gh-pages está instalado
if ! npm list gh-pages > /dev/null 2>&1; then
    echo "📦 Instalando gh-pages..."
    npm install --save-dev gh-pages
fi

# Deploy usando gh-pages
npx gh-pages -d dist

echo "✅ Deploy completado!"
echo "🎉 Tu aplicación estará disponible en: https://tuusuario.github.io/powertools-app"
echo "⏳ Nota: GitHub Pages puede tardar unos minutos en actualizar."

echo ""
echo "📝 Próximos pasos:"
echo "1. Ve a la configuración de tu repositorio en GitHub"
echo "2. Navega a Settings → Pages"
echo "3. Asegúrate de que la fuente esté configurada como 'Deploy from a branch'"
echo "4. Selecciona la rama 'gh-pages'"
echo "5. ¡Tu aplicación estará en línea!"
