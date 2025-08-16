@echo off
title PowerTools RD - Forzando Navegador
echo.
echo ===================================
echo    PowerTools RD - Iniciando...
echo ===================================
echo.

cd /d "C:\Users\Genesis Ortiz\OneDrive\Escritorio\Nueva carpeta\APPS"

if exist "powertools-completo.html" (
    echo [OK] Archivo encontrado
    echo [INFO] Forzando apertura en navegador web...
    echo.
    
    REM Obtener ruta completa del archivo
    set "archivo=%CD%\powertools-completo.html"
    echo [DEBUG] Ruta completa: %archivo%
    
    REM Intentar diferentes métodos para abrir en navegador
    echo [INFO] Intentando metodo 1: Chrome...
    start chrome "%archivo%" 2>nul
    if %errorlevel% neq 0 (
        echo [INFO] Intentando metodo 2: Edge...
        start msedge "%archivo%" 2>nul
        if %errorlevel% neq 0 (
            echo [INFO] Intentando metodo 3: Firefox...
            start firefox "%archivo%" 2>nul
            if %errorlevel% neq 0 (
                echo [INFO] Intentando metodo 4: Navegador predeterminado...
                rundll32 url.dll,FileProtocolHandler "%archivo%"
            )
        )
    )
    
    echo.
    echo [SUCCESS] Comando ejecutado!
    echo [INFO] Si no se abrio en navegador, abre manualmente:
    echo        %archivo%
    echo.
    
) else (
    echo [ERROR] No se encontro powertools-completo.html
    echo [INFO] Ubicacion actual: %CD%
    echo [INFO] Archivos HTML disponibles:
    dir *.html /b 2>nul
    echo.
)

echo Presiona cualquier tecla para continuar...
pause >nul
