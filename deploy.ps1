# Script de deploy para PowerShell - PowerTools App
# Deploy automatico a GitHub Pages

Write-Host "🚀 Iniciando deploy de PowerTools App a GitHub Pages..." -ForegroundColor Green

# Verificar que estamos en el directorio correcto
if (!(Test-Path "package.json")) {
    Write-Host "❌ Error: package.json no encontrado. Ejecuta este script desde la raíz del proyecto." -ForegroundColor Red
    exit 1
}

Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error instalando dependencias." -ForegroundColor Red
    exit 1
}

Write-Host "🔨 Creando build de producción..." -ForegroundColor Yellow
npx expo export -p web

# Verificar que el build se creó correctamente
if (!(Test-Path "dist")) {
    Write-Host "❌ Error: El build no se creó correctamente." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build creado exitosamente en la carpeta 'dist'" -ForegroundColor Green

Write-Host "🌐 Desplegando a GitHub Pages..." -ForegroundColor Yellow

# Verificar si gh-pages está instalado
$ghPagesInstalled = npm list gh-pages 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "📦 Instalando gh-pages..." -ForegroundColor Yellow
    npm install --save-dev gh-pages
}

# Deploy usando gh-pages
npx gh-pages -d dist

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Deploy completado!" -ForegroundColor Green
    Write-Host "🎉 Tu aplicación estará disponible en: https://tuusuario.github.io/powertools-app" -ForegroundColor Cyan
    Write-Host "⏳ Nota: GitHub Pages puede tardar unos minutos en actualizar." -ForegroundColor Yellow
    
    Write-Host ""
    Write-Host "📝 Próximos pasos:" -ForegroundColor Blue
    Write-Host "1. Ve a la configuración de tu repositorio en GitHub"
    Write-Host "2. Navega a Settings → Pages"
    Write-Host "3. Asegúrate de que la fuente esté configurada como 'Deploy from a branch'"
    Write-Host "4. Selecciona la rama 'gh-pages'"
    Write-Host "5. ¡Tu aplicación estará en línea!"
} else {
    Write-Host "❌ Error durante el deploy." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🔗 Enlaces útiles:" -ForegroundColor Blue
Write-Host "- Aplicación web: https://tuusuario.github.io/powertools-app"
Write-Host "- Repositorio: https://github.com/tuusuario/powertools-app"
Write-Host "- Documentación: README.md"
