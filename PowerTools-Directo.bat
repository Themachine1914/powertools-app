@echo off
title PowerTools RD
echo Iniciando PowerTools RD...
cd /d "C:\Users\Genesis Ortiz\OneDrive\Escritorio\Nueva carpeta\APPS"
if exist "powertools-completo.html" (
    echo Archivo encontrado. Abriendo...
    start "" "powertools-completo.html"
    echo Listo!
) else (
    echo ERROR: Archivo no encontrado
    echo Ubicacion: %CD%
    dir *.html
    pause
)
timeout /t 3 >nul
