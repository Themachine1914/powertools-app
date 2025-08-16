# PowerTools App

## ¿Qué necesitas instalar?

Antes de poder ejecutar la aplicación, necesitas tener Node.js instalado en tu computadora.

### 1. Instalar Node.js

#### Para Windows:
1. Ve a [https://nodejs.org](https://nodejs.org)
2. Descarga la versión LTS (recomendada)
3. Ejecuta el instalador y sigue las instrucciones
4. Reinicia tu computadora

#### Verificar instalación:
Abre PowerShell y ejecuta:
```powershell
node --version
npm --version
```

Deberías ver algo como:
```
v18.17.0
8.19.2
```

### 2. Instalar Expo CLI
En PowerShell, ejecuta:
```powershell
npm install -g @expo/cli
```

### 3. Instalar dependencias del proyecto
En la carpeta del proyecto, ejecuta:
```powershell
npm install
```

### 4. Ejecutar la aplicación

#### Opción A: En el navegador web (para testing)
```powershell
npm run web
```

#### Opción B: En tu teléfono móvil
1. Instala "Expo Go" desde Google Play Store o App Store
2. Ejecuta en PowerShell:
```powershell
npm start
```
3. Escanea el código QR con tu teléfono

#### Opción C: En emulador Android/iOS
```powershell
npm run android    # Para Android
npm run ios        # Para iOS (solo en Mac)
```

### 5. Problemas comunes

#### Error: "npm no se reconoce" o "node no se reconoce"
- Si aparece este error, ejecuta esto en PowerShell:
```powershell
$env:PATH += ";C:\Program Files\nodejs"
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
- Luego verifica con: `node --version` y `npm --version`

#### Error: "expo no se reconoce"
- Ejecuta: `npm install -g @expo/cli`
- Reinicia PowerShell

#### Error en la instalación de dependencias
- Elimina la carpeta `node_modules`
- Ejecuta `npm install` nuevamente

### 6. ¡Listo para desarrollar!

Una vez que tengas todo instalado, tu aplicación PowerTools estará lista para usar y personalizar según las necesidades específicas de tu negocio.

## Próximos pasos

1. **Personalizar los datos**: Modifica los productos, clientes y datos de ejemplo
2. **Configurar tu marca**: Cambia colores, logo y nombre de la empresa
3. **Agregar funcionalidades**: Integra con sistemas externos si es necesario
4. **Hacer build para producción**: Crear la app final para instalar en dispositivos

¡Tu app PowerTools está lista para revolucionar la gestión de tu negocio de herramientas! 🔧⚡
