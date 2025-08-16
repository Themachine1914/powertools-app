import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Modal, TextInput, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  // Estados principales
  const [activeTab, setActiveTab] = useState('dashboard');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  
  // Estados de datos
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin Principal', email: 'admin@powertools.com', role: 'admin', status: 'active' },
    { id: 2, name: 'Carlos Manager', email: 'carlos@powertools.com', role: 'manager', status: 'active' }
  ]);
  
  const [quotations, setQuotations] = useState([
    { id: 1, number: 'COT-001', client: 'Constructora ABC', total: 2500, status: 'pending' }
  ]);
  
  const [products, setProducts] = useState([
    { id: 1, code: 'PROD-001', name: 'Taladro Profesional', stock: 15, price: 85 },
    { id: 2, code: 'PROD-002', name: 'Llave Inglesa Set', stock: 8, price: 25 },
    { id: 3, code: 'PROD-003', name: 'Martillo de Acero', stock: 12, price: 35 },
    { id: 4, code: 'PROD-004', name: 'Destornillador Set', stock: 20, price: 18 },
    { id: 5, code: 'PROD-005', name: 'Sierra Circular', stock: 5, price: 150 },
    { id: 6, code: 'PROD-006', name: 'Nivel de Burbuja', stock: 10, price: 12 }
  ]);
  
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Combustible', amount: 45, date: '2025-08-10', provider: 'Estación Shell' }
  ]);
  
  const [sales, setSales] = useState([
    { id: 1, invoice: 'FAC-001', client: 'Juan Pérez', total: 340, payment: 'efectivo', status: 'paid' }
  ]);

  // Estados del formulario
  const [formData, setFormData] = useState({});

  // Cargar datos al inicio
  useEffect(() => {
    loadData();
  }, []);

  // Funciones de persistencia
  const saveData = async () => {
    try {
      await AsyncStorage.multiSet([
        ['powertools_users', JSON.stringify(users)],
        ['powertools_quotations', JSON.stringify(quotations)],
        ['powertools_products', JSON.stringify(products)],
        ['powertools_expenses', JSON.stringify(expenses)],
        ['powertools_sales', JSON.stringify(sales)]
      ]);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const loadData = async () => {
    try {
      const keys = ['powertools_users', 'powertools_quotations', 'powertools_products', 'powertools_expenses', 'powertools_sales'];
      const values = await AsyncStorage.multiGet(keys);
      
      values.forEach(([key, value]) => {
        if (value) {
          const data = JSON.parse(value);
          switch (key) {
            case 'powertools_users': setUsers(data); break;
            case 'powertools_quotations': setQuotations(data); break;
            case 'powertools_products': setProducts(data); break;
            case 'powertools_expenses': setExpenses(data); break;
            case 'powertools_sales': setSales(data); break;
          }
        }
      });
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  // Guardar datos cuando cambien
  useEffect(() => { saveData(); }, [users, quotations, products, expenses, sales]);

  // Funciones para mostrar modales
  const showModal = (type) => {
    setModalType(type);
    setFormData({});
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setFormData({});
  };

  // Funciones CRUD
  const saveUser = () => {
    if (!formData.name || !formData.email || !formData.role) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }
    
    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      phone: formData.phone || '',
      status: 'active'
    };
    
    setUsers(prev => [...prev, newUser]);
    closeModal();
    Alert.alert('Éxito', `Usuario ${newUser.name} creado exitosamente`);
  };

  const saveQuotation = () => {
    if (!formData.client || !formData.product || !formData.quantity) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }
    
    const selectedProduct = products.find(p => p.id === parseInt(formData.product));
    const total = selectedProduct.price * parseInt(formData.quantity);
    
    const newQuotation = {
      id: Date.now(),
      number: `COT-${String(quotations.length + 1).padStart(3, '0')}`,
      client: formData.client,
      product: selectedProduct.name,
      quantity: parseInt(formData.quantity),
      total: total,
      status: 'pending'
    };
    
    setQuotations(prev => [...prev, newQuotation]);
    closeModal();
    Alert.alert('Éxito', `Cotización ${newQuotation.number} creada`);
  };

  const saveProduct = () => {
    if (!formData.name || !formData.code || !formData.stock || !formData.price) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    
    const newProduct = {
      id: Date.now(),
      code: formData.code,
      name: formData.name,
      stock: parseInt(formData.stock),
      price: parseFloat(formData.price)
    };
    
    setProducts(prev => [...prev, newProduct]);
    closeModal();
    Alert.alert('Éxito', `Producto ${newProduct.name} agregado`);
  };

  const saveExpense = () => {
    if (!formData.description || !formData.amount) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }
    
    const newExpense = {
      id: Date.now(),
      description: formData.description,
      amount: parseFloat(formData.amount),
      date: formData.date || new Date().toISOString().split('T')[0],
      provider: formData.provider || ''
    };
    
    setExpenses(prev => [...prev, newExpense]);
    closeModal();
    Alert.alert('Éxito', `Gasto registrado: $${newExpense.amount}`);
  };

  const saveSale = () => {
    if (!formData.client || !formData.product || !formData.quantity || !formData.payment) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    
    const selectedProduct = products.find(p => p.id === parseInt(formData.product));
    const total = selectedProduct.price * parseInt(formData.quantity);
    
    const newSale = {
      id: Date.now(),
      invoice: `FAC-${String(sales.length + 1).padStart(3, '0')}`,
      client: formData.client,
      product: selectedProduct.name,
      quantity: parseInt(formData.quantity),
      total: total,
      payment: formData.payment,
      status: 'paid'
    };
    
    setSales(prev => [...prev, newSale]);
    closeModal();
    Alert.alert('Éxito', `Venta ${newSale.invoice} registrada`);
  };

  // Función para eliminar
  const deleteItem = (type, id) => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de eliminar este elemento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: () => {
            switch (type) {
              case 'user': setUsers(prev => prev.filter(item => item.id !== id)); break;
              case 'expense': setExpenses(prev => prev.filter(item => item.id !== id)); break;
            }
          }
        }
      ]
    );
  };

  // Función para aprobar cotización
  const approveQuotation = (id) => {
    setQuotations(prev => prev.map(q => 
      q.id === id ? { ...q, status: 'approved' } : q
    ));
    Alert.alert('Éxito', 'Cotización aprobada');
  };

  // Renderizar Dashboard
  const renderDashboard = () => (
    <ScrollView style={styles.content}>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{users.length}</Text>
          <Text style={styles.statLabel}>Usuarios</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{quotations.length}</Text>
          <Text style={styles.statLabel}>Cotizaciones</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{products.length}</Text>
          <Text style={styles.statLabel}>Productos</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>${sales.reduce((sum, sale) => sum + sale.total, 0)}</Text>
          <Text style={styles.statLabel}>Ventas</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📈 Resumen Ejecutivo</Text>
        <Text style={styles.successText}>💾 Todos los datos se guardan automáticamente</Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => showModal('quotation')}>
            <Text style={styles.buttonText}>📋 Nueva Cotización</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.successButton]} onPress={() => showModal('sale')}>
            <Text style={styles.buttonText}>🛒 Nueva Venta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  // Renderizar tabla de usuarios
  const renderUsers = () => (
    <ScrollView style={styles.content}>
      <TouchableOpacity style={styles.addButton} onPress={() => showModal('user')}>
        <Text style={styles.buttonText}>➕ Nuevo Usuario</Text>
      </TouchableOpacity>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 2 }]}>Nombre</Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Rol</Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Acciones</Text>
        </View>

        {users.map(user => (
          <View key={user.id} style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 2 }]}>{user.name}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{user.role}</Text>
            <TouchableOpacity style={[styles.tableCell, { flex: 1 }]} onPress={() => deleteItem('user', user.id)}>
              <Text style={styles.deleteText}>🗑</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  // Renderizar cotizaciones
  const renderQuotations = () => (
    <ScrollView style={styles.content}>
      <TouchableOpacity style={styles.addButton} onPress={() => showModal('quotation')}>
        <Text style={styles.buttonText}>➕ Nueva Cotización</Text>
      </TouchableOpacity>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Número</Text>
          <Text style={[styles.tableHeaderText, { flex: 2 }]}>Cliente</Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Total</Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Estado</Text>
        </View>

        {quotations.map(quotation => (
          <View key={quotation.id} style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1 }]}>{quotation.number}</Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>{quotation.client}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>${quotation.total}</Text>
            <TouchableOpacity style={[styles.tableCell, { flex: 1 }]} onPress={() => approveQuotation(quotation.id)}>
              <Text style={quotation.status === 'pending' ? styles.pendingText : styles.approvedText}>
                {quotation.status === 'pending' ? 'Pendiente' : 'Aprobada'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  // Renderizar productos
  const renderProducts = () => (
    <ScrollView style={styles.content}>
      <TouchableOpacity style={styles.addButton} onPress={() => showModal('product')}>
        <Text style={styles.buttonText}>➕ Nuevo Producto</Text>
      </TouchableOpacity>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 2 }]}>Producto</Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Stock</Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Precio</Text>
        </View>

        {products.map(product => (
          <View key={product.id} style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 2 }]}>{product.name}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{product.stock}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>${product.price}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  // Renderizar gastos
  const renderExpenses = () => (
    <ScrollView style={styles.content}>
      <TouchableOpacity style={styles.addButton} onPress={() => showModal('expense')}>
        <Text style={styles.buttonText}>➕ Nuevo Gasto</Text>
      </TouchableOpacity>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 2 }]}>Descripción</Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Monto</Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Acciones</Text>
        </View>

        {expenses.map(expense => (
          <View key={expense.id} style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 2 }]}>{expense.description}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>${expense.amount}</Text>
            <TouchableOpacity style={[styles.tableCell, { flex: 1 }]} onPress={() => deleteItem('expense', expense.id)}>
              <Text style={styles.deleteText}>🗑</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  // Renderizar ventas
  const renderSales = () => (
    <ScrollView style={styles.content}>
      <TouchableOpacity style={styles.addButton} onPress={() => showModal('sale')}>
        <Text style={styles.buttonText}>➕ Nueva Venta</Text>
      </TouchableOpacity>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Factura</Text>
          <Text style={[styles.tableHeaderText, { flex: 2 }]}>Cliente</Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Total</Text>
        </View>

        {sales.map(sale => (
          <View key={sale.id} style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1 }]}>{sale.invoice}</Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>{sale.client}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>${sale.total}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  // Renderizar contenido según pestaña activa
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'users': return renderUsers();
      case 'quotations': return renderQuotations();
      case 'products': return renderProducts();
      case 'expenses': return renderExpenses();
      case 'sales': return renderSales();
      default: return renderDashboard();
    }
  };

  // Renderizar modal de formulario
  const renderModal = () => {
    const getModalContent = () => {
      switch (modalType) {
        case 'user':
          return (
            <View>
              <Text style={styles.modalTitle}>👤 Nuevo Usuario</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre completo"
                value={formData.name || ''}
                onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={formData.email || ''}
                onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
              />
              <TextInput
                style={styles.input}
                placeholder="Rol (admin/manager/employee)"
                value={formData.role || ''}
                onChangeText={(text) => setFormData(prev => ({ ...prev, role: text }))}
              />
              <TextInput
                style={styles.input}
                placeholder="Teléfono (opcional)"
                value={formData.phone || ''}
                onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.button} onPress={saveUser}>
                  <Text style={styles.buttonText}>💾 Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={closeModal}>
                  <Text style={styles.buttonText}>❌ Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          );

        case 'quotation':
          return (
            <View>
              <Text style={styles.modalTitle}>📋 Nueva Cotización</Text>
              <TextInput
                style={styles.input}
                placeholder="Cliente"
                value={formData.client || ''}
                onChangeText={(text) => setFormData(prev => ({ ...prev, client: text }))}
              />
              <Text style={styles.label}>Producto:</Text>
              <ScrollView style={styles.pickerContainer}>
                {products.map(product => (
                  <TouchableOpacity
                    key={product.id}
                    style={[
                      styles.pickerItem,
                      formData.product === product.id.toString() && styles.pickerItemSelected
                    ]}
                    onPress={() => setFormData(prev => ({ ...prev, product: product.id.toString() }))}
                  >
                    <Text>{product.name} - ${product.price}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TextInput
                style={styles.input}
                placeholder="Cantidad"
                keyboardType="numeric"
                value={formData.quantity || ''}
                onChangeText={(text) => setFormData(prev => ({ ...prev, quantity: text }))}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.button} onPress={saveQuotation}>
                  <Text style={styles.buttonText}>💾 Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={closeModal}>
                  <Text style={styles.buttonText}>❌ Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          );

        case 'product':
          return (
            <View>
              <Text style={styles.modalTitle}>📦 Nuevo Producto</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre del producto"
                value={formData.name || ''}
                onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
              />
              <TextInput
                style={styles.input}
                placeholder="Código"
                value={formData.code || ''}
                onChangeText={(text) => setFormData(prev => ({ ...prev, code: text }))}
              />
              <TextInput
                style={styles.input}
                placeholder="Stock"
                keyboardType="numeric"
                value={formData.stock || ''}
                onChangeText={(text) => setFormData(prev => ({ ...prev, stock: text }))}
              />
              <TextInput
                style={styles.input}
                placeholder="Precio"
                keyboardType="numeric"
                value={formData.price || ''}
                onChangeText={(text) => setFormData(prev => ({ ...prev, price: text }))}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.button} onPress={saveProduct}>
                  <Text style={styles.buttonText}>💾 Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={closeModal}>
                  <Text style={styles.buttonText}>❌ Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          );

        case 'expense':
          return (
            <View>
              <Text style={styles.modalTitle}>💰 Nuevo Gasto</Text>
              <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={formData.description || ''}
                onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
              />
              <TextInput
                style={styles.input}
                placeholder="Monto"
                keyboardType="numeric"
                value={formData.amount || ''}
                onChangeText={(text) => setFormData(prev => ({ ...prev, amount: text }))}
              />
              <TextInput
                style={styles.input}
                placeholder="Proveedor (opcional)"
                value={formData.provider || ''}
                onChangeText={(text) => setFormData(prev => ({ ...prev, provider: text }))}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.button} onPress={saveExpense}>
                  <Text style={styles.buttonText}>💾 Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={closeModal}>
                  <Text style={styles.buttonText}>❌ Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          );

        case 'sale':
          return (
            <View>
              <Text style={styles.modalTitle}>🛒 Nueva Venta</Text>
              <TextInput
                style={styles.input}
                placeholder="Cliente"
                value={formData.client || ''}
                onChangeText={(text) => setFormData(prev => ({ ...prev, client: text }))}
              />
              <Text style={styles.label}>Producto:</Text>
              <ScrollView style={styles.pickerContainer}>
                {products.map(product => (
                  <TouchableOpacity
                    key={product.id}
                    style={[
                      styles.pickerItem,
                      formData.product === product.id.toString() && styles.pickerItemSelected
                    ]}
                    onPress={() => setFormData(prev => ({ ...prev, product: product.id.toString() }))}
                  >
                    <Text>{product.name} - ${product.price}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TextInput
                style={styles.input}
                placeholder="Cantidad"
                keyboardType="numeric"
                value={formData.quantity || ''}
                onChangeText={(text) => setFormData(prev => ({ ...prev, quantity: text }))}
              />
              <Text style={styles.label}>Método de Pago:</Text>
              <View style={styles.pickerContainer}>
                {['efectivo', 'tarjeta', 'transferencia'].map(payment => (
                  <TouchableOpacity
                    key={payment}
                    style={[
                      styles.pickerItem,
                      formData.payment === payment && styles.pickerItemSelected
                    ]}
                    onPress={() => setFormData(prev => ({ ...prev, payment }))}
                  >
                    <Text>{payment.charAt(0).toUpperCase() + payment.slice(1)}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.button} onPress={saveSale}>
                  <Text style={styles.buttonText}>💾 Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={closeModal}>
                  <Text style={styles.buttonText}>❌ Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          );

        default:
          return null;
      }
    };

    return (
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              {getModalContent()}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF6B35" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔧 PowerTools RD</Text>
        <Text style={styles.headerSubtitle}>Sistema de Gestión Empresarial</Text>
      </View>

      {/* Navigation */}
      <View style={styles.nav}>
        <TouchableOpacity
          style={[styles.navButton, activeTab === 'dashboard' && styles.navButtonActive]}
          onPress={() => setActiveTab('dashboard')}
        >
          <Text style={styles.navButtonText}>📊{'\n'}Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, activeTab === 'users' && styles.navButtonActive]}
          onPress={() => setActiveTab('users')}
        >
          <Text style={styles.navButtonText}>👥{'\n'}Usuarios</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, activeTab === 'quotations' && styles.navButtonActive]}
          onPress={() => setActiveTab('quotations')}
        >
          <Text style={styles.navButtonText}>📋{'\n'}Cotizaciones</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, activeTab === 'products' && styles.navButtonActive]}
          onPress={() => setActiveTab('products')}
        >
          <Text style={styles.navButtonText}>📦{'\n'}Inventario</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, activeTab === 'expenses' && styles.navButtonActive]}
          onPress={() => setActiveTab('expenses')}
        >
          <Text style={styles.navButtonText}>💰{'\n'}Gastos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, activeTab === 'sales' && styles.navButtonActive]}
          onPress={() => setActiveTab('sales')}
        >
          <Text style={styles.navButtonText}>🛒{'\n'}Ventas</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {renderContent()}

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          Alert.alert(
            'Acciones Rápidas',
            'Selecciona una acción:',
            [
              { text: 'Nueva Venta', onPress: () => showModal('sale') },
              { text: 'Nueva Cotización', onPress: () => showModal('quotation') },
              { text: 'Nuevo Producto', onPress: () => showModal('product') },
              { text: 'Nuevo Gasto', onPress: () => showModal('expense') },
              { text: 'Cancelar', style: 'cancel' }
            ]
          );
        }}
      >
        <Text style={styles.fabText}>➕</Text>
      </TouchableOpacity>

      {/* Modal */}
      {renderModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  header: {
    backgroundColor: '#FF6B35',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  nav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  navButtonActive: {
    borderBottomColor: '#FF6B35',
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
  },
  navButtonText: {
    fontSize: 10,
    textAlign: 'center',
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FF6B35',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 10,
  },
  successText: {
    color: '#28a745',
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#FF6B35',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    margin: 5,
    flex: 1,
    minWidth: 120,
  },
  successButton: {
    backgroundColor: '#28a745',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#FF6B35',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  table: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    color: '#2E4057',
    fontSize: 14,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  tableCell: {
    fontSize: 14,
    color: '#333',
  },
  deleteText: {
    color: '#dc3545',
    fontSize: 16,
  },
  pendingText: {
    color: '#ffc107',
    fontWeight: 'bold',
  },
  approvedText: {
    color: '#28a745',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#FF6B35',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  fabText: {
    color: 'white',
    fontSize: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  pickerContainer: {
    maxHeight: 150,
    marginBottom: 15,
  },
  pickerItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: '#f8f9fa',
  },
  pickerItemSelected: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
