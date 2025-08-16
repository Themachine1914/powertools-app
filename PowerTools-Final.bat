@echo off
title PowerTools RD - Sistema Completo
echo.
echo ===================================
echo    PowerTools RD - Iniciando...
echo ===================================
echo.

cd /d "C:\Users\Genesis Ortiz\OneDrive\Escritorio\Nueva carpeta\APPS"

if exist "powertools-completo.html" (
    echo [OK] Archivo encontrado
    echo [INFO] Abriendo en navegador predeterminado...
    echo.
    
    REM Intentar con diferentes navegadores
    if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
        echo [INFO] Usando Google Chrome...
        "C:\Program Files\Google\Chrome\Application\chrome.exe" "powertools-completo.html"
    ) else if exist "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" (
        echo [INFO] Usando Microsoft Edge...
        "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" "powertools-completo.html"
    ) else (
        echo [INFO] Usando navegador predeterminado...
        start "" "powertools-completo.html"
    )
    
    echo.
    echo [SUCCESS] PowerTools RD iniciado correctamente!
    echo          Sistema completo con todas las funciones
    echo.
    
) else (
    echo [ERROR] No se encontro powertools-completo.html
    echo [INFO] Archivos disponibles:
    dir *.html /b
    echo.
    pause
)

timeout /t 2 >nul
