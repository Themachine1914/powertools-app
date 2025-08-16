@echo off
title PowerTools RD - Iniciando...
echo Iniciando PowerTools RD...
echo.
cd /d "c:\Users\Genesis Ortiz\OneDrive\Escritorio\Nueva carpeta\APPS"
if exist "powertools-completo.html" (
    echo Archivo encontrado. Abriendo en navegador...
    start "" "powertools-completo.html"
    echo PowerTools RD iniciado correctamente.
) else (
    echo ERROR: No se encontro el archivo powertools-completo.html
    echo Ubicacion actual: %CD%
    pause
)
timeout /t 2 >nul
