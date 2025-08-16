<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# PowerTools App - Instrucciones para GitHub Copilot

## Descripción del Proyecto
PowerTools es una aplicación móvil desarrollada en React Native para la gestión integral de un negocio de herramientas. La aplicación incluye módulos para inventario, cotizaciones, control de gastos, gestión de ventas y análisis financiero.

## Arquitectura y Tecnologías
- **Framework**: React Native con Expo
- **Navegación**: React Navigation v6 (Bottom Tabs)
- **UI**: React Native Paper + Ionicons
- **Gráficos**: React Native Chart Kit
- **Estado**: Local state con hooks de React
- **Persistencia**: SQLite (configurado para futuro uso)

## Patrones de Código y Convenciones

### Estructura de Componentes
- Usar functional components con hooks
- Props destructuring en parámetros de función
- Usar StyleSheet para estilos
- Mantener consistencia en nombres de archivos (PascalCase para componentes)

### Manejo de Estado
- useState para estado local de componentes
- useEffect para efectos secundarios
- Datos mockados almacenados en arrays locales
- Funciones CRUD consistentes (add, edit, delete)

### Estilo y UI
- Tema de colores consistente:
  - Primario: #FF6B35 (naranja PowerTools)
  - Secundario: #2E4057 (azul oscuro)
  - Éxito: #27AE60 (verde)
  - Error: #E74C3C (rojo)
  - Advertencia: #F39C12 (amarillo)
- Usar Cards para contenido principal
- FAB para acciones de agregar
- Modales para formularios
- Chips para estados y categorías

### Navegación
- Bottom tabs principal
- Screens independientes por módulo
- Navegación por props cuando sea necesario

## Módulos Principales

### HomeScreen
- Dashboard con estadísticas
- Gráficos de tendencias
- Acciones rápidas
- Alertas y notificaciones

### InventoryScreen
- CRUD de productos
- Gestión de stock
- Categorías y filtros
- Alertas de stock bajo

### QuotationsScreen
- Creación de cotizaciones
- Gestión de estados
- Compartir cotizaciones
- Seguimiento de clientes

### ExpensesScreen
- Registro de gastos
- Categorización
- Gráficos de análisis
- Control de proveedores

### SalesScreen
- Registro de ventas
- Cálculo de ganancias
- Gestión de métodos de pago
- Generación de recibos

## Funcionalidades Específicas

### Formularios
- Validación de campos obligatorios
- Feedback visual con Alert
- Campos numéricos con keyboardType
- TextArea para descripciones

### Listas y Filtros
- FlatList para renderizado eficiente
- Searchbar para búsqueda
- Chips para filtros por categoría/estado
- Estados vacíos informativos

### Gráficos y Estadísticas
- LineChart para tendencias temporales
- PieChart para distribuciones
- BarChart para comparaciones
- Configuración consistente de colores

### Modales y Interacciones
- Modales slide para formularios
- Confirmaciones con Alert.alert
- Share API para compartir contenido
- TouchableOpacity para botones personalizados

## Mejores Prácticas

### Performance
- Usar FlatList en lugar de ScrollView para listas largas
- Memorizar cálculos complejos cuando sea posible
- Evitar re-renders innecesarios

### UX/UI
- Feedback inmediato en acciones
- Estados de carga cuando sea necesario
- Navegación intuitiva
- Consistencia visual

### Datos
- Validación de entrada del usuario
- Formato consistente de fechas (YYYY-MM-DD)
- Cálculos precisos para montos
- IDs únicos para elementos

## Futuras Expansiones
- Integración con base de datos remota
- Autenticación de usuarios
- Sincronización en la nube
- Escáner de códigos de barras
- Reportes PDF
- Notificaciones push
- Multi-tienda

## Comandos de Desarrollo
```bash
npm start          # Iniciar Expo
npm run android    # Ejecutar en Android
npm run ios        # Ejecutar en iOS
npm run web        # Ejecutar en Web
```

Cuando generes código para este proyecto, mantén estas convenciones y patrones para asegurar consistencia y calidad.
