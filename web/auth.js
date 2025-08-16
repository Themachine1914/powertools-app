// Sistema de Usuarios PowerTools
let users = [
    {
        id: 1,
        username: 'admin',
        fullName: 'Administrador PowerTools',
        email: 'admin@powertools.com',
        phone: '+1 (555) 000-0001',
        password: 'admin123', // En producción esto estaría hasheado
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

let currentUser = null;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    loadUsersFromStorage();
    checkExistingSession();
});

// Cargar usuarios del localStorage
function loadUsersFromStorage() {
    const savedUsers = localStorage.getItem('powertools_users');
    if (savedUsers) {
        users = JSON.parse(savedUsers);
    }
}

// Guardar usuarios en localStorage
function saveUsersToStorage() {
    localStorage.setItem('powertools_users', JSON.stringify(users));
}

// Verificar sesión existente
function checkExistingSession() {
    const savedSession = localStorage.getItem('powertools_session');
    if (savedSession) {
        const session = JSON.parse(savedSession);
        const user = users.find(u => u.id === session.userId);
        if (user && session.expires > Date.now()) {
            currentUser = user;
            redirectToDashboard();
        } else {
            localStorage.removeItem('powertools_session');
        }
    }
}

// Cambiar entre formularios
function showLoginForm() {
    document.getElementById('login-form').classList.add('active');
    document.getElementById('register-form').classList.remove('active');
    document.getElementById('success-message').classList.remove('active');
}

function showRegisterForm() {
    document.getElementById('register-form').classList.add('active');
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('success-message').classList.remove('active');
}

function showSuccessMessage() {
    document.getElementById('success-message').classList.add('active');
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('register-form').classList.remove('active');
}

// Manejar Login
function handleLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const username = formData.get('username').toLowerCase().trim();
    const password = formData.get('password');
    const remember = formData.get('remember');
    
    // Validar campos
    if (!username || !password) {
        showError('Por favor completa todos los campos');
        return;
    }
    
    // Buscar usuario
    const user = users.find(u => 
        (u.username.toLowerCase() === username || u.email.toLowerCase() === username) &&
        u.password === password
    );
    
    if (!user) {
        showError('Usuario o contraseña incorrectos');
        return;
    }
    
    if (user.status !== 'active') {
        showError('Tu cuenta está pendiente de aprobación');
        return;
    }
    
    // Login exitoso
    currentUser = user;
    user.lastLogin = new Date().toISOString();
    saveUsersToStorage();
    
    // Crear sesión
    const sessionData = {
        userId: user.id,
        expires: Date.now() + (remember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000) // 30 días o 1 día
    };
    localStorage.setItem('powertools_session', JSON.stringify(sessionData));
    
    showSuccess('¡Bienvenido de vuelta!');
    
    setTimeout(() => {
        redirectToDashboard();
    }, 1500);
}

// Manejar Registro
function handleRegister(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const userData = {
        fullName: formData.get('fullName').trim(),
        username: formData.get('username').toLowerCase().trim(),
        email: formData.get('email').toLowerCase().trim(),
        phone: formData.get('phone').trim(),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        role: formData.get('role'),
        terms: formData.get('terms')
    };
    
    // Validaciones
    const validation = validateRegistration(userData);
    if (!validation.isValid) {
        showError(validation.message);
        return;
    }
    
    // Verificar si el usuario ya existe
    const existingUser = users.find(u => 
        u.username === userData.username || u.email === userData.email
    );
    
    if (existingUser) {
        showError('Ya existe un usuario con ese nombre de usuario o correo');
        return;
    }
    
    // Crear nuevo usuario
    const newUser = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        username: userData.username,
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        password: userData.password, // En producción esto se hashearía
        role: userData.role,
        status: 'pending', // Requiere aprobación del admin
        createdAt: new Date().toISOString().split('T')[0],
        lastLogin: null
    };
    
    users.push(newUser);
    saveUsersToStorage();
    
    showSuccessMessage();
    
    // Enviar notificación al admin (simulado)
    notifyAdminNewUser(newUser);
}

// Validar datos de registro
function validateRegistration(data) {
    if (!data.fullName || data.fullName.length < 2) {
        return { isValid: false, message: 'El nombre debe tener al menos 2 caracteres' };
    }
    
    if (!data.username || data.username.length < 3) {
        return { isValid: false, message: 'El nombre de usuario debe tener al menos 3 caracteres' };
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(data.username)) {
        return { isValid: false, message: 'El nombre de usuario solo puede contener letras, números y guiones bajos' };
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        return { isValid: false, message: 'Por favor ingresa un correo válido' };
    }
    
    if (!data.phone || data.phone.length < 10) {
        return { isValid: false, message: 'Por favor ingresa un teléfono válido' };
    }
    
    if (!data.password || data.password.length < 6) {
        return { isValid: false, message: 'La contraseña debe tener al menos 6 caracteres' };
    }
    
    if (data.password !== data.confirmPassword) {
        return { isValid: false, message: 'Las contraseñas no coinciden' };
    }
    
    if (!data.role) {
        return { isValid: false, message: 'Por favor selecciona un rol' };
    }
    
    if (!data.terms) {
        return { isValid: false, message: 'Debes aceptar los términos y condiciones' };
    }
    
    return { isValid: true };
}

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notificar al admin sobre nuevo usuario (simulado)
function notifyAdminNewUser(user) {
    console.log(`📧 Notificación enviada al admin: Nuevo usuario ${user.fullName} (${user.email}) solicita acceso como ${user.role}`);
    
    // En una aplicación real, esto enviaría un email o notificación push
    showSuccess('Registro exitoso. El administrador será notificado para aprobar tu cuenta.');
}

// Redireccionar al dashboard
function redirectToDashboard() {
    window.location.href = 'index.html';
}

// Funciones de notificación
function showError(message) {
    showNotification(message, 'error');
}

function showSuccess(message) {
    showNotification(message, 'success');
}

function showNotification(message, type = 'info') {
    // Remover notificaciones existentes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'error' ? 'fas fa-exclamation-circle' : 
                 type === 'success' ? 'fas fa-check-circle' : 'fas fa-info-circle';
    
    const bgColor = type === 'error' ? '#E74C3C' : 
                    type === 'success' ? '#27AE60' : '#FF6B35';
    
    notification.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 10001;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 500;
        animation: slideInNotification 0.3s ease;
        max-width: 400px;
    `;
    
    // Añadir estilos de animación
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInNotification {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            @keyframes slideOutNotification {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100px);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutNotification 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Funciones para el dashboard (para usar después del login)
function getCurrentUser() {
    return currentUser;
}

function logout() {
    currentUser = null;
    localStorage.removeItem('powertools_session');
    window.location.href = 'login.html';
}

function hasPermission(permission) {
    if (!currentUser) return false;
    
    const permissions = {
        'admin': ['create', 'read', 'update', 'delete', 'manage_users', 'manage_settings'],
        'empleado': ['create', 'read', 'update', 'manage_inventory', 'manage_sales', 'manage_quotes'],
        'vendedor': ['read', 'create_sales', 'create_quotes', 'view_inventory'],
        'lectura': ['read']
    };
    
    return permissions[currentUser.role]?.includes(permission) || false;
}

// Funciones de gestión de usuarios (para el panel de admin)
function getAllUsers() {
    return users;
}

function getUserById(id) {
    return users.find(u => u.id === id);
}

function updateUserStatus(userId, status) {
    const user = users.find(u => u.id === userId);
    if (user) {
        user.status = status;
        saveUsersToStorage();
        return true;
    }
    return false;
}

function deleteUser(userId) {
    const index = users.findIndex(u => u.id === userId);
    if (index > -1) {
        users.splice(index, 1);
        saveUsersToStorage();
        return true;
    }
    return false;
}

function updateUser(userId, userData) {
    const user = users.find(u => u.id === userId);
    if (user) {
        Object.assign(user, userData);
        saveUsersToStorage();
        return true;
    }
    return false;
}

// Exportar funciones para uso global
window.PowerToolsAuth = {
    getCurrentUser,
    logout,
    hasPermission,
    getAllUsers,
    getUserById,
    updateUserStatus,
    deleteUser,
    updateUser,
    showNotification
};
