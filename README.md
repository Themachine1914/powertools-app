# 🔧 PowerTools RD - Sistema de Gestión Empresarial

[![Deploy Status](https://img.shields.io/badge/deployed-live-green)](https://tuusuario.github.io/powertools-app)
[![React Native](https://img.shields.io/badge/React%20Native-0.74-blue)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-51.0-000020)](https://expo.dev/)

PowerTools RD es una aplicación completa de gestión empresarial desarrollada en React Native con Expo, optimizada para funcionar tanto en dispositivos móviles como en navegadores web.

## 🚀 Demo en Vivo

**🌐 Acceso Web:** [https://tuusuario.github.io/powertools-app](https://tuusuario.github.io/powertools-app)

**📱 Aplicación Móvil:** Disponible a través de Expo Go

## ✨ Características

### 📊 Dashboard
- Estadísticas en tiempo real de inventario, ventas y gastos
- Gráficos interactivos y métricas clave
- Alertas y notificaciones importantes

### 📦 Gestión de Inventario
- Registro completo de productos con códigos y categorías
- Control de stock en tiempo real
- Alertas de stock bajo automáticas
- Búsqueda y filtrado avanzado

### 📋 Cotizaciones
- Creación y gestión de cotizaciones profesionales
- Seguimiento de estados (pendiente, aprobada, rechazada)
- Historial completo de cotizaciones
- Sistema de numeración automática

### 💰 Control de Gastos
- Registro detallado de gastos por categorías
- Análisis de tendencias de gastos
- Gestión de proveedores
- Reportes financieros

### 🛒 Registro de Ventas
- Sistema completo de ventas con facturación
- Múltiples métodos de pago
- Cálculo automático de ganancias
- Historial de transacciones

### 👥 Gestión de Usuarios
- Sistema de usuarios con roles (admin, manager)
- Control de acceso y permisos
- Gestión de perfiles de usuario

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React Native 0.74 + Expo 51.0
- **Navegación:** React Navigation v6
- **UI Components:** React Native Paper + Ionicons
- **Gráficos:** React Native Chart Kit
- **Persistencia:** AsyncStorage (móvil) + localStorage (web)
- **Estado:** React Hooks (useState, useEffect)
- **Build Web:** Expo Metro Bundler

## 📱 Instalación y Uso

### Opción 1: Usar la aplicación web (Recomendado)
1. Visita: [https://tuusuario.github.io/powertools-app](https://tuusuario.github.io/powertools-app)
2. La aplicación cargará automáticamente en tu navegador
3. Todos los datos se guardan localmente en tu dispositivo

### Opción 2: Desarrollo local
```bash
# Clonar el repositorio
git clone https://github.com/tuusuario/powertools-app.git
cd powertools-app

# Instalar dependencias
npm install

# Iniciar en desarrollo
npm start

# Para web específicamente
npm run web

# Para build de producción web
npm run build:web
```

### Opción 3: Móvil con Expo Go
1. Instala [Expo Go](https://expo.dev/client) en tu dispositivo
2. Escanea el QR code que aparece al ejecutar `npm start`
3. La aplicación se cargará automáticamente

## 🔧 Scripts Disponibles

```bash
npm start          # Iniciar servidor de desarrollo
npm run android    # Abrir en emulador Android
npm run ios        # Abrir en simulador iOS
npm run web        # Abrir en navegador web
npm run build:web  # Crear build para producción web
npm run deploy     # Desplegar a GitHub Pages
npm run serve      # Servir build local
```

## 📂 Estructura del Proyecto

```
powertools-app/
├── App.js                 # Componente principal
├── storage.js             # Sistema de persistencia universal
├── app.json              # Configuración de Expo
├── package.json          # Dependencias y scripts
├── assets/               # Imágenes y recursos
├── dist/                 # Build web generado
└── README.md             # Este archivo
```

## � Deploy a GitHub Pages

### Configuración automática:

1. **Fork o clona este repositorio**
2. **Configura tu repositorio:**
   ```bash
   # Agregar tu repositorio como origin
   git remote add origin https://github.com/tuusuario/powertools-app.git
   ```

3. **Actualiza el package.json:**
   ```json
   {
     "homepage": "https://tuusuario.github.io/powertools-app"
   }
   ```

4. **Deploy automático:**
   ```bash
   npm run deploy
   ```

### Configuración manual:

1. **Crear build:**
   ```bash
   npm run build:web
   ```

2. **Subir carpeta dist/ a rama gh-pages:**
   ```bash
   git add dist/
   git commit -m "Deploy to GitHub Pages"
   git subtree push --prefix dist origin gh-pages
   ```

3. **Configurar GitHub Pages:**
   - Ve a Settings → Pages en tu repositorio
   - Selecciona "Deploy from a branch"
   - Elige la rama `gh-pages`
   - La aplicación estará disponible en: `https://tuusuario.github.io/powertools-app`

## 📊 Funcionalidades Detalladas

### Dashboard
- **Métricas en tiempo real:** Total de productos, cotizaciones, ventas y gastos
- **Gráficos interactivos:** Tendencias de ventas y análisis de gastos
- **Alertas automáticas:** Stock bajo, cotizaciones pendientes, recordatorios

### Inventario
- **Gestión completa:** Crear, editar, eliminar productos
- **Categorización:** Herramientas manuales, eléctricas, accesorios, repuestos
- **Control de stock:** Alertas automáticas cuando el stock es bajo
- **Búsqueda avanzada:** Por nombre, código, categoría

### Cotizaciones
- **Workflow completo:** Borrador → Enviada → Aprobada/Rechazada
- **Numeración automática:** Sistema de códigos COT-001, COT-002, etc.
- **Gestión de clientes:** Historial de cotizaciones por cliente
- **Estados visuales:** Chips de colores para identificar estados

### Ventas
- **Facturación completa:** Generación automática de números de factura
- **Métodos de pago:** Efectivo, tarjeta, transferencia, cheque
- **Cálculos automáticos:** Totales, subtotales, impuestos
- **Historial completo:** Búsqueda y filtrado de ventas

### Gastos
- **Categorización:** Inventario, servicios, marketing, operaciones
- **Análisis de tendencias:** Gráficos de gastos por período
- **Control de proveedores:** Historial de gastos por proveedor
- **Reportes:** Exportación de datos para análisis

## 🔐 Persistencia de Datos

- **Móvil:** AsyncStorage - Datos guardados localmente en el dispositivo
- **Web:** localStorage - Datos guardados en el navegador
- **Sincronización:** Los datos persisten entre sesiones
- **Compatibilidad:** Funciona offline después de la primera carga

## ⚠️ Consideraciones para Web

### Limitaciones conocidas:
- **Modales:** Algunos modales nativos se adaptan a equivalentes web
- **Iconos:** Se usan fonts web en lugar de iconos nativos
- **Navegación:** Bottom tabs se convierten en navegación horizontal
- **Gestos:** Algunos gestos táctiles se adaptan a clics de mouse

### Optimizaciones implementadas:
- **Storage universal:** Detección automática de plataforma
- **Responsive design:** Adaptación automática a diferentes tamaños de pantalla
- **Rendimiento:** Lazy loading y optimización de bundles
- **SEO:** Meta tags y configuración PWA

## 🚀 Próximas Funcionalidades

- [ ] **Autenticación:** Login y registro de usuarios
- [ ] **Base de datos remota:** Sincronización en la nube
- [ ] **Reportes PDF:** Generación de facturas y reportes
- [ ] **Códigos de barras:** Escáner para productos
- [ ] **Multi-tienda:** Gestión de múltiples ubicaciones
- [ ] **Notificaciones push:** Alertas en tiempo real
- [ ] **API REST:** Backend completo para sincronización

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

**PowerTools Team**
- 📧 Email: contacto@powertools.com
- 🌐 Website: [powertools-rd.com](https://powertools-rd.com)
- 📱 WhatsApp: +1 (809) 555-0123

---

**⭐ Si te gusta este proyecto, dale una estrella en GitHub!**

Desarrollado con ❤️ en República Dominicana 🇩🇴
- **Alertas** de stock bajo y cotizaciones pendientes

### 📦 Gestión de Inventario
- **CRUD completo** de productos
- **Control de stock** con alertas de reabastecimiento
- **Categorización** y filtros avanzados
- **Búsqueda** por nombre, categoría o proveedor
- **Gestión de proveedores** y códigos de barras

### 📄 Sistema de Cotizaciones
- **Creación** de cotizaciones profesionales
- **Gestión de estados** (Borrador, Enviada, Aceptada, Rechazada)
- **Compartir** cotizaciones por WhatsApp, email, etc.
- **Seguimiento** de clientes y respuestas
- **Cálculos automáticos** de totales y descuentos

### 💰 Control de Gastos
- **Registro** de todos los gastos del negocio
- **Categorización** (Inventario, Renta, Servicios, etc.)
- **Métodos de pago** múltiples
- **Gráficos de análisis** por categoría y tendencias
- **Control de recibos** y proveedores

### 🛒 Gestión de Ventas
- **Registro** de ventas con múltiples productos
- **Cálculo automático** de ganancias
- **Métodos de pago** flexibles
- **Generación de recibos** compartibles
- **Análisis financiero** con gráficos
- **Estados de venta** (Completada, Pendiente, Cancelada)

## 🎨 Diseño y UX

### Tema Visual PowerTools
- **Colores principales**: Naranja (#FF6B35) y Azul oscuro (#2E4057)
- **Interfaz intuitiva** con navegación por pestañas
- **Iconografía consistente** con Ionicons
- **Cards y modales** para mejor organización
- **Responsive design** para diferentes tamaños de pantalla

### Experiencia de Usuario
- **Búsqueda** en tiempo real
- **Filtros** por categorías y estados
- **Feedback visual** inmediato
- **Formularios** con validación
- **Acciones rápidas** desde el dashboard

## 🚀 Tecnologías Utilizadas

### Frontend
- **React Native** - Framework principal
- **Expo** - Plataforma de desarrollo
- **React Navigation** - Navegación entre pantallas
- **React Native Paper** - Componentes UI
- **React Native Chart Kit** - Gráficos y estadísticas

### Funcionalidades
- **Expo Vector Icons** - Iconografía
- **React Native SVG** - Soporte para gráficos vectoriales
- **React Native Modal** - Modales personalizados
- **Share API** - Compartir contenido

## 📋 Requisitos del Sistema

### Para Desarrollo
- **Node.js** (v16 o superior)
- **npm** o **yarn**
- **Expo CLI**
- **Android Studio** (para Android)
- **Xcode** (para iOS - solo macOS)

### Para Usuarios Finales
- **iOS** 11.0 o superior
- **Android** 6.0 (API 23) o superior
- Espacio mínimo: 50MB

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/powertools-app.git
cd powertools-app
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el proyecto
```bash
npm start
```

### 4. Ejecutar en dispositivos
```bash
# Android
npm run android

# iOS
npm run ios

# Web (para testing)
npm run web
```

## 📱 Instalación en Dispositivos

### Opción 1: Expo Go (Desarrollo)
1. Instala **Expo Go** desde la App Store o Google Play
2. Escanea el código QR que aparece al ejecutar `npm start`
3. La app se cargará directamente en tu dispositivo

### Opción 2: Build de Producción
```bash
# Generar APK para Android
eas build -p android

# Generar IPA para iOS
eas build -p ios
```

## 📊 Funcionalidades Detalladas

### Dashboard Inteligente
- **Métricas en tiempo real**: productos, ventas, crecimiento
- **Gráfico de tendencias**: ventas de los últimos 6 meses
- **Distribución por categorías**: análisis visual del inventario
- **Alertas automáticas**: stock bajo, cotizaciones pendientes

### Inventario Avanzado
- **Gestión completa**: agregar, editar, eliminar productos
- **Control de stock**: mínimos y máximos configurables
- **Categorías personalizables**: organización flexible
- **Proveedores**: gestión de relaciones comerciales
- **Códigos de barras**: identificación única de productos

### Cotizaciones Profesionales
- **Plantillas automáticas**: formato profesional
- **Múltiples productos**: cotizaciones complejas
- **Estados de seguimiento**: control del proceso de venta
- **Compartir fácilmente**: WhatsApp, email, etc.
- **Validez configurable**: fechas de vencimiento

### Control Financiero
- **Gastos categorizados**: análisis detallado
- **Métodos de pago**: efectivo, tarjetas, transferencias
- **Reportes visuales**: gráficos de tendencias
- **Recibos digitales**: organización de comprobantes

### Ventas Inteligentes
- **Proceso simplificado**: venta rápida y eficiente
- **Cálculos automáticos**: totales, descuentos, impuestos
- **Análisis de rentabilidad**: costos vs. precios
- **Recibos compartibles**: comprobantes digitales

## 🎯 Casos de Uso

### Para Pequeños Negocios
- **Ferreterías** y tiendas de herramientas
- **Talleres mecánicos** con venta de repuestos
- **Distribuidores** de herramientas industriales
- **Constructoras** con almacén propio

### Beneficios Clave
- **Organización total** del inventario
- **Control financiero** preciso
- **Atención al cliente** profesional
- **Toma de decisiones** basada en datos
- **Crecimiento** sostenible del negocio

## 🔧 Desarrollo y Contribución

### Estructura del Proyecto
```
src/
├── screens/           # Pantallas principales
│   ├── HomeScreen.js
│   ├── InventoryScreen.js
│   ├── QuotationsScreen.js
│   ├── ExpensesScreen.js
│   └── SalesScreen.js
├── components/        # Componentes reutilizables (futuro)
├── services/         # Servicios y APIs (futuro)
├── utils/            # Utilidades y helpers (futuro)
└── data/             # Datos mock y constantes (futuro)
```

### Scripts Disponibles
```bash
npm start          # Iniciar servidor de desarrollo
npm run android    # Ejecutar en Android
npm run ios        # Ejecutar en iOS  
npm run web        # Ejecutar en web browser
npm run eject      # Eyectar de Expo (no recomendado)
```

### Contribuir al Proyecto
1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commitea tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 🚀 Próximas Funcionalidades

### Versión 2.0
- [ ] **Base de datos en la nube** (Firebase/Supabase)
- [ ] **Autenticación de usuarios**
- [ ] **Sincronización multi-dispositivo**
- [ ] **Escáner de códigos de barras**
- [ ] **Reportes PDF automáticos**
- [ ] **Notificaciones push**

### Versión 3.0
- [ ] **Multi-tienda** para cadenas
- [ ] **Panel web administrativo**
- [ ] **Integración con proveedores**
- [ ] **E-commerce integrado**
- [ ] **Inteligencia artificial** para predicciones
- [ ] **APIs para terceros**

## 📞 Soporte y Contacto

### Documentación
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/docs/getting-started)

### Soporte Técnico
- **Email**: soporte@powertools-app.com
- **GitHub Issues**: [Reportar problemas](https://github.com/tu-usuario/powertools-app/issues)
- **Documentación**: [Wiki del proyecto](https://github.com/tu-usuario/powertools-app/wiki)

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- **Expo Team** por la increíble plataforma de desarrollo
- **React Native Community** por los componentes y librerías
- **PowerTools Team** por la visión y requerimientos del proyecto

---

**PowerTools App** - *Gestiona tu negocio de herramientas como un profesional* 🔧⚡

¿Tienes una ferretería o negocio de herramientas? ¡PowerTools App es la solución completa que necesitas para llevar tu negocio al siguiente nivel!

---

### 📱 ¡Descarga ya disponible!

[📲 Android APK](link-to-android) | [🍎 iOS App Store](link-to-ios) | [🌐 Demo Web](link-to-demo)
