import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput,
  FlatList,
  Share,
} from 'react-native';
import { Card, FAB, Searchbar, Chip, IconButton, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LineChart, BarChart } from 'react-native-chart-kit';

const SalesScreen = () => {
  const [sales, setSales] = useState([
    {
      id: '1',
      clientName: 'Construcciones García',
      clientPhone: '+1234567890',
      date: '2024-08-05',
      items: [
        { id: '1', name: 'Taladro Inalámbrico DeWalt', quantity: 1, price: 150.00, cost: 120.00 },
        { id: '2', name: 'Juego de Llaves Combinadas', quantity: 1, price: 45.99, cost: 35.00 },
      ],
      subtotal: 195.99,
      discount: 5.99,
      tax: 0,
      total: 190.00,
      paymentMethod: 'Efectivo',
      status: 'Completada',
      notes: 'Cliente frecuente - descuento aplicado',
    },
    {
      id: '2',
      clientName: 'Taller López',
      clientPhone: '+0987654321',
      date: '2024-08-04',
      items: [
        { id: '1', name: 'Martillo de Garra Stanley', quantity: 2, price: 25.50, cost: 20.00 },
      ],
      subtotal: 51.00,
      discount: 0,
      tax: 0,
      total: 51.00,
      paymentMethod: 'Débito',
      status: 'Completada',
      notes: '',
    },
    {
      id: '3',
      clientName: 'Juan Pérez',
      clientPhone: '+1122334455',
      date: '2024-08-06',
      items: [
        { id: '1', name: 'Destornillador Phillips', quantity: 3, price: 8.50, cost: 6.00 },
        { id: '2', name: 'Cinta métrica 5m', quantity: 1, price: 12.99, cost: 9.00 },
      ],
      subtotal: 38.49,
      discount: 0,
      tax: 0,
      total: 38.49,
      paymentMethod: 'Efectivo',
      status: 'Pendiente',
      notes: 'Pago pendiente - acordado para mañana',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Todas');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingSale, setEditingSale] = useState(null);
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    items: [],
    discount: '',
    tax: '',
    paymentMethod: '',
    notes: '',
  });
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    price: '',
    cost: '',
  });

  const statusOptions = ['Todas', 'Completada', 'Pendiente', 'Cancelada'];
  const paymentMethods = ['Efectivo', 'Débito', 'Crédito', 'Transferencia'];

  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sale.id.includes(searchQuery);
    const matchesStatus = selectedStatus === 'Todas' || sale.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const openAddModal = () => {
    setEditingSale(null);
    setFormData({
      clientName: '',
      clientPhone: '',
      items: [],
      discount: '',
      tax: '',
      paymentMethod: '',
      notes: '',
    });
    setModalVisible(true);
  };

  const openEditModal = (sale) => {
    setEditingSale(sale);
    setFormData({
      clientName: sale.clientName,
      clientPhone: sale.clientPhone,
      items: [...sale.items],
      discount: sale.discount.toString(),
      tax: sale.tax.toString(),
      paymentMethod: sale.paymentMethod,
      notes: sale.notes,
    });
    setModalVisible(true);
  };

  const addItemToSale = () => {
    if (!newItem.name || !newItem.quantity || !newItem.price) {
      Alert.alert('Error', 'Por favor completa todos los campos del producto');
      return;
    }

    const item = {
      id: Date.now().toString(),
      name: newItem.name,
      quantity: parseInt(newItem.quantity),
      price: parseFloat(newItem.price),
      cost: parseFloat(newItem.cost) || 0,
    };

    setFormData({
      ...formData,
      items: [...formData.items, item],
    });

    setNewItem({ name: '', quantity: '', price: '', cost: '' });
  };

  const removeItemFromSale = (itemId) => {
    setFormData({
      ...formData,
      items: formData.items.filter(item => item.id !== itemId),
    });
  };

  const calculateTotals = (items, discount = 0, tax = 0) => {
    const subtotal = items.reduce((total, item) => total + (item.quantity * item.price), 0);
    const discountAmount = parseFloat(discount) || 0;
    const taxAmount = parseFloat(tax) || 0;
    const total = subtotal - discountAmount + taxAmount;
    return { subtotal, total };
  };

  const saveSale = () => {
    if (!formData.clientName || formData.items.length === 0) {
      Alert.alert('Error', 'Por favor completa el nombre del cliente y agrega al menos un producto');
      return;
    }

    const { subtotal, total } = calculateTotals(formData.items, formData.discount, formData.tax);

    const saleData = {
      clientName: formData.clientName,
      clientPhone: formData.clientPhone,
      items: formData.items,
      subtotal,
      discount: parseFloat(formData.discount) || 0,
      tax: parseFloat(formData.tax) || 0,
      total,
      paymentMethod: formData.paymentMethod,
      notes: formData.notes,
      date: new Date().toISOString().split('T')[0],
      status: 'Completada',
    };

    if (editingSale) {
      setSales(sales.map(s => 
        s.id === editingSale.id ? { ...s, ...saleData } : s
      ));
      Alert.alert('Éxito', 'Venta actualizada correctamente');
    } else {
      const newSale = {
        ...saleData,
        id: Date.now().toString(),
      };
      setSales([...sales, newSale]);
      Alert.alert('Éxito', 'Venta registrada correctamente');
    }

    setModalVisible(false);
  };

  const deleteSale = (saleId) => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de que quieres eliminar esta venta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setSales(sales.filter(s => s.id !== saleId));
            Alert.alert('Éxito', 'Venta eliminada');
          },
        },
      ]
    );
  };

  const updateSaleStatus = (saleId, newStatus) => {
    setSales(sales.map(s => 
      s.id === saleId ? { ...s, status: newStatus } : s
    ));
  };

  const shareSaleReceipt = async (sale) => {
    const receiptText = `
RECIBO DE VENTA - PowerTools
#${sale.id}

Cliente: ${sale.clientName}
Teléfono: ${sale.clientPhone}
Fecha: ${sale.date}

PRODUCTOS:
${sale.items.map(item => 
  `• ${item.name}\n  Cantidad: ${item.quantity} x $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)}`
).join('\n\n')}

Subtotal: $${sale.subtotal.toFixed(2)}
${sale.discount > 0 ? `Descuento: -$${sale.discount.toFixed(2)}\n` : ''}
${sale.tax > 0 ? `Impuestos: +$${sale.tax.toFixed(2)}\n` : ''}
TOTAL: $${sale.total.toFixed(2)}

Método de pago: ${sale.paymentMethod}
Estado: ${sale.status}

${sale.notes ? `Notas: ${sale.notes}` : ''}

¡Gracias por su compra!
PowerTools - Herramientas de Calidad
    `;

    try {
      await Share.share({
        message: receiptText,
        title: `Recibo de Venta #${sale.id}`,
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo compartir el recibo');
    }
  };

  // Calcular estadísticas
  const completedSales = sales.filter(s => s.status === 'Completada');
  const totalRevenue = completedSales.reduce((sum, sale) => sum + sale.total, 0);
  const totalCost = completedSales.reduce((sum, sale) => 
    sum + sale.items.reduce((itemSum, item) => itemSum + (item.quantity * item.cost), 0), 0
  );
  const totalProfit = totalRevenue - totalCost;
  const averageSale = completedSales.length > 0 ? totalRevenue / completedSales.length : 0;

  // Datos para gráficos
  const salesData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        data: [190, 0, 51, 0, 0, 38.49, 0], // Ventas por día de la semana
        color: (opacity = 1) => `rgba(39, 174, 96, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const profitData = {
    labels: ['Ingresos', 'Costos', 'Ganancia'],
    datasets: [
      {
        data: [totalRevenue, totalCost, totalProfit],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(39, 174, 96, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(46, 64, 87, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#27AE60',
    },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completada': return '#27AE60';
      case 'Pendiente': return '#F39C12';
      case 'Cancelada': return '#E74C3C';
      default: return '#95A5A6';
    }
  };

  const SaleCard = ({ sale }) => {
    const statusColor = getStatusColor(sale.status);
    const profit = sale.items.reduce((sum, item) => 
      sum + (item.quantity * (item.price - item.cost)), 0
    ) - sale.discount;

    return (
      <Card style={styles.saleCard}>
        <Card.Content>
          <View style={styles.saleHeader}>
            <View style={styles.saleInfo}>
              <Text style={styles.saleId}>#{sale.id}</Text>
              <Text style={styles.clientName}>{sale.clientName}</Text>
              <Text style={styles.saleDate}>{sale.date}</Text>
            </View>
            <View style={styles.saleActions}>
              <Chip
                mode="flat"
                style={[styles.statusChip, { backgroundColor: statusColor + '20' }]}
                textStyle={{ color: statusColor, fontSize: 12 }}
              >
                {sale.status}
              </Chip>
            </View>
          </View>

          <View style={styles.saleDetails}>
            <View style={styles.saleTotals}>
              <Text style={styles.saleTotal}>${sale.total.toFixed(2)}</Text>
              <Text style={styles.saleProfit}>
                Ganancia: ${profit.toFixed(2)}
              </Text>
            </View>
            <Text style={styles.itemsCount}>
              {sale.items.length} producto{sale.items.length !== 1 ? 's' : ''}
            </Text>
            <Text style={styles.paymentMethod}>
              <Ionicons name="card" size={12} color="#666" /> {sale.paymentMethod}
            </Text>
          </View>

          <View style={styles.cardActions}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.editBtn]}
              onPress={() => openEditModal(sale)}
            >
              <Ionicons name="pencil" size={16} color="#3498DB" />
              <Text style={[styles.actionBtnText, { color: '#3498DB' }]}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.shareBtn]}
              onPress={() => shareSaleReceipt(sale)}
            >
              <Ionicons name="share" size={16} color="#27AE60" />
              <Text style={[styles.actionBtnText, { color: '#27AE60' }]}>Recibo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.deleteBtn]}
              onPress={() => deleteSale(sale.id)}
            >
              <Ionicons name="trash" size={16} color="#E74C3C" />
              <Text style={[styles.actionBtnText, { color: '#E74C3C' }]}>Eliminar</Text>
            </TouchableOpacity>
          </View>

          {sale.status === 'Pendiente' && (
            <View style={styles.statusActions}>
              <Button
                mode="contained"
                compact
                style={[styles.statusBtn, { backgroundColor: '#27AE60' }]}
                onPress={() => updateSaleStatus(sale.id, 'Completada')}
              >
                Marcar Completada
              </Button>
              <Button
                mode="outlined"
                compact
                style={styles.statusBtn}
                onPress={() => updateSaleStatus(sale.id, 'Cancelada')}
              >
                Cancelar
              </Button>
            </View>
          )}
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {/* Estadísticas rápidas */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Ionicons name="trending-up" size={24} color="#27AE60" />
            <Text style={styles.statValue}>${totalRevenue.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Ingresos</Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Ionicons name="wallet" size={24} color="#3498DB" />
            <Text style={styles.statValue}>${totalProfit.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Ganancia</Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Ionicons name="calculator" size={24} color="#9B59B6" />
            <Text style={styles.statValue}>${averageSale.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Venta Promedio</Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Ionicons name="receipt" size={24} color="#E67E22" />
            <Text style={styles.statValue}>{sales.length}</Text>
            <Text style={styles.statLabel}>Total Ventas</Text>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Gráfico de ventas semanales */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Ventas de la Semana</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <LineChart
            data={salesData}
            width={320}
            height={200}
            chartConfig={chartConfig}
            style={styles.chart}
          />
        </ScrollView>
      </View>

      {/* Gráfico de ingresos vs gastos */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Análisis Financiero</Text>
        <BarChart
          data={profitData}
          width={320}
          height={200}
          chartConfig={chartConfig}
          style={styles.chart}
          verticalLabelRotation={30}
        />
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Buscar ventas..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>

      {/* Filtros por estado */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.statusContainer}
      >
        {statusOptions.map((status) => (
          <Chip
            key={status}
            mode={selectedStatus === status ? 'flat' : 'outlined'}
            selected={selectedStatus === status}
            onPress={() => setSelectedStatus(status)}
            style={styles.statusFilterChip}
          >
            {status}
          </Chip>
        ))}
      </ScrollView>

      {/* Lista de ventas */}
      <FlatList
        data={filteredSales}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SaleCard sale={item} />}
        style={styles.salesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No se encontraron ventas</Text>
          </View>
        }
      />

      {/* Botón flotante para agregar */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={openAddModal}
      />

      {/* Modal para agregar/editar venta */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingSale ? 'Editar Venta' : 'Nueva Venta'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer}>
              {/* Datos del cliente */}
              <Text style={styles.sectionTitle}>Datos del Cliente</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nombre del cliente *</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.clientName}
                  onChangeText={(text) => setFormData({...formData, clientName: text})}
                  placeholder="Nombre del cliente"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Teléfono</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.clientPhone}
                  onChangeText={(text) => setFormData({...formData, clientPhone: text})}
                  placeholder="+1234567890"
                  keyboardType="phone-pad"
                />
              </View>

              {/* Productos */}
              <Text style={styles.sectionTitle}>Productos</Text>
              
              <View style={styles.addItemContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Nombre del producto</Text>
                  <TextInput
                    style={styles.textInput}
                    value={newItem.name}
                    onChangeText={(text) => setNewItem({...newItem, name: text})}
                    placeholder="Nombre del producto"
                  />
                </View>

                <View style={styles.inputRow}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: 4 }]}>
                    <Text style={styles.inputLabel}>Cantidad</Text>
                    <TextInput
                      style={styles.textInput}
                      value={newItem.quantity}
                      onChangeText={(text) => setNewItem({...newItem, quantity: text})}
                      placeholder="1"
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={[styles.inputGroup, { flex: 1, marginHorizontal: 4 }]}>
                    <Text style={styles.inputLabel}>Precio</Text>
                    <TextInput
                      style={styles.textInput}
                      value={newItem.price}
                      onChangeText={(text) => setNewItem({...newItem, price: text})}
                      placeholder="0.00"
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={[styles.inputGroup, { flex: 1, marginLeft: 4 }]}>
                    <Text style={styles.inputLabel}>Costo</Text>
                    <TextInput
                      style={styles.textInput}
                      value={newItem.cost}
                      onChangeText={(text) => setNewItem({...newItem, cost: text})}
                      placeholder="0.00"
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <Button
                  mode="outlined"
                  onPress={addItemToSale}
                  style={styles.addItemBtn}
                >
                  Agregar Producto
                </Button>
              </View>

              {/* Lista de productos agregados */}
              {formData.items.length > 0 && (
                <View style={styles.itemsList}>
                  <Text style={styles.itemsListTitle}>Productos agregados:</Text>
                  {formData.items.map((item) => (
                    <View key={item.id} style={styles.itemRow}>
                      <View style={styles.itemInfo}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemDetails}>
                          {item.quantity} x ${item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(2)}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => removeItemFromSale(item.id)}
                        style={styles.removeItemBtn}
                      >
                        <Ionicons name="trash" size={16} color="#E74C3C" />
                      </TouchableOpacity>
                    </View>
                  ))}
                  
                  {/* Cálculos de totales */}
                  <View style={styles.totalsSection}>
                    <View style={styles.inputRow}>
                      <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                        <Text style={styles.inputLabel}>Descuento</Text>
                        <TextInput
                          style={styles.textInput}
                          value={formData.discount}
                          onChangeText={(text) => setFormData({...formData, discount: text})}
                          placeholder="0.00"
                          keyboardType="numeric"
                        />
                      </View>

                      <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                        <Text style={styles.inputLabel}>Impuestos</Text>
                        <TextInput
                          style={styles.textInput}
                          value={formData.tax}
                          onChangeText={(text) => setFormData({...formData, tax: text})}
                          placeholder="0.00"
                          keyboardType="numeric"
                        />
                      </View>
                    </View>

                    <View style={styles.totalRow}>
                      <Text style={styles.totalText}>
                        Total: ${calculateTotals(formData.items, formData.discount, formData.tax).total.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              {/* Método de pago */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Método de pago</Text>
                <View style={styles.pickerContainer}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {paymentMethods.map((method) => (
                      <TouchableOpacity
                        key={method}
                        style={[
                          styles.pickerOption,
                          formData.paymentMethod === method && styles.pickerOptionSelected
                        ]}
                        onPress={() => setFormData({...formData, paymentMethod: method})}
                      >
                        <Text style={[
                          styles.pickerOptionText,
                          formData.paymentMethod === method && styles.pickerOptionTextSelected
                        ]}>
                          {method}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>

              {/* Notas */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Notas adicionales</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={formData.notes}
                  onChangeText={(text) => setFormData({...formData, notes: text})}
                  placeholder="Notas sobre la venta"
                  multiline
                  numberOfLines={3}
                />
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.saveButton]}
                onPress={saveSale}
              >
                <Text style={styles.saveButtonText}>
                  {editingSale ? 'Actualizar' : 'Guardar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  statsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  statCard: {
    marginRight: 12,
    minWidth: 120,
    elevation: 2,
  },
  statContent: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4057',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  chartContainer: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4057',
    marginBottom: 12,
  },
  chart: {
    borderRadius: 12,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  searchbar: {
    elevation: 2,
  },
  statusContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  statusFilterChip: {
    marginRight: 8,
  },
  salesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  saleCard: {
    marginBottom: 12,
    elevation: 2,
  },
  saleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  saleInfo: {
    flex: 1,
  },
  saleId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 4,
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4057',
    marginBottom: 4,
  },
  saleDate: {
    fontSize: 12,
    color: '#666',
  },
  saleActions: {
    alignItems: 'flex-end',
  },
  statusChip: {
    height: 24,
  },
  saleDetails: {
    marginBottom: 12,
  },
  saleTotals: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  saleTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27AE60',
  },
  saleProfit: {
    fontSize: 12,
    color: '#3498DB',
    fontWeight: '600',
  },
  itemsCount: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  paymentMethod: {
    fontSize: 12,
    color: '#666',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  actionBtnText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
  },
  statusActions: {
    flexDirection: 'row',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  statusBtn: {
    flex: 1,
    marginHorizontal: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#27AE60',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 0,
    width: '95%',
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4057',
  },
  formContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4057',
    marginBottom: 16,
    marginTop: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E4057',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  addItemContainer: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  addItemBtn: {
    marginTop: 8,
  },
  itemsList: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  itemsListTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4057',
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E4057',
  },
  itemDetails: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  removeItemBtn: {
    padding: 8,
  },
  totalsSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#27AE60',
  },
  totalRow: {
    paddingTop: 12,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27AE60',
    textAlign: 'right',
  },
  pickerContainer: {
    marginTop: 4,
  },
  pickerOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 6,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  pickerOptionSelected: {
    backgroundColor: '#27AE60',
    borderColor: '#27AE60',
  },
  pickerOptionText: {
    fontSize: 12,
    color: '#666',
  },
  pickerOptionTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  modalActions: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: '#27AE60',
    marginLeft: 8,
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default SalesScreen;
