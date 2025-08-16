// PowerTools App - Versión Simplificada y Funcional

// Variables globales
let currentViewMode = 'grid'; // 'grid' o 'list'
let currentUser = null;
let movementHistory = []; // Historial de movimientos de inventario
let quotations = []; // Cotizaciones
let invoices = []; // Facturas

// Datos de ejemplo para cotizaciones
let sampleQuotations = [
    {
        id: "1",
        number: 'COT-2025-001',
        clientName: 'Constructora ABC',
        clientEmail: 'info@constructoraabc.com',
        clientPhone: '+1 (555) 123-4567',
        clientAddress: 'Av. Principal 123, Ciudad',
        clientRnc: '101-234567-8',
        status: 'enviada',
        items: [
            { productId: 1, productName: 'Taladro Inalámbrico Bosch', quantity: 2, price: 89.99, total: 179.98 },
            { productId: 2, productName: 'Martillo de Carpintero', quantity: 5, price: 24.99, total: 124.95 }
        ],
        subtotal: 304.93,
        taxes: 54.89,
        total: 359.82,
        includeItbs: true,
        validUntil: '2025-09-06',
        createdAt: '2025-08-01T10:00:00.000Z',
        updatedAt: '2025-08-01T10:00:00.000Z',
        createdBy: 'admin'
    },
    {
        id: "2",
        number: 'COT-2025-002',
        clientName: 'Taller Mecánico López',
        clientEmail: 'lopez@taller.com',
        clientPhone: '+1 (555) 987-6543',
        clientAddress: 'Calle Comercio 456, Ciudad',
        clientRnc: '',
        status: 'aceptada',
        items: [
            { productId: 1, productName: 'Taladro Inalámbrico Bosch', quantity: 1, price: 89.99, total: 89.99 }
        ],
        subtotal: 89.99,
        taxes: 0,
        total: 89.99,
        includeItbs: false,
        validUntil: '2025-08-20',
        createdAt: '2025-07-25T14:30:00.000Z',
        updatedAt: '2025-08-02T09:15:00.000Z',
        createdBy: 'admin'
    },
    {
        id: "3",
        number: 'COT-2025-003',
        clientName: 'Ferretería Central',
        clientEmail: 'ventas@ferreteriacentral.com',
        clientPhone: '+1 (555) 456-7890',
        clientAddress: 'Zona Industrial, Local 15',
        clientRnc: '130-567890-1',
        status: 'borrador',
        items: [
            { productId: 3, productName: 'Sierra Circular', quantity: 1, price: 125.00, total: 125.00 },
            { productId: 4, productName: 'Destornillador Set', quantity: 3, price: 15.99, total: 47.97 }
        ],
        subtotal: 172.97,
        taxes: 31.13,
        total: 204.10,
        includeItbs: true,
        validUntil: '2025-09-15',
        createdAt: '2025-08-05T09:30:00.000Z',
        updatedAt: '2025-08-05T09:30:00.000Z',
        createdBy: 'admin'
    }
];

// Datos de ejemplo para facturas
let sampleInvoices = [
    {
        id: 1,
        number: 'FAC-2025-001',
        quotationId: 2, // Proviene de cotización COT-2025-002
        clientName: 'Taller Mecánico López',
        clientEmail: 'lopez@taller.com',
        clientPhone: '+1 (555) 987-6543',
        clientAddress: 'Calle Comercio 456, Ciudad',
        status: 'pagada',
        paymentMethod: 'tarjeta',
        items: [
            { productId: 1, productName: 'Taladro Inalámbrico Bosch', quantity: 1, price: 89.99 }
        ],
        subtotal: 89.99,
        taxes: 14.40,
        total: 104.39,
        dueDate: '2025-08-30',
        paidDate: '2025-08-15',
        createdAt: '2025-08-10T11:00:00.000Z',
        updatedAt: '2025-08-15T16:20:00.000Z'
    }
];

let products = [
    {
        id: 1,
        name: "Taladro Inalámbrico Bosch",
        price: 89.99,
        stock: 15,
        category: "herramientas-electricas",
        description: "Taladro inalámbrico profesional con batería de litio",
        image: null, // URL de la imagen o base64
        barcode: "1234567890123",
        costPrice: 65.00,
        minStock: 5
    },
    {
        id: 2,
        name: "Martillo de Carpintero",
        price: 24.99,
        stock: 8,
        category: "herramientas-manuales",
        description: "Martillo de carpintero con mango de madera",
        image: null,
        barcode: "1234567890124",
        costPrice: 15.00,
        minStock: 3
    }
];

let expenses = []; // Gastos

// Datos de ejemplo para gastos
let sampleExpenses = [
    {
        id: "1",
        description: "Compra de taladros para inventario",
        vendor: "Distribuidora Herramientas SA",
        vendorPhone: "+1 (555) 111-2222",
        vendorEmail: "ventas@distherramientas.com",
        category: "inventario",
        amount: 2500.00,
        paymentMethod: "transferencia",
        status: "pagado",
        invoiceNumber: "FAC-2025-0156",
        dueDate: "2025-08-15",
        createdAt: "2025-08-01T10:30:00.000Z",
        paidAt: "2025-08-05T14:20:00.000Z",
        updatedAt: "2025-08-05T14:20:00.000Z",
        notes: "Compra de 10 taladros Bosch para stock inicial",
        createdBy: "admin"
    },
    {
        id: "2", 
        description: "Alquiler de local - Agosto 2025",
        vendor: "Inmobiliaria Central",
        vendorPhone: "+1 (555) 333-4444",
        vendorEmail: "pagos@inmobiliariacentral.com",
        category: "operativos",
        amount: 1200.00,
        paymentMethod: "efectivo",
        status: "pagado",
        invoiceNumber: "REC-2025-0089",
        dueDate: "2025-08-01",
        createdAt: "2025-07-25T09:00:00.000Z",
        paidAt: "2025-08-01T10:00:00.000Z",
        updatedAt: "2025-08-01T10:00:00.000Z",
        notes: "Pago mensual del alquiler del local comercial",
        createdBy: "admin"
    },
    {
        id: "3",
        description: "Salario Agosto - Carlos Martínez",
        vendor: "Carlos Martínez",
        vendorPhone: "+1 (555) 123-4567",
        vendorEmail: "carlos@powertools.com",
        category: "personal",
        amount: 850.00,
        paymentMethod: "transferencia",
        status: "pagado",
        invoiceNumber: "",
        dueDate: "2025-08-31",
        createdAt: "2025-08-01T08:00:00.000Z",
        paidAt: "2025-08-30T16:00:00.000Z",
        updatedAt: "2025-08-30T16:00:00.000Z",
        notes: "Salario mensual empleado vendedor",
        createdBy: "admin"
    },
    {
        id: "4",
        description: "Publicidad en Facebook e Instagram",
        vendor: "Meta Business",
        vendorPhone: "",
        vendorEmail: "noreply@meta.com",
        category: "marketing",
        amount: 150.00,
        paymentMethod: "tarjeta",
        status: "pagado",
        invoiceNumber: "META-INV-789456",
        dueDate: "2025-08-10",
        createdAt: "2025-08-08T12:00:00.000Z",
        paidAt: "2025-08-08T12:05:00.000Z",
        updatedAt: "2025-08-08T12:05:00.000Z",
        notes: "Campaña publicitaria para promoción de herramientas",
        createdBy: "admin"
    },
    {
        id: "5",
        description: "Combustible para entregas",
        vendor: "Estación de Servicio Shell",
        vendorPhone: "+1 (555) 777-8888",
        vendorEmail: "",
        category: "transporte",
        amount: 75.50,
        paymentMethod: "efectivo", 
        status: "pendiente",
        invoiceNumber: "",
        dueDate: "2025-08-15",
        createdAt: "2025-08-09T16:30:00.000Z",
        paidAt: null,
        updatedAt: "2025-08-09T16:30:00.000Z",
        notes: "Gasolina para vehículo de entregas",
        createdBy: "vendedor1"
    },
    {
        id: "6",
        description: "Servicio de internet y teléfono",
        vendor: "Claro Dominicana",
        vendorPhone: "+1 (555) 200-3000",
        vendorEmail: "empresas@claro.com.do",
        category: "servicios",
        amount: 95.00,
        paymentMethod: "debito_automatico",
        status: "vencido",
        invoiceNumber: "CLARO-2025-08-001",
        dueDate: "2025-08-05",
        createdAt: "2025-07-30T10:00:00.000Z",
        paidAt: null,
        updatedAt: "2025-08-09T10:00:00.000Z",
        notes: "Factura vencida - contactar para evitar corte",
        createdBy: "admin"
    }
];
let sales = [];

// Inicialización principal
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 PowerTools iniciando...');
    
    // Inicializar app sin bloqueos
    try {
        initApp();
        console.log('✅ App inicializada correctamente');
    } catch (error) {
        console.error('❌ Error al inicializar:', error);
    }
});

function initApp() {
    // Cargar configuración de empresa primero
    loadCompanySettings();
    
    // Cargar datos primero
    loadData();
    
    // Crear sesión automática para desarrollo
    createDevSession();
    
    // Configurar navegación simple
    setupSimpleNavigation();
    
    // Configurar interfaz de usuario
    setupUserInterface();
    
    // Renderizar dashboard inicial
    renderDashboard();
}

function createDevSession() {
    const session = {
        userId: 1,
        user: {
            id: 1,
            username: 'admin',
            fullName: 'Administrador PowerTools',
            email: 'admin@powertools.com',
            role: 'admin'
        },
        expires: Date.now() + (24 * 60 * 60 * 1000)
    };
    localStorage.setItem('powertools_session', JSON.stringify(session));
}

function setupSimpleNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            if (section) {
                showSection(section);
                updateActiveNav(this);
            }
        });
    });
    
    // Agregar sección de usuarios para admin
    addUsersSection();
}

function showSection(sectionName) {
    console.log('📄 Mostrando sección:', sectionName);
    
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Mostrar sección objetivo
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Renderizar contenido según la sección
        switch(sectionName) {
            case 'dashboard':
                renderDashboard();
                break;
            case 'inventory':
                renderInventory();
                break;
            case 'users':
                renderUsers();
                break;
            case 'quotations':
                renderQuotations(); // Usar la función correcta que carga y muestra
                setupQuotationFilters();
                break;
            case 'invoices':
                loadInvoices();
                setupInvoiceFilters();
                break;
            case 'expenses':
                renderExpenses();
                setupExpenseFilters();
                break;
            case 'sales':
                renderSales();
                break;
            case 'settings':
                renderSettings();
                break;
            default:
                console.log('Sección:', sectionName, 'cargada');
        }
    }
}

function updateActiveNav(activeItem) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    activeItem.classList.add('active');
}

function addUsersSection() {
    const navMenu = document.querySelector('.nav-menu');
    const mainContent = document.querySelector('.main-content');
    
    // Verificar si ya existe
    if (document.querySelector('[data-section="users"]')) {
        return;
    }
    
    // Agregar elemento de navegación
    const usersNavItem = document.createElement('li');
    usersNavItem.className = 'nav-item';
    usersNavItem.setAttribute('data-section', 'users');
    usersNavItem.innerHTML = `
        <i class="fas fa-users"></i>
        <span>Usuarios</span>
    `;
    
    usersNavItem.addEventListener('click', function() {
        showSection('users');
        updateActiveNav(this);
    });
    
    navMenu.appendChild(usersNavItem);
    
    // Agregar sección de usuarios
    const usersSection = document.createElement('section');
    usersSection.id = 'users';
    usersSection.className = 'content-section';
    usersSection.innerHTML = `
        <div class="section-header">
            <h1>Gestión de Usuarios</h1>
            <button class="btn btn-primary" onclick="openUserModal()">
                <i class="fas fa-user-plus"></i> Nuevo Usuario
            </button>
        </div>
        
        <div class="users-content">
            <div class="users-stats">
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-info">
                        <h3 id="total-users">0</h3>
                        <p>Total de usuarios</p>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-user-check"></i>
                    </div>
                    <div class="stat-info">
                        <h3 id="active-users">0</h3>
                        <p>Usuarios activos</p>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-user-clock"></i>
                    </div>
                    <div class="stat-info">
                        <h3 id="pending-users">0</h3>
                        <p>Pendientes de aprobación</p>
                    </div>
                </div>
            </div>
            
            <div class="users-list" id="users-list">
                <!-- Se llena dinámicamente -->
            </div>
        </div>
    `;
    
    mainContent.appendChild(usersSection);
}

function setupUserInterface() {
    const session = JSON.parse(localStorage.getItem('powertools_session'));
    if (session && session.user) {
        const userInfo = document.querySelector('.user-info span');
        if (userInfo) {
            userInfo.textContent = `Bienvenido, ${session.user.fullName}`;
        }
    }
}

function loadData() {
    console.log('🔄 Cargando datos...');
    
    // Cargar datos del localStorage si existen
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
        products = JSON.parse(savedProducts);
        console.log('✅ Productos cargados desde localStorage:', products.length, 'productos');
    } else {
        console.log('📦 Usando productos por defecto:', products.length, 'productos');
    }
    
    const savedQuotations = localStorage.getItem('quotations');
    if (savedQuotations) {
        quotations = JSON.parse(savedQuotations);
        console.log('✅ Cotizaciones cargadas:', quotations.length);
    }
    
    const savedInvoices = localStorage.getItem('invoices');
    if (savedInvoices) {
        invoices = JSON.parse(savedInvoices);
        console.log('✅ Facturas cargadas:', invoices.length);
    }
    
    const savedMovementHistory = localStorage.getItem('movementHistory');
    if (savedMovementHistory) {
        movementHistory = JSON.parse(savedMovementHistory);
        console.log('✅ Historial de movimientos cargado:', movementHistory.length);
    }
    
    console.log('📊 Estado final - Productos:', products.length, 'Cotizaciones:', quotations.length, 'Facturas:', invoices.length);
}

function saveData() {
    localStorage.setItem('products', JSON.stringify(products));
}

function renderDashboard() {
    console.log('🏠 Renderizando dashboard...');
    updateDashboardStats();
}

function renderInventory() {
    console.log('📦 Renderizando inventario...');
    
    // Configurar eventos de búsqueda y filtros
    setupInventoryFilters();
    
    // Renderizar lista de productos
    renderProductsList();
    
    // Renderizar historial de movimientos
    renderMovementHistory();
}

// Dashboard mejorado
function updateDashboardStats() {
    console.log('📊 Actualizando estadísticas del dashboard...');
    
    // Estadísticas básicas
    const totalProducts = products.length;
    const lowStockProducts = products.filter(p => p.stock <= p.minStock).length;
    const inventoryValue = products.reduce((sum, p) => sum + (p.stock * (p.costPrice || p.price)), 0);
    
    // Calcular margen promedio
    const productsWithCost = products.filter(p => p.costPrice > 0);
    const avgMargin = productsWithCost.length > 0 
        ? productsWithCost.reduce((sum, p) => sum + ((p.price - p.costPrice) / p.costPrice * 100), 0) / productsWithCost.length
        : 0;
    
    // Actualizar elementos del DOM
    const totalProductsEl = document.getElementById('total-products');
    const lowStockEl = document.getElementById('low-stock-products');
    const inventoryValueEl = document.getElementById('inventory-value');
    const profitMarginEl = document.getElementById('profit-margin');
    
    if (totalProductsEl) totalProductsEl.textContent = totalProducts;
    if (lowStockEl) lowStockEl.textContent = lowStockProducts;
    if (inventoryValueEl) inventoryValueEl.textContent = `$${inventoryValue.toFixed(2)}`;
    if (profitMarginEl) profitMarginEl.textContent = `${avgMargin.toFixed(1)}%`;
    
    // Renderizar alertas
    renderInventoryAlerts();
    
    // Renderizar productos destacados
    renderTopProducts();
    renderInactiveProducts();
}

function renderInventoryAlerts() {
    const alertsContainer = document.getElementById('inventory-alerts-list');
    if (!alertsContainer) return;
    
    const alerts = [];
    
    // Productos con stock crítico (0 unidades)
    const criticalProducts = products.filter(p => p.stock === 0);
    criticalProducts.forEach(product => {
        alerts.push({
            type: 'critical',
            title: `Sin stock: ${product.name}`,
            message: 'Producto agotado - Requiere reposición inmediata'
        });
    });
    
    // Productos con stock bajo
    const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= p.minStock);
    lowStockProducts.forEach(product => {
        alerts.push({
            type: 'warning',
            title: `Stock bajo: ${product.name}`,
            message: `Solo quedan ${product.stock} unidades (mínimo: ${product.minStock})`
        });
    });
    
    // Productos sin imagen
    const noImageProducts = products.filter(p => !p.image).slice(0, 3);
    noImageProducts.forEach(product => {
        alerts.push({
            type: 'info',
            title: `Sin imagen: ${product.name}`,
            message: 'Considera agregar una foto para mejor presentación'
        });
    });
    
    if (alerts.length === 0) {
        alertsContainer.innerHTML = '<p style="color: var(--success-color); text-align: center; padding: 1rem;">✅ Todo está en orden - No hay alertas pendientes</p>';
        return;
    }
    
    alertsContainer.innerHTML = alerts.map(alert => `
        <div class="alert-item ${alert.type}">
            <div class="alert-icon">
                <i class="fas fa-${alert.type === 'critical' ? 'exclamation-circle' : alert.type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            </div>
            <div class="alert-content">
                <h4>${alert.title}</h4>
                <p>${alert.message}</p>
            </div>
        </div>
    `).join('');
}

function renderTopProducts() {
    const container = document.getElementById('top-products');
    if (!container) return;
    
    // Simular datos de ventas (en un sistema real, esto vendría de la base de datos)
    const topProducts = products
        .filter(p => p.stock > 0)
        .sort((a, b) => b.price - a.price)
        .slice(0, 5);
    
    if (topProducts.length === 0) {
        container.innerHTML = '<p style="color: var(--text-light); text-align: center;">No hay datos de ventas disponibles</p>';
        return;
    }
    
    container.innerHTML = topProducts.map(product => `
        <div class="product-item">
            <div class="product-item-info">
                <div class="product-item-image">
                    ${product.image ? 
                        `<img src="${product.image}" alt="${product.name}">` : 
                        `<i class="fas fa-tools"></i>`
                    }
                </div>
                <div class="product-item-details">
                    <h4>${product.name}</h4>
                    <p>Stock: ${product.stock} unidades</p>
                </div>
            </div>
            <div class="product-item-value">$${product.price.toFixed(2)}</div>
        </div>
    `).join('');
}

function renderInactiveProducts() {
    const container = document.getElementById('inactive-products');
    if (!container) return;
    
    // Productos con stock bajo o sin movimiento reciente
    const inactiveProducts = products
        .filter(p => p.stock <= p.minStock || !p.image)
        .slice(0, 5);
    
    if (inactiveProducts.length === 0) {
        container.innerHTML = '<p style="color: var(--success-color); text-align: center;">✅ Todos los productos tienen actividad normal</p>';
        return;
    }
    
    container.innerHTML = inactiveProducts.map(product => `
        <div class="product-item">
            <div class="product-item-info">
                <div class="product-item-image">
                    ${product.image ? 
                        `<img src="${product.image}" alt="${product.name}">` : 
                        `<i class="fas fa-tools"></i>`
                    }
                </div>
                <div class="product-item-details">
                    <h4>${product.name}</h4>
                    <p>${product.stock <= product.minStock ? 'Stock bajo' : 'Sin imagen'}</p>
                </div>
            </div>
            <div class="product-item-value">
                <button class="btn btn-sm btn-primary" onclick="showProductDetails(${product.id})">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Sistema de historial de movimientos
function addMovementRecord(productId, type, quantity, reason, oldStock, newStock) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const movement = {
        id: Date.now(),
        productId: productId,
        productName: product.name,
        type: type, // 'entrada', 'salida', 'ajuste'
        quantity: quantity,
        oldStock: oldStock,
        newStock: newStock,
        reason: reason,
        date: new Date().toISOString(),
        user: getCurrentUser()?.fullName || 'Sistema'
    };
    
    // Cargar historial existente
    const savedHistory = localStorage.getItem('powertools_movement_history');
    if (savedHistory) {
        movementHistory = JSON.parse(savedHistory);
    }
    
    movementHistory.unshift(movement);
    
    // Mantener solo los últimos 1000 movimientos
    if (movementHistory.length > 1000) {
        movementHistory = movementHistory.slice(0, 1000);
    }
    
    // Guardar en localStorage
    localStorage.setItem('powertools_movement_history', JSON.stringify(movementHistory));
    
    // Actualizar vista si está visible
    renderMovementHistory();
}

function renderMovementHistory() {
    const container = document.getElementById('movement-history');
    if (!container) return;
    
    // Cargar historial si no está cargado
    if (movementHistory.length === 0) {
        const savedHistory = localStorage.getItem('powertools_movement_history');
        if (savedHistory) {
            movementHistory = JSON.parse(savedHistory);
        }
    }
    
    // Filtrar por tipo si hay filtro activo
    const filter = document.getElementById('movement-filter')?.value || '';
    const filteredHistory = filter ? 
        movementHistory.filter(m => m.type === filter) : 
        movementHistory;
    
    const recentMovements = filteredHistory.slice(0, 50); // Mostrar últimos 50
    
    if (recentMovements.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-light);">
                <i class="fas fa-history fa-3x" style="margin-bottom: 1rem;"></i>
                <h3>No hay movimientos registrados</h3>
                <p>Los movimientos de inventario aparecerán aquí</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <table class="history-table">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Producto</th>
                    <th>Tipo</th>
                    <th>Cantidad</th>
                    <th>Stock Anterior</th>
                    <th>Stock Nuevo</th>
                    <th>Motivo</th>
                    <th>Usuario</th>
                </tr>
            </thead>
            <tbody>
                ${recentMovements.map(movement => {
                    const date = new Date(movement.date);
                    const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
                    
                    return `
                        <tr>
                            <td>${formattedDate}</td>
                            <td>${movement.productName}</td>
                            <td><span class="movement-type ${movement.type}">${movement.type}</span></td>
                            <td>${movement.quantity > 0 ? '+' : ''}${movement.quantity}</td>
                            <td>${movement.oldStock}</td>
                            <td>${movement.newStock}</td>
                            <td>${movement.reason}</td>
                            <td>${movement.user}</td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
    
    // Configurar filtro si no está configurado
    const filterSelect = document.getElementById('movement-filter');
    if (filterSelect && !filterSelect.onchange) {
        filterSelect.onchange = renderMovementHistory;
    }
}

function exportMovementHistory() {
    // Cargar historial completo
    const savedHistory = localStorage.getItem('powertools_movement_history');
    const history = savedHistory ? JSON.parse(savedHistory) : [];
    
    if (history.length === 0) {
        showNotification('No hay movimientos para exportar', 'warning');
        return;
    }
    
    // Crear CSV
    const headers = ['Fecha', 'Producto', 'Tipo', 'Cantidad', 'Stock Anterior', 'Stock Nuevo', 'Motivo', 'Usuario'];
    const csvContent = [
        headers.join(','),
        ...history.map(movement => {
            const date = new Date(movement.date);
            const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
            
            return [
                `"${formattedDate}"`,
                `"${movement.productName}"`,
                `"${movement.type}"`,
                movement.quantity,
                movement.oldStock,
                movement.newStock,
                `"${movement.reason}"`,
                `"${movement.user}"`
            ].join(',');
        })
    ].join('\n');
    
    // Descargar archivo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `historial_movimientos_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Historial exportado exitosamente', 'success');
}

function getCurrentUser() {
    const userData = localStorage.getItem('powertools_session');
    if (!userData) return null;
    
    const session = JSON.parse(userData);
    return session.user;
}

// Funciones de cotizaciones
function renderQuotations() {
    console.log('📋 Renderizando cotizaciones...');
    loadQuotationsData();
    displayQuotations();
}

function loadQuotationsData() {
    console.log('🔄 Cargando datos de cotizaciones...');
    const savedQuotations = localStorage.getItem('quotations');
    if (savedQuotations) {
        quotations = JSON.parse(savedQuotations);
        console.log('✅ Cotizaciones cargadas del localStorage:', quotations.length);
    } else {
        // Si no hay cotizaciones guardadas, cargar datos de muestra
        quotations = [...sampleQuotations];
        localStorage.setItem('quotations', JSON.stringify(quotations));
        console.log('📝 Cargados datos de muestra de cotizaciones:', quotations.length);
    }
}

function displayQuotations() {
    const container = document.getElementById('quotations-grid');
    if (!container) return;
    
    console.log('📋 Mostrando cotizaciones. Total:', quotations.length);
    quotations.forEach((q, i) => {
        console.log(`📄 Cotización ${i + 1}: ID=${q.id} (${typeof q.id}), Número=${q.number}, Estado=${q.status}`);
    });
    
    if (quotations.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-file-alt fa-3x"></i>
                <h3>No hay cotizaciones</h3>
                <p>Crea tu primera cotización para comenzar</p>
                <button class="btn btn-primary" onclick="openQuotationModal()">
                    <i class="fas fa-plus"></i> Nueva Cotización
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = quotations.map(quotation => `
        <div class="quotation-card ${quotation.status}">
            <div class="document-header">
                <div class="document-number">${quotation.number}</div>
                <span class="document-status status-${quotation.status}">${getStatusText(quotation.status)}</span>
            </div>
            
            <div class="client-info">
                <div class="client-name">${quotation.clientName}</div>
                <div class="client-details">${quotation.clientEmail}</div>
            </div>
            
            <div class="document-summary">
                <div class="summary-item">
                    <div class="summary-label">Items</div>
                    <div class="summary-value">${quotation.items.length}</div>
                </div>
                <div class="summary-item">
                    <div class="summary-label">Total</div>
                    <div class="summary-value summary-total">$${quotation.total.toFixed(2)}</div>
                </div>
            </div>
            
            <div class="document-dates">
                <span>Creada: ${new Date(quotation.createdAt).toLocaleDateString()}</span>
                <span>Válida hasta: ${new Date(quotation.validUntil).toLocaleDateString()}</span>
            </div>
            
            <div class="document-actions">
                <button class="btn btn-info btn-sm" onclick="viewQuotation('${quotation.id}')">
                    <i class="fas fa-eye"></i> Ver
                </button>
                ${canEditDocuments() ? `
                    <button class="btn btn-primary btn-sm" onclick="editQuotation('${quotation.id}')">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                ` : ''}
                ${quotation.status === 'aceptada' || quotation.status === 'borrador' || quotation.status === 'enviada' ? `
                    <button class="btn btn-success btn-sm" onclick="convertToInvoice('${quotation.id}')">
                        <i class="fas fa-file-invoice"></i> Facturar
                    </button>
                ` : ''}
                <button class="btn btn-warning btn-sm" onclick="duplicateQuotation('${quotation.id}')">
                    <i class="fas fa-copy"></i> Duplicar
                </button>
                <button class="btn btn-warning btn-sm" onclick="shareQuotationNew('${quotation.id}'); console.log('🔄 Botón compartir clickeado para cotización:', '${quotation.id}')">
                    <i class="fas fa-share"></i> Compartir
                </button>
            </div>
        </div>
    `).join('');
}

// Funciones de facturas
function renderSales() {
    console.log('💰 Renderizando facturas...');
    loadInvoices();
    displayInvoices();
}

function loadInvoices() {
    const savedInvoices = localStorage.getItem('powertools_invoices');
    if (savedInvoices) {
        invoices = JSON.parse(savedInvoices);
    } else {
        invoices = [...sampleInvoices];
        localStorage.setItem('powertools_invoices', JSON.stringify(invoices));
    }
}

function displayInvoices() {
    const container = document.getElementById('invoices-grid');
    if (!container) return;
    
    if (invoices.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-file-invoice fa-3x"></i>
                <h3>No hay facturas</h3>
                <p>Crea tu primera factura para comenzar</p>
                <button class="btn btn-primary" onclick="openInvoiceModal()">
                    <i class="fas fa-plus"></i> Nueva Factura
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = invoices.map(invoice => `
        <div class="invoice-card ${invoice.status}">
            <div class="document-header">
                <div class="document-number">${invoice.number}</div>
                <span class="document-status status-${invoice.status}">${getInvoiceStatusText(invoice.status)}</span>
            </div>
            
            <div class="client-info">
                <div class="client-name">${invoice.clientName}</div>
                <div class="client-details">${invoice.clientEmail}</div>
                ${invoice.quotationId ? `<div class="client-details">De cotización: COT-2025-${String(invoice.quotationId).padStart(3, '0')}</div>` : ''}
            </div>
            
            <div class="document-summary">
                <div class="summary-item">
                    <div class="summary-label">Items</div>
                    <div class="summary-value">${invoice.items.length}</div>
                </div>
                <div class="summary-item">
                    <div class="summary-label">Total</div>
                    <div class="summary-value summary-total">$${invoice.total.toFixed(2)}</div>
                </div>
            </div>
            
            <div class="document-dates">
                <span>Creada: ${new Date(invoice.createdAt).toLocaleDateString()}</span>
                <span>${invoice.status === 'pagada' ? 'Pagada:' : 'Vence:'} ${new Date(invoice.paidDate || invoice.dueDate).toLocaleDateString()}</span>
            </div>
            
            <div class="document-actions">
                <button class="btn btn-info btn-sm" onclick="viewInvoice(${invoice.id})">
                    <i class="fas fa-eye"></i> Ver
                </button>
                ${canEditDocuments() ? `
                    <button class="btn btn-primary btn-sm" onclick="editInvoice(${invoice.id})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                ` : ''}
                ${invoice.status !== 'pagada' ? `
                    <button class="btn btn-success btn-sm" onclick="markAsPaid(${invoice.id})">
                        <i class="fas fa-check"></i> Marcar Pagada
                    </button>
                ` : ''}
                <button class="btn btn-secondary btn-sm" onclick="duplicateInvoice(${invoice.id})">
                    <i class="fas fa-copy"></i> Duplicar
                </button>
                <button class="btn btn-warning btn-sm" onclick="shareInvoice(${invoice.id})">
                    <i class="fas fa-share"></i> Compartir
                </button>
            </div>
        </div>
    `).join('');
}

function getStatusText(status) {
    const statusMap = {
        'borrador': 'Borrador',
        'enviada': 'Enviada',
        'aceptada': 'Aceptada',
        'rechazada': 'Rechazada',
        'vencida': 'Vencida'
    };
    return statusMap[status] || status;
}

function getInvoiceStatusText(status) {
    const statusMap = {
        'borrador': 'Borrador',
        'enviada': 'Enviada',
        'pagada': 'Pagada',
        'vencida': 'Vencida'
    };
    return statusMap[status] || status;
}

function canEditDocuments() {
    const userData = localStorage.getItem('powertools_session');
    if (!userData) return false;
    
    const session = JSON.parse(userData);
    return session.user && ['admin', 'empleado'].includes(session.user.role);
}

// Modal de cotización
function openQuotationModal(quotationId = null) {
    const quotation = quotationId ? quotations.find(q => q.id === quotationId) : null;
    const isEdit = !!quotation;
    
    const modalContent = `
        <div class="modal-header">
            <h2>${isEdit ? 'Editar Cotización' : 'Nueva Cotización'}</h2>
            <button class="close-modal" onclick="closeModal()">&times;</button>
        </div>
        
        <form onsubmit="saveQuotation(event, ${quotationId})" class="document-modal">
            <div class="modal-section">
                <h3><i class="fas fa-user"></i> Información del Cliente</h3>
                <div class="client-form">
                    <div class="form-group">
                        <label>Nombre del Cliente *</label>
                        <input type="text" name="clientName" value="${quotation?.clientName || ''}" required placeholder="Nombre o empresa">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" name="clientEmail" value="${quotation?.clientEmail || ''}" placeholder="cliente@email.com">
                    </div>
                    <div class="form-group">
                        <label>Teléfono</label>
                        <input type="tel" name="clientPhone" value="${quotation?.clientPhone || ''}" placeholder="+1 (555) 123-4567">
                    </div>
                    <div class="form-group">
                        <label>Dirección</label>
                        <input type="text" name="clientAddress" value="${quotation?.clientAddress || ''}" placeholder="Dirección completa">
                    </div>
                    <div class="form-group">
                        <label>RNC (Opcional)</label>
                        <input type="text" name="clientRnc" value="${quotation?.clientRnc || ''}" placeholder="123456789" maxlength="11">
                    </div>
                </div>
            </div>
            
            <div class="modal-section">
                <h3><i class="fas fa-list"></i> Productos y Servicios</h3>
                <div class="add-product-section">
                    <div class="form-group">
                        <label>Producto</label>
                        <select id="product-select">
                            <option value="">Seleccionar producto...</option>
                            ${products.length > 0 ? 
                                products.map(p => `<option value="${p.id}">${p.name} - $${p.price.toFixed(2)} (Stock: ${p.stock})</option>`).join('') :
                                '<option value="" disabled>No hay productos disponibles - Agrega productos en Inventario</option>'
                            }
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Cantidad</label>
                        <input type="number" id="product-quantity" min="1" value="1">
                    </div>
                    <button type="button" class="btn btn-secondary" onclick="addProductToQuotation()">
                        <i class="fas fa-plus"></i> Agregar
                    </button>
                </div>
                
                <table class="items-table" id="quotation-items">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unit.</th>
                            <th>Total</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="quotation-items-body">
                        ${quotation ? renderQuotationItems(quotation.items) : ''}
                    </tbody>
                </table>
                
                <div class="totals-section">
                    <div class="tax-options">
                        <label class="checkbox-label">
                            <input type="checkbox" id="quotation-include-itbs" 
                                   ${quotation?.includeItbs ? 'checked' : ''} 
                                   onchange="updateQuotationTotals()">
                            Incluir ITBS (18%)
                        </label>
                    </div>
                    <table class="totals-table">
                        <tr>
                            <td>Subtotal:</td>
                            <td id="quotation-subtotal">$0.00</td>
                        </tr>
                        <tr id="quotation-tax-row" style="display: none;">
                            <td>ITBS (18%):</td>
                            <td id="quotation-taxes">$0.00</td>
                        </tr>
                        <tr class="total-final">
                            <td>Total:</td>
                            <td id="quotation-total">$0.00</td>
                        </tr>
                    </table>
                </div>
            </div>
            
            <div class="modal-section">
                <h3><i class="fas fa-cog"></i> Configuración</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label>Válida hasta *</label>
                        <input type="date" name="validUntil" value="${quotation?.validUntil || getDefaultValidDate()}" required>
                    </div>
                    <div class="form-group">
                        <label>Estado</label>
                        <select name="status" ${!isEdit ? 'disabled' : ''}>
                            <option value="borrador" ${quotation?.status === 'borrador' ? 'selected' : ''}>Borrador</option>
                            <option value="enviada" ${quotation?.status === 'enviada' ? 'selected' : ''}>Enviada</option>
                            <option value="aceptada" ${quotation?.status === 'aceptada' ? 'selected' : ''}>Aceptada</option>
                            <option value="rechazada" ${quotation?.status === 'rechazada' ? 'selected' : ''}>Rechazada</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-save"></i> ${isEdit ? 'Actualizar Cotización' : 'Guardar Cotización'}
                </button>
            </div>
        </form>
    `;
    
    showModal(modalContent);
    
    // Debugging: verificar productos cargados
    console.log('Productos disponibles para cotización:', products);
    
    // Inicializar variables globales para el modal
    window.currentQuotationItems = quotation ? [...quotation.items] : [];
    updateQuotationTotals();
}

// Modal de factura
function openInvoiceModal(invoiceId = null) {
    const invoice = invoiceId ? invoices.find(i => i.id === invoiceId) : null;
    const isEdit = !!invoice;
    
    const modalContent = `
        <div class="modal-header">
            <h2>${isEdit ? 'Editar Factura' : 'Nueva Factura'}</h2>
            <button class="close-modal" onclick="closeModal()">&times;</button>
        </div>
        
        <form onsubmit="saveInvoice(event, ${invoiceId})" class="document-modal">
            <div class="modal-section">
                <h3><i class="fas fa-user"></i> Información del Cliente</h3>
                <div class="client-form">
                    <div class="form-group">
                        <label>Nombre del Cliente *</label>
                        <input type="text" name="clientName" value="${invoice?.clientName || ''}" required placeholder="Nombre o empresa">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" name="clientEmail" value="${invoice?.clientEmail || ''}" placeholder="cliente@email.com">
                    </div>
                    <div class="form-group">
                        <label>Teléfono</label>
                        <input type="tel" name="clientPhone" value="${invoice?.clientPhone || ''}" placeholder="+1 (555) 123-4567">
                    </div>
                    <div class="form-group">
                        <label>Dirección</label>
                        <input type="text" name="clientAddress" value="${invoice?.clientAddress || ''}" placeholder="Dirección completa">
                    </div>
                    <div class="form-group">
                        <label>RNC (Factura Formal)</label>
                        <input type="text" name="clientRnc" value="${invoice?.clientRnc || ''}" 
                               placeholder="123456789" maxlength="11" 
                               onchange="checkRncForItbs('invoice')">
                    </div>
                </div>
            </div>
            
            <div class="modal-section">
                <h3><i class="fas fa-list"></i> Productos y Servicios</h3>
                <div class="add-product-section">
                    <div class="form-group">
                        <label>Producto</label>
                        <select id="invoice-product-select">
                            <option value="">Seleccionar producto...</option>
                            ${products.length > 0 ? 
                                products.map(p => `<option value="${p.id}">${p.name} - $${p.price.toFixed(2)} (Stock: ${p.stock})</option>`).join('') :
                                '<option value="" disabled>No hay productos disponibles - Agrega productos en Inventario</option>'
                            }
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Cantidad</label>
                        <input type="number" id="invoice-product-quantity" min="1" value="1">
                    </div>
                    <button type="button" class="btn btn-secondary" onclick="addProductToInvoice()">
                        <i class="fas fa-plus"></i> Agregar
                    </button>
                </div>
                
                <table class="items-table" id="invoice-items">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unit.</th>
                            <th>Total</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="invoice-items-body">
                        ${invoice ? renderInvoiceItems(invoice.items) : ''}
                    </tbody>
                </table>
                
                <div class="totals-section">
                    <div class="tax-options">
                        <label class="checkbox-label">
                            <input type="checkbox" id="invoice-include-itbs" 
                                   ${invoice?.includeItbs ? 'checked' : ''} 
                                   onchange="updateInvoiceTotals()">
                            Incluir ITBS (18%)
                        </label>
                        <p class="tax-note">
                            <i class="fas fa-info-circle"></i>
                            El ITBS es requerido para facturas formales con RNC
                        </p>
                    </div>
                    <table class="totals-table">
                        <tr>
                            <td>Subtotal:</td>
                            <td id="invoice-subtotal">$0.00</td>
                        </tr>
                        <tr id="invoice-tax-row" style="display: none;">
                            <td>ITBS (18%):</td>
                            <td id="invoice-taxes">$0.00</td>
                        </tr>
                        <tr class="total-final">
                            <td>Total:</td>
                            <td id="invoice-total">$0.00</td>
                        </tr>
                    </table>
                </div>
            </div>
            
            <div class="modal-section">
                <h3><i class="fas fa-cog"></i> Configuración</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label>Fecha de vencimiento *</label>
                        <input type="date" name="dueDate" value="${invoice?.dueDate || getDefaultDueDate()}" required>
                    </div>
                    <div class="form-group">
                        <label>Método de pago</label>
                        <select name="paymentMethod">
                            <option value="efectivo" ${invoice?.paymentMethod === 'efectivo' ? 'selected' : ''}>Efectivo</option>
                            <option value="tarjeta" ${invoice?.paymentMethod === 'tarjeta' ? 'selected' : ''}>Tarjeta</option>
                            <option value="transferencia" ${invoice?.paymentMethod === 'transferencia' ? 'selected' : ''}>Transferencia</option>
                            <option value="credito" ${invoice?.paymentMethod === 'credito' ? 'selected' : ''}>Crédito</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Estado</label>
                        <select name="status" ${!isEdit ? 'disabled' : ''}>
                            <option value="borrador" ${invoice?.status === 'borrador' ? 'selected' : ''}>Borrador</option>
                            <option value="enviada" ${invoice?.status === 'enviada' ? 'selected' : ''}>Enviada</option>
                            <option value="pagada" ${invoice?.status === 'pagada' ? 'selected' : ''}>Pagada</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-save"></i> ${isEdit ? 'Actualizar Factura' : 'Guardar Factura'}
                </button>
            </div>
        </form>
    `;
    
    showModal(modalContent);
    
    // Inicializar variables globales para el modal
    window.currentInvoiceItems = invoice ? [...invoice.items] : [];
    updateInvoiceTotals();
}

// Funciones auxiliares para fechas
function getDefaultValidDate() {
    const date = new Date();
    date.setDate(date.getDate() + 30); // 30 días válida
    return date.toISOString().split('T')[0];
}

function getDefaultDueDate() {
    const date = new Date();
    date.setDate(date.getDate() + 15); // 15 días para pagar
    return date.toISOString().split('T')[0];
}

// Funciones para manejar productos en cotizaciones
function addProductToQuotation() {
    const productSelect = document.getElementById('product-select');
    const quantityInput = document.getElementById('product-quantity');
    
    const productId = productSelect.value;
    const quantity = parseInt(quantityInput.value);
    
    if (!productId || quantity <= 0) {
        if (products.length === 0) {
            alert('No hay productos disponibles. Por favor, agrega productos en la sección de Inventario primero.');
        } else {
            alert('Por favor selecciona un producto y cantidad válida');
        }
        return;
    }
    
    const product = products.find(p => p.id == productId); // Usar == para comparar string y number
    if (!product) {
        alert('Producto no encontrado');
        console.log('Producto buscado ID:', productId, 'Productos disponibles:', products.map(p => ({id: p.id, name: p.name})));
        return;
    }
    
    // Verificar si el producto ya está en la lista
    const existingItemIndex = window.currentQuotationItems.findIndex(item => item.productId == productId);
    
    if (existingItemIndex >= 0) {
        // Actualizar cantidad existente
        window.currentQuotationItems[existingItemIndex].quantity += quantity;
        window.currentQuotationItems[existingItemIndex].total = window.currentQuotationItems[existingItemIndex].unitPrice * window.currentQuotationItems[existingItemIndex].quantity;
    } else {
        // Agregar nuevo producto
        const newItem = {
            id: Date.now().toString(),
            productId: productId,
            productName: product.name,
            quantity: quantity,
            unitPrice: product.price,
            total: product.price * quantity
        };
        window.currentQuotationItems.push(newItem);
    }
    
    // Limpiar campos
    productSelect.value = '';
    quantityInput.value = '1';
    
    renderQuotationItems();
    updateQuotationTotals();
}

function removeProductFromQuotation(itemId) {
    window.currentQuotationItems = window.currentQuotationItems.filter(item => item.id !== itemId);
    renderQuotationItems();
    updateQuotationTotals();
}

function updateQuotationItemQuantity(itemId, newQuantity) {
    const item = window.currentQuotationItems.find(item => item.id === itemId);
    if (item && newQuantity > 0) {
        item.quantity = newQuantity;
        item.total = item.unitPrice * newQuantity;
        renderQuotationItems();
        updateQuotationTotals();
    }
}

function renderQuotationItems(items = null) {
    const itemsToRender = items || window.currentQuotationItems || [];
    const tbody = document.getElementById('quotation-items-body');
    
    if (!tbody) return '';
    
    tbody.innerHTML = itemsToRender.map(item => `
        <tr>
            <td>${item.productName}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" 
                       onchange="updateQuotationItemQuantity('${item.id}', this.value)"
                       style="width: 60px;">
            </td>
            <td>$${item.unitPrice.toFixed(2)}</td>
            <td>$${item.total.toFixed(2)}</td>
            <td>
                <button type="button" class="btn btn-danger btn-small" 
                        onclick="removeProductFromQuotation('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    return tbody.innerHTML;
}

function updateQuotationTotals() {
    const items = window.currentQuotationItems || [];
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    
    // Verificar si incluir ITBS
    const includeItbsCheckbox = document.getElementById('quotation-include-itbs');
    const includeItbs = includeItbsCheckbox ? includeItbsCheckbox.checked : false;
    
    const taxes = includeItbs ? subtotal * 0.18 : 0; // 18% ITBS
    const total = subtotal + taxes;
    
    const subtotalEl = document.getElementById('quotation-subtotal');
    const taxesEl = document.getElementById('quotation-taxes');
    const totalEl = document.getElementById('quotation-total');
    const taxRowEl = document.getElementById('quotation-tax-row');
    
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (taxesEl) taxesEl.textContent = `$${taxes.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
    
    // Mostrar/ocultar fila de impuestos
    if (taxRowEl) {
        taxRowEl.style.display = includeItbs ? 'table-row' : 'none';
    }
}

// Funciones para manejar productos en facturas
function addProductToInvoice() {
    const productSelect = document.getElementById('invoice-product-select');
    const quantityInput = document.getElementById('invoice-product-quantity');
    
    const productId = productSelect.value;
    const quantity = parseInt(quantityInput.value);
    
    if (!productId || quantity <= 0) {
        if (products.length === 0) {
            alert('No hay productos disponibles. Por favor, agrega productos en la sección de Inventario primero.');
        } else {
            alert('Por favor selecciona un producto y cantidad válida');
        }
        return;
    }
    
    const product = products.find(p => p.id == productId); // Usar == para comparar string y number
    if (!product) {
        alert('Producto no encontrado');
        console.log('Producto buscado ID:', productId, 'Productos disponibles:', products.map(p => ({id: p.id, name: p.name})));
        return;
    }
    
    // Verificar stock disponible
    if (quantity > product.stock) {
        alert(`Stock insuficiente. Disponible: ${product.stock}`);
        return;
    }
    
    // Verificar si el producto ya está en la lista
    const existingItemIndex = window.currentInvoiceItems.findIndex(item => item.productId == productId);
    
    if (existingItemIndex >= 0) {
        const newQuantity = window.currentInvoiceItems[existingItemIndex].quantity + quantity;
        if (newQuantity > product.stock) {
            alert(`Stock insuficiente. Disponible: ${product.stock}`);
            return;
        }
        window.currentInvoiceItems[existingItemIndex].quantity = newQuantity;
        window.currentInvoiceItems[existingItemIndex].total = product.price * newQuantity;
    } else {
        // Agregar nuevo producto
        const newItem = {
            id: Date.now().toString(),
            productId: productId,
            productName: product.name,
            quantity: quantity,
            unitPrice: product.price,
            total: product.price * quantity
        };
        window.currentInvoiceItems.push(newItem);
    }
    
    // Limpiar campos
    productSelect.value = '';
    quantityInput.value = '1';
    
    renderInvoiceItems();
    updateInvoiceTotals();
}

function removeProductFromInvoice(itemId) {
    window.currentInvoiceItems = window.currentInvoiceItems.filter(item => item.id !== itemId);
    renderInvoiceItems();
    updateInvoiceTotals();
}

function updateInvoiceItemQuantity(itemId, newQuantity) {
    const item = window.currentInvoiceItems.find(item => item.id === itemId);
    if (item && newQuantity > 0) {
        const product = products.find(p => p.id === item.productId);
        if (newQuantity > product.stock) {
            alert(`Stock insuficiente. Disponible: ${product.stock}`);
            return;
        }
        item.quantity = newQuantity;
        item.total = item.unitPrice * newQuantity;
        renderInvoiceItems();
        updateInvoiceTotals();
    }
}

function renderInvoiceItems(items = null) {
    const itemsToRender = items || window.currentInvoiceItems || [];
    const tbody = document.getElementById('invoice-items-body');
    
    if (!tbody) return '';
    
    tbody.innerHTML = itemsToRender.map(item => `
        <tr>
            <td>${item.productName}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" 
                       onchange="updateInvoiceItemQuantity('${item.id}', this.value)"
                       style="width: 60px;">
            </td>
            <td>$${item.unitPrice.toFixed(2)}</td>
            <td>$${item.total.toFixed(2)}</td>
            <td>
                <button type="button" class="btn btn-danger btn-small" 
                        onclick="removeProductFromInvoice('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    return tbody.innerHTML;
}

function updateInvoiceTotals() {
    const items = window.currentInvoiceItems || [];
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    
    // Verificar si incluir ITBS
    const includeItbsCheckbox = document.getElementById('invoice-include-itbs');
    const includeItbs = includeItbsCheckbox ? includeItbsCheckbox.checked : false;
    
    const taxes = includeItbs ? subtotal * 0.18 : 0; // 18% ITBS
    const total = subtotal + taxes;
    
    const subtotalEl = document.getElementById('invoice-subtotal');
    const taxesEl = document.getElementById('invoice-taxes');
    const totalEl = document.getElementById('invoice-total');
    const taxRowEl = document.getElementById('invoice-tax-row');
    
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (taxesEl) taxesEl.textContent = `$${taxes.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
    
    // Mostrar/ocultar fila de impuestos
    if (taxRowEl) {
        taxRowEl.style.display = includeItbs ? 'table-row' : 'none';
    }
}

// Nueva función para compartir cotizaciones que funcione
function shareQuotationNew(quotationId) {
    console.log('🚀 shareQuotationNew llamada con ID:', quotationId);
    console.log('🚀 Tipo de quotationId:', typeof quotationId, quotationId);
    
    try {
        // Convertir a string si es necesario para la comparación
        const quotationIdStr = String(quotationId);
        console.log('🔍 Buscando cotización con ID string:', quotationIdStr);
        console.log('📋 Total cotizaciones disponibles:', quotations.length);
        console.log('📋 IDs de cotizaciones:', quotations.map(q => `${q.id} (${typeof q.id})`));
        
        const quotation = quotations.find(q => String(q.id) === quotationIdStr);
        if (!quotation) {
            console.error('❌ Cotización no encontrada para ID:', quotationId);
            console.log('❌ Cotizaciones disponibles:', quotations.map(q => ({id: q.id, number: q.number})));
            alert('Cotización no encontrada');
            return;
        }
        
        console.log('✅ Cotización encontrada:', quotation.number);
        
        // Crear texto para compartir
        const shareText = `PowerTools - Cotización ${quotation.number}

Cliente: ${quotation.clientName}
Fecha: ${formatDate(quotation.createdAt)}
Válida hasta: ${formatDate(quotation.validUntil)}

Productos:
${quotation.items.map(item => 
    `• ${item.productName} - Cantidad: ${item.quantity} - $${item.total.toFixed(2)}`
).join('\n')}

Subtotal: $${quotation.subtotal.toFixed(2)}
${quotation.includeItbs ? `ITBS (18%): $${quotation.taxes.toFixed(2)}\n` : ''}Total: $${quotation.total.toFixed(2)}

Estado: ${getStatusText(quotation.status)}`;
        
        console.log('📋 Texto creado, longitud:', shareText.length);
        console.log('🎯 Llamando a showShareModal...');
        
        // Verificar que la función existe
        if (typeof showShareModal === 'function') {
            console.log('✅ showShareModal existe, ejecutando...');
            showShareModal(shareText);
        } else {
            console.error('❌ showShareModal no está definida!');
            alert('Error: función de compartir no disponible');
        }
        
    } catch (error) {
        console.error('❌ Error en shareQuotationNew:', error);
        console.error('❌ Stack trace:', error.stack);
        alert('Error al preparar la cotización para compartir: ' + error.message);
    }
}

// Guardar cotización
function saveQuotation(event, quotationId = null) {
    event.preventDefault();
    console.log('🔄 Intentando guardar cotización...');
    
    if (!window.currentQuotationItems || window.currentQuotationItems.length === 0) {
        alert('Por favor agrega al menos un producto a la cotización');
        console.log('❌ Error: No hay productos en la cotización');
        return;
    }
    
    try {
        const formData = new FormData(event.target);
        const subtotal = window.currentQuotationItems.reduce((sum, item) => sum + item.total, 0);
        const includeItbs = document.getElementById('quotation-include-itbs').checked;
        const taxes = includeItbs ? subtotal * 0.18 : 0;
        
        // Obtener sesión actual
        const session = JSON.parse(localStorage.getItem('powertools_session'));
        
        const quotationData = {
            id: quotationId || Date.now().toString(),
            number: quotationId ? quotations.find(q => q.id === quotationId).number : generateQuotationNumber(),
            clientName: formData.get('clientName'),
            clientEmail: formData.get('clientEmail'),
            clientPhone: formData.get('clientPhone'),
            clientAddress: formData.get('clientAddress'),
            clientRnc: formData.get('clientRnc'),
            items: [...window.currentQuotationItems],
            subtotal: subtotal,
            taxes: taxes,
            total: subtotal + taxes,
            includeItbs: includeItbs,
            validUntil: formData.get('validUntil'),
            status: formData.get('status') || 'borrador',
            createdAt: quotationId ? quotations.find(q => q.id === quotationId).createdAt : new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: session?.user?.id || 'system'
        };
        
        console.log('📄 Datos de cotización a guardar:', quotationData);
        
        if (quotationId) {
            // Actualizar cotización existente
            const index = quotations.findIndex(q => q.id === quotationId);
            if (index !== -1) {
                quotations[index] = quotationData;
                console.log('✅ Cotización actualizada en índice:', index);
            }
        } else {
            // Nueva cotización
            quotations.push(quotationData);
            console.log('✅ Nueva cotización agregada. Total cotizaciones:', quotations.length);
        }
        
        localStorage.setItem('quotations', JSON.stringify(quotations));
        console.log('💾 Cotizaciones guardadas en localStorage');
        console.log('📊 Total cotizaciones después de guardar:', quotations.length);
        console.log('🔍 Verificando localStorage...');
        const verificacion = JSON.parse(localStorage.getItem('quotations'));
        console.log('✅ Cotizaciones en localStorage después de guardar:', verificacion.length);
        
        // Actualizar la vista de cotizaciones
        if (document.getElementById('quotations-list') || document.getElementById('quotations-grid')) {
            console.log('🔄 Actualizando vista de cotizaciones...');
            renderQuotations(); // Usar la función correcta que maneja todo
            console.log('✅ Vista de cotizaciones actualizada');
        }
        
        closeModal();
        
        showNotification(quotationId ? 'Cotización actualizada correctamente' : 'Cotización creada correctamente', 'success');
        console.log('✅ Proceso de guardado completado exitosamente');
        
    } catch (error) {
        console.error('❌ Error al guardar cotización:', error);
        alert('Error al guardar la cotización: ' + error.message);
    }
}

// Generar números de documentos
function generateQuotationNumber() {
    const count = quotations.length + 1;
    return `COT-${new Date().getFullYear()}-${count.toString().padStart(4, '0')}`;
}

function generateInvoiceNumber() {
    const count = invoices.length + 1;
    return `FAC-${new Date().getFullYear()}-${count.toString().padStart(4, '0')}`;
}

// Funciones para gestión de cotizaciones

// Ver detalles de cotización
function viewQuotation(quotationId) {
    const quotation = quotations.find(q => q.id == quotationId);
    if (!quotation) {
        alert('Cotización no encontrada');
        return;
    }
    
    const modalContent = `
        <div class="modal-header">
            <h2>Detalles de Cotización ${quotation.number}</h2>
            <button class="close-modal" onclick="closeModal()">&times;</button>
        </div>
        
        <div class="document-details">
            <div class="detail-section">
                <h3><i class="fas fa-info-circle"></i> Información General</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Número:</label>
                        <span>${quotation.number}</span>
                    </div>
                    <div class="detail-item">
                        <label>Estado:</label>
                        <span class="status-badge status-${quotation.status}">${getStatusText(quotation.status)}</span>
                    </div>
                    <div class="detail-item">
                        <label>Fecha de creación:</label>
                        <span>${formatDate(quotation.createdAt)}</span>
                    </div>
                    <div class="detail-item">
                        <label>Válida hasta:</label>
                        <span>${formatDate(quotation.validUntil)}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3><i class="fas fa-user"></i> Cliente</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Nombre:</label>
                        <span>${quotation.clientName}</span>
                    </div>
                    <div class="detail-item">
                        <label>Email:</label>
                        <span>${quotation.clientEmail || 'No especificado'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Teléfono:</label>
                        <span>${quotation.clientPhone || 'No especificado'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Dirección:</label>
                        <span>${quotation.clientAddress || 'No especificada'}</span>
                    </div>
                    ${quotation.clientRnc ? `
                        <div class="detail-item">
                            <label>RNC:</label>
                            <span>${quotation.clientRnc}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
            
            <div class="detail-section">
                <h3><i class="fas fa-list"></i> Productos y Servicios</h3>
                <table class="detail-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unit.</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${quotation.items.map(item => `
                            <tr>
                                <td>${item.productName}</td>
                                <td>${item.quantity}</td>
                                <td>$${item.unitPrice.toFixed(2)}</td>
                                <td>$${item.total.toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <div class="detail-section">
                <h3><i class="fas fa-calculator"></i> Totales</h3>
                <table class="totals-table">
                    <tr>
                        <td>Subtotal:</td>
                        <td>$${quotation.subtotal.toFixed(2)}</td>
                    </tr>
                    ${quotation.includeItbs ? `
                        <tr>
                            <td>ITBS (18%):</td>
                            <td>$${quotation.taxes.toFixed(2)}</td>
                        </tr>
                    ` : ''}
                    <tr class="total-final">
                        <td>Total:</td>
                        <td>$${quotation.total.toFixed(2)}</td>
                    </tr>
                </table>
            </div>
        </div>
        
        <div class="form-actions">
            <button type="button" class="btn btn-secondary" onclick="closeModal()">Cerrar</button>
            <button type="button" class="btn btn-primary" onclick="closeModal(); openQuotationModal(${quotation.id})">
                <i class="fas fa-edit"></i> Editar
            </button>
            <button type="button" class="btn btn-info" onclick="shareQuotationNew(${quotation.id})">
                <i class="fas fa-share"></i> Compartir
            </button>
            <button type="button" class="btn btn-warning" onclick="duplicateQuotation(${quotation.id})">
                <i class="fas fa-copy"></i> Duplicar
            </button>
        </div>
    `;
    
    showModal(modalContent);
}

// Editar cotización
function editQuotation(quotationId) {
    openQuotationModal(quotationId);
}

// Duplicar cotización
function duplicateQuotation(quotationId) {
    const quotation = quotations.find(q => q.id == quotationId);
    if (!quotation) {
        alert('Cotización no encontrada');
        return;
    }
    
    // Crear nueva cotización basada en la existente
    const newQuotation = {
        ...quotation,
        id: Date.now().toString(),
        number: generateQuotationNumber(),
        status: 'borrador',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        validUntil: getDefaultValidDate()
    };
    
    quotations.push(newQuotation);
    localStorage.setItem('quotations', JSON.stringify(quotations));
    
    // Actualizar vista
    renderQuotations();
    
    showNotification(`Cotización duplicada como ${newQuotation.number}`, 'success');
}

// Compartir cotización (versión simplificada y robusta)
function shareQuotation(quotationId) {
    console.log('🚀 shareQuotation llamada con ID:', quotationId);
    
    try {
        const quotation = quotations.find(q => q.id == quotationId);
        if (!quotation) {
            console.error('❌ Cotización no encontrada para ID:', quotationId);
            alert('Cotización no encontrada');
            return;
        }
        
        console.log('✅ Cotización encontrada:', quotation.number);
        
        // Crear texto para compartir
        const shareText = `PowerTools - Cotización ${quotation.number}

Cliente: ${quotation.clientName}
Fecha: ${formatDate(quotation.createdAt)}
Válida hasta: ${formatDate(quotation.validUntil)}

Productos:
${quotation.items.map(item => 
    `• ${item.productName} - Cantidad: ${item.quantity} - $${item.total.toFixed(2)}`
).join('\n')}

Subtotal: $${quotation.subtotal.toFixed(2)}
${quotation.includeItbs ? `ITBS (18%): $${quotation.taxes.toFixed(2)}\n` : ''}Total: $${quotation.total.toFixed(2)}

Estado: ${getStatusText(quotation.status)}`;
        
        console.log('� Texto creado, longitud:', shareText.length);
        
        // Usar método directo para mostrar modal
        showShareModal(shareText);
        
    } catch (error) {
        console.error('❌ Error en shareQuotation:', error);
        alert('Error al preparar la cotización para compartir: ' + error.message);
    }
}

// Función de respaldo para compartir
function fallbackShare(text) {
    console.log('📄 Iniciando fallbackShare...');
    console.log('📄 Texto a compartir:', text.substring(0, 100) + '...');
    
    try {
        // Primero, intentar cerrar cualquier modal existente
        if (window.currentModal) {
            console.log('🔄 Cerrando modal existente...');
            closeModal();
        }
        
        // Esperar un momento antes de abrir el nuevo modal
        setTimeout(() => {
            console.log('📄 Creando contenido del modal...');
            
            const modalContent = `
                <div class="modal-header">
                    <h2><i class="fas fa-share"></i> Compartir Cotización</h2>
                    <button class="close-modal" onclick="closeModal()">&times;</button>
                </div>
                <div style="padding: 20px;">
                    <p style="margin-bottom: 15px;">
                        <strong>Opciones para compartir:</strong>
                    </p>
                    
                    <div style="margin-bottom: 20px;">
                        <button onclick="copyToClipboardFromModal()" class="btn btn-primary" style="margin-right: 10px;">
                            <i class="fas fa-copy"></i> Copiar al Portapapeles
                        </button>
                        <button onclick="downloadAsText()" class="btn btn-secondary">
                            <i class="fas fa-download"></i> Descargar como Archivo
                        </button>
                    </div>
                    
                    <p style="margin-bottom: 10px; font-weight: bold;">Contenido:</p>
                    <textarea id="share-content" readonly style="width: 100%; height: 300px; font-family: monospace; padding: 10px; border: 1px solid #ddd; border-radius: 4px; resize: vertical;">${text}</textarea>
                    
                    <p style="margin-top: 15px; font-size: 0.9em; color: #666;">
                        <i class="fas fa-info-circle"></i> 
                        Puedes seleccionar todo el texto y copiarlo manualmente, o usar los botones de arriba.
                    </p>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeModal()">Cerrar</button>
                </div>
            `;
            
            console.log('📄 Contenido del modal creado, llamando showModal...');
            showModal(modalContent);
            
            // Almacenar el texto globalmente para las funciones del modal
            window.shareText = text;
            console.log('✅ Modal debería estar visible ahora');
            
        }, 100); // Pequeño delay para asegurar que se procese
        
    } catch (error) {
        console.error('❌ Error en fallbackShare:', error);
        alert('Error al mostrar opciones de compartir: ' + error.message);
    }
}

// Función para copiar desde el modal
function copyToClipboardFromModal() {
    const textarea = document.getElementById('share-content');
    if (textarea) {
        textarea.select();
        textarea.setSelectionRange(0, 99999); // Para móviles
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showNotification('Cotización copiada al portapapeles', 'success');
                closeModal();
            } else {
                throw new Error('execCommand falló');
            }
        } catch (err) {
            console.log('Error al copiar con execCommand:', err);
            
            // Intentar con la API moderna
            if (navigator.clipboard) {
                navigator.clipboard.writeText(window.shareText).then(() => {
                    showNotification('Cotización copiada al portapapeles', 'success');
                    closeModal();
                }).catch(() => {
                    showNotification('No se pudo copiar automáticamente. Selecciona el texto y copia manualmente (Ctrl+C).', 'warning');
                });
            } else {
                showNotification('No se pudo copiar automáticamente. Selecciona el texto y copia manualmente (Ctrl+C).', 'warning');
            }
        }
    }
}

// Función para descargar como archivo de texto
function downloadAsText() {
    const text = window.shareText;
    const quotationNumber = text.match(/Cotización ([\w-]+)/)?.[1] || 'cotizacion';
    
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `cotizacion_${quotationNumber}_${new Date().toISOString().split('T')[0]}.txt`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    showNotification('Archivo descargado exitosamente', 'success');
    closeModal();
}

// Convertir a factura
function convertToInvoice(quotationId) {
    convertQuotationToInvoice(quotationId);
}

// Función auxiliar para formatear fechas
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

// Eliminar cotización
function deleteQuotation(quotationId) {
    const quotation = quotations.find(q => q.id == quotationId);
    if (!quotation) {
        alert('Cotización no encontrada');
        return;
    }
    
    if (confirm(`¿Estás seguro de que deseas eliminar la cotización ${quotation.number}?`)) {
        quotations = quotations.filter(q => q.id != quotationId);
        localStorage.setItem('quotations', JSON.stringify(quotations));
        renderQuotations();
        showNotification('Cotización eliminada correctamente', 'success');
    }
}

// Cambiar vista (grid/lista)
function toggleQuotationView() {
    const currentView = localStorage.getItem('quotations_view') || 'grid';
    const newView = currentView === 'grid' ? 'list' : 'grid';
    
    localStorage.setItem('quotations_view', newView);
    
    const container = document.getElementById('quotations-grid');
    if (container) {
        container.className = newView === 'grid' ? 'documents-grid' : 'documents-list';
    }
    
    // Actualizar botón
    const toggleBtn = document.querySelector('.view-toggle');
    if (toggleBtn) {
        toggleBtn.innerHTML = newView === 'grid' 
            ? '<i class="fas fa-list"></i> Vista Lista'
            : '<i class="fas fa-th-large"></i> Vista Grid';
    }
    
    renderQuotations();
}

// Funciones adicionales que se llaman desde los botones

// Alias para viewQuotation (para compatibilidad)
function viewQuotationDetails(quotationId) {
    viewQuotation(quotationId);
}

// Configurar filtros para cotizaciones
function setupQuotationFilters() {
    const searchInput = document.getElementById('quotations-search');
    const statusFilter = document.getElementById('quotations-status-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', renderQuotations);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', renderQuotations);
    }
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Función para mostrar/ocultar modal
function showModal(content) {
    console.log('🎯 showModal llamada');
    console.log('📄 Contenido recibido:', content.substring(0, 200) + '...');
    
    try {
        // Cerrar modal existente si hay uno
        if (window.currentModal) {
            console.log('🔄 Cerrando modal existente...');
            closeModal();
        }
        
        // Crear overlay del modal
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        modalOverlay.innerHTML = `
            <div class="modal-content" style="
                background: white;
                border-radius: 8px;
                max-width: 90%;
                max-height: 90%;
                overflow-y: auto;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                transform: scale(0.9);
                transition: transform 0.3s ease;
            ">
                ${content}
            </div>
        `;
        
        // Cerrar modal al hacer clic en el overlay
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
        
        // Agregar al DOM
        document.body.appendChild(modalOverlay);
        console.log('📄 Modal agregado al DOM');
        
        // Mostrar modal con animación
        setTimeout(() => {
            modalOverlay.style.opacity = '1';
            const modalContent = modalOverlay.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.transform = 'scale(1)';
            }
            console.log('✅ Modal mostrado con animación');
        }, 10);
        
        // Guardar referencia global
        window.currentModal = modalOverlay;
        console.log('✅ Modal configurado correctamente');
        
    } catch (error) {
        console.error('❌ Error en showModal:', error);
        alert('Error al mostrar el modal: ' + error.message);
    }
}

function closeModal() {
    console.log('🔄 closeModal llamada');
    
    if (window.currentModal) {
        console.log('✅ Modal encontrado, cerrando...');
        
        // Animación de salida
        window.currentModal.style.opacity = '0';
        const modalContent = window.currentModal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.transform = 'scale(0.9)';
        }
        
        // Eliminar del DOM después de la animación
        setTimeout(() => {
            if (window.currentModal && window.currentModal.parentNode) {
                window.currentModal.parentNode.removeChild(window.currentModal);
                console.log('✅ Modal removido del DOM');
            }
            window.currentModal = null;
        }, 300);
    } else {
        console.log('⚠️ No hay modal activo para cerrar');
    }
}

// Guardar factura
function saveInvoice(event, invoiceId = null) {
    event.preventDefault();
    
    if (!window.currentInvoiceItems || window.currentInvoiceItems.length === 0) {
        alert('Por favor agrega al menos un producto a la factura');
        return;
    }
    
    const formData = new FormData(event.target);
    const subtotal = window.currentInvoiceItems.reduce((sum, item) => sum + item.total, 0);
    const includeItbs = document.getElementById('invoice-include-itbs').checked;
    const taxes = includeItbs ? subtotal * 0.18 : 0;
    const clientRnc = formData.get('clientRnc');
    
    // Validar que si tiene RNC, debe incluir ITBS
    if (clientRnc && clientRnc.trim() !== '' && !includeItbs) {
        alert('Las facturas con RNC deben incluir ITBS obligatoriamente');
        return;
    }
    
    const invoiceData = {
        id: invoiceId || Date.now().toString(),
        number: invoiceId ? invoices.find(i => i.id === invoiceId).number : generateInvoiceNumber(),
        clientName: formData.get('clientName'),
        clientEmail: formData.get('clientEmail'),
        clientPhone: formData.get('clientPhone'),
        clientAddress: formData.get('clientAddress'),
        clientRnc: clientRnc,
        items: [...window.currentInvoiceItems],
        subtotal: subtotal,
        taxes: taxes,
        total: subtotal + taxes,
        includeItbs: includeItbs,
        isFormalInvoice: clientRnc && clientRnc.trim() !== '',
        dueDate: formData.get('dueDate'),
        paymentMethod: formData.get('paymentMethod'),
        status: formData.get('status') || 'borrador',
        createdAt: invoiceId ? invoices.find(i => i.id === invoiceId).createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: session.user.id
    };
    
    // Solo reducir stock si es una nueva factura o si se cambió el estado a 'pagada'
    if (!invoiceId || formData.get('status') === 'pagada') {
        const isNewInvoice = !invoiceId;
        const wasAlreadyPaid = invoiceId && invoices.find(i => i.id === invoiceId)?.status === 'pagada';
        
        if (isNewInvoice || (!wasAlreadyPaid && formData.get('status') === 'pagada')) {
            // Reducir stock de productos
            window.currentInvoiceItems.forEach(item => {
                const product = products.find(p => p.id === item.productId);
                if (product) {
                    product.stock -= item.quantity;
                    
                    // Registrar movimiento de inventario
                    const movement = {
                        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                        productId: product.id,
                        productName: product.name,
                        type: 'salida',
                        quantity: item.quantity,
                        reason: `Venta - Factura #${invoiceData.number}`,
                        date: new Date().toISOString(),
                        createdBy: session.user.id,
                        relatedDocument: {
                            type: 'invoice',
                            id: invoiceData.id,
                            number: invoiceData.number
                        }
                    };
                    movementHistory.push(movement);
                }
            });
            
            localStorage.setItem('products', JSON.stringify(products));
            localStorage.setItem('movementHistory', JSON.stringify(movementHistory));
        }
    }
    
    if (invoiceId) {
        // Actualizar factura existente
        const index = invoices.findIndex(i => i.id === invoiceId);
        if (index !== -1) {
            invoices[index] = invoiceData;
        }
    } else {
        // Nueva factura
        invoices.push(invoiceData);
    }
    
    localStorage.setItem('invoices', JSON.stringify(invoices));
    loadInvoices();
    closeModal();
    
    showNotification(invoiceId ? 'Factura actualizada correctamente' : 'Factura creada correctamente', 'success');
}

// Generar números de documentos
function generateQuotationNumber() {
    const count = quotations.length + 1;
    return `COT-${new Date().getFullYear()}-${count.toString().padStart(4, '0')}`;
}

function generateInvoiceNumber() {
    const count = invoices.length + 1;
    return `FAC-${new Date().getFullYear()}-${count.toString().padStart(4, '0')}`;
}

// Convertir cotización a factura
function convertQuotationToInvoice(quotationId) {
    console.log('🔄 Iniciando conversión de cotización a factura...');
    console.log('📋 ID recibido:', quotationId, 'Tipo:', typeof quotationId);
    console.log('📋 Total cotizaciones disponibles:', quotations.length);
    console.log('📋 IDs disponibles:', quotations.map(q => `${q.id} (${typeof q.id})`));
    
    // Buscar cotización con comparación flexible
    const quotation = quotations.find(q => q.id == quotationId || String(q.id) === String(quotationId));
    
    if (!quotation) {
        console.error('❌ Cotización no encontrada para ID:', quotationId);
        console.log('❌ Cotizaciones disponibles:', quotations.map(q => ({id: q.id, number: q.number, status: q.status})));
        alert('Cotización no encontrada. Verifique que la cotización existe.');
        return;
    }
    
    console.log('✅ Cotización encontrada:', quotation.number, 'Estado:', quotation.status);
    
    if (quotation.status === 'rechazada' || quotation.status === 'expirada') {
        alert('No se pueden convertir cotizaciones rechazadas o expiradas a facturas');
        return;
    }
    
    if (quotation.status === 'facturada') {
        alert('Esta cotización ya fue convertida a factura');
        return;
    }
    
    // Confirmación detallada
    const confirmMessage = `¿Convertir la cotización ${quotation.number} a factura?

Cliente: ${quotation.clientName}
Total: $${quotation.total.toFixed(2)}
Items: ${quotation.items.length} producto(s)

Se creará una nueva factura y se marcará la cotización como "facturada".`;
    
    if (!confirm(confirmMessage)) {
        return;
    }
    
    // Verificar stock disponible para todos los productos
    for (const item of quotation.items) {
        const product = products.find(p => p.id === item.productId);
        if (!product || product.stock < item.quantity) {
            const stockMessage = `⚠️ Stock insuficiente para ${item.productName}
            
Solicitado: ${item.quantity}
Disponible: ${product ? product.stock : 0}

¿Deseas continuar de todas formas?`;
            
            if (!confirm(stockMessage)) {
                return;
            }
        }
    }
    
    try {
        // Obtener sesión actual (manejo seguro)
        let currentSession = null;
        try {
            currentSession = JSON.parse(localStorage.getItem('powertools_session'));
        } catch (e) {
            console.log('No hay sesión activa');
        }
        
        const invoiceData = {
            id: Date.now().toString(),
            number: generateInvoiceNumber(),
            clientName: quotation.clientName,
            clientEmail: quotation.clientEmail,
            clientPhone: quotation.clientPhone,
            clientAddress: quotation.clientAddress,
            clientRnc: quotation.clientRnc,
            items: [...quotation.items],
            subtotal: quotation.subtotal,
            taxes: quotation.taxes,
            total: quotation.total,
            includeItbs: quotation.includeItbs,
            isFormalInvoice: quotation.clientRnc && quotation.clientRnc.trim() !== '',
            dueDate: getDefaultDueDate(),
            paymentMethod: 'efectivo',
            paymentStatus: 'pendiente',
            status: 'borrador',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: currentSession?.userId || 'system',
            quotationId: quotation.id,
            quotationNumber: quotation.number
        };
        
        // Cargar facturas existentes
        let existingInvoices = [];
        try {
            const savedInvoices = localStorage.getItem('invoices');
            if (savedInvoices) {
                existingInvoices = JSON.parse(savedInvoices);
            }
        } catch (e) {
            console.log('Error al cargar facturas existentes');
        }
        
        existingInvoices.push(invoiceData);
        localStorage.setItem('invoices', JSON.stringify(existingInvoices));
        
        // Actualizar estado de la cotización
        quotation.status = 'facturada';
        quotation.updatedAt = new Date().toISOString();
        quotation.invoiceId = invoiceData.id;
        quotation.invoiceNumber = invoiceData.number;
        localStorage.setItem('quotations', JSON.stringify(quotations));
        
        // Reducir stock si es necesario
        for (const item of quotation.items) {
            const product = products.find(p => p.id === item.productId);
            if (product && product.stock >= item.quantity) {
                product.stock -= item.quantity;
            }
        }
        localStorage.setItem('products', JSON.stringify(products));
        
        // Recargar datos
        loadQuotationsData();
        displayQuotations();
        
        // Actualizar global de facturas
        invoices = existingInvoices;
        
        showNotification(`✅ Factura ${invoiceData.number} creada exitosamente desde cotización ${quotation.number}`, 'success');
        
        // Opcionalmente mostrar la factura creada
        setTimeout(() => {
            const viewInvoice = confirm(`¿Deseas ver la factura ${invoiceData.number} creada?`);
            if (viewInvoice) {
                showSection('sales');
            }
        }, 1500);
        
    } catch (error) {
        console.error('Error al convertir cotización a factura:', error);
        alert('Error al crear la factura: ' + error.message);
    }
}

// Cargar y mostrar cotizaciones
function loadQuotations() {
    console.log('🎨 Renderizando lista de cotizaciones...');
    const container = document.getElementById('quotations-list');
    if (!container) {
        console.log('❌ No se encontró el contenedor quotations-list');
        return;
    }
    
    console.log('📊 Cotizaciones a renderizar:', quotations.length);
    
    let filteredQuotations = [...quotations];
    
    // Aplicar filtros
    const searchQuery = document.getElementById('quotations-search')?.value.toLowerCase();
    const statusFilter = document.getElementById('quotations-status-filter')?.value;
    
    if (searchQuery) {
        filteredQuotations = filteredQuotations.filter(q => 
            q.clientName.toLowerCase().includes(searchQuery) ||
            q.number.toLowerCase().includes(searchQuery)
        );
    }
    
    if (statusFilter) {
        filteredQuotations = filteredQuotations.filter(q => q.status === statusFilter);
    }
    
    if (filteredQuotations.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-file-invoice fa-3x"></i>
                <h3>No hay cotizaciones</h3>
                <p>Crea tu primera cotización para comenzar</p>
                <button class="btn btn-primary" onclick="openQuotationModal()">
                    <i class="fas fa-plus"></i> Nueva Cotización
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredQuotations.map(quotation => `
        <div class="document-card">
            <div class="document-header">
                <div class="document-info">
                    <h3>${quotation.number}</h3>
                    <p class="client-name"><i class="fas fa-user"></i> ${quotation.clientName}</p>
                    <p class="document-date"><i class="fas fa-calendar"></i> ${formatDate(quotation.createdAt)}</p>
                    <p class="valid-until"><i class="fas fa-clock"></i> Válida hasta: ${formatDate(quotation.validUntil)}</p>
                    ${quotation.clientRnc ? '<p class="rnc-info"><i class="fas fa-certificate"></i> Con RNC</p>' : ''}
                    ${quotation.includeItbs ? '<p class="tax-info"><i class="fas fa-percentage"></i> Incluye ITBS (18%)</p>' : ''}
                </div>
                <div class="document-status">
                    <span class="status-badge status-${quotation.status}">${getStatusText(quotation.status)}</span>
                    <div class="document-amount">$${quotation.total.toFixed(2)}</div>
                </div>
            </div>
            
            <div class="document-actions">
                <button class="btn btn-secondary btn-small" onclick="viewQuotationDetails('${quotation.id}')">
                    <i class="fas fa-eye"></i> Ver
                </button>
                <button class="btn btn-secondary btn-small" onclick="openQuotationModal('${quotation.id}')">
                    <i class="fas fa-edit"></i> Editar
                </button>
                ${quotation.status === 'aceptada' ? `
                    <button class="btn btn-success btn-small" onclick="convertQuotationToInvoice('${quotation.id}')">
                        <i class="fas fa-file-invoice"></i> Facturar
                    </button>
                ` : ''}
                <button class="btn btn-info btn-small" onclick="shareQuotation('${quotation.id}')">
                    <i class="fas fa-share"></i> Compartir
                </button>
                <button class="btn btn-danger btn-small" onclick="deleteQuotation('${quotation.id}')">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        </div>
    `).join('');
}

// Cargar y mostrar facturas
function loadInvoices() {
    const container = document.getElementById('invoices-list');
    if (!container) return;
    
    let filteredInvoices = [...invoices];
    
    // Aplicar filtros
    const searchQuery = document.getElementById('invoices-search')?.value.toLowerCase();
    const statusFilter = document.getElementById('invoices-status-filter')?.value;
    
    if (searchQuery) {
        filteredInvoices = filteredInvoices.filter(i => 
            i.clientName.toLowerCase().includes(searchQuery) ||
            i.number.toLowerCase().includes(searchQuery)
        );
    }
    
    if (statusFilter) {
        filteredInvoices = filteredInvoices.filter(i => i.status === statusFilter);
    }
    
    if (filteredInvoices.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-file-invoice-dollar fa-3x"></i>
                <h3>No hay facturas</h3>
                <p>Crea tu primera factura para comenzar</p>
                <button class="btn btn-primary" onclick="openInvoiceModal()">
                    <i class="fas fa-plus"></i> Nueva Factura
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredInvoices.map(invoice => `
        <div class="document-card">
            <div class="document-header">
                <div class="document-info">
                    <h3>${invoice.number}</h3>
                    <p class="client-name"><i class="fas fa-user"></i> ${invoice.clientName}</p>
                    <p class="document-date"><i class="fas fa-calendar"></i> ${formatDate(invoice.createdAt)}</p>
                    <p class="due-date"><i class="fas fa-exclamation-triangle"></i> Vence: ${formatDate(invoice.dueDate)}</p>
                    ${invoice.quotationNumber ? `<p class="related-doc"><i class="fas fa-link"></i> De cotización: ${invoice.quotationNumber}</p>` : ''}
                    ${invoice.isFormalInvoice ? '<p class="formal-invoice"><i class="fas fa-award"></i> FACTURA FORMAL</p>' : ''}
                    ${invoice.includeItbs ? '<p class="tax-info"><i class="fas fa-percentage"></i> Incluye ITBS (18%)</p>' : ''}
                </div>
                <div class="document-status">
                    <span class="status-badge status-${invoice.status}">${getStatusText(invoice.status)}</span>
                    <div class="document-amount">$${invoice.total.toFixed(2)}</div>
                    <div class="payment-method">${getPaymentMethodText(invoice.paymentMethod)}</div>
                </div>
            </div>
            
            <div class="document-actions">
                <button class="btn btn-secondary btn-small" onclick="viewInvoiceDetails('${invoice.id}')">
                    <i class="fas fa-eye"></i> Ver
                </button>
                <button class="btn btn-secondary btn-small" onclick="openInvoiceModal('${invoice.id}')">
                    <i class="fas fa-edit"></i> Editar
                </button>
                ${invoice.status !== 'pagada' ? `
                    <button class="btn btn-success btn-small" onclick="markInvoiceAsPaid('${invoice.id}')">
                        <i class="fas fa-check"></i> Marcar Pagada
                    </button>
                ` : ''}
                <button class="btn btn-info btn-small" onclick="shareInvoice('${invoice.id}')">
                    <i class="fas fa-share"></i> Compartir
                </button>
                <button class="btn btn-danger btn-small" onclick="deleteInvoice('${invoice.id}')">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        </div>
    `).join('');
}

// Funciones auxiliares para texto de estado y método de pago
function getStatusText(status) {
    const statusTexts = {
        'borrador': 'Borrador',
        'enviada': 'Enviada',
        'aceptada': 'Aceptada',
        'rechazada': 'Rechazada',
        'facturada': 'Facturada',
        'pagada': 'Pagada'
    };
    return statusTexts[status] || status;
}

function getPaymentMethodText(method) {
    const methodTexts = {
        'efectivo': 'Efectivo',
        'tarjeta': 'Tarjeta',
        'transferencia': 'Transferencia',
        'credito': 'Crédito'
    };
    return methodTexts[method] || method;
}

// Configurar filtros para cotizaciones e invoices
function setupQuotationFilters() {
    const searchInput = document.getElementById('quotations-search');
    const statusFilter = document.getElementById('quotations-status-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', loadQuotations);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', loadQuotations);
    }
}

function setupInvoiceFilters() {
    const searchInput = document.getElementById('invoices-search');
    const statusFilter = document.getElementById('invoices-status-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', loadInvoices);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', loadInvoices);
    }
}

// Funciones adicionales para gestión de documentos
function deleteQuotation(quotationId) {
    if (confirm('¿Estás seguro de que quieres eliminar esta cotización?')) {
        quotations = quotations.filter(q => q.id !== quotationId);
        localStorage.setItem('quotations', JSON.stringify(quotations));
        loadQuotations();
        showNotification('Cotización eliminada correctamente', 'success');
    }
}

function deleteInvoice(invoiceId) {
    if (confirm('¿Estás seguro de que quieres eliminar esta factura?')) {
        invoices = invoices.filter(i => i.id !== invoiceId);
        localStorage.setItem('invoices', JSON.stringify(invoices));
        loadInvoices();
        showNotification('Factura eliminada correctamente', 'success');
    }
}

function markInvoiceAsPaid(invoiceId) {
    const invoice = invoices.find(i => i.id === invoiceId);
    if (!invoice) return;
    
    if (confirm(`¿Marcar la factura ${invoice.number} como pagada?`)) {
        // Verificar stock si no se había reducido antes
        if (invoice.status !== 'pagada') {
            for (const item of invoice.items) {
                const product = products.find(p => p.id === item.productId);
                if (!product || product.stock < item.quantity) {
                    alert(`Stock insuficiente para ${item.productName}. Disponible: ${product ? product.stock : 0}`);
                    return;
                }
            }
            
            // Reducir stock y registrar movimientos
            invoice.items.forEach(item => {
                const product = products.find(p => p.id === item.productId);
                if (product) {
                    product.stock -= item.quantity;
                    
                    const movement = {
                        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                        productId: product.id,
                        productName: product.name,
                        type: 'salida',
                        quantity: item.quantity,
                        reason: `Venta - Factura #${invoice.number}`,
                        date: new Date().toISOString(),
                        createdBy: session.user.id,
                        relatedDocument: {
                            type: 'invoice',
                            id: invoice.id,
                            number: invoice.number
                        }
                    };
                    movementHistory.push(movement);
                }
            });
            
            localStorage.setItem('products', JSON.stringify(products));
            localStorage.setItem('movementHistory', JSON.stringify(movementHistory));
        }
        
        invoice.status = 'pagada';
        invoice.updatedAt = new Date().toISOString();
        localStorage.setItem('invoices', JSON.stringify(invoices));
        loadInvoices();
        showNotification('Factura marcada como pagada', 'success');
    }
}

function viewQuotationDetails(quotationId) {
    const quotation = quotations.find(q => q.id === quotationId);
    if (!quotation) return;
    
    const modalContent = `
        <div class="modal-header">
            <h2>Cotización ${quotation.number}</h2>
            <button class="close-modal" onclick="closeModal()">&times;</button>
        </div>
        
        <div class="document-view">
            <div class="document-info-section">
                <h3>Información del Cliente</h3>
                <p><strong>Nombre:</strong> ${quotation.clientName}</p>
                ${quotation.clientEmail ? `<p><strong>Email:</strong> ${quotation.clientEmail}</p>` : ''}
                ${quotation.clientPhone ? `<p><strong>Teléfono:</strong> ${quotation.clientPhone}</p>` : ''}
                ${quotation.clientAddress ? `<p><strong>Dirección:</strong> ${quotation.clientAddress}</p>` : ''}
                ${quotation.clientRnc ? `<p><strong>RNC:</strong> ${quotation.clientRnc}</p>` : ''}
            </div>
            
            <div class="document-info-section">
                <h3>Detalles de la Cotización</h3>
                <p><strong>Fecha:</strong> ${formatDate(quotation.createdAt)}</p>
                <p><strong>Válida hasta:</strong> ${formatDate(quotation.validUntil)}</p>
                <p><strong>Estado:</strong> <span class="status-badge status-${quotation.status}">${getStatusText(quotation.status)}</span></p>
            </div>
            
            <div class="document-items-section">
                <h3>Productos y Servicios</h3>
                <table class="items-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unit.</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${quotation.items.map(item => `
                            <tr>
                                <td>${item.productName}</td>
                                <td>${item.quantity}</td>
                                <td>$${item.unitPrice.toFixed(2)}</td>
                                <td>$${item.total.toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <div class="totals-section">
                    <table class="totals-table">
                        <tr>
                            <td>Subtotal:</td>
                            <td>$${quotation.subtotal.toFixed(2)}</td>
                        </tr>
                        ${quotation.includeItbs ? `
                        <tr>
                            <td>ITBS (18%):</td>
                            <td>$${quotation.taxes.toFixed(2)}</td>
                        </tr>
                        ` : ''}
                        <tr class="total-final">
                            <td>Total:</td>
                            <td>$${quotation.total.toFixed(2)}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    showModal(modalContent);
}

function viewInvoiceDetails(invoiceId) {
    const invoice = invoices.find(i => i.id === invoiceId);
    if (!invoice) return;
    
    const modalContent = `
        <div class="modal-header">
            <h2>Factura ${invoice.number}</h2>
            <button class="close-modal" onclick="closeModal()">&times;</button>
        </div>
        
        <div class="document-view">
            <div class="document-info-section">
                <h3>Información del Cliente</h3>
                <p><strong>Nombre:</strong> ${invoice.clientName}</p>
                ${invoice.clientEmail ? `<p><strong>Email:</strong> ${invoice.clientEmail}</p>` : ''}
                ${invoice.clientPhone ? `<p><strong>Teléfono:</strong> ${invoice.clientPhone}</p>` : ''}
                ${invoice.clientAddress ? `<p><strong>Dirección:</strong> ${invoice.clientAddress}</p>` : ''}
                ${invoice.clientRnc ? `<p><strong>RNC:</strong> ${invoice.clientRnc} <span class="formal-badge">FACTURA FORMAL</span></p>` : ''}
            </div>
            
            <div class="document-info-section">
                <h3>Detalles de la Factura</h3>
                <p><strong>Fecha:</strong> ${formatDate(invoice.createdAt)}</p>
                <p><strong>Vencimiento:</strong> ${formatDate(invoice.dueDate)}</p>
                <p><strong>Método de pago:</strong> ${getPaymentMethodText(invoice.paymentMethod)}</p>
                <p><strong>Estado:</strong> <span class="status-badge status-${invoice.status}">${getStatusText(invoice.status)}</span></p>
                ${invoice.quotationNumber ? `<p><strong>Cotización origen:</strong> ${invoice.quotationNumber}</p>` : ''}
            </div>
            
            <div class="document-items-section">
                <h3>Productos y Servicios</h3>
                <table class="items-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unit.</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${invoice.items.map(item => `
                            <tr>
                                <td>${item.productName}</td>
                                <td>${item.quantity}</td>
                                <td>$${item.unitPrice.toFixed(2)}</td>
                                <td>$${item.total.toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <div class="totals-section">
                    <table class="totals-table">
                        <tr>
                            <td>Subtotal:</td>
                            <td>$${invoice.subtotal.toFixed(2)}</td>
                        </tr>
                        ${invoice.includeItbs ? `
                        <tr>
                            <td>ITBS (18%):</td>
                            <td>$${invoice.taxes.toFixed(2)}</td>
                        </tr>
                        ` : ''}
                        <tr class="total-final">
                            <td>Total:</td>
                            <td>$${invoice.total.toFixed(2)}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    showModal(modalContent);
}

function shareQuotation(quotationId) {
    const quotation = quotations.find(q => q.id === quotationId);
    if (!quotation) return;
    
    const shareText = `Cotización ${quotation.number}
Cliente: ${quotation.clientName}
Total: $${quotation.total.toFixed(2)}
Válida hasta: ${formatDate(quotation.validUntil)}
Estado: ${getStatusText(quotation.status)}

PowerTools - Gestión de Herramientas`;
    
    if (navigator.share) {
        navigator.share({
            title: `Cotización ${quotation.number}`,
            text: shareText
        });
    } else {
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Información de la cotización copiada al portapapeles', 'success');
        });
    }
}

function shareInvoice(invoiceId) {
    const invoice = invoices.find(i => i.id === invoiceId);
    if (!invoice) return;
    
    const shareText = `Factura ${invoice.number}
Cliente: ${invoice.clientName}
Total: $${invoice.total.toFixed(2)}
Vencimiento: ${formatDate(invoice.dueDate)}
Estado: ${getStatusText(invoice.status)}

PowerTools - Gestión de Herramientas`;
    
    if (navigator.share) {
        navigator.share({
            title: `Factura ${invoice.number}`,
            text: shareText
        });
    } else {
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Información de la factura copiada al portapapeles', 'success');
        });
    }
}

// Función para verificar RNC y activar ITBS automáticamente
function checkRncForItbs(documentType) {
    const rncInput = document.querySelector(`input[name="clientRnc"]`);
    const itbsCheckbox = document.getElementById(`${documentType}-include-itbs`);
    
    if (rncInput && itbsCheckbox) {
        const hasRnc = rncInput.value.trim() !== '';
        
        if (hasRnc) {
            itbsCheckbox.checked = true;
            itbsCheckbox.disabled = true;
            showNotification('ITBS activado automáticamente para factura con RNC', 'info');
        } else {
            itbsCheckbox.disabled = false;
        }
        
        // Actualizar totales
        if (documentType === 'quotation') {
            updateQuotationTotals();
        } else {
            updateInvoiceTotals();
        }
    }
}

function setupInventoryFilters() {
    const searchInput = document.getElementById('search-products');
    const categoryFilter = document.getElementById('category-filter');
    
    if (searchInput) {
        searchInput.removeEventListener('input', filterProducts);
        searchInput.addEventListener('input', filterProducts);
    }
    
    if (categoryFilter) {
        categoryFilter.removeEventListener('change', filterProducts);
        categoryFilter.addEventListener('change', filterProducts);
    }
}

function renderUsers() {
    console.log('👥 Renderizando usuarios...');
    
    const users = getUsersData();
    
    // Actualizar estadísticas
    const totalElement = document.getElementById('total-users');
    const activeElement = document.getElementById('active-users');
    const pendingElement = document.getElementById('pending-users');
    
    if (totalElement) totalElement.textContent = users.length;
    if (activeElement) activeElement.textContent = users.filter(u => u.status === 'active').length;
    if (pendingElement) pendingElement.textContent = users.filter(u => u.status === 'pending').length;
    
    // Renderizar lista de usuarios
    const container = document.getElementById('users-list');
    if (!container) return;
    
    container.innerHTML = `
        <div class="users-table">
            <div class="table-header">
                <div class="table-row">
                    <div class="table-cell">Usuario</div>
                    <div class="table-cell">Email</div>
                    <div class="table-cell">Rol</div>
                    <div class="table-cell">Estado</div>
                    <div class="table-cell">Acciones</div>
                </div>
            </div>
            <div class="table-body">
                ${users.map(user => `
                    <div class="table-row">
                        <div class="table-cell">
                            <strong>${user.fullName}</strong>
                            <span>@${user.username}</span>
                        </div>
                        <div class="table-cell">${user.email}</div>
                        <div class="table-cell">
                            <span class="role-badge role-${user.role}">${getRoleText(user.role)}</span>
                        </div>
                        <div class="table-cell">
                            <span class="status-badge status-${user.status}">${user.status}</span>
                        </div>
                        <div class="table-cell">
                            <div class="action-buttons">
                                ${user.status === 'pending' ? 
                                    `<button class="btn btn-success btn-sm" onclick="approveUser(${user.id})">
                                        <i class="fas fa-check"></i> Aprobar
                                    </button>` : ''
                                }
                                <button class="btn btn-primary btn-sm" onclick="editUser(${user.id})">
                                    <i class="fas fa-edit"></i> Editar
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function getUsersData() {
    const savedUsers = localStorage.getItem('powertools_users');
    if (savedUsers) {
        return JSON.parse(savedUsers);
    }
    
    // Usuarios por defecto
    const defaultUsers = [
        {
            id: 1,
            username: 'admin',
            fullName: 'Administrador PowerTools',
            email: 'admin@powertools.com',
            phone: '+1 (555) 000-0001',
            role: 'admin',
            status: 'active',
            createdAt: '2024-01-01'
        },
        {
            id: 2,
            username: 'vendedor1',
            fullName: 'Carlos Martínez',
            email: 'carlos@powertools.com',
            phone: '+1 (555) 123-4567',
            role: 'empleado',
            status: 'active',
            createdAt: '2024-02-15'
        }
    ];
    
    localStorage.setItem('powertools_users', JSON.stringify(defaultUsers));
    return defaultUsers;
}

function getRoleText(role) {
    const roles = {
        'admin': 'Administrador',
        'empleado': 'Empleado',
        'vendedor': 'Vendedor',
        'lectura': 'Solo Lectura'
    };
    return roles[role] || role;
}

function getStockLevel(stock, minStock = 5) {
    if (stock === 0) return 'stock-empty';
    if (stock <= minStock) return 'stock-low';
    if (stock <= minStock * 2) return 'stock-medium';
    return 'stock-high';
}

function getStockText(stock, minStock = 5) {
    if (stock === 0) return 'Agotado';
    if (stock <= minStock) return 'Bajo';
    if (stock <= minStock * 2) return 'Medio';
    return 'Alto';
}

function getCategoryIcon(category) {
    const icons = {
        'herramientas-manuales': '🔨',
        'herramientas-electricas': '⚡',
        'materiales': '🧱',
        'seguridad': '🦺',
        'accesorios': '🔧'
    };
    return icons[category] || '📦';
}

function getCategoryName(category) {
    const names = {
        'herramientas-manuales': 'Herramientas Manuales',
        'herramientas-electricas': 'Herramientas Eléctricas',
        'materiales': 'Materiales',
        'seguridad': 'Seguridad',
        'accesorios': 'Accesorios'
    };
    return names[category] || 'Sin Categoría';
}

// Funciones de usuario
function openUserModal() {
    alert('Funcionalidad de nuevo usuario próximamente');
}

function editUser(userId) {
    alert(`Editar usuario ${userId} próximamente`);
}

function approveUser(userId) {
    const users = getUsersData();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex > -1) {
        users[userIndex].status = 'active';
        localStorage.setItem('powertools_users', JSON.stringify(users));
        renderUsers();
        showNotification('Usuario aprobado correctamente');
    }
}

// Funciones de productos
function openProductModal(productId = null) {
    const product = productId ? products.find(p => p.id === productId) : null;
    const isEdit = !!product;
    
    const modalContent = `
        <div class="modal-header">
            <h2>${isEdit ? 'Editar Producto' : 'Nuevo Producto'}</h2>
            <button class="close-modal" onclick="closeModal()">&times;</button>
        </div>
        <form onsubmit="saveProduct(event, ${productId})" enctype="multipart/form-data">
            <div class="form-row">
                <div class="form-group image-upload-group">
                    <label>Foto del Producto</label>
                    <div class="image-upload-container">
                        <div class="image-preview" id="imagePreview">
                            ${product?.image ? 
                                `<img src="${product.image}" alt="Producto" class="preview-image">
                                 <button type="button" class="remove-image" onclick="removeProductImage()">
                                     <i class="fas fa-times"></i>
                                 </button>` : 
                                `<div class="upload-placeholder">
                                     <i class="fas fa-camera fa-2x"></i>
                                     <p>Haz click para agregar foto</p>
                                 </div>`
                            }
                        </div>
                        <input type="file" id="productImage" name="image" accept="image/*" onchange="previewProductImage(this)" style="display: none;">
                        <button type="button" class="btn btn-secondary btn-sm" onclick="document.getElementById('productImage').click()">
                            <i class="fas fa-upload"></i> ${product?.image ? 'Cambiar Foto' : 'Subir Foto'}
                        </button>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Nombre del Producto *</label>
                    <input type="text" name="name" value="${product?.name || ''}" required placeholder="Ej: Taladro Inalámbrico Bosch">
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>Precio de Venta *</label>
                    <div class="input-with-icon">
                        <span class="input-icon">$</span>
                        <input type="number" name="price" step="0.01" value="${product?.price || ''}" required placeholder="0.00">
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Precio de Costo</label>
                    <div class="input-with-icon">
                        <span class="input-icon">$</span>
                        <input type="number" name="costPrice" step="0.01" value="${product?.costPrice || ''}" placeholder="0.00">
                    </div>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>Stock Inicial *</label>
                    <input type="number" name="stock" value="${product?.stock || ''}" required placeholder="0" min="0">
                </div>
                
                <div class="form-group">
                    <label>Stock Mínimo</label>
                    <input type="number" name="minStock" value="${product?.minStock || 5}" placeholder="5" min="0">
                </div>
            </div>
            
            <div class="form-group">
                <label>Categoría *</label>
                <select name="category" required>
                    <option value="">Seleccionar categoría</option>
                    <option value="herramientas-manuales" ${product?.category === 'herramientas-manuales' ? 'selected' : ''}>🔨 Herramientas Manuales</option>
                    <option value="herramientas-electricas" ${product?.category === 'herramientas-electricas' ? 'selected' : ''}>⚡ Herramientas Eléctricas</option>
                    <option value="materiales" ${product?.category === 'materiales' ? 'selected' : ''}>🧱 Materiales</option>
                    <option value="seguridad" ${product?.category === 'seguridad' ? 'selected' : ''}>🦺 Seguridad</option>
                    <option value="accesorios" ${product?.category === 'accesorios' ? 'selected' : ''}>🔧 Accesorios</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Descripción</label>
                <textarea name="description" placeholder="Descripción detallada del producto..." rows="3">${product?.description || ''}</textarea>
            </div>
            
            <div class="form-group">
                <label>Código de Barras</label>
                <input type="text" name="barcode" value="${product?.barcode || ''}" placeholder="Ej: 1234567890123">
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-save"></i> ${isEdit ? 'Actualizar Producto' : 'Guardar Producto'}
                </button>
            </div>
        </form>
    `;
    
    showModal(modalContent);
    
    // Si estamos editando y hay imagen, configurar el preview
    if (product?.image) {
        const imagePreview = document.getElementById('imagePreview');
        if (imagePreview) {
            window.currentProductImage = product.image;
        }
    }
}

// Función para previsualizar la imagen seleccionada
function previewProductImage(input) {
    const file = input.files[0];
    if (!file) return;
    
    // Validar tamaño del archivo (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showNotification('La imagen es muy grande. Máximo 5MB permitido.', 'error');
        input.value = '';
        return;
    }
    
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
        showNotification('Por favor selecciona un archivo de imagen válido.', 'error');
        input.value = '';
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const imagePreview = document.getElementById('imagePreview');
        if (imagePreview) {
            imagePreview.innerHTML = `
                <img src="${e.target.result}" alt="Vista previa" class="preview-image">
                <button type="button" class="remove-image" onclick="removeProductImage()">
                    <i class="fas fa-times"></i>
                </button>
            `;
            window.currentProductImage = e.target.result;
        }
    };
    reader.readAsDataURL(file);
}

// Función para remover la imagen del producto
function removeProductImage() {
    const imagePreview = document.getElementById('imagePreview');
    const fileInput = document.getElementById('productImage');
    
    if (imagePreview) {
        imagePreview.innerHTML = `
            <div class="upload-placeholder">
                <i class="fas fa-camera fa-2x"></i>
                <p>Haz click para agregar foto</p>
            </div>
        `;
    }
    
    if (fileInput) {
        fileInput.value = '';
    }
    
    window.currentProductImage = null;
}

function saveProduct(event, productId = null) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Validaciones
    const name = formData.get('name').trim();
    const price = parseFloat(formData.get('price'));
    const stock = parseInt(formData.get('stock'));
    const category = formData.get('category');
    
    if (!name || price <= 0 || stock < 0 || !category) {
        showNotification('Por favor completa todos los campos requeridos correctamente', 'error');
        return;
    }
    
    // Verificar duplicados (excepto al editar el mismo producto)
    const existingProduct = products.find(p => 
        p.name.toLowerCase() === name.toLowerCase() && 
        (productId ? p.id !== productId : true)
    );
    
    if (existingProduct) {
        showNotification('Ya existe un producto con ese nombre', 'error');
        return;
    }
    
    const productData = {
        name: name,
        price: price,
        stock: stock,
        category: category,
        description: formData.get('description').trim() || '',
        barcode: formData.get('barcode').trim() || '',
        costPrice: parseFloat(formData.get('costPrice')) || 0,
        minStock: parseInt(formData.get('minStock')) || 5,
        image: window.currentProductImage || null,
        updatedAt: new Date().toISOString()
    };
    
    if (productId) {
        // Editar producto existente
        const index = products.findIndex(p => p.id === productId);
        if (index > -1) {
            products[index] = { ...products[index], ...productData };
            showNotification('Producto actualizado correctamente', 'success');
        }
    } else {
        // Agregar nuevo producto
        const newProduct = {
            id: Math.max(...products.map(p => p.id), 0) + 1,
            ...productData,
            createdAt: new Date().toISOString()
        };
        products.push(newProduct);
        showNotification('Producto agregado correctamente', 'success');
    }
    
    saveData();
    renderInventory();
    closeModal();
    
    // Limpiar imagen temporal
    window.currentProductImage = null;
}

function editProduct(productId) {
    openProductModal(productId);
}

function deleteProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    if (confirm(`¿Estás seguro de que quieres eliminar "${product.name}"?\n\nEsta acción no se puede deshacer.`)) {
        products = products.filter(p => p.id !== productId);
        saveData();
        renderInventory();
        renderDashboard(); // Actualizar estadísticas
        showNotification(`"${product.name}" eliminado correctamente`, 'success');
    }
}

function duplicateProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const newProduct = {
        ...product,
        id: Math.max(...products.map(p => p.id), 0) + 1,
        name: `${product.name} (Copia)`,
        stock: 0, // Empezar con stock 0 para la copia
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    products.push(newProduct);
    saveData();
    renderInventory();
    showNotification(`Producto "${newProduct.name}" duplicado correctamente`, 'success');
}

function adjustStock(productId, adjustment) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const currentStock = product.stock;
    const newStock = currentStock + adjustment;
    
    if (newStock < 0) {
        showNotification('El stock no puede ser negativo', 'error');
        return;
    }
    
    product.stock = newStock;
    product.updatedAt = new Date().toISOString();
    
    // Registrar movimiento en el historial
    const movementType = adjustment > 0 ? 'entrada' : 'salida';
    const reason = adjustment > 0 ? 'Ajuste manual - Entrada' : 'Ajuste manual - Salida';
    addMovementRecord(productId, movementType, adjustment, reason, currentStock, newStock);
    
    saveData();
    renderInventory();
    updateDashboardStats(); // Actualizar estadísticas
    
    const action = adjustment > 0 ? 'agregadas' : 'removidas';
    const quantity = Math.abs(adjustment);
    showNotification(`${quantity} unidades ${action} de "${product.name}"`, 'success');
}

function showStockAdjustmentModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modalContent = `
        <div class="modal-header">
            <h2>Ajustar Stock - ${product.name}</h2>
            <button class="close-modal" onclick="closeModal()">&times;</button>
        </div>
        
        <div class="stock-info">
            <p><strong>Stock Actual:</strong> ${product.stock} unidades</p>
            <p><strong>Stock Mínimo:</strong> ${product.minStock} unidades</p>
        </div>
        
        <form onsubmit="processStockAdjustment(event, ${productId})">
            <div class="form-group">
                <label>Tipo de Ajuste</label>
                <select name="adjustmentType" onchange="toggleAdjustmentOptions(this.value)" required>
                    <option value="">Seleccionar tipo</option>
                    <option value="add">➕ Agregar Stock (Entrada)</option>
                    <option value="remove">➖ Remover Stock (Salida)</option>
                    <option value="set">📝 Establecer Stock Exacto</option>
                </select>
            </div>
            
            <div class="form-group" id="quantity-group" style="display: none;">
                <label>Cantidad</label>
                <input type="number" name="quantity" min="1" placeholder="0" required>
            </div>
            
            <div class="form-group" id="exact-stock-group" style="display: none;">
                <label>Stock Exacto</label>
                <input type="number" name="exactStock" min="0" placeholder="${product.stock}" required>
            </div>
            
            <div class="form-group">
                <label>Motivo (Opcional)</label>
                <textarea name="reason" placeholder="Ej: Compra, Venta, Inventario, Pérdida..." rows="2"></textarea>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-check"></i> Aplicar Ajuste
                </button>
            </div>
        </form>
        
        <script>
            function toggleAdjustmentOptions(type) {
                const quantityGroup = document.getElementById('quantity-group');
                const exactStockGroup = document.getElementById('exact-stock-group');
                
                quantityGroup.style.display = (type === 'add' || type === 'remove') ? 'block' : 'none';
                exactStockGroup.style.display = type === 'set' ? 'block' : 'none';
                
                // Reset required attributes
                document.querySelector('input[name="quantity"]').required = (type === 'add' || type === 'remove');
                document.querySelector('input[name="exactStock"]').required = type === 'set';
            }
        </script>
    `;
    
    showModal(modalContent);
}

function processStockAdjustment(event, productId) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const adjustmentType = formData.get('adjustmentType');
    const quantity = parseInt(formData.get('quantity')) || 0;
    const exactStock = parseInt(formData.get('exactStock')) || 0;
    const reason = formData.get('reason').trim();
    
    let newStock = product.stock;
    let adjustmentAmount = 0;
    
    switch (adjustmentType) {
        case 'add':
            newStock = product.stock + quantity;
            adjustmentAmount = quantity;
            break;
        case 'remove':
            newStock = product.stock - quantity;
            adjustmentAmount = -quantity;
            if (newStock < 0) {
                showNotification('No hay suficiente stock para remover esa cantidad', 'error');
                return;
            }
            break;
        case 'set':
            newStock = exactStock;
            adjustmentAmount = exactStock - product.stock;
            break;
    }
    
    // Actualizar producto
    product.stock = newStock;
    product.updatedAt = new Date().toISOString();
    
    // Guardar historial (opcional - para futuras mejoras)
    const adjustment = {
        productId: productId,
        previousStock: product.stock - adjustmentAmount,
        newStock: newStock,
        adjustment: adjustmentAmount,
        reason: reason,
        timestamp: new Date().toISOString()
    };
    
    saveData();
    renderInventory();
    renderDashboard();
    closeModal();
    
    const message = adjustmentType === 'set' 
        ? `Stock establecido a ${newStock} unidades`
        : `${Math.abs(adjustmentAmount)} unidades ${adjustmentAmount > 0 ? 'agregadas' : 'removidas'}`;
    
    showNotification(`${message} para "${product.name}"`, 'success');
}

function filterProducts() {
    const searchTerm = document.getElementById('search-products')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('category-filter')?.value || '';
    
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm) ||
                            (product.barcode && product.barcode.includes(searchTerm));
        const matchesCategory = !categoryFilter || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });
    
    // Renderizar según la vista actual
    if (currentViewMode === 'grid') {
        renderProductsList(filteredProducts);
    } else {
        renderProductsListView(filteredProducts);
    }
}

function renderProductsList(productsToRender = products) {
    const container = document.getElementById('products-grid');
    if (!container) return;
    
    if (productsToRender.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-boxes fa-3x"></i>
                <h3>No se encontraron productos</h3>
                <p>Intenta ajustar los filtros o agrega tu primer producto</p>
                <button class="btn btn-primary" onclick="openProductModal()">
                    <i class="fas fa-plus"></i> Agregar Primer Producto
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = productsToRender.map(product => `
        <div class="product-card ${product.stock <= product.minStock ? 'low-stock' : ''}">
            <div class="product-header">
                <div class="product-image">
                    ${product.image ? 
                        `<img src="${product.image}" alt="${product.name}" class="product-photo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                         <div class="product-image-fallback" style="display: none;">
                             <i class="fas fa-tools"></i>
                         </div>` : 
                        `<div class="product-image-fallback">
                             <i class="fas fa-tools"></i>
                         </div>`
                    }
                    ${product.stock <= product.minStock ? '<span class="low-stock-badge">⚠️ Stock Bajo</span>' : ''}
                </div>
                <div class="product-category">
                    ${getCategoryIcon(product.category)} ${getCategoryName(product.category)}
                </div>
            </div>
            
            <div class="product-info">
                <div class="product-name" title="${product.name}">${product.name}</div>
                <div class="product-description">${product.description || 'Sin descripción'}</div>
                
                <div class="product-prices">
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    ${product.costPrice > 0 ? `<div class="product-cost">Costo: $${product.costPrice.toFixed(2)}</div>` : ''}
                </div>
                
                <div class="product-stock">
                    <span class="stock-text">Stock: ${product.stock}</span>
                    <span class="stock-badge ${getStockLevel(product.stock, product.minStock)}">${getStockText(product.stock, product.minStock)}</span>
                </div>
                
                ${product.barcode ? `<div class="product-barcode">📦 ${product.barcode}</div>` : ''}
                
                <div class="product-actions">
                    <div class="quick-actions">
                        <button class="btn btn-sm btn-success" onclick="adjustStock(${product.id}, 1)" title="Agregar 1 unidad">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="btn btn-sm btn-warning" onclick="adjustStock(${product.id}, -1)" title="Remover 1 unidad" ${product.stock <= 0 ? 'disabled' : ''}>
                            <i class="fas fa-minus"></i>
                        </button>
                        <button class="btn btn-sm btn-info" onclick="showStockAdjustmentModal(${product.id})" title="Ajustar Stock">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                    
                    <div class="main-actions">
                        <button class="btn btn-info btn-sm" onclick="showProductDetails(${product.id})" title="Ver Detalles">
                            <i class="fas fa-eye"></i> Detalles
                        </button>
                        ${canEditProducts() ? `
                            <button class="btn btn-primary btn-sm" onclick="editProduct(${product.id})" title="Editar Producto">
                                <i class="fas fa-edit"></i> Editar
                            </button>
                            <button class="btn btn-secondary btn-sm" onclick="duplicateProduct(${product.id})" title="Duplicar Producto">
                                <i class="fas fa-copy"></i>
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})" title="Eliminar Producto">
                                <i class="fas fa-trash"></i>
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Funciones de vista
function setViewMode(mode) {
    currentViewMode = mode;
    
    const gridView = document.getElementById('grid-view');
    const listView = document.getElementById('list-view');
    const productsGrid = document.getElementById('products-grid');
    const productsList = document.getElementById('products-list');
    
    if (mode === 'grid') {
        gridView.classList.add('active');
        listView.classList.remove('active');
        productsGrid.style.display = 'grid';
        productsList.style.display = 'none';
        renderProductsList();
    } else {
        listView.classList.add('active');
        gridView.classList.remove('active');
        productsGrid.style.display = 'none';
        productsList.style.display = 'block';
        renderProductsListView();
    }
}

function renderProductsListView(productsToRender = products) {
    const container = document.getElementById('products-list');
    if (!container) return;
    
    if (productsToRender.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-boxes fa-3x"></i>
                <h3>No se encontraron productos</h3>
                <p>Intenta ajustar los filtros o agrega tu primer producto</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = productsToRender.map(product => `
        <div class="product-list-item ${product.stock <= product.minStock ? 'low-stock' : ''}">
            <div class="product-list-image">
                ${product.image ? 
                    `<img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                     <div class="product-image-fallback" style="display: none;">
                         <i class="fas fa-tools"></i>
                     </div>` : 
                    `<div class="product-image-fallback">
                         <i class="fas fa-tools"></i>
                     </div>`
                }
            </div>
            
            <div class="product-list-content">
                <div class="product-list-info">
                    <h3>${product.name}</h3>
                    <p>${product.description || 'Sin descripción'}</p>
                    ${product.barcode ? `<p>📦 ${product.barcode}</p>` : ''}
                </div>
                
                <div class="product-list-category">
                    ${getCategoryIcon(product.category)} ${getCategoryName(product.category)}
                </div>
                
                <div class="product-list-price">
                    $${product.price.toFixed(2)}
                    ${product.costPrice > 0 ? `<br><small>Costo: $${product.costPrice.toFixed(2)}</small>` : ''}
                </div>
                
                <div class="product-list-stock">
                    <div class="stock-text">Stock: ${product.stock}</div>
                    <span class="stock-badge ${getStockLevel(product.stock, product.minStock)}">${getStockText(product.stock, product.minStock)}</span>
                    ${product.stock <= product.minStock ? '<br><small style="color: var(--warning-color);">⚠️ Stock Bajo</small>' : ''}
                </div>
                
                <div class="product-list-actions">
                    <button class="btn btn-info btn-sm" onclick="showProductDetails(${product.id})" title="Ver Detalles">
                        <i class="fas fa-eye"></i> Ver
                    </button>
                    ${canEditProducts() ? `
                        <button class="btn btn-primary btn-sm" onclick="editProduct(${product.id})" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})" title="Eliminar">
                            <i class="fas fa-trash"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modalContent = `
        <div class="modal-header">
            <h2>Detalles del Producto</h2>
            <button class="close-modal" onclick="closeModal()">&times;</button>
        </div>
        
        <div class="product-details">
            <div class="product-details-image">
                ${product.image ? 
                    `<img src="${product.image}" alt="${product.name}" class="product-detail-photo">` : 
                    `<div class="product-detail-placeholder">
                         <i class="fas fa-tools fa-4x"></i>
                         <p>Sin imagen</p>
                     </div>`
                }
            </div>
            
            <div class="product-details-info">
                <h3>${product.name}</h3>
                <p class="product-category-detail">
                    ${getCategoryIcon(product.category)} ${getCategoryName(product.category)}
                </p>
                
                <div class="product-detail-grid">
                    <div class="detail-item">
                        <label>Precio de Venta:</label>
                        <span class="detail-value price">$${product.price.toFixed(2)}</span>
                    </div>
                    
                    ${product.costPrice > 0 ? `
                        <div class="detail-item">
                            <label>Precio de Costo:</label>
                            <span class="detail-value">$${product.costPrice.toFixed(2)}</span>
                        </div>
                        
                        <div class="detail-item">
                            <label>Margen de Ganancia:</label>
                            <span class="detail-value profit">${((product.price - product.costPrice) / product.costPrice * 100).toFixed(1)}%</span>
                        </div>
                    ` : ''}
                    
                    <div class="detail-item">
                        <label>Stock Actual:</label>
                        <span class="detail-value stock">
                            ${product.stock} unidades
                            <span class="stock-badge ${getStockLevel(product.stock, product.minStock)}">${getStockText(product.stock, product.minStock)}</span>
                        </span>
                    </div>
                    
                    <div class="detail-item">
                        <label>Stock Mínimo:</label>
                        <span class="detail-value">${product.minStock} unidades</span>
                    </div>
                    
                    ${product.barcode ? `
                        <div class="detail-item">
                            <label>Código de Barras:</label>
                            <span class="detail-value barcode">${product.barcode}</span>
                        </div>
                    ` : ''}
                </div>
                
                ${product.description ? `
                    <div class="product-description-detail">
                        <label>Descripción:</label>
                        <p>${product.description}</p>
                    </div>
                ` : ''}
                
                <div class="product-detail-actions">
                    ${canEditProducts() ? `
                        <button class="btn btn-primary" onclick="closeModal(); editProduct(${product.id})">
                            <i class="fas fa-edit"></i> Editar Producto
                        </button>
                        <button class="btn btn-info" onclick="closeModal(); showStockAdjustmentModal(${product.id})">
                            <i class="fas fa-boxes"></i> Ajustar Stock
                        </button>
                    ` : ''}
                    <button class="btn btn-secondary" onclick="closeModal()">
                        <i class="fas fa-times"></i> Cerrar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    showModal(modalContent);
}

function canEditProducts() {
    // Verificar si el usuario actual tiene permisos de administrador
    const userData = localStorage.getItem('powertools_session');
    if (!userData) return false;
    
    const session = JSON.parse(userData);
    return session.user && ['admin', 'empleado'].includes(session.user.role);
}

// Sistema de notificaciones simple
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#27AE60' : '#FF6B35'};
        color: white;
        border-radius: 8px;
        z-index: 10001;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Toggle del menú de usuario
function toggleUserMenu() {
    const menu = document.getElementById('user-menu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// Función de logout
function logout() {
    localStorage.removeItem('powertools_session');
    window.location.href = 'login.html';
}

// Cerrar menú de usuario al hacer click fuera
document.addEventListener('click', function(e) {
    const userMenu = document.getElementById('user-menu');
    const userMenuToggle = document.querySelector('.user-menu-toggle');
    
    if (userMenu && userMenuToggle && !userMenuToggle.contains(e.target)) {
        userMenu.classList.remove('active');
    }
});

// Funciones para manejo de modales
function showModal(content) {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    
    if (modalOverlay && modalContent) {
        modalContent.innerHTML = content;
        modalOverlay.style.display = 'flex';
        modalOverlay.classList.add('active');
        
        // Enfocar el primer input del modal
        setTimeout(() => {
            const firstInput = modalContent.querySelector('input, textarea, select');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);
    }
}

function closeModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        modalOverlay.style.display = 'none';
        
        // Limpiar el contenido del modal
        const modalContent = document.getElementById('modal-content');
        if (modalContent) {
            modalContent.innerHTML = '';
        }
        
        // Limpiar imagen temporal si existe
        if (window.currentProductImage !== undefined) {
            window.currentProductImage = null;
        }
    }
}

// Cerrar modal al hacer click fuera de él
document.addEventListener('click', function(e) {
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay && e.target === modalOverlay) {
        closeModal();
    }
});

// Cerrar modal con la tecla Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Función directa para mostrar modal de compartir mejorado
function showShareModal(text) {
    console.log('📄 showShareModal iniciando...');
    
    // Eliminar modal existente si existe
    const existingModal = document.getElementById('share-modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Crear modal con nuevas opciones de compartir
    const modalHTML = createShareModalHTML(text);
    
    // Insertar en el DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Almacenar texto globalmente
    window.currentShareText = text;
    
    console.log('✅ Modal de compartir mejorado insertado en DOM');
}

// Función para crear el HTML del modal de compartir
function createShareModalHTML(text) {
    return `
        <div id="share-modal-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 99999;
        ">
            <div style="
                background: white;
                border-radius: 8px;
                width: 95%;
                max-width: 650px;
                max-height: 90%;
                overflow-y: auto;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            ">
                <div style="
                    padding: 20px;
                    border-bottom: 1px solid #ddd;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: linear-gradient(135deg, #FF6B35, #F39C12);
                    color: white;
                    border-radius: 8px 8px 0 0;
                ">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <img src="assets/images/powertools-logo.png" alt="PowerTools RD" style="
                            width: 36px;
                            height: 36px;
                            border-radius: 6px;
                            border: 2px solid white;
                            object-fit: cover;
                            background: #1a1a1a;
                            padding: 2px;
                        " onerror="this.style.display='none'">
                        <h2 style="margin: 0; font-size: 1.4em;"><i class="fas fa-share"></i> Compartir Cotización</h2>
                    </div>
                    <button onclick="closeShareModal()" style="
                        background: none;
                        border: none;
                        font-size: 24px;
                        cursor: pointer;
                        padding: 0;
                        width: 30px;
                        height: 30px;
                        color: white;
                    ">&times;</button>
                </div>
                
                <div style="padding: 25px;">
                    <div style="margin-bottom: 25px;">
                        <h3 style="margin-bottom: 15px; color: #2E4057;">
                            <i class="fas fa-mobile-alt"></i> Opciones de Compartir
                        </h3>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-bottom: 20px;">
                            <button onclick="shareViaWhatsApp()" style="
                                background: #25D366;
                                color: white;
                                border: none;
                                padding: 12px 8px;
                                border-radius: 6px;
                                cursor: pointer;
                                font-size: 13px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                gap: 8px;
                                transition: transform 0.2s;
                            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                                <i class="fab fa-whatsapp"></i> WhatsApp
                            </button>
                            
                            <button onclick="shareViaEmail()" style="
                                background: #0078d4;
                                color: white;
                                border: none;
                                padding: 12px 8px;
                                border-radius: 6px;
                                cursor: pointer;
                                font-size: 13px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                gap: 8px;
                                transition: transform 0.2s;
                            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                                <i class="fas fa-envelope"></i> Email
                            </button>
                            
                            <button onclick="generatePDF()" style="
                                background: #dc3545;
                                color: white;
                                border: none;
                                padding: 12px 8px;
                                border-radius: 6px;
                                cursor: pointer;
                                font-size: 13px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                gap: 8px;
                                transition: transform 0.2s;
                            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                                <i class="fas fa-file-pdf"></i> PDF
                            </button>
                            
                            <button onclick="copyShareText()" style="
                                background: #6f42c1;
                                color: white;
                                border: none;
                                padding: 12px 8px;
                                border-radius: 6px;
                                cursor: pointer;
                                font-size: 13px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                gap: 8px;
                                transition: transform 0.2s;
                            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                                <i class="fas fa-copy"></i> Copiar
                            </button>
                            
                            <button onclick="downloadShareText()" style="
                                background: #6c757d;
                                color: white;
                                border: none;
                                padding: 12px 8px;
                                border-radius: 6px;
                                cursor: pointer;
                                font-size: 13px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                gap: 8px;
                                transition: transform 0.2s;
                            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                                <i class="fas fa-download"></i> Archivo
                            </button>
                        </div>
                    </div>
                    
                    <div style="border-top: 1px solid #ddd; padding-top: 20px;">
                        <h4 style="margin-bottom: 10px; color: #2E4057;">
                            <i class="fas fa-eye"></i> Vista Previa del Contenido:
                        </h4>
                        <textarea id="share-text-content" readonly style="
                            width: 100%;
                            height: 200px;
                            font-family: 'Courier New', monospace;
                            font-size: 12px;
                            padding: 12px;
                            border: 1px solid #ddd;
                            border-radius: 6px;
                            resize: vertical;
                            box-sizing: border-box;
                            background-color: #f8f9fa;
                        ">${text}</textarea>
                        
                        <p style="margin-top: 12px; font-size: 0.85em; color: #666; text-align: center;">
                            <i class="fas fa-info-circle"></i> 
                            Selecciona una opción arriba para compartir tu cotización
                        </p>
                    </div>
                </div>
                
                <div style="
                    padding: 15px 25px;
                    border-top: 1px solid #ddd;
                    text-align: right;
                    background-color: #f8f9fa;
                    border-radius: 0 0 8px 8px;
                ">
                    <button onclick="closeShareModal()" style="
                        background: #6c757d;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 14px;
                    ">
                        <i class="fas fa-times"></i> Cerrar
                    </button>
                </div>
            </div>
        </div>
    `;
}
// Función para cerrar modal de compartir
function closeShareModal() {
    console.log('🔄 Cerrando modal de compartir...');
    const modal = document.getElementById('share-modal-overlay');
    if (modal) {
        modal.remove();
        console.log('✅ Modal de compartir cerrado');
    }
}

// Función para compartir via WhatsApp
function shareViaWhatsApp() {
    console.log('📱 Compartiendo via WhatsApp...');
    
    const text = window.currentShareText;
    if (!text) {
        alert('No hay contenido para compartir');
        return;
    }
    
    // Crear mensaje más compacto para WhatsApp
    const whatsappText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/?text=${whatsappText}`;
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
    
    console.log('✅ WhatsApp abierto con el mensaje');
}

// Función para compartir via Email
function shareViaEmail() {
    console.log('📧 Compartiendo via Email...');
    
    const text = window.currentShareText;
    if (!text) {
        alert('No hay contenido para compartir');
        return;
    }
    
    // Extraer información básica del texto
    const lines = text.split('\n');
    const quotationNumber = lines[0] || 'Cotización';
    const clientName = lines.find(line => line.startsWith('Cliente:'))?.replace('Cliente: ', '') || 'Cliente';
    
    const subject = encodeURIComponent(`${quotationNumber} - PowerTools RD`);
    const body = encodeURIComponent(`Estimado/a ${clientName},

Adjunto encontrará los detalles de su cotización:

${text}

Quedamos a su disposición para cualquier consulta.

Saludos cordiales,
PowerTools RD
`);
    
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
    
    console.log('✅ Cliente de email abierto');
}

// Función para generar PDF
function generatePDF() {
    console.log('📄 Generando PDF...');
    
    const text = window.currentShareText;
    if (!text) {
        alert('No hay contenido para compartir');
        return;
    }
    
    try {
        // Crear el HTML para el PDF
        const pdfContent = createPDFContent(text);
        
        // Crear una nueva ventana para imprimir
        const printWindow = window.open('', '_blank');
        printWindow.document.write(pdfContent);
        printWindow.document.close();
        
        // Esperar a que cargue y luego imprimir
        printWindow.onload = function() {
            setTimeout(() => {
                printWindow.print();
                console.log('✅ PDF generado y enviado a imprimir');
            }, 500);
        };
        
    } catch (error) {
        console.error('❌ Error al generar PDF:', error);
        alert('Error al generar el PDF: ' + error.message);
    }
}

// Función para crear el contenido HTML del PDF
function createPDFContent(text) {
    // Extraer información del texto
    const lines = text.split('\n');
    const quotationNumber = lines[0]?.replace('PowerTools - ', '') || 'Cotización';
    
    // Encontrar líneas específicas
    let cliente = '', fecha = '', validaHasta = '', estado = '';
    let productos = [];
    let subtotal = '', itbs = '', total = '';
    
    let inProductos = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line.startsWith('Cliente:')) cliente = line.replace('Cliente: ', '');
        if (line.startsWith('Fecha:')) fecha = line.replace('Fecha: ', '');
        if (line.startsWith('Válida hasta:')) validaHasta = line.replace('Válida hasta: ', '');
        if (line.startsWith('Estado:')) estado = line.replace('Estado: ', '');
        
        if (line === 'Productos:') {
            inProductos = true;
            continue;
        }
        
        if (inProductos && line.startsWith('•')) {
            productos.push(line.replace('• ', ''));
        }
        
        if (line.startsWith('Subtotal:')) {
            inProductos = false;
            subtotal = line.replace('Subtotal: ', '');
        }
        if (line.startsWith('ITBS')) itbs = line.replace('ITBS (18%): ', '');
        if (line.startsWith('Total:')) total = line.replace('Total: ', '');
    }
    
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${quotationNumber} - PowerTools RD</title>
    <style>
        @media print {
            body { margin: 0; }
            .no-print { display: none; }
        }
        
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            margin: 20px;
            color: #333;
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #FF6B35;
        }
        
        .logo-section {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .logo {
            width: 100px;
            height: 100px;
            border-radius: 12px;
            border: 3px solid #FF6B35;
            object-fit: cover;
            box-shadow: 0 6px 12px rgba(255, 107, 53, 0.3);
            background: #1a1a1a; /* Fondo consistente para PDFs */
            padding: 4px;
        }
        
        .company-info h1 {
            margin: 0;
            color: #2E4057;
            font-size: 24px;
        }
        
        .company-info h1 .rd {
            color: #FF6B35;
            font-weight: 900;
        }
        
        .company-info p {
            margin: 5px 0;
            color: #666;
        }
        
        .quotation-number {
            font-size: 18px;
            font-weight: bold;
            color: #FF6B35;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
        }
        
        .info-section h3 {
            color: #2E4057;
            border-bottom: 2px solid #FF6B35;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
        
        .info-row {
            display: flex;
            margin-bottom: 8px;
        }
        
        .info-label {
            font-weight: bold;
            min-width: 100px;
            color: #555;
        }
        
        .products-section {
            margin-bottom: 30px;
        }
        
        .products-list {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        
        .product-item {
            padding: 8px 0;
            border-bottom: 1px solid #ddd;
        }
        
        .product-item:last-child {
            border-bottom: none;
        }
        
        .totals-section {
            max-width: 400px;
            margin-left: auto;
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
        }
        
        .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding: 5px 0;
        }
        
        .total-row.final {
            border-top: 2px solid #FF6B35;
            margin-top: 15px;
            padding-top: 15px;
            font-weight: bold;
            font-size: 18px;
            color: #2E4057;
        }
        
        .footer {
            margin-top: 40px;
            text-align: center;
            color: #666;
            font-size: 12px;
            border-top: 1px solid #ddd;
            padding-top: 20px;
        }
        
        .status {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: bold;
            background: #e3f2fd;
            color: #1976d2;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo-section">
            <img src="assets/images/powertools-logo.png" alt="PowerTools RD" class="logo">
            <div class="company-info">
                <h1>PowerTools <span class="rd">RD</span></h1>
                <p>Herramientas Profesionales</p>
                <p>República Dominicana</p>
            </div>
        </div>
        <div class="quotation-number">${quotationNumber}</div>
    </div>
    
    <div class="info-grid">
        <div class="info-section">
            <h3>Información del Cliente</h3>
            <div class="info-row">
                <span class="info-label">Cliente:</span>
                <span>${cliente}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Estado:</span>
                <span class="status">${estado}</span>
            </div>
        </div>
        
        <div class="info-section">
            <h3>Información de la Cotización</h3>
            <div class="info-row">
                <span class="info-label">Fecha:</span>
                <span>${fecha}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Válida hasta:</span>
                <span>${validaHasta}</span>
            </div>
        </div>
    </div>
    
    <div class="products-section">
        <h3>Productos y Servicios</h3>
        <div class="products-list">
            ${productos.map(producto => `
                <div class="product-item">${producto}</div>
            `).join('')}
        </div>
    </div>
    
    <div class="totals-section">
        <div class="total-row">
            <span>Subtotal:</span>
            <span>${subtotal}</span>
        </div>
        ${itbs ? `
        <div class="total-row">
            <span>ITBS (18%):</span>
            <span>${itbs}</span>
        </div>
        ` : ''}
        <div class="total-row final">
            <span>Total:</span>
            <span>${total}</span>
        </div>
    </div>
    
    <div class="footer">
        <p>PowerTools RD - Herramientas Profesionales para Profesionales</p>
        <p>Documento generado automáticamente el ${new Date().toLocaleDateString('es-ES')}</p>
    </div>
</body>
</html>
    `;
}

// Función para copiar texto
function copyShareText() {
    console.log('📋 Intentando copiar texto...');
    const textarea = document.getElementById('share-text-content');
    
    if (textarea) {
        try {
            textarea.select();
            textarea.setSelectionRange(0, 99999);
            
            const successful = document.execCommand('copy');
            if (successful) {
                alert('✅ Texto copiado al portapapeles');
                console.log('✅ Texto copiado exitosamente');
            } else {
                // Fallback con clipboard API
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.currentShareText)
                        .then(() => {
                            alert('✅ Texto copiado al portapapeles');
                            console.log('✅ Texto copiado con clipboard API');
                        })
                        .catch(() => {
                            alert('⚠️ No se pudo copiar automáticamente. Selecciona el texto manualmente.');
                        });
                } else {
                    alert('⚠️ No se pudo copiar automáticamente. Selecciona el texto manualmente.');
                }
            }
        } catch (err) {
            console.log('Error al copiar:', err);
            alert('⚠️ No se pudo copiar automáticamente. Selecciona el texto manualmente.');
        }
    }
}

// Función para descargar como archivo
function downloadShareText() {
    console.log('📥 Descargando archivo...');
    
    const text = window.currentShareText;
    const quotationNumber = text.match(/Cotización ([\w-]+)/)?.[1] || 'cotizacion';
    
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `cotizacion_${quotationNumber}_${new Date().toISOString().split('T')[0]}.txt`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    alert('✅ Archivo descargado exitosamente');
    console.log('✅ Archivo descargado');
}

console.log('✅ PowerTools script cargado completamente');

// ===== SISTEMA DE GASTOS ===== 

// Cargar datos de gastos
function loadExpensesData() {
    console.log('💰 Cargando datos de gastos...');
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
        expenses = JSON.parse(savedExpenses);
        console.log('✅ Gastos cargados del localStorage:', expenses.length);
    } else {
        // Si no hay gastos guardados, cargar datos de muestra
        expenses = [...sampleExpenses];
        localStorage.setItem('expenses', JSON.stringify(expenses));
        console.log('📝 Cargados datos de muestra de gastos:', expenses.length);
    }
}

// Renderizar sección de gastos
function renderExpenses() {
    console.log('💰 Renderizando gastos...');
    loadExpensesData();
    updateExpensesSummary();
    renderExpensesCharts();
    displayExpenses();
}

// Actualizar resumen de gastos
function updateExpensesSummary() {
    // Get current date references once
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    // Optimized single-pass calculation
    let todayTotal = 0;
    let monthTotal = 0;
    let pendingCount = 0;
    let totalExpenses = 0;
    
    expenses.forEach(expense => {
        const expenseDate = new Date(expense.createdAt);
        const amount = expense.amount;
        
        if (expense.status === 'pendiente') {
            pendingCount++;
        } else if (expense.status === 'pagado') {
            totalExpenses += amount;
            
            if (expenseDate >= startOfToday) {
                todayTotal += amount;
            }
            
            if (expenseDate >= startOfMonth) {
                monthTotal += amount;
            }
        }
    });
    
    // Batch DOM updates to prevent layout thrashing
    const updates = [
        { id: 'expenses-today', value: `$${todayTotal.toFixed(2)}` },
        { id: 'expenses-month', value: `$${monthTotal.toFixed(2)}` },
        { id: 'expenses-pending', value: pendingCount },
        { id: 'expenses-total', value: `$${totalExpenses.toFixed(2)}` }
    ];
    
    // Apply updates only if elements exist
    updates.forEach(update => {
        const element = document.getElementById(update.id);
        if (element && element.textContent !== update.value) {
            element.textContent = update.value;
        }
    });
}

// Renderizar gráficos de gastos (optimizado)
function renderExpensesCharts() {
    // Use requestAnimationFrame to prevent blocking UI
    requestAnimationFrame(() => {
        renderExpensesCategoryChart();
    });
    
    requestAnimationFrame(() => {
        renderExpensesTrendChart();
    });
}

// Gráfico de gastos por categoría
function renderExpensesCategoryChart() {
    const ctx = document.getElementById('expenses-category-chart');
    if (!ctx) return;
    
    // Agrupar gastos por categoría (solo pagados)
    const categoryTotals = {};
    expenses.filter(expense => expense.status === 'pagado').forEach(expense => {
        if (!categoryTotals[expense.category]) {
            categoryTotals[expense.category] = 0;
        }
        categoryTotals[expense.category] += expense.amount;
    });
    
    const categoryLabels = Object.keys(categoryTotals).map(key => getCategoryDisplayName(key));
    const categoryData = Object.values(categoryTotals);
    const categoryColors = [
        '#3498db', '#e67e22', '#9b59b6', '#e74c3c', 
        '#f39c12', '#95a5a6', '#1abc9c', '#34495e'
    ];
    
    // Destruir gráfico existente si existe
    if (window.expensesCategoryChart) {
        window.expensesCategoryChart.destroy();
    }
    
    window.expensesCategoryChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categoryLabels,
            datasets: [{
                data: categoryData,
                backgroundColor: categoryColors.slice(0, categoryLabels.length),
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

// Gráfico de tendencia de gastos
function renderExpensesTrendChart() {
    const ctx = document.getElementById('expenses-trend-chart');
    if (!ctx) return;
    
    // Obtener últimos 7 días
    const last7Days = [];
    const dailyTotals = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        last7Days.push(date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }));
        
        const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const dayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
        
        const dayExpenses = expenses.filter(expense => {
            const expenseDate = new Date(expense.createdAt);
            return expenseDate >= dayStart && expenseDate <= dayEnd && expense.status === 'pagado';
        });
        
        const dayTotal = dayExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        dailyTotals.push(dayTotal);
    }
    
    // Destruir gráfico existente si existe
    if (window.expensesTrendChart) {
        window.expensesTrendChart.destroy();
    }
    
    window.expensesTrendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: last7Days,
            datasets: [{
                label: 'Gastos Diarios',
                data: dailyTotals,
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: '#e74c3c'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toFixed(0);
                        }
                    }
                }
            }
        }
    });
}

// Mostrar gastos
function displayExpenses() {
    const container = document.getElementById('expenses-grid');
    if (!container) return;
    
    console.log('📋 Mostrando gastos. Total:', expenses.length);
    
    // Use document fragment to minimize DOM manipulation
    const fragment = document.createDocumentFragment();
    
    if (expenses.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'expenses-empty-state';
        emptyState.innerHTML = `
            <i class="fas fa-receipt fa-3x"></i>
            <h3>No hay gastos registrados</h3>
            <p>Comienza registrando tu primer gasto</p>
            <button class="btn btn-primary" onclick="openExpenseModal()">
                <i class="fas fa-plus"></i> Nuevo Gasto
            </button>
        `;
        fragment.appendChild(emptyState);
    } else {
        // Batch create expense cards
        expenses.forEach(expense => {
            const card = document.createElement('div');
            card.className = `expense-card ${expense.category}`;
            card.innerHTML = `
                <div class="expense-header">
                    <span class="expense-category ${expense.category}">${getCategoryDisplayName(expense.category)}</span>
                    <span class="expense-status ${expense.status}">${getExpenseStatusText(expense.status)}</span>
                </div>
                
                <div class="expense-content">
                    <div class="expense-description">${expense.description}</div>
                    <div class="expense-vendor">
                        <i class="fas fa-building"></i> ${expense.vendor}
                    </div>
                    <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
                </div>
                
                <div class="expense-dates">
                    <span><i class="fas fa-calendar"></i> ${formatDate(expense.createdAt)}</span>
                    <span><i class="fas fa-calendar-times"></i> Vence: ${formatDate(expense.dueDate)}</span>
                </div>
                
                <div class="expense-actions">
                    <button class="btn btn-info btn-sm" onclick="viewExpense('${expense.id}')">
                        <i class="fas fa-eye"></i> Ver
                    </button>
                    ${canEditDocuments() ? `
                        <button class="btn btn-primary btn-sm" onclick="editExpense('${expense.id}')">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                    ` : ''}
                    ${expense.status === 'pendiente' ? `
                        <button class="btn btn-success btn-sm" onclick="markExpenseAsPaid('${expense.id}')">
                            <i class="fas fa-check"></i> Marcar Pagado
                        </button>
                    ` : ''}
                    <button class="btn btn-warning btn-sm" onclick="duplicateExpense('${expense.id}')">
                        <i class="fas fa-copy"></i> Duplicar
                    </button>
                </div>
            `;
            fragment.appendChild(card);
        });
    }
    
    // Single DOM update to prevent flickering
    requestAnimationFrame(() => {
        container.innerHTML = '';
        container.appendChild(fragment);
    });
}

// Obtener nombre de categoría para mostrar
function getCategoryDisplayName(category) {
    const categoryNames = {
        'inventario': '🏪 Inventario',
        'operativos': '🏢 Operativos', 
        'personal': '👥 Personal',
        'marketing': '📈 Marketing',
        'mantenimiento': '🔧 Mantenimiento',
        'administrativos': '📋 Administrativos',
        'servicios': '⚡ Servicios',
        'transporte': '🚛 Transporte'
    };
    return categoryNames[category] || category;
}

// Obtener texto de estado de gasto
function getExpenseStatusText(status) {
    const statusTexts = {
        'pendiente': '⏳ Pendiente',
        'pagado': '✅ Pagado',
        'vencido': '❌ Vencido',
        'cancelado': '🚫 Cancelado'
    };
    return statusTexts[status] || status;
}

// Abrir modal para nuevo gasto
function openExpenseModal(expenseId = null) {
    const isEdit = expenseId !== null;
    const expense = isEdit ? expenses.find(e => e.id === expenseId) : null;
    
    const modalContent = `
        <div class="modal-header">
            <h2>${isEdit ? 'Editar Gasto' : 'Nuevo Gasto'}</h2>
            <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        
        <form class="expense-form" onsubmit="saveExpense(event, ${isEdit ? `'${expenseId}'` : 'null'})">
            <div class="form-group">
                <label for="expense-description">Descripción del Gasto *</label>
                <input type="text" id="expense-description" name="description" 
                       value="${expense ? expense.description : ''}" required>
            </div>
            
            <div class="form-group">
                <label for="expense-vendor">Proveedor/Beneficiario *</label>
                <input type="text" id="expense-vendor" name="vendor" 
                       value="${expense ? expense.vendor : ''}" required>
            </div>
            
            <div class="form-group">
                <label for="expense-vendor-phone">Teléfono del Proveedor</label>
                <input type="tel" id="expense-vendor-phone" name="vendorPhone" 
                       value="${expense ? expense.vendorPhone : ''}">
            </div>
            
            <div class="form-group">
                <label for="expense-vendor-email">Email del Proveedor</label>
                <input type="email" id="expense-vendor-email" name="vendorEmail" 
                       value="${expense ? expense.vendorEmail : ''}">
            </div>
            
            <div class="form-group">
                <label for="expense-category">Categoría *</label>
                <select id="expense-category" name="category" required>
                    <option value="">Seleccionar categoría</option>
                    <option value="inventario" ${expense && expense.category === 'inventario' ? 'selected' : ''}>🏪 Inventario</option>
                    <option value="operativos" ${expense && expense.category === 'operativos' ? 'selected' : ''}>🏢 Operativos</option>
                    <option value="personal" ${expense && expense.category === 'personal' ? 'selected' : ''}>👥 Personal</option>
                    <option value="marketing" ${expense && expense.category === 'marketing' ? 'selected' : ''}>📈 Marketing</option>
                    <option value="mantenimiento" ${expense && expense.category === 'mantenimiento' ? 'selected' : ''}>🔧 Mantenimiento</option>
                    <option value="administrativos" ${expense && expense.category === 'administrativos' ? 'selected' : ''}>📋 Administrativos</option>
                    <option value="servicios" ${expense && expense.category === 'servicios' ? 'selected' : ''}>⚡ Servicios</option>
                    <option value="transporte" ${expense && expense.category === 'transporte' ? 'selected' : ''}>🚛 Transporte</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="expense-amount">Monto *</label>
                <input type="number" id="expense-amount" name="amount" step="0.01" min="0" 
                       value="${expense ? expense.amount : ''}" required>
            </div>
            
            <div class="form-group">
                <label for="expense-payment-method">Método de Pago *</label>
                <select id="expense-payment-method" name="paymentMethod" required>
                    <option value="">Seleccionar método</option>
                    <option value="efectivo" ${expense && expense.paymentMethod === 'efectivo' ? 'selected' : ''}>💵 Efectivo</option>
                    <option value="transferencia" ${expense && expense.paymentMethod === 'transferencia' ? 'selected' : ''}>🏦 Transferencia</option>
                    <option value="tarjeta" ${expense && expense.paymentMethod === 'tarjeta' ? 'selected' : ''}>💳 Tarjeta</option>
                    <option value="cheque" ${expense && expense.paymentMethod === 'cheque' ? 'selected' : ''}>📝 Cheque</option>
                    <option value="debito_automatico" ${expense && expense.paymentMethod === 'debito_automatico' ? 'selected' : ''}>🔄 Débito Automático</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="expense-status">Estado *</label>
                <select id="expense-status" name="status" required>
                    <option value="pendiente" ${expense && expense.status === 'pendiente' ? 'selected' : ''}>⏳ Pendiente</option>
                    <option value="pagado" ${expense && expense.status === 'pagado' ? 'selected' : ''}>✅ Pagado</option>
                    <option value="vencido" ${expense && expense.status === 'vencido' ? 'selected' : ''}>❌ Vencido</option>
                    <option value="cancelado" ${expense && expense.status === 'cancelado' ? 'selected' : ''}>🚫 Cancelado</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="expense-invoice-number">Número de Factura/Recibo</label>
                <input type="text" id="expense-invoice-number" name="invoiceNumber" 
                       value="${expense ? expense.invoiceNumber : ''}">
            </div>
            
            <div class="form-group">
                <label for="expense-due-date">Fecha de Vencimiento</label>
                <input type="date" id="expense-due-date" name="dueDate" 
                       value="${expense ? expense.dueDate : ''}">
            </div>
            
            <div class="form-group full-width">
                <label for="expense-notes">Notas</label>
                <textarea id="expense-notes" name="notes" rows="3" 
                          placeholder="Notas adicionales sobre el gasto...">${expense ? expense.notes : ''}</textarea>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn btn-primary">
                    ${isEdit ? 'Actualizar Gasto' : 'Guardar Gasto'}
                </button>
            </div>
        </form>
    `;
    
    showModal(modalContent);
}

// Guardar gasto
function saveExpense(event, expenseId = null) {
    event.preventDefault();
    console.log('💾 Guardando gasto...');
    
    const formData = new FormData(event.target);
    
    // Obtener sesión actual
    let currentSession = null;
    try {
        currentSession = JSON.parse(localStorage.getItem('powertools_session'));
    } catch (e) {
        console.log('No hay sesión activa');
    }
    
    const expenseData = {
        id: expenseId || Date.now().toString(),
        description: formData.get('description'),
        vendor: formData.get('vendor'),
        vendorPhone: formData.get('vendorPhone') || '',
        vendorEmail: formData.get('vendorEmail') || '',
        category: formData.get('category'),
        amount: parseFloat(formData.get('amount')),
        paymentMethod: formData.get('paymentMethod'),
        status: formData.get('status'),
        invoiceNumber: formData.get('invoiceNumber') || '',
        dueDate: formData.get('dueDate') || '',
        notes: formData.get('notes') || '',
        createdAt: expenseId ? expenses.find(e => e.id === expenseId).createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        paidAt: formData.get('status') === 'pagado' ? new Date().toISOString() : null,
        createdBy: currentSession?.userId || 'system'
    };
    
    if (expenseId) {
        // Actualizar gasto existente
        const index = expenses.findIndex(e => e.id === expenseId);
        if (index !== -1) {
            expenses[index] = expenseData;
        }
    } else {
        // Agregar nuevo gasto
        expenses.push(expenseData);
    }
    
    // Guardar en localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));
    
    // Cerrar modal inmediatamente para mejor UX
    closeModal();
    
    // Mostrar notificación inmediata
    showNotification(expenseId ? 'Gasto actualizado correctamente' : 'Gasto registrado correctamente', 'success');
    
    // Actualizar vista de forma asíncrona para evitar bloqueo
    requestAnimationFrame(() => {
        updateExpensesSummary();
        displayExpenses();
        
        // Solo re-renderizar gráficos si es necesario (nuevo gasto o cambio de categoría)
        if (!expenseId || expenses.find(e => e.id === expenseId)?.category !== expenseData.category) {
            requestAnimationFrame(() => {
                renderExpensesCharts();
            });
        }
    });
}

// Ver detalles de gasto
function viewExpense(expenseId) {
    const expense = expenses.find(e => e.id === expenseId);
    if (!expense) {
        alert('Gasto no encontrado');
        return;
    }
    
    const modalContent = `
        <div class="modal-header">
            <h2>Detalles del Gasto</h2>
            <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        
        <div class="expense-detail-view">
            <div class="detail-section">
                <h3>Información General</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Descripción:</label>
                        <span>${expense.description}</span>
                    </div>
                    <div class="detail-item">
                        <label>Categoría:</label>
                        <span>${getCategoryDisplayName(expense.category)}</span>
                    </div>
                    <div class="detail-item">
                        <label>Monto:</label>
                        <span class="amount">$${expense.amount.toFixed(2)}</span>
                    </div>
                    <div class="detail-item">
                        <label>Estado:</label>
                        <span class="status ${expense.status}">${getExpenseStatusText(expense.status)}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>Proveedor</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Nombre:</label>
                        <span>${expense.vendor}</span>
                    </div>
                    ${expense.vendorPhone ? `
                        <div class="detail-item">
                            <label>Teléfono:</label>
                            <span>${expense.vendorPhone}</span>
                        </div>
                    ` : ''}
                    ${expense.vendorEmail ? `
                        <div class="detail-item">
                            <label>Email:</label>
                            <span>${expense.vendorEmail}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
            
            <div class="detail-section">
                <h3>Información de Pago</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Método de Pago:</label>
                        <span>${expense.paymentMethod}</span>
                    </div>
                    ${expense.invoiceNumber ? `
                        <div class="detail-item">
                            <label>Factura/Recibo:</label>
                            <span>${expense.invoiceNumber}</span>
                        </div>
                    ` : ''}
                    ${expense.dueDate ? `
                        <div class="detail-item">
                            <label>Fecha de Vencimiento:</label>
                            <span>${formatDate(expense.dueDate)}</span>
                        </div>
                    ` : ''}
                    ${expense.paidAt ? `
                        <div class="detail-item">
                            <label>Fecha de Pago:</label>
                            <span>${formatDate(expense.paidAt)}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
            
            ${expense.notes ? `
                <div class="detail-section">
                    <h3>Notas</h3>
                    <p>${expense.notes}</p>
                </div>
            ` : ''}
            
            <div class="detail-section">
                <h3>Información del Sistema</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Creado:</label>
                        <span>${formatDate(expense.createdAt)}</span>
                    </div>
                    <div class="detail-item">
                        <label>Actualizado:</label>
                        <span>${formatDate(expense.updatedAt)}</span>
                    </div>
                    <div class="detail-item">
                        <label>Creado por:</label>
                        <span>${expense.createdBy}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-actions">
                ${canEditDocuments() ? `
                    <button class="btn btn-primary" onclick="closeModal(); editExpense('${expense.id}')">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                ` : ''}
                ${expense.status === 'pendiente' ? `
                    <button class="btn btn-success" onclick="markExpenseAsPaid('${expense.id}')">
                        <i class="fas fa-check"></i> Marcar como Pagado
                    </button>
                ` : ''}
                <button class="btn btn-warning" onclick="duplicateExpense('${expense.id}')">
                    <i class="fas fa-copy"></i> Duplicar
                </button>
                <button class="btn btn-secondary" onclick="closeModal()">Cerrar</button>
            </div>
        </div>
    `;
    
    showModal(modalContent);
}

// Editar gasto
function editExpense(expenseId) {
    openExpenseModal(expenseId);
}

// Marcar gasto como pagado
function markExpenseAsPaid(expenseId) {
    const expense = expenses.find(e => e.id === expenseId);
    if (!expense) {
        alert('Gasto no encontrado');
        return;
    }
    
    if (confirm(`¿Marcar como pagado el gasto "${expense.description}" por $${expense.amount.toFixed(2)}?`)) {
        expense.status = 'pagado';
        expense.paidAt = new Date().toISOString();
        expense.updatedAt = new Date().toISOString();
        
        localStorage.setItem('expenses', JSON.stringify(expenses));
        
        updateExpensesSummary();
        displayExpenses();
        
        showNotification('Gasto marcado como pagado', 'success');
    }
}

// Duplicar gasto
function duplicateExpense(expenseId) {
    const expense = expenses.find(e => e.id === expenseId);
    if (!expense) {
        alert('Gasto no encontrado');
        return;
    }
    
    const duplicatedExpense = {
        ...expense,
        id: Date.now().toString(),
        description: `${expense.description} (Copia)`,
        status: 'pendiente',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        paidAt: null
    };
    
    expenses.push(duplicatedExpense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    
    updateExpensesSummary();
    renderExpensesCharts();
    displayExpenses();
    
    showNotification('Gasto duplicado correctamente', 'success');
}

// Configurar filtros de gastos
function setupExpenseFilters() {
    const searchInput = document.getElementById('search-expenses');
    const categoryFilter = document.getElementById('expense-category-filter');
    const statusFilter = document.getElementById('expense-status-filter');
    const periodFilter = document.getElementById('expense-period-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterExpenses);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterExpenses);
    }
    if (statusFilter) {
        statusFilter.addEventListener('change', filterExpenses);
    }
    if (periodFilter) {
        periodFilter.addEventListener('change', filterExpenses);
    }
}

// Filtrar gastos
function filterExpenses() {
    const searchTerm = document.getElementById('search-expenses')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('expense-category-filter')?.value || '';
    const statusFilter = document.getElementById('expense-status-filter')?.value || '';
    const periodFilter = document.getElementById('expense-period-filter')?.value || 'all';
    
    let filteredExpenses = [...expenses];
    
    // Filtro de búsqueda
    if (searchTerm) {
        filteredExpenses = filteredExpenses.filter(expense =>
            expense.description.toLowerCase().includes(searchTerm) ||
            expense.vendor.toLowerCase().includes(searchTerm) ||
            expense.notes.toLowerCase().includes(searchTerm)
        );
    }
    
    // Filtro de categoría
    if (categoryFilter) {
        filteredExpenses = filteredExpenses.filter(expense => expense.category === categoryFilter);
    }
    
    // Filtro de estado
    if (statusFilter) {
        filteredExpenses = filteredExpenses.filter(expense => expense.status === statusFilter);
    }
    
    // Filtro de período
    if (periodFilter !== 'all') {
        const now = new Date();
        let startDate;
        
        switch (periodFilter) {
            case 'today':
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                break;
            case 'week':
                startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                break;
            case 'month':
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                break;
            case 'quarter':
                const quarter = Math.floor(now.getMonth() / 3);
                startDate = new Date(now.getFullYear(), quarter * 3, 1);
                break;
            case 'year':
                startDate = new Date(now.getFullYear(), 0, 1);
                break;
        }
        
        if (startDate) {
            filteredExpenses = filteredExpenses.filter(expense => {
                const expenseDate = new Date(expense.createdAt);
                return expenseDate >= startDate;
            });
        }
    }
    
    // Actualizar vista con gastos filtrados
    displayFilteredExpenses(filteredExpenses);
}

// Mostrar gastos filtrados
function displayFilteredExpenses(filteredExpenses) {
    const container = document.getElementById('expenses-grid');
    if (!container) return;
    
    if (filteredExpenses.length === 0) {
        container.innerHTML = `
            <div class="expenses-empty-state">
                <i class="fas fa-search fa-3x"></i>
                <h3>No se encontraron gastos</h3>
                <p>Ajusta los filtros para ver más resultados</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredExpenses.map(expense => `
        <div class="expense-card ${expense.category}">
            <div class="expense-header">
                <span class="expense-category ${expense.category}">${getCategoryDisplayName(expense.category)}</span>
                <span class="expense-status ${expense.status}">${getExpenseStatusText(expense.status)}</span>
            </div>
            
            <div class="expense-content">
                <div class="expense-description">${expense.description}</div>
                <div class="expense-vendor">
                    <i class="fas fa-building"></i> ${expense.vendor}
                </div>
                <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
            </div>
            
            <div class="expense-dates">
                <span><i class="fas fa-calendar"></i> ${formatDate(expense.createdAt)}</span>
                <span><i class="fas fa-calendar-times"></i> Vence: ${formatDate(expense.dueDate)}</span>
            </div>
            
            <div class="expense-actions">
                <button class="btn btn-info btn-sm" onclick="viewExpense('${expense.id}')">
                    <i class="fas fa-eye"></i> Ver
                </button>
                ${canEditDocuments() ? `
                    <button class="btn btn-primary btn-sm" onclick="editExpense('${expense.id}')">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                ` : ''}
                ${expense.status === 'pendiente' ? `
                    <button class="btn btn-success btn-sm" onclick="markExpenseAsPaid('${expense.id}')">
                        <i class="fas fa-check"></i> Marcar Pagado
                    </button>
                ` : ''}
                <button class="btn btn-warning btn-sm" onclick="duplicateExpense('${expense.id}')">
                    <i class="fas fa-copy"></i> Duplicar
                </button>
            </div>
        </div>
    `).join('');
}

// Cambiar vista de gastos (grid/lista)
function setExpensesView(viewType) {
    const gridContainer = document.getElementById('expenses-grid');
    const listContainer = document.getElementById('expenses-list');
    const gridBtn = document.getElementById('expenses-grid-view');
    const listBtn = document.getElementById('expenses-list-view');
    
    if (viewType === 'grid') {
        gridContainer.style.display = 'grid';
        listContainer.style.display = 'none';
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
        localStorage.setItem('expenses_view', 'grid');
    } else {
        gridContainer.style.display = 'none';
        listContainer.style.display = 'block';
        gridBtn.classList.remove('active');
        listBtn.classList.add('active');
        localStorage.setItem('expenses_view', 'list');
        displayExpensesList();
    }
}

// Mostrar gastos en vista de lista
function displayExpensesList() {
    const container = document.getElementById('expenses-list');
    if (!container) return;
    
    if (expenses.length === 0) {
        container.innerHTML = `
            <div class="expenses-empty-state">
                <i class="fas fa-receipt fa-3x"></i>
                <h3>No hay gastos registrados</h3>
                <p>Comienza registrando tu primer gasto</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <table class="expenses-table">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Descripción</th>
                    <th>Proveedor</th>
                    <th>Categoría</th>
                    <th>Monto</th>
                    <th>Estado</th>
                    <th>Vencimiento</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${expenses.map(expense => `
                    <tr>
                        <td>${formatDate(expense.createdAt)}</td>
                        <td>${expense.description}</td>
                        <td>${expense.vendor}</td>
                        <td><span class="expense-category ${expense.category}">${getCategoryDisplayName(expense.category)}</span></td>
                        <td class="amount-cell">$${expense.amount.toFixed(2)}</td>
                        <td><span class="expense-status ${expense.status}">${getExpenseStatusText(expense.status)}</span></td>
                        <td>${expense.dueDate ? formatDate(expense.dueDate) : '-'}</td>
                        <td>
                            <div class="table-actions">
                                <button class="btn btn-info btn-sm" onclick="viewExpense('${expense.id}')" title="Ver">
                                    <i class="fas fa-eye"></i>
                                </button>
                                ${canEditDocuments() ? `
                                    <button class="btn btn-primary btn-sm" onclick="editExpense('${expense.id}')" title="Editar">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                ` : ''}
                                ${expense.status === 'pendiente' ? `
                                    <button class="btn btn-success btn-sm" onclick="markExpenseAsPaid('${expense.id}')" title="Marcar Pagado">
                                        <i class="fas fa-check"></i>
                                    </button>
                                ` : ''}
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Exportar gastos
function exportExpenses() {
    if (expenses.length === 0) {
        showNotification('No hay gastos para exportar', 'warning');
        return;
    }
    
    // Crear CSV
    const headers = ['Fecha', 'Descripción', 'Proveedor', 'Categoría', 'Monto', 'Estado', 'Método de Pago', 'Vencimiento', 'Notas'];
    const csvContent = [
        headers.join(','),
        ...expenses.map(expense => [
            formatDate(expense.createdAt),
            `"${expense.description}"`,
            `"${expense.vendor}"`,
            getCategoryDisplayName(expense.category),
            expense.amount.toFixed(2),
            getExpenseStatusText(expense.status),
            expense.paymentMethod,
            expense.dueDate ? formatDate(expense.dueDate) : '',
            `"${expense.notes || ''}"`
        ].join(','))
    ].join('\n');
    
    // Descargar archivo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `gastos_powertools_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    showNotification('Gastos exportados exitosamente', 'success');
}

// =====================================================
//           CONFIGURACIÓN DE EMPRESA
// =====================================================

// Configuración por defecto de la empresa
let companySettings = {
    // Información básica
    name: 'PowerTools RD',
    slogan: 'Tu socio en herramientas profesionales',
    rnc: '',
    phone: '',
    email: '',
    address: '',
    website: '',
    logo: 'assets/images/powertools-logo.svg',
    
    // Configuración del sistema
    currency: 'DOP',
    timezone: 'America/Santo_Domingo',
    dateFormat: 'DD/MM/YYYY',
    colorTheme: 'orange',
    
    // Configuración de negocio
    defaultTax: 18,
    minProfitMargin: 20,
    defaultMinStock: 5,
    quoteValidityDays: 15,
    
    // Metadatos
    lastUpdated: new Date().toISOString(),
    version: '2.1.0'
};

// Cargar configuración desde localStorage
function loadCompanySettings() {
    try {
        const saved = localStorage.getItem('powertools_company_settings');
        if (saved) {
            companySettings = { ...companySettings, ...JSON.parse(saved) };
        }
        
        // Aplicar configuración inmediatamente
        updateSettingsForm();
        updateAppStats();
        
        // Forzar actualización del logo en toda la aplicación
        setTimeout(() => {
            forceLogoUpdate();
        }, 100);
        
    } catch (error) {
        console.error('Error cargando configuración:', error);
        showNotification('Error al cargar configuración', 'error');
    }
}

// Forzar actualización de logos en toda la aplicación
function forceLogoUpdate() {
    // Actualizar todas las imágenes de logo
    const logoImages = document.querySelectorAll('.logo-image, #current-logo-img');
    logoImages.forEach(img => {
        if (companySettings.logo && companySettings.logo !== 'assets/images/powertools-logo.png') {
            img.src = companySettings.logo;
            img.style.display = 'block';
        } else {
            // Usar el logo SVG por defecto
            img.src = 'assets/images/powertools-logo.svg';
            img.style.display = 'block';
        }
    });
    
    // Ocultar todos los fallbacks
    const fallbacks = document.querySelectorAll('.logo-fallback');
    fallbacks.forEach(fallback => {
        fallback.style.display = 'none';
    });
    
    console.log('🎨 Logo actualizado en toda la aplicación');
}

// Actualizar formulario con la configuración actual
function updateSettingsForm() {
    // Información básica
    const elements = {
        'company-name': companySettings.name,
        'company-slogan': companySettings.slogan,
        'company-rnc': companySettings.rnc,
        'company-phone': companySettings.phone,
        'company-email': companySettings.email,
        'company-address': companySettings.address,
        'company-website': companySettings.website,
        
        // Configuración del sistema
        'system-currency': companySettings.currency,
        'system-timezone': companySettings.timezone,
        'date-format': companySettings.dateFormat,
        'color-theme': companySettings.colorTheme,
        
        // Configuración de negocio
        'default-tax': companySettings.defaultTax,
        'min-profit-margin': companySettings.minProfitMargin,
        'default-min-stock': companySettings.defaultMinStock,
        'quote-validity-days': companySettings.quoteValidityDays
    };
    
    // Actualizar elementos del formulario
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.value = value;
        }
    });
    
    // Actualizar logo
    const logoImg = document.getElementById('current-logo-img');
    if (logoImg && companySettings.logo) {
        logoImg.src = companySettings.logo;
    }
    
    // Actualizar logos en header también
    updateHeaderLogo();
    
    // Actualizar nombre en header
    updateHeaderCompanyName();
}

// Actualizar logo en header
function updateHeaderLogo() {
    const headerLogos = document.querySelectorAll('.logo-image');
    headerLogos.forEach(logo => {
        if (companySettings.logo) {
            logo.src = companySettings.logo;
            logo.style.display = 'block';
            // Ocultar fallback
            const fallback = logo.closest('.logo').querySelector('.logo-fallback');
            if (fallback) fallback.style.display = 'none';
        }
    });
}

// Actualizar estadísticas de la aplicación
function updateAppStats() {
    const stats = {
        'total-products-count': products.length,
        'total-quotations-count': quotations.length,
        'total-invoices-count': invoices.length,
        'total-expenses-count': expenses.length
    };
    
    Object.entries(stats).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
    
    // Actualizar fecha de último respaldo
    const lastBackupEl = document.getElementById('last-backup-date');
    if (lastBackupEl) {
        const lastBackup = localStorage.getItem('powertools_last_backup');
        if (lastBackup) {
            lastBackupEl.textContent = formatDate(lastBackup);
        }
    }
}

// Guardar configuración de empresa
function saveCompanySettings() {
    try {
        // Recopilar datos del formulario
        const formData = {
            // Información básica
            name: document.getElementById('company-name')?.value || '',
            slogan: document.getElementById('company-slogan')?.value || '',
            rnc: document.getElementById('company-rnc')?.value || '',
            phone: document.getElementById('company-phone')?.value || '',
            email: document.getElementById('company-email')?.value || '',
            address: document.getElementById('company-address')?.value || '',
            website: document.getElementById('company-website')?.value || '',
            
            // Configuración del sistema
            currency: document.getElementById('system-currency')?.value || 'DOP',
            timezone: document.getElementById('system-timezone')?.value || 'America/Santo_Domingo',
            dateFormat: document.getElementById('date-format')?.value || 'DD/MM/YYYY',
            colorTheme: document.getElementById('color-theme')?.value || 'orange',
            
            // Configuración de negocio
            defaultTax: parseFloat(document.getElementById('default-tax')?.value) || 18,
            minProfitMargin: parseFloat(document.getElementById('min-profit-margin')?.value) || 20,
            defaultMinStock: parseInt(document.getElementById('default-min-stock')?.value) || 5,
            quoteValidityDays: parseInt(document.getElementById('quote-validity-days')?.value) || 15,
            
            // Metadatos
            lastUpdated: new Date().toISOString()
        };
        
        // Validar campos obligatorios
        if (!formData.name || !formData.rnc || !formData.phone || !formData.email || !formData.address) {
            showNotification('Por favor complete todos los campos obligatorios (*)', 'error');
            return;
        }
        
        // Actualizar configuración
        companySettings = { ...companySettings, ...formData };
        
        // Guardar en localStorage
        localStorage.setItem('powertools_company_settings', JSON.stringify(companySettings));
        
        // Aplicar cambios inmediatamente
        applySystemSettings();
        updateHeaderCompanyName();
        
        showNotification('Configuración guardada exitosamente', 'success');
        console.log('✅ Configuración de empresa guardada:', companySettings);
        
    } catch (error) {
        console.error('Error guardando configuración:', error);
        showNotification('Error al guardar configuración', 'error');
    }
}

// Cambiar logo de empresa
function changeLogo() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            // Validar tamaño del archivo (máximo 2MB)
            if (file.size > 2 * 1024 * 1024) {
                showNotification('El archivo es muy grande. Máximo 2MB permitido.', 'error');
                return;
            }
            
            // Mostrar indicador de carga
            const logoPreview = document.getElementById('logo-preview');
            if (logoPreview) {
                logoPreview.classList.add('logo-uploading');
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                // Actualizar imagen en la vista previa de configuración
                const logoImg = document.getElementById('current-logo-img');
                if (logoImg) {
                    logoImg.src = e.target.result;
                    logoImg.style.display = 'block';
                    logoImg.classList.add('powertools-logo');
                    // Ocultar fallback
                    const fallback = logoImg.parentElement.nextElementSibling;
                    if (fallback) fallback.style.display = 'none';
                }
                
                // Actualizar logos en header
                const headerLogos = document.querySelectorAll('.logo-image');
                headerLogos.forEach(logo => {
                    logo.src = e.target.result;
                    logo.style.display = 'block';
                });
                
                // Ocultar fallbacks en header
                const headerFallbacks = document.querySelectorAll('.logo .logo-fallback');
                headerFallbacks.forEach(fallback => {
                    fallback.style.display = 'none';
                });
                
                // Guardar en configuración
                companySettings.logo = e.target.result;
                
                // Remover indicador de carga
                if (logoPreview) {
                    logoPreview.classList.remove('logo-uploading');
                }
                
                showNotification('Logo actualizado exitosamente. No olvide guardar los cambios.', 'success');
                console.log('🎨 Logo actualizado:', file.name);
            };
            
            reader.onerror = function() {
                if (logoPreview) {
                    logoPreview.classList.remove('logo-uploading');
                }
                showNotification('Error al cargar el logo', 'error');
            };
            
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

// Aplicar configuraciones del sistema
function applySystemSettings() {
    // Aplicar tema de color
    applyColorTheme(companySettings.colorTheme);
    
    // Aplicar formato de fecha (ya implementado en otras funciones)
    // Aplicar moneda (ya implementado en otras funciones)
    
    console.log('🎨 Configuraciones del sistema aplicadas');
}

// Aplicar tema de color
function applyColorTheme(theme) {
    const root = document.documentElement;
    
    switch (theme) {
        case 'blue':
            root.style.setProperty('--primary-color', '#3498DB');
            root.style.setProperty('--secondary-color', '#2C3E50');
            break;
        case 'green':
            root.style.setProperty('--primary-color', '#27AE60');
            root.style.setProperty('--secondary-color', '#1E8449');
            break;
        case 'dark':
            root.style.setProperty('--primary-color', '#95A5A6');
            root.style.setProperty('--secondary-color', '#34495E');
            root.style.setProperty('--light-gray', '#2C3E50');
            root.style.setProperty('--white', '#34495E');
            root.style.setProperty('--text-dark', '#ECF0F1');
            break;
        default: // orange
            root.style.setProperty('--primary-color', '#FF6B35');
            root.style.setProperty('--secondary-color', '#2E4057');
            root.style.setProperty('--light-gray', '#F5F5F5');
            root.style.setProperty('--white', '#FFFFFF');
            root.style.setProperty('--text-dark', '#2E4057');
            break;
    }
}

// Actualizar nombre de empresa en header
function updateHeaderCompanyName() {
    const logoText = document.querySelector('.logo span');
    if (logoText && companySettings.name) {
        // Mantener el formato PowerTools RD pero usar el nombre configurado
        if (companySettings.name.includes('PowerTools')) {
            logoText.innerHTML = companySettings.name.replace('RD', '<span class="logo-rd">RD</span>');
        } else {
            logoText.innerHTML = `${companySettings.name} <span class="logo-rd">RD</span>`;
        }
    }
}

// Exportar respaldo completo
function exportBackup() {
    try {
        const backupData = {
            // Información del respaldo
            timestamp: new Date().toISOString(),
            version: companySettings.version,
            
            // Datos de la aplicación
            companySettings: companySettings,
            products: products,
            quotations: quotations,
            invoices: invoices,
            expenses: expenses,
            movementHistory: movementHistory,
            users: JSON.parse(localStorage.getItem('powertools_users') || '[]'),
            
            // Metadatos
            exportedBy: currentUser?.username || 'admin',
            totalRecords: products.length + quotations.length + invoices.length + expenses.length
        };
        
        const jsonString = JSON.stringify(backupData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `powertools-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        // Actualizar fecha de último respaldo
        localStorage.setItem('powertools_last_backup', new Date().toISOString());
        updateAppStats();
        
        showNotification('Respaldo exportado exitosamente', 'success');
        console.log('📦 Respaldo completo exportado');
        
    } catch (error) {
        console.error('Error exportando respaldo:', error);
        showNotification('Error al exportar respaldo', 'error');
    }
}

// Importar respaldo
function importBackup() {
    const confirmed = confirm(
        '⚠️ ADVERTENCIA: Esta acción sobrescribirá todos los datos actuales.\n\n' +
        'Se recomienda hacer un respaldo antes de continuar.\n\n' +
        '¿Está seguro de que desea importar un respaldo?'
    );
    
    if (!confirmed) return;
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const backupData = JSON.parse(e.target.result);
                    
                    // Validar estructura del respaldo
                    if (!backupData.version || !backupData.companySettings) {
                        throw new Error('Archivo de respaldo inválido');
                    }
                    
                    // Restaurar datos
                    if (backupData.companySettings) {
                        companySettings = backupData.companySettings;
                        localStorage.setItem('powertools_company_settings', JSON.stringify(companySettings));
                    }
                    
                    if (backupData.products) {
                        products = backupData.products;
                        localStorage.setItem('products', JSON.stringify(products));
                    }
                    
                    if (backupData.quotations) {
                        quotations = backupData.quotations;
                        localStorage.setItem('quotations', JSON.stringify(quotations));
                    }
                    
                    if (backupData.invoices) {
                        invoices = backupData.invoices;
                        localStorage.setItem('invoices', JSON.stringify(invoices));
                    }
                    
                    if (backupData.expenses) {
                        expenses = backupData.expenses;
                        localStorage.setItem('expenses', JSON.stringify(expenses));
                    }
                    
                    if (backupData.movementHistory) {
                        movementHistory = backupData.movementHistory;
                        localStorage.setItem('movementHistory', JSON.stringify(movementHistory));
                    }
                    
                    if (backupData.users) {
                        localStorage.setItem('powertools_users', JSON.stringify(backupData.users));
                    }
                    
                    // Recargar la aplicación
                    showNotification('Respaldo importado exitosamente. Recargando aplicación...', 'success');
                    
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                    
                } catch (error) {
                    console.error('Error importando respaldo:', error);
                    showNotification('Error al importar respaldo: ' + error.message, 'error');
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

// Confirmar limpieza de datos
function confirmDataCleanup() {
    const password = prompt(
        '⚠️ ACCIÓN DESTRUCTIVA ⚠️\n\n' +
        'Esta acción eliminará TODOS los datos del sistema:\n' +
        '• Productos e inventario\n' +
        '• Cotizaciones y facturas\n' +
        '• Gastos y movimientos\n' +
        '• Configuraciones personalizadas\n\n' +
        'Para confirmar, escriba "ELIMINAR TODO" (sin comillas):'
    );
    
    if (password === 'ELIMINAR TODO') {
        performDataCleanup();
    } else if (password !== null) {
        showNotification('Texto de confirmación incorrecto. Operación cancelada.', 'error');
    }
}

// Realizar limpieza de datos
function performDataCleanup() {
    try {
        // Limpiar todas las claves de localStorage relacionadas con PowerTools
        const keysToRemove = [
            'products',
            'quotations', 
            'invoices',
            'expenses',
            'movementHistory',
            'powertools_company_settings',
            'powertools_users',
            'powertools_session',
            'powertools_last_backup'
        ];
        
        keysToRemove.forEach(key => {
            localStorage.removeItem(key);
        });
        
        // Reinicializar variables
        products = [];
        quotations = [];
        invoices = [];
        expenses = [];
        movementHistory = [];
        companySettings = {
            name: 'PowerTools RD',
            slogan: 'Tu socio en herramientas profesionales',
            rnc: '',
            phone: '',
            email: '',
            address: '',
            website: '',
            logo: 'assets/images/powertools-logo.svg',
            currency: 'DOP',
            timezone: 'America/Santo_Domingo',
            dateFormat: 'DD/MM/YYYY',
            colorTheme: 'orange',
            defaultTax: 18,
            minProfitMargin: 20,
            defaultMinStock: 5,
            quoteValidityDays: 15,
            lastUpdated: new Date().toISOString(),
            version: '2.1.0'
        };
        
        showNotification('Todos los datos han sido eliminados. Recargando aplicación...', 'success');
        
        setTimeout(() => {
            location.reload();
        }, 2000);
        
    } catch (error) {
        console.error('Error en limpieza de datos:', error);
        showNotification('Error al limpiar datos', 'error');
    }
}

// Renderizar sección de configuraciones
function renderSettings() {
    console.log('⚙️ Renderizando sección de configuraciones');
    loadCompanySettings();
}

// Inicializar configuraciones al cargar la app
document.addEventListener('DOMContentLoaded', function() {
    loadCompanySettings();
});

// =====================================================
//           GESTIÓN DE USUARIOS
// =====================================================

// Datos de ejemplo de usuarios
let users = [
    {
        id: 1,
        name: 'Admin Principal',
        email: 'admin@powertools.com',
        role: 'admin',
        status: 'active',
        createdAt: '2024-01-15',
        lastLogin: '2024-01-19',
        permissions: ['dashboard', 'cotizaciones', 'facturas', 'gastos', 'inventario', 'usuarios', 'configuracion']
    },
    {
        id: 2,
        name: 'Carlos Manager',
        email: 'carlos@powertools.com',
        role: 'manager',
        status: 'active',
        createdAt: '2024-01-16',
        lastLogin: '2024-01-19',
        permissions: ['dashboard', 'cotizaciones', 'facturas', 'gastos', 'inventario']
    },
    {
        id: 3,
        name: 'María Empleada',
        email: 'maria@powertools.com',
        role: 'employee',
        status: 'active',
        createdAt: '2024-01-17',
        lastLogin: '2024-01-18',
        permissions: ['dashboard', 'cotizaciones', 'inventario']
    },
    {
        id: 4,
        name: 'José Viewer',
        email: 'jose@powertools.com',
        role: 'viewer',
        status: 'inactive',
        createdAt: '2024-01-18',
        lastLogin: '2024-01-17',
        permissions: ['dashboard']
    }
];

// Actualizar el usuario actual del sistema de autenticación
if (users.length > 0) {
    currentUser = users[0]; // Usuario actual (Admin)
}
let filteredUsers = [...users];
let usersViewMode = 'grid'; // 'grid' o 'list'

// Función para mostrar la sección de usuarios
function showUsers() {
    showSection('users');
    updateUsersStats();
    renderUsers();
}

// Actualizar estadísticas de usuarios
function updateUsersStats() {
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 'active').length;
    const adminCount = users.filter(u => u.role === 'admin').length;
    const recentLogins = users.filter(u => {
        const lastLogin = new Date(u.lastLogin);
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        return lastLogin >= threeDaysAgo;
    }).length;

    document.getElementById('total-users').textContent = totalUsers;
    document.getElementById('active-users').textContent = activeUsers;
    document.getElementById('admin-users').textContent = adminCount;
    document.getElementById('recent-logins').textContent = recentLogins;
}

// Filtrar usuarios
function filterUsers() {
    const searchTerm = document.getElementById('user-search').value.toLowerCase();
    const roleFilter = document.getElementById('role-filter').value;
    const statusFilter = document.getElementById('status-filter').value;

    filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm) || 
                             user.email.toLowerCase().includes(searchTerm);
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
        
        return matchesSearch && matchesRole && matchesStatus;
    });

    renderUsers();
}

// Cambiar modo de vista (grid/list)
function toggleUsersView() {
    usersViewMode = usersViewMode === 'grid' ? 'list' : 'grid';
    
    const gridContainer = document.getElementById('users-grid');
    const listContainer = document.getElementById('users-list');
    const toggleBtn = document.querySelector('.view-toggle-btn');
    
    if (usersViewMode === 'grid') {
        gridContainer.style.display = 'grid';
        listContainer.style.display = 'none';
        toggleBtn.innerHTML = '<i class="fas fa-list"></i> Vista Lista';
    } else {
        gridContainer.style.display = 'none';
        listContainer.style.display = 'block';
        toggleBtn.innerHTML = '<i class="fas fa-th-large"></i> Vista Tarjetas';
    }
    
    renderUsers();
}

// Renderizar usuarios
function renderUsers() {
    if (usersViewMode === 'grid') {
        renderUsersGrid();
    } else {
        renderUsersList();
    }
}

// Renderizar usuarios en modo grid
function renderUsersGrid() {
    const container = document.getElementById('users-grid');
    
    if (filteredUsers.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fas fa-users" style="font-size: 3rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                <h3>No se encontraron usuarios</h3>
                <p>Intenta cambiar los filtros de búsqueda</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredUsers.map(user => `
        <div class="user-card">
            <div class="user-status ${user.status}"></div>
            <div class="user-header">
                <div class="user-avatar">
                    ${getInitials(user.name)}
                </div>
                <div class="user-info">
                    <h3>${user.name}</h3>
                    <p class="user-email">${user.email}</p>
                </div>
            </div>
            
            <div class="user-role ${user.role}">
                <i class="fas ${getRoleIcon(user.role)}"></i>
                ${getRoleName(user.role)}
            </div>
            
            <div class="user-details">
                <div class="user-detail-item">
                    <label>Fecha de Ingreso</label>
                    <span>${formatDate(user.createdAt)}</span>
                </div>
                <div class="user-detail-item">
                    <label>Último Acceso</label>
                    <span>${formatDate(user.lastLogin)}</span>
                </div>
                <div class="user-detail-item">
                    <label>Estado</label>
                    <span class="status-badge ${user.status}">${getStatusName(user.status)}</span>
                </div>
                <div class="user-detail-item">
                    <label>Permisos</label>
                    <span>${user.permissions.length} módulos</span>
                </div>
            </div>
            
            <div class="user-permissions">
                <h4>Permisos de Acceso</h4>
                <div class="permissions-list">
                    ${user.permissions.slice(0, 4).map(permission => 
                        `<span class="permission-tag">${getPermissionName(permission)}</span>`
                    ).join('')}
                    ${user.permissions.length > 4 ? `<span class="permission-tag">+${user.permissions.length - 4} más</span>` : ''}
                </div>
            </div>
            
            <div class="user-actions">
                <button class="btn btn-secondary" onclick="editUser(${user.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn ${user.status === 'active' ? 'btn-warning' : 'btn-success'}" 
                        onclick="toggleUserStatus(${user.id})">
                    <i class="fas ${user.status === 'active' ? 'fa-pause' : 'fa-play'}"></i>
                    ${user.status === 'active' ? 'Suspender' : 'Activar'}
                </button>
                ${user.id !== currentUser.id ? `
                    <button class="btn btn-danger" onclick="deleteUser(${user.id})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// Renderizar usuarios en modo lista
function renderUsersList() {
    const container = document.getElementById('users-list');
    
    if (filteredUsers.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-users" style="font-size: 3rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                <h3>No se encontraron usuarios</h3>
                <p>Intenta cambiar los filtros de búsqueda</p>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <table class="users-table">
            <thead>
                <tr>
                    <th>Usuario</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Último Acceso</th>
                    <th>Permisos</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${filteredUsers.map(user => `
                    <tr>
                        <td>
                            <div class="table-user-info">
                                <div class="table-user-avatar">
                                    ${getInitials(user.name)}
                                </div>
                                <div class="table-user-details">
                                    <h4>${user.name}</h4>
                                    <p>${user.email}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <span class="user-role ${user.role}">
                                <i class="fas ${getRoleIcon(user.role)}"></i>
                                ${getRoleName(user.role)}
                            </span>
                        </td>
                        <td>
                            <span class="status-badge ${user.status}">${getStatusName(user.status)}</span>
                        </td>
                        <td>${formatDate(user.lastLogin)}</td>
                        <td>${user.permissions.length} módulos</td>
                        <td>
                            <div class="user-actions" style="gap: 0.25rem;">
                                <button class="btn btn-secondary btn-sm" onclick="editUser(${user.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn ${user.status === 'active' ? 'btn-warning' : 'btn-success'} btn-sm" 
                                        onclick="toggleUserStatus(${user.id})">
                                    <i class="fas ${user.status === 'active' ? 'fa-pause' : 'fa-play'}"></i>
                                </button>
                                ${user.id !== currentUser.id ? `
                                    <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                ` : ''}
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Funciones auxiliares para usuarios
function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function getRoleIcon(role) {
    const icons = {
        admin: 'fa-user-shield',
        manager: 'fa-user-tie',
        employee: 'fa-user',
        viewer: 'fa-eye'
    };
    return icons[role] || 'fa-user';
}

function getRoleName(role) {
    const names = {
        admin: 'Administrador',
        manager: 'Gerente',
        employee: 'Empleado',
        viewer: 'Visualizador'
    };
    return names[role] || role;
}

function getStatusName(status) {
    const names = {
        active: 'Activo',
        inactive: 'Inactivo',
        suspended: 'Suspendido'
    };
    return names[status] || status;
}

function getPermissionName(permission) {
    const names = {
        dashboard: 'Dashboard',
        cotizaciones: 'Cotizaciones',
        facturas: 'Facturas',
        gastos: 'Gastos',
        inventario: 'Inventario',
        usuarios: 'Usuarios',
        configuracion: 'Configuración'
    };
    return names[permission] || permission;
}

// Crear nuevo usuario
function createUser() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content user-modal-content">
            <div class="modal-header">
                <h2><i class="fas fa-user-plus"></i> Crear Nuevo Usuario</h2>
                <button class="close-modal" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <form class="user-form" onsubmit="saveUser(event)">
                    <div class="form-section">
                        <h3><i class="fas fa-user"></i> Información Personal</h3>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="user-name">Nombre Completo *</label>
                                <input type="text" id="user-name" name="name" required>
                            </div>
                            <div class="form-group">
                                <label for="user-email">Correo Electrónico *</label>
                                <input type="email" id="user-email" name="email" required>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h3><i class="fas fa-key"></i> Credenciales de Acceso</h3>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="user-password">Contraseña *</label>
                                <input type="password" id="user-password" name="password" required
                                       oninput="checkPasswordStrength(this.value)">
                                <div class="password-strength">
                                    <div class="password-strength-bar" id="password-strength-bar"></div>
                                </div>
                                <div class="password-requirements">
                                    <p>La contraseña debe contener:</p>
                                    <ul>
                                        <li id="req-length">Al menos 8 caracteres</li>
                                        <li id="req-uppercase">Una letra mayúscula</li>
                                        <li id="req-lowercase">Una letra minúscula</li>
                                        <li id="req-number">Un número</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="user-confirm-password">Confirmar Contraseña *</label>
                                <input type="password" id="user-confirm-password" name="confirmPassword" required>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h3><i class="fas fa-user-tag"></i> Rol y Estado</h3>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="user-role">Rol del Usuario *</label>
                                <select id="user-role" name="role" required onchange="updatePermissionsForRole(this.value)">
                                    <option value="">Seleccionar rol...</option>
                                    <option value="admin">Administrador</option>
                                    <option value="manager">Gerente</option>
                                    <option value="employee">Empleado</option>
                                    <option value="viewer">Visualizador</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="user-status">Estado Inicial</label>
                                <select id="user-status" name="status">
                                    <option value="active">Activo</option>
                                    <option value="inactive">Inactivo</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h3><i class="fas fa-shield-alt"></i> Permisos de Acceso</h3>
                        <div class="permissions-grid" id="permissions-grid">
                            ${renderPermissionsCheckboxes()}
                        </div>
                    </div>
                    
                    <div class="modal-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeModal()">
                            <i class="fas fa-times"></i> Cancelar
                        </button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Crear Usuario
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

// Editar usuario existente
function editUser(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content user-modal-content">
            <div class="modal-header">
                <h2><i class="fas fa-user-edit"></i> Editar Usuario</h2>
                <button class="close-modal" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <form class="user-form" onsubmit="saveUser(event, ${userId})">
                    <div class="form-section">
                        <h3><i class="fas fa-user"></i> Información Personal</h3>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="user-name">Nombre Completo *</label>
                                <input type="text" id="user-name" name="name" value="${user.name}" required>
                            </div>
                            <div class="form-group">
                                <label for="user-email">Correo Electrónico *</label>
                                <input type="email" id="user-email" name="email" value="${user.email}" required>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h3><i class="fas fa-key"></i> Cambiar Contraseña (Opcional)</h3>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="user-password">Nueva Contraseña</label>
                                <input type="password" id="user-password" name="password"
                                       oninput="checkPasswordStrength(this.value)">
                                <div class="password-strength">
                                    <div class="password-strength-bar" id="password-strength-bar"></div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="user-confirm-password">Confirmar Nueva Contraseña</label>
                                <input type="password" id="user-confirm-password" name="confirmPassword">
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h3><i class="fas fa-user-tag"></i> Rol y Estado</h3>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="user-role">Rol del Usuario *</label>
                                <select id="user-role" name="role" required onchange="updatePermissionsForRole(this.value)">
                                    <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Administrador</option>
                                    <option value="manager" ${user.role === 'manager' ? 'selected' : ''}>Gerente</option>
                                    <option value="employee" ${user.role === 'employee' ? 'selected' : ''}>Empleado</option>
                                    <option value="viewer" ${user.role === 'viewer' ? 'selected' : ''}>Visualizador</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="user-status">Estado</label>
                                <select id="user-status" name="status">
                                    <option value="active" ${user.status === 'active' ? 'selected' : ''}>Activo</option>
                                    <option value="inactive" ${user.status === 'inactive' ? 'selected' : ''}>Inactivo</option>
                                    <option value="suspended" ${user.status === 'suspended' ? 'selected' : ''}>Suspendido</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h3><i class="fas fa-shield-alt"></i> Permisos de Acceso</h3>
                        <div class="permissions-grid" id="permissions-grid">
                            ${renderPermissionsCheckboxes(user.permissions)}
                        </div>
                    </div>
                    
                    <div class="modal-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeModal()">
                            <i class="fas fa-times"></i> Cancelar
                        </button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

// Renderizar checkboxes de permisos
function renderPermissionsCheckboxes(userPermissions = []) {
    const allPermissions = [
        { id: 'dashboard', name: 'Dashboard', icon: 'fa-chart-line' },
        { id: 'cotizaciones', name: 'Cotizaciones', icon: 'fa-file-invoice' },
        { id: 'facturas', name: 'Facturas', icon: 'fa-receipt' },
        { id: 'gastos', name: 'Gastos', icon: 'fa-money-bill-wave' },
        { id: 'inventario', name: 'Inventario', icon: 'fa-boxes' },
        { id: 'usuarios', name: 'Gestión de Usuarios', icon: 'fa-users' },
        { id: 'configuracion', name: 'Configuración', icon: 'fa-cog' }
    ];
    
    return allPermissions.map(permission => `
        <div class="permission-checkbox">
            <input type="checkbox" id="perm-${permission.id}" name="permissions" 
                   value="${permission.id}" ${userPermissions.includes(permission.id) ? 'checked' : ''}>
            <label for="perm-${permission.id}">
                <i class="fas ${permission.icon}"></i> ${permission.name}
            </label>
        </div>
    `).join('');
}

// Actualizar permisos según el rol seleccionado
function updatePermissionsForRole(role) {
    const rolePermissions = {
        admin: ['dashboard', 'cotizaciones', 'facturas', 'gastos', 'inventario', 'usuarios', 'configuracion'],
        manager: ['dashboard', 'cotizaciones', 'facturas', 'gastos', 'inventario'],
        employee: ['dashboard', 'cotizaciones', 'inventario'],
        viewer: ['dashboard']
    };
    
    const permissions = rolePermissions[role] || [];
    
    // Actualizar checkboxes
    document.querySelectorAll('input[name="permissions"]').forEach(checkbox => {
        checkbox.checked = permissions.includes(checkbox.value);
    });
}

// Verificar fortaleza de contraseña
function checkPasswordStrength(password) {
    const bar = document.getElementById('password-strength-bar');
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password)
    };
    
    // Actualizar indicadores visuales
    Object.keys(requirements).forEach(req => {
        const element = document.getElementById(`req-${req}`);
        if (element) {
            element.className = requirements[req] ? 'valid' : '';
        }
    });
    
    // Calcular fuerza
    const validRequirements = Object.values(requirements).filter(Boolean).length;
    
    if (validRequirements < 2) {
        bar.className = 'password-strength-bar weak';
    } else if (validRequirements < 4) {
        bar.className = 'password-strength-bar medium';
    } else {
        bar.className = 'password-strength-bar strong';
    }
}

// Guardar usuario (crear o editar)
function saveUser(event, userId = null) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        role: formData.get('role'),
        status: formData.get('status'),
        permissions: formData.getAll('permissions')
    };
    
    // Validaciones
    if (!userData.name || !userData.email || !userData.role) {
        alert('Por favor completa todos los campos obligatorios');
        return;
    }
    
    // Validar email único
    const existingUser = users.find(u => u.email === userData.email && u.id !== userId);
    if (existingUser) {
        alert('Ya existe un usuario con este correo electrónico');
        return;
    }
    
    // Validar contraseña si es necesaria
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    if (userId === null && !password) {
        alert('La contraseña es obligatoria para nuevos usuarios');
        return;
    }
    
    if (password && password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }
    
    if (password && password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres');
        return;
    }
    
    // Crear o actualizar usuario
    if (userId === null) {
        // Crear nuevo usuario
        const newUser = {
            id: Math.max(...users.map(u => u.id)) + 1,
            ...userData,
            createdAt: new Date().toISOString().split('T')[0],
            lastLogin: null
        };
        users.push(newUser);
        showNotification('Usuario creado exitosamente', 'success');
    } else {
        // Actualizar usuario existente
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...userData };
            showNotification('Usuario actualizado exitosamente', 'success');
        }
    }
    
    // Cerrar modal y actualizar vista
    closeModal();
    updateUsersStats();
    filterUsers(); // Esto también renderiza la lista
}

// Cambiar estado de usuario
function toggleUserStatus(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    const newStatus = user.status === 'active' ? 'suspended' : 'active';
    const action = newStatus === 'active' ? 'activar' : 'suspender';
    
    if (confirm(`¿Estás seguro de ${action} a ${user.name}?`)) {
        user.status = newStatus;
        updateUsersStats();
        renderUsers();
        showNotification(`Usuario ${newStatus === 'active' ? 'activado' : 'suspendido'} exitosamente`, 'success');
    }
}

// Eliminar usuario
function deleteUser(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    if (user.id === currentUser.id) {
        alert('No puedes eliminar tu propio usuario');
        return;
    }
    
    if (confirm(`¿Estás seguro de eliminar al usuario ${user.name}?\n\nEsta acción no se puede deshacer.`)) {
        users = users.filter(u => u.id !== userId);
        updateUsersStats();
        filterUsers();
        showNotification('Usuario eliminado exitosamente', 'success');
    }
}
