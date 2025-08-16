// Datos de ejemplo
let products = [
    {
        id: 1,
        name: "Taladro Inalámbrico Bosch",
        price: 89.99,
        stock: 15,
        category: "herramientas-electricas",
        description: "Taladro inalámbrico profesional con batería de litio"
    },
    {
        id: 2,
        name: "Martillo de Carpintero",
        price: 24.99,
        stock: 8,
        category: "herramientas-manuales",
        description: "Martillo de carpintero con mango de madera"
    },
    {
        id: 3,
        name: "Sierra Circular",
        price: 156.50,
        stock: 5,
        category: "herramientas-electricas",
        description: "Sierra circular para cortes precisos"
    },
    {
        id: 4,
        name: "Casco de Seguridad",
        price: 18.99,
        stock: 25,
        category: "seguridad",
        description: "Casco de seguridad industrial"
    }
];

let quotations = [
    {
        id: 1,
        client: "Constructora ABC",
        date: "2024-03-15",
        status: "pendiente",
        total: 1250.00,
        items: [
            { product: "Taladro Inalámbrico Bosch", quantity: 5, price: 89.99 },
            { product: "Martillo de Carpintero", quantity: 10, price: 24.99 }
        ]
    }
];

let expenses = [
    {
        id: 1,
        description: "Compra de inventario",
        amount: 2500.00,
        category: "inventario",
        date: "2024-03-10",
        supplier: "Proveedor ABC"
    },
    {
        id: 2,
        description: "Renta del local",
        amount: 800.00,
        category: "servicios",
        date: "2024-03-01",
        supplier: "Inmobiliaria XYZ"
    }
];

let sales = [
    {
        id: 1,
        client: "Juan Pérez",
        date: "2024-03-15",
        total: 89.99,
        profit: 25.00,
        items: [
            { product: "Taladro Inalámbrico Bosch", quantity: 1, price: 89.99 }
        ]
    }
];

// Navegación
document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    initializeApp();
    setupNavigation();
    setupEventListeners();
    renderDashboard();
    setupUserInterface();
});

// Verificar autenticación
function checkAuthentication() {
    // Para la versión de desarrollo, crear sesión automáticamente
    const session = localStorage.getItem('powertools_session');
    
    if (!session) {
        // Crear sesión automática para desarrollo
        const autoSession = {
            userId: 1,
            user: {
                id: 1,
                username: 'admin',
                fullName: 'Administrador PowerTools',
                email: 'admin@powertools.com',
                role: 'admin'
            },
            expires: Date.now() + (24 * 60 * 60 * 1000) // 24 horas
        };
        localStorage.setItem('powertools_session', JSON.stringify(autoSession));
        return;
    }
    
    try {
        const sessionData = JSON.parse(session);
        if (sessionData.expires < Date.now()) {
            localStorage.removeItem('powertools_session');
            checkAuthentication(); // Recursivo para crear nueva sesión
        }
    } catch (error) {
        localStorage.removeItem('powertools_session');
        checkAuthentication(); // Recursivo para crear nueva sesión
    }
}

// Configurar interfaz de usuario
function setupUserInterface() {
    const currentUser = getCurrentUser();
    if (currentUser) {
        // Actualizar nombre de usuario en el header
        const userInfo = document.querySelector('.user-info span');
        if (userInfo) {
            userInfo.textContent = `Bienvenido, ${currentUser.fullName}`;
        }
        
        // Configurar permisos de interfaz
        setupPermissions(currentUser.role);
    }
}

// Configurar permisos según el rol
function setupPermissions(role) {
    const restrictedElements = {
        'lectura': [
            'button[onclick="openProductModal()"]',
            'button[onclick="openQuotationModal()"]',
            'button[onclick="openExpenseModal()"]',
            'button[onclick="openSaleModal()"]'
        ],
        'vendedor': [
            'button[onclick="openExpenseModal()"]'
        ],
        'empleado': [],
        'admin': []
    };
    
    if (restrictedElements[role]) {
        restrictedElements[role].forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.display = 'none';
            }
        });
    }
    
    // Agregar opción de gestión de usuarios solo para admin
    if (role === 'admin') {
        addUserManagementOption();
    }
}

// Agregar opción de gestión de usuarios para admin
function addUserManagementOption() {
    const navMenu = document.querySelector('.nav-menu');
    
    // Verificar si ya existe para evitar duplicados
    if (document.querySelector('[data-section="users"]')) {
        return;
    }
    
    const usersNavItem = document.createElement('li');
    usersNavItem.className = 'nav-item';
    usersNavItem.setAttribute('data-section', 'users');
    usersNavItem.onclick = function() { navigateToSection('users', this); };
    usersNavItem.innerHTML = `
        <i class="fas fa-users"></i>
        <span>Usuarios</span>
    `;
    
    navMenu.appendChild(usersNavItem);
    
    // Agregar sección de usuarios
    const mainContent = document.querySelector('.main-content');
    
    // Verificar si ya existe la sección
    if (document.getElementById('users')) {
        return;
    }
    
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

function initializeApp() {
    // Cargar datos del localStorage si existen
    const savedProducts = localStorage.getItem('powertools_products');
    if (savedProducts) {
        products = JSON.parse(savedProducts);
    }
    
    const savedQuotations = localStorage.getItem('powertools_quotations');
    if (savedQuotations) {
        quotations = JSON.parse(savedQuotations);
    }
    
    const savedExpenses = localStorage.getItem('powertools_expenses');
    if (savedExpenses) {
        expenses = JSON.parse(savedExpenses);
    }
    
    const savedSales = localStorage.getItem('powertools_sales');
    if (savedSales) {
        sales = JSON.parse(savedSales);
    }
}

function saveData() {
    localStorage.setItem('powertools_products', JSON.stringify(products));
    localStorage.setItem('powertools_quotations', JSON.stringify(quotations));
    localStorage.setItem('powertools_expenses', JSON.stringify(expenses));
    localStorage.setItem('powertools_sales', JSON.stringify(sales));
}

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        // Remover cualquier listener existente y agregar uno nuevo
        item.removeEventListener('click', handleNavClick);
        item.addEventListener('click', handleNavClick);
    });
    
    // Configurar navegación después de agregar elementos dinámicos
    setTimeout(() => {
        const allNavItems = document.querySelectorAll('.nav-item');
        allNavItems.forEach(item => {
            item.removeEventListener('click', handleNavClick);
            item.addEventListener('click', handleNavClick);
        });
    }, 200);
}

// Función separada para manejar clicks de navegación
function handleNavClick(event) {
    const item = event.currentTarget;
    const section = item.getAttribute('data-section');
    
    if (section) {
        showSection(section);
        
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
    }
}

// Función global para navegación (puede ser llamada desde HTML)
function navigateToSection(sectionName, element) {
    showSection(sectionName);
    
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    if (element) {
        element.classList.add('active');
    }
}

function showSection(sectionName) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Render content based on section
        switch(sectionName) {
            case 'dashboard':
                renderDashboard();
                break;
            case 'inventory':
                renderProducts();
                break;
            case 'quotations':
                renderQuotations();
                break;
            case 'expenses':
                renderExpenses();
                break;
            case 'sales':
                renderSales();
                break;
            case 'users':
                renderUsers();
                break;
        }
    }
}

function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('search-products');
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }
    
    // Category filter
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    // Modal close
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('close-modal')) {
            closeModal();
        }
    });
}

// Dashboard
function renderDashboard() {
    updateStats();
    renderRecentActivities();
    renderSalesChart();
}

function updateStats() {
    document.getElementById('total-products').textContent = products.length;
    document.getElementById('monthly-sales').textContent = `$${sales.reduce((sum, sale) => sum + sale.total, 0).toLocaleString()}`;
    document.getElementById('pending-quotes').textContent = quotations.filter(q => q.status === 'pendiente').length;
    document.getElementById('low-stock').textContent = products.filter(p => p.stock < 10).length;
}

function renderRecentActivities() {
    const container = document.getElementById('recent-activities');
    const activities = [
        { type: 'sale', icon: 'fas fa-shopping-cart', color: '#27AE60', title: 'Nueva venta', subtitle: 'Juan Pérez - $89.99', time: 'Hace 2 horas' },
        { type: 'quote', icon: 'fas fa-file-invoice', color: '#F39C12', title: 'Cotización enviada', subtitle: 'Constructora ABC - $1,250', time: 'Hace 4 horas' },
        { type: 'inventory', icon: 'fas fa-boxes', color: '#FF6B35', title: 'Stock actualizado', subtitle: 'Taladro Inalámbrico', time: 'Hace 6 horas' },
        { type: 'expense', icon: 'fas fa-wallet', color: '#E74C3C', title: 'Gasto registrado', subtitle: 'Renta del local - $800', time: 'Hace 1 día' }
    ];
    
    container.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon" style="background-color: ${activity.color}">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-info">
                <strong>${activity.title}</strong>
                <span>${activity.subtitle} • ${activity.time}</span>
            </div>
        </div>
    `).join('');
}

function renderSalesChart() {
    const ctx = document.getElementById('salesChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Oct', 'Nov', 'Dic', 'Ene', 'Feb', 'Mar'],
                datasets: [{
                    label: 'Ventas ($)',
                    data: [12000, 15000, 18000, 22000, 25000, 25680],
                    borderColor: '#FF6B35',
                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
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
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
}

// Products/Inventory
function renderProducts() {
    const container = document.getElementById('products-grid');
    const filteredProducts = filterProductsList();
    
    container.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <i class="fas fa-tools"></i>
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${product.price}</div>
                <div class="product-stock">
                    <span>Stock: ${product.stock}</span>
                    <span class="stock-badge ${getStockLevel(product.stock)}">${getStockText(product.stock)}</span>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary btn-sm" onclick="editProduct(${product.id})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterProducts() {
    renderProducts();
}

function filterProductsList() {
    const searchTerm = document.getElementById('search-products')?.value.toLowerCase() || '';
    const category = document.getElementById('category-filter')?.value || '';
    
    return products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || product.category === category;
        return matchesSearch && matchesCategory;
    });
}

function getStockLevel(stock) {
    if (stock >= 15) return 'stock-high';
    if (stock >= 5) return 'stock-medium';
    return 'stock-low';
}

function getStockText(stock) {
    if (stock >= 15) return 'Alto';
    if (stock >= 5) return 'Medio';
    return 'Bajo';
}

// Product Modal
function openProductModal(productId = null) {
    const product = productId ? products.find(p => p.id === productId) : null;
    const isEdit = !!product;
    
    const modalContent = `
        <div class="modal-header">
            <h2>${isEdit ? 'Editar Producto' : 'Nuevo Producto'}</h2>
            <button class="close-modal">&times;</button>
        </div>
        <form onsubmit="saveProduct(event, ${productId})">
            <div class="form-group">
                <label>Nombre del Producto</label>
                <input type="text" name="name" value="${product?.name || ''}" required>
            </div>
            <div class="form-group">
                <label>Precio</label>
                <input type="number" name="price" step="0.01" value="${product?.price || ''}" required>
            </div>
            <div class="form-group">
                <label>Stock</label>
                <input type="number" name="stock" value="${product?.stock || ''}" required>
            </div>
            <div class="form-group">
                <label>Categoría</label>
                <select name="category" required>
                    <option value="">Seleccionar categoría</option>
                    <option value="herramientas-manuales" ${product?.category === 'herramientas-manuales' ? 'selected' : ''}>Herramientas Manuales</option>
                    <option value="herramientas-electricas" ${product?.category === 'herramientas-electricas' ? 'selected' : ''}>Herramientas Eléctricas</option>
                    <option value="materiales" ${product?.category === 'materiales' ? 'selected' : ''}>Materiales</option>
                    <option value="seguridad" ${product?.category === 'seguridad' ? 'selected' : ''}>Seguridad</option>
                </select>
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea name="description">${product?.description || ''}</textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn btn-primary">${isEdit ? 'Actualizar' : 'Guardar'}</button>
            </div>
        </form>
    `;
    
    showModal(modalContent);
}

function saveProduct(event, productId) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const productData = {
        name: formData.get('name'),
        price: parseFloat(formData.get('price')),
        stock: parseInt(formData.get('stock')),
        category: formData.get('category'),
        description: formData.get('description')
    };
    
    if (productId) {
        // Edit existing product
        const index = products.findIndex(p => p.id === productId);
        products[index] = { ...products[index], ...productData };
    } else {
        // Add new product
        const newId = Math.max(...products.map(p => p.id), 0) + 1;
        products.push({ id: newId, ...productData });
    }
    
    saveData();
    renderProducts();
    closeModal();
    
    showNotification(productId ? 'Producto actualizado' : 'Producto agregado', 'success');
}

function editProduct(productId) {
    openProductModal(productId);
}

function deleteProduct(productId) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        products = products.filter(p => p.id !== productId);
        saveData();
        renderProducts();
        showNotification('Producto eliminado', 'success');
    }
}

// Quotations
function renderQuotations() {
    const container = document.getElementById('quotations-list');
    
    container.innerHTML = quotations.map(quote => `
        <div class="list-item">
            <div class="item-info">
                <div class="item-title">Cotización #${quote.id} - ${quote.client}</div>
                <div class="item-subtitle">
                    ${quote.date} • $${quote.total.toLocaleString()} • 
                    <span class="status-badge status-${quote.status}">${quote.status}</span>
                </div>
            </div>
            <div class="item-actions">
                <button class="btn btn-primary btn-sm" onclick="viewQuotation(${quote.id})">Ver</button>
                <button class="btn btn-secondary btn-sm" onclick="shareQuotation(${quote.id})">Compartir</button>
            </div>
        </div>
    `).join('');
}

function openQuotationModal() {
    const modalContent = `
        <div class="modal-header">
            <h2>Nueva Cotización</h2>
            <button class="close-modal">&times;</button>
        </div>
        <form onsubmit="saveQuotation(event)">
            <div class="form-group">
                <label>Cliente</label>
                <input type="text" name="client" required>
            </div>
            <div class="form-group">
                <label>Fecha</label>
                <input type="date" name="date" value="${new Date().toISOString().split('T')[0]}" required>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn btn-primary">Crear Cotización</button>
            </div>
        </form>
    `;
    
    showModal(modalContent);
}

// Modal system
function showModal(content) {
    document.getElementById('modal-content').innerHTML = content;
    document.getElementById('modal-overlay').classList.add('active');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
}

// Notifications
function showNotification(message, type = 'info') {
    // Simple notification system
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#27AE60' : '#FF6B35'};
        color: white;
        border-radius: 8px;
        z-index: 10001;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Render other sections (simplified for now)
function renderExpenses() {
    const container = document.getElementById('expenses-list');
    container.innerHTML = '<p>Funcionalidad de gastos próximamente...</p>';
}

function renderSales() {
    const container = document.getElementById('sales-list');
    container.innerHTML = '<p>Funcionalidad de ventas próximamente...</p>';
}

// Event handlers for other functions
function openExpenseModal() {
    showNotification('Función de gastos próximamente', 'info');
}

function openSaleModal() {
    showNotification('Función de ventas próximamente', 'info');
}

function viewQuotation(id) {
    showNotification('Ver cotización próximamente', 'info');
}

function shareQuotation(id) {
    showNotification('Compartir cotización próximamente', 'info');
}

function saveQuotation(event) {
    event.preventDefault();
    showNotification('Cotización guardada', 'success');
    closeModal();
}

// Gestión de Usuarios (solo para administradores)
function renderUsers() {
    if (!hasPermissionToManageUsers()) {
        showNotification('No tienes permisos para acceder a esta sección', 'error');
        return;
    }
    
    updateUsersStats();
    renderUsersList();
}

function hasPermissionToManageUsers() {
    const currentUser = getCurrentUser();
    return currentUser && currentUser.role === 'admin';
}

function updateUsersStats() {
    const users = getAllUsersData();
    const activeUsers = users.filter(u => u.status === 'active');
    const pendingUsers = users.filter(u => u.status === 'pending');
    
    const totalElement = document.getElementById('total-users');
    const activeElement = document.getElementById('active-users');
    const pendingElement = document.getElementById('pending-users');
    
    if (totalElement) totalElement.textContent = users.length;
    if (activeElement) activeElement.textContent = activeUsers.length;
    if (pendingElement) pendingElement.textContent = pendingUsers.length;
}

function getAllUsersData() {
    // Obtener usuarios del localStorage
    const savedUsers = localStorage.getItem('powertools_users');
    if (savedUsers) {
        return JSON.parse(savedUsers);
    }
    
    // Si no hay usuarios guardados, usar los usuarios por defecto
    return [
        {
            id: 1,
            username: 'admin',
            fullName: 'Administrador PowerTools',
            email: 'admin@powertools.com',
            phone: '+1 (555) 000-0001',
            password: 'admin123',
            role: 'admin',
            status: 'active',
            createdAt: '2024-01-01',
            lastLogin: '2024-03-15T10:30:00'
        },
        {
            id: 2,
            username: 'vendedor1',
            fullName: 'Carlos Martínez',
            email: 'carlos@powertools.com',
            phone: '+1 (555) 123-4567',
            password: 'vendedor123',
            role: 'empleado',
            status: 'active',
            createdAt: '2024-02-15',
            lastLogin: '2024-03-14T16:45:00'
        }
    ];
}

function renderUsersList() {
    const container = document.getElementById('users-list');
    if (!container) return;
    
    const users = getAllUsersData();
    
    const getRoleText = (role) => {
        const roles = {
            'admin': 'Administrador',
            'empleado': 'Empleado',
            'vendedor': 'Vendedor',
            'lectura': 'Solo Lectura'
        };
        return roles[role] || role;
    };
    
    const getStatusBadge = (status) => {
        const badges = {
            'active': '<span class="status-badge status-active">Activo</span>',
            'pending': '<span class="status-badge status-pending">Pendiente</span>',
            'inactive': '<span class="status-badge status-inactive">Inactivo</span>'
        };
        return badges[status] || status;
    };
    
    const formatDate = (dateString) => {
        if (!dateString || dateString === 'Nunca') return 'Nunca';
        try {
            return new Date(dateString).toLocaleDateString();
        } catch {
            return 'Nunca';
        }
    };
    
    container.innerHTML = `
        <div class="users-table">
            <div class="table-header">
                <div class="table-row">
                    <div class="table-cell">Usuario</div>
                    <div class="table-cell">Información</div>
                    <div class="table-cell">Rol</div>
                    <div class="table-cell">Estado</div>
                    <div class="table-cell">Último Acceso</div>
                    <div class="table-cell">Acciones</div>
                </div>
            </div>
            <div class="table-body">
                ${users.map(user => `
                    <div class="table-row">
                        <div class="table-cell">
                            <div class="user-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="user-basic">
                                <strong>${user.fullName}</strong>
                                <span>@${user.username}</span>
                            </div>
                        </div>
                        <div class="table-cell">
                            <div class="user-contact">
                                <div><i class="fas fa-envelope"></i> ${user.email}</div>
                                <div><i class="fas fa-phone"></i> ${user.phone}</div>
                            </div>
                        </div>
                        <div class="table-cell">
                            <span class="role-badge role-${user.role}">${getRoleText(user.role)}</span>
                        </div>
                        <div class="table-cell">
                            ${getStatusBadge(user.status)}
                        </div>
                        <div class="table-cell">
                            ${formatDate(user.lastLogin)}
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
                                ${user.role !== 'admin' ? 
                                    `<button class="btn btn-danger btn-sm" onclick="deleteUserConfirm(${user.id})">
                                        <i class="fas fa-trash"></i> Eliminar
                                    </button>` : ''
                                }
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function openUserModal(userId = null) {
    const users = getAllUsersData();
    const user = userId ? users.find(u => u.id === userId) : null;
    const isEdit = !!user;
    
    const modalContent = `
        <div class="modal-header">
            <h2>${isEdit ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
            <button class="close-modal">&times;</button>
        </div>
        <form onsubmit="saveUser(event, ${userId})">
            <div class="form-group">
                <label>Nombre Completo</label>
                <input type="text" name="fullName" value="${user?.fullName || ''}" required>
            </div>
            
            <div class="form-group">
                <label>Nombre de Usuario</label>
                <input type="text" name="username" value="${user?.username || ''}" required>
            </div>
            
            <div class="form-group">
                <label>Correo Electrónico</label>
                <input type="email" name="email" value="${user?.email || ''}" required>
            </div>
            
            <div class="form-group">
                <label>Teléfono</label>
                <input type="tel" name="phone" value="${user?.phone || ''}" required>
            </div>
            
            <div class="form-group">
                <label>Rol</label>
                <select name="role" required>
                    <option value="">Seleccionar rol</option>
                    <option value="admin" ${user?.role === 'admin' ? 'selected' : ''}>Administrador</option>
                    <option value="empleado" ${user?.role === 'empleado' ? 'selected' : ''}>Empleado</option>
                    <option value="vendedor" ${user?.role === 'vendedor' ? 'selected' : ''}>Vendedor</option>
                    <option value="lectura" ${user?.role === 'lectura' ? 'selected' : ''}>Solo Lectura</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Estado</label>
                <select name="status" required>
                    <option value="active" ${user?.status === 'active' ? 'selected' : ''}>Activo</option>
                    <option value="pending" ${user?.status === 'pending' ? 'selected' : ''}>Pendiente</option>
                    <option value="inactive" ${user?.status === 'inactive' ? 'selected' : ''}>Inactivo</option>
                </select>
            </div>
            
            ${!isEdit ? `
                <div class="form-group">
                    <label>Contraseña</label>
                    <input type="password" name="password" required>
                </div>
            ` : ''}
            
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn btn-primary">${isEdit ? 'Actualizar' : 'Crear Usuario'}</button>
            </div>
        </form>
    `;
    
    showModal(modalContent);
}

function saveUser(event, userId) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const userData = {
        fullName: formData.get('fullName'),
        username: formData.get('username'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        role: formData.get('role'),
        status: formData.get('status')
    };
    
    if (!userId) {
        userData.password = formData.get('password');
    }
    
    let users = getAllUsersData();
    let success = false;
    
    if (userId) {
        // Actualizar usuario existente
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex > -1) {
            users[userIndex] = { ...users[userIndex], ...userData };
            success = true;
        }
    } else {
        // Crear nuevo usuario
        const newUser = {
            id: Math.max(...users.map(u => u.id), 0) + 1,
            ...userData,
            createdAt: new Date().toISOString().split('T')[0],
            lastLogin: null
        };
        users.push(newUser);
        success = true;
    }
    
    if (success) {
        localStorage.setItem('powertools_users', JSON.stringify(users));
        renderUsers();
        closeModal();
        showNotification(userId ? 'Usuario actualizado' : 'Usuario creado', 'success');
    } else {
        showNotification('Error al guardar usuario', 'error');
    }
}

function editUser(userId) {
    openUserModal(userId);
}

function approveUser(userId) {
    let users = getAllUsersData();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex > -1) {
        users[userIndex].status = 'active';
        localStorage.setItem('powertools_users', JSON.stringify(users));
        renderUsers();
        showNotification('Usuario aprobado correctamente', 'success');
    }
}

function deleteUserConfirm(userId) {
    const users = getAllUsersData();
    const user = users.find(u => u.id === userId);
    
    if (user && confirm(`¿Estás seguro de que quieres eliminar al usuario "${user.fullName}"?`)) {
        const filteredUsers = users.filter(u => u.id !== userId);
        localStorage.setItem('powertools_users', JSON.stringify(filteredUsers));
        renderUsers();
        showNotification('Usuario eliminado', 'success');
    }
}

// Función para obtener el usuario actual (compatibilidad)
function getCurrentUser() {
    if (window.PowerToolsAuth) {
        return window.PowerToolsAuth.getCurrentUser();
    }
    
    // Fallback si no está disponible el auth
    const session = localStorage.getItem('powertools_session');
    if (session) {
        const sessionData = JSON.parse(session);
        const users = JSON.parse(localStorage.getItem('powertools_users') || '[]');
        return users.find(u => u.id === sessionData.userId);
    }
    return null;
}

// Función de logout
function logout() {
    if (window.PowerToolsAuth) {
        window.PowerToolsAuth.logout();
    } else {
        localStorage.removeItem('powertools_session');
        window.location.href = 'login.html';
    }
}

// Toggle del menú de usuario
function toggleUserMenu() {
    const menu = document.getElementById('user-menu');
    menu.classList.toggle('active');
}

// Cerrar menú de usuario al hacer click fuera
document.addEventListener('click', function(e) {
    const userMenu = document.getElementById('user-menu');
    const userMenuToggle = document.querySelector('.user-menu-toggle');
    
    if (userMenu && userMenuToggle && !userMenuToggle.contains(e.target)) {
        userMenu.classList.remove('active');
    }
});

// Mostrar perfil de usuario
function showUserProfile() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    const modalContent = `
        <div class="modal-header">
            <h2>Mi Perfil</h2>
            <button class="close-modal">&times;</button>
        </div>
        <form onsubmit="updateUserProfile(event)">
            <div class="form-group">
                <label>Nombre Completo</label>
                <input type="text" name="fullName" value="${currentUser.fullName}" required>
            </div>
            
            <div class="form-group">
                <label>Nombre de Usuario</label>
                <input type="text" name="username" value="${currentUser.username}" readonly style="background-color: #f0f0f0;">
            </div>
            
            <div class="form-group">
                <label>Correo Electrónico</label>
                <input type="email" name="email" value="${currentUser.email}" required>
            </div>
            
            <div class="form-group">
                <label>Teléfono</label>
                <input type="tel" name="phone" value="${currentUser.phone}" required>
            </div>
            
            <div class="form-group">
                <label>Rol</label>
                <input type="text" value="${getRoleText(currentUser.role)}" readonly style="background-color: #f0f0f0;">
            </div>
            
            <div class="form-group">
                <label>Nueva Contraseña (opcional)</label>
                <input type="password" name="newPassword" placeholder="Dejar en blanco para no cambiar">
            </div>
            
            <div class="form-group">
                <label>Confirmar Nueva Contraseña</label>
                <input type="password" name="confirmPassword" placeholder="Confirmar nueva contraseña">
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn btn-primary">Actualizar Perfil</button>
            </div>
        </form>
    `;
    
    showModal(modalContent);
    toggleUserMenu(); // Cerrar el menú
}

// Actualizar perfil de usuario
function updateUserProfile(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const currentUser = getCurrentUser();
    
    const userData = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone')
    };
    
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmPassword');
    
    let users = getAllUsersData();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex > -1) {
        users[userIndex] = { ...users[userIndex], ...userData };
        localStorage.setItem('powertools_users', JSON.stringify(users));
        
        // Actualizar la sesión con la nueva información
        const session = JSON.parse(localStorage.getItem('powertools_session'));
        session.user = users[userIndex];
        localStorage.setItem('powertools_session', JSON.stringify(session));
        
        closeModal();
        showNotification('Perfil actualizado correctamente', 'success');
        
        // Actualizar el nombre en la interfaz
        setupUserInterface();
    } else {
        showNotification('Error al actualizar el perfil', 'error');
    }
}

// Función para obtener texto del rol
function getRoleText(role) {
    const roles = {
        'admin': 'Administrador',
        'empleado': 'Empleado',
        'vendedor': 'Vendedor',
        'lectura': 'Solo Lectura'
    };
    return roles[role] || role;
}

// Sistema de modales mejorado
function showModal(content) {
    let modal = document.getElementById('modal-overlay');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-overlay';
        modal.className = 'modal-overlay';
        modal.innerHTML = '<div class="modal-content" id="modal-content"></div>';
        document.body.appendChild(modal);
    }
    
    document.getElementById('modal-content').innerHTML = content;
    modal.classList.add('active');
    
    // Cerrar modal al hacer clic fuera
    modal.onclick = function(e) {
        if (e.target === modal) {
            closeModal();
        }
    };
    
    // Configurar botón de cerrar
    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }
}

// Función para cerrar modal
function closeModal() {
    const modal = document.getElementById('modal-overlay');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Sistema de notificaciones mejorado
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#27AE60' : type === 'error' ? '#E74C3C' : '#FF6B35'};
        color: white;
        border-radius: 8px;
        z-index: 10001;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Funciones de compatibilidad y utilidades
function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
}
