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

const QuotationsScreen = () => {
  const [quotations, setQuotations] = useState([
    {
      id: '1',
      clientName: 'Construcciones García',
      clientEmail: 'garcia@construcciones.com',
      clientPhone: '+1234567890',
      date: '2024-08-01',
      validUntil: '2024-08-15',
      status: 'Enviada',
      items: [
        { id: '1', name: 'Taladro Inalámbrico DeWalt', quantity: 2, price: 150.00 },
        { id: '2', name: 'Juego de Llaves Combinadas', quantity: 1, price: 45.99 },
      ],
      total: 345.99,
      notes: 'Descuento por volumen aplicado',
    },
    {
      id: '2',
      clientName: 'Taller Mecánico López',
      clientEmail: 'lopez@taller.com',
      clientPhone: '+0987654321',
      date: '2024-08-03',
      validUntil: '2024-08-17',
      status: 'Borrador',
      items: [
        { id: '1', name: 'Martillo de Garra Stanley', quantity: 3, price: 25.50 },
      ],
      total: 76.50,
      notes: '',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Todas');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingQuotation, setEditingQuotation] = useState(null);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    validUntil: '',
    items: [],
    notes: '',
  });
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    price: '',
  });

  const statusOptions = ['Todas', 'Borrador', 'Enviada', 'Aceptada', 'Rechazada', 'Vencida'];

  const filteredQuotations = quotations.filter(quotation => {
    const matchesSearch = quotation.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quotation.id.includes(searchQuery);
    const matchesStatus = selectedStatus === 'Todas' || quotation.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const openAddModal = () => {
    setEditingQuotation(null);
    setFormData({
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      validUntil: '',
      items: [],
      notes: '',
    });
    setModalVisible(true);
  };

  const openEditModal = (quotation) => {
    setEditingQuotation(quotation);
    setFormData({
      clientName: quotation.clientName,
      clientEmail: quotation.clientEmail,
      clientPhone: quotation.clientPhone,
      validUntil: quotation.validUntil,
      items: [...quotation.items],
      notes: quotation.notes,
    });
    setModalVisible(true);
  };

  const addItemToQuotation = () => {
    if (!newItem.name || !newItem.quantity || !newItem.price) {
      Alert.alert('Error', 'Por favor completa todos los campos del producto');
      return;
    }

    const item = {
      id: Date.now().toString(),
      name: newItem.name,
      quantity: parseInt(newItem.quantity),
      price: parseFloat(newItem.price),
    };

    setFormData({
      ...formData,
      items: [...formData.items, item],
    });

    setNewItem({ name: '', quantity: '', price: '' });
  };

  const removeItemFromQuotation = (itemId) => {
    setFormData({
      ...formData,
      items: formData.items.filter(item => item.id !== itemId),
    });
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  const saveQuotation = () => {
    if (!formData.clientName || formData.items.length === 0) {
      Alert.alert('Error', 'Por favor completa el nombre del cliente y agrega al menos un producto');
      return;
    }

    const quotationData = {
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
      validUntil: formData.validUntil,
      items: formData.items,
      notes: formData.notes,
      total: calculateTotal(formData.items),
      date: new Date().toISOString().split('T')[0],
      status: 'Borrador',
    };

    if (editingQuotation) {
      setQuotations(quotations.map(q => 
        q.id === editingQuotation.id ? { ...q, ...quotationData } : q
      ));
      Alert.alert('Éxito', 'Cotización actualizada correctamente');
    } else {
      const newQuotation = {
        ...quotationData,
        id: Date.now().toString(),
      };
      setQuotations([...quotations, newQuotation]);
      Alert.alert('Éxito', 'Cotización creada correctamente');
    }

    setModalVisible(false);
  };

  const deleteQuotation = (quotationId) => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de que quieres eliminar esta cotización?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setQuotations(quotations.filter(q => q.id !== quotationId));
            Alert.alert('Éxito', 'Cotización eliminada');
          },
        },
      ]
    );
  };

  const shareQuotation = async (quotation) => {
    const quotationText = `
COTIZACIÓN - PowerTools
#${quotation.id}

Cliente: ${quotation.clientName}
Fecha: ${quotation.date}
Válida hasta: ${quotation.validUntil}

PRODUCTOS:
${quotation.items.map(item => 
  `• ${item.name}\n  Cantidad: ${item.quantity} | Precio: $${item.price.toFixed(2)} | Subtotal: $${(item.quantity * item.price).toFixed(2)}`
).join('\n\n')}

TOTAL: $${quotation.total.toFixed(2)}

${quotation.notes ? `Notas: ${quotation.notes}` : ''}

PowerTools - Herramientas de Calidad
    `;

    try {
      await Share.share({
        message: quotationText,
        title: `Cotización #${quotation.id}`,
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo compartir la cotización');
    }
  };

  const updateQuotationStatus = (quotationId, newStatus) => {
    setQuotations(quotations.map(q => 
      q.id === quotationId ? { ...q, status: newStatus } : q
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Borrador': return '#95A5A6';
      case 'Enviada': return '#3498DB';
      case 'Aceptada': return '#27AE60';
      case 'Rechazada': return '#E74C3C';
      case 'Vencida': return '#E67E22';
      default: return '#95A5A6';
    }
  };

  const QuotationCard = ({ quotation }) => {
    const statusColor = getStatusColor(quotation.status);
    
    return (
      <Card style={styles.quotationCard}>
        <Card.Content>
          <View style={styles.quotationHeader}>
            <View style={styles.quotationInfo}>
              <Text style={styles.quotationId}>#{quotation.id}</Text>
              <Text style={styles.clientName}>{quotation.clientName}</Text>
              <Text style={styles.quotationDate}>Fecha: {quotation.date}</Text>
            </View>
            <View style={styles.quotationActions}>
              <Chip
                mode="flat"
                style={[styles.statusChip, { backgroundColor: statusColor + '20' }]}
                textStyle={{ color: statusColor, fontSize: 12 }}
              >
                {quotation.status}
              </Chip>
            </View>
          </View>

          <View style={styles.quotationDetails}>
            <Text style={styles.itemsCount}>
              {quotation.items.length} producto{quotation.items.length !== 1 ? 's' : ''}
            </Text>
            <Text style={styles.quotationTotal}>${quotation.total.toFixed(2)}</Text>
          </View>

          <Text style={styles.validUntil}>Válida hasta: {quotation.validUntil}</Text>

          <View style={styles.cardActions}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.editBtn]}
              onPress={() => openEditModal(quotation)}
            >
              <Ionicons name="pencil" size={16} color="#3498DB" />
              <Text style={[styles.actionBtnText, { color: '#3498DB' }]}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.shareBtn]}
              onPress={() => shareQuotation(quotation)}
            >
              <Ionicons name="share" size={16} color="#27AE60" />
              <Text style={[styles.actionBtnText, { color: '#27AE60' }]}>Compartir</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.deleteBtn]}
              onPress={() => deleteQuotation(quotation.id)}
            >
              <Ionicons name="trash" size={16} color="#E74C3C" />
              <Text style={[styles.actionBtnText, { color: '#E74C3C' }]}>Eliminar</Text>
            </TouchableOpacity>
          </View>

          {quotation.status === 'Enviada' && (
            <View style={styles.statusActions}>
              <Button
                mode="contained"
                compact
                style={[styles.statusBtn, { backgroundColor: '#27AE60' }]}
                onPress={() => updateQuotationStatus(quotation.id, 'Aceptada')}
              >
                Marcar Aceptada
              </Button>
              <Button
                mode="outlined"
                compact
                style={styles.statusBtn}
                onPress={() => updateQuotationStatus(quotation.id, 'Rechazada')}
              >
                Marcar Rechazada
              </Button>
            </View>
          )}
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Buscar cotizaciones..."
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

      {/* Lista de cotizaciones */}
      <FlatList
        data={filteredQuotations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <QuotationCard quotation={item} />}
        style={styles.quotationsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No se encontraron cotizaciones</Text>
          </View>
        }
      />

      {/* Botón flotante para agregar */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={openAddModal}
      />

      {/* Modal para agregar/editar cotización */}
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
                {editingQuotation ? 'Editar Cotización' : 'Nueva Cotización'}
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
                  placeholder="Nombre o empresa"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.clientEmail}
                  onChangeText={(text) => setFormData({...formData, clientEmail: text})}
                  placeholder="cliente@email.com"
                  keyboardType="email-address"
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

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Válida hasta</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.validUntil}
                  onChangeText={(text) => setFormData({...formData, validUntil: text})}
                  placeholder="YYYY-MM-DD"
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
                  <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.inputLabel}>Cantidad</Text>
                    <TextInput
                      style={styles.textInput}
                      value={newItem.quantity}
                      onChangeText={(text) => setNewItem({...newItem, quantity: text})}
                      placeholder="1"
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.inputLabel}>Precio unitario</Text>
                    <TextInput
                      style={styles.textInput}
                      value={newItem.price}
                      onChangeText={(text) => setNewItem({...newItem, price: text})}
                      placeholder="0.00"
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <Button
                  mode="outlined"
                  onPress={addItemToQuotation}
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
                        onPress={() => removeItemFromQuotation(item.id)}
                        style={styles.removeItemBtn}
                      >
                        <Ionicons name="trash" size={16} color="#E74C3C" />
                      </TouchableOpacity>
                    </View>
                  ))}
                  <View style={styles.totalRow}>
                    <Text style={styles.totalText}>
                      Total: ${calculateTotal(formData.items).toFixed(2)}
                    </Text>
                  </View>
                </View>
              )}

              {/* Notas */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Notas adicionales</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={formData.notes}
                  onChangeText={(text) => setFormData({...formData, notes: text})}
                  placeholder="Condiciones, descuentos, etc."
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
                onPress={saveQuotation}
              >
                <Text style={styles.saveButtonText}>
                  {editingQuotation ? 'Actualizar' : 'Guardar'}
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
  searchContainer: {
    padding: 16,
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
  quotationsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  quotationCard: {
    marginBottom: 12,
    elevation: 2,
  },
  quotationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  quotationInfo: {
    flex: 1,
  },
  quotationId: {
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
  quotationDate: {
    fontSize: 12,
    color: '#666',
  },
  quotationActions: {
    alignItems: 'flex-end',
  },
  statusChip: {
    height: 24,
  },
  quotationDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemsCount: {
    fontSize: 12,
    color: '#666',
  },
  quotationTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  validUntil: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
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
    backgroundColor: '#FF6B35',
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
  totalRow: {
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: '#FF6B35',
    marginTop: 8,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
    textAlign: 'right',
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
    backgroundColor: '#FF6B35',
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

export default QuotationsScreen;
