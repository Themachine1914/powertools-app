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
} from 'react-native';
import { Card, FAB, Searchbar, Chip, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LineChart, PieChart } from 'react-native-chart-kit';

const ExpensesScreen = () => {
  const [expenses, setExpenses] = useState([
    {
      id: '1',
      description: 'Compra de inventario - Proveedor DeWalt',
      amount: 1500.00,
      category: 'Inventario',
      date: '2024-08-01',
      paymentMethod: 'Transferencia',
      supplier: 'DeWalt Corp',
      receipt: 'REC-001',
    },
    {
      id: '2',
      description: 'Renta del local comercial',
      amount: 800.00,
      category: 'Renta',
      date: '2024-08-01',
      paymentMethod: 'Efectivo',
      supplier: 'Inmobiliaria Centro',
      receipt: 'REC-002',
    },
    {
      id: '3',
      description: 'Servicios públicos (luz, agua)',
      amount: 125.50,
      category: 'Servicios',
      date: '2024-08-02',
      paymentMethod: 'Débito',
      supplier: 'CFE',
      receipt: 'REC-003',
    },
    {
      id: '4',
      description: 'Material de empaque y etiquetas',
      amount: 85.30,
      category: 'Operación',
      date: '2024-08-03',
      paymentMethod: 'Efectivo',
      supplier: 'Papelería Universal',
      receipt: 'REC-004',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    paymentMethod: '',
    supplier: '',
    receipt: '',
  });

  const categories = ['Todas', 'Inventario', 'Renta', 'Servicios', 'Operación', 'Marketing', 'Transporte', 'Otros'];
  const paymentMethods = ['Efectivo', 'Débito', 'Crédito', 'Transferencia', 'Cheque'];

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         expense.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || expense.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openAddModal = () => {
    setEditingExpense(null);
    setFormData({
      description: '',
      amount: '',
      category: '',
      paymentMethod: '',
      supplier: '',
      receipt: '',
    });
    setModalVisible(true);
  };

  const openEditModal = (expense) => {
    setEditingExpense(expense);
    setFormData({
      description: expense.description,
      amount: expense.amount.toString(),
      category: expense.category,
      paymentMethod: expense.paymentMethod,
      supplier: expense.supplier,
      receipt: expense.receipt,
    });
    setModalVisible(true);
  };

  const saveExpense = () => {
    if (!formData.description || !formData.amount || !formData.category) {
      Alert.alert('Error', 'Por favor completa los campos obligatorios');
      return;
    }

    const expenseData = {
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      paymentMethod: formData.paymentMethod,
      supplier: formData.supplier,
      receipt: formData.receipt,
      date: new Date().toISOString().split('T')[0],
    };

    if (editingExpense) {
      setExpenses(expenses.map(e => 
        e.id === editingExpense.id ? { ...e, ...expenseData } : e
      ));
      Alert.alert('Éxito', 'Gasto actualizado correctamente');
    } else {
      const newExpense = {
        ...expenseData,
        id: Date.now().toString(),
      };
      setExpenses([...expenses, newExpense]);
      Alert.alert('Éxito', 'Gasto registrado correctamente');
    }

    setModalVisible(false);
  };

  const deleteExpense = (expenseId) => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de que quieres eliminar este gasto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setExpenses(expenses.filter(e => e.id !== expenseId));
            Alert.alert('Éxito', 'Gasto eliminado');
          },
        },
      ]
    );
  };

  // Calcular estadísticas
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const monthlyExpenses = expenses
    .filter(expense => expense.date.startsWith('2024-08'))
    .reduce((sum, expense) => sum + expense.amount, 0);

  // Datos para gráficos
  const expensesByCategory = categories.slice(1).map(category => {
    const categoryExpenses = expenses.filter(e => e.category === category);
    const total = categoryExpenses.reduce((sum, e) => sum + e.amount, 0);
    return {
      name: category,
      population: total,
      color: getCategoryColor(category),
      legendFontColor: '#2E4057',
      legendFontSize: 12,
    };
  }).filter(item => item.population > 0);

  function getCategoryColor(category) {
    const colors = {
      'Inventario': '#FF6B35',
      'Renta': '#3498DB',
      'Servicios': '#27AE60',
      'Operación': '#9B59B6',
      'Marketing': '#E74C3C',
      'Transporte': '#F39C12',
      'Otros': '#95A5A6',
    };
    return colors[category] || '#95A5A6';
  }

  const monthlyData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
    datasets: [
      {
        data: [2200, 2400, 2100, 2600, 2300, 2500, 2400, monthlyExpenses],
        color: (opacity = 1) => `rgba(231, 76, 60, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(231, 76, 60, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(46, 64, 87, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#E74C3C',
    },
  };

  const ExpenseCard = ({ expense }) => (
    <Card style={styles.expenseCard}>
      <Card.Content>
        <View style={styles.expenseHeader}>
          <View style={styles.expenseInfo}>
            <Text style={styles.expenseDescription}>{expense.description}</Text>
            <Text style={styles.expenseSupplier}>{expense.supplier}</Text>
          </View>
          <View style={styles.expenseActions}>
            <IconButton
              icon="pencil"
              size={20}
              onPress={() => openEditModal(expense)}
            />
            <IconButton
              icon="delete"
              size={20}
              iconColor="#E74C3C"
              onPress={() => deleteExpense(expense.id)}
            />
          </View>
        </View>

        <View style={styles.expenseDetails}>
          <View style={styles.expenseAmount}>
            <Text style={styles.amount}>${expense.amount.toFixed(2)}</Text>
            <Chip
              mode="flat"
              style={[styles.categoryChip, { backgroundColor: getCategoryColor(expense.category) + '20' }]}
              textStyle={{ color: getCategoryColor(expense.category), fontSize: 12 }}
            >
              {expense.category}
            </Chip>
          </View>
          
          <View style={styles.expenseMeta}>
            <Text style={styles.expenseDate}>
              <Ionicons name="calendar" size={12} color="#666" /> {expense.date}
            </Text>
            <Text style={styles.paymentMethod}>
              <Ionicons name="card" size={12} color="#666" /> {expense.paymentMethod}
            </Text>
            {expense.receipt && (
              <Text style={styles.receipt}>
                <Ionicons name="receipt" size={12} color="#666" /> {expense.receipt}
              </Text>
            )}
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Estadísticas rápidas */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Ionicons name="trending-down" size={24} color="#E74C3C" />
            <Text style={styles.statValue}>${monthlyExpenses.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Este Mes</Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Ionicons name="calculator" size={24} color="#9B59B6" />
            <Text style={styles.statValue}>${totalExpenses.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Ionicons name="receipt" size={24} color="#3498DB" />
            <Text style={styles.statValue}>{expenses.length}</Text>
            <Text style={styles.statLabel}>Gastos</Text>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Gráfico de tendencia mensual */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Tendencia Mensual de Gastos</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <LineChart
            data={monthlyData}
            width={320}
            height={200}
            chartConfig={chartConfig}
            style={styles.chart}
          />
        </ScrollView>
      </View>

      {/* Gráfico de gastos por categoría */}
      {expensesByCategory.length > 0 && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Gastos por Categoría</Text>
          <PieChart
            data={expensesByCategory}
            width={320}
            height={200}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            style={styles.chart}
          />
        </View>
      )}

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Buscar gastos..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>

      {/* Filtros por categoría */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <Chip
            key={category}
            mode={selectedCategory === category ? 'flat' : 'outlined'}
            selected={selectedCategory === category}
            onPress={() => setSelectedCategory(category)}
            style={styles.categoryFilterChip}
          >
            {category}
          </Chip>
        ))}
      </ScrollView>

      {/* Lista de gastos */}
      <FlatList
        data={filteredExpenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExpenseCard expense={item} />}
        style={styles.expensesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="wallet-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No se encontraron gastos</Text>
          </View>
        }
      />

      {/* Botón flotante para agregar */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={openAddModal}
      />

      {/* Modal para agregar/editar gasto */}
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
                {editingExpense ? 'Editar Gasto' : 'Nuevo Gasto'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Descripción del gasto *</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.description}
                  onChangeText={(text) => setFormData({...formData, description: text})}
                  placeholder="Ej: Compra de inventario"
                />
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.inputLabel}>Monto *</Text>
                  <TextInput
                    style={styles.textInput}
                    value={formData.amount}
                    onChangeText={(text) => setFormData({...formData, amount: text})}
                    placeholder="0.00"
                    keyboardType="numeric"
                  />
                </View>

                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.inputLabel}>Categoría *</Text>
                  <View style={styles.pickerContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      {categories.slice(1).map((category) => (
                        <TouchableOpacity
                          key={category}
                          style={[
                            styles.pickerOption,
                            formData.category === category && styles.pickerOptionSelected
                          ]}
                          onPress={() => setFormData({...formData, category})}
                        >
                          <Text style={[
                            styles.pickerOptionText,
                            formData.category === category && styles.pickerOptionTextSelected
                          ]}>
                            {category}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </View>
              </View>

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

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Proveedor/Empresa</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.supplier}
                  onChangeText={(text) => setFormData({...formData, supplier: text})}
                  placeholder="Nombre del proveedor"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Número de recibo/factura</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.receipt}
                  onChangeText={(text) => setFormData({...formData, receipt: text})}
                  placeholder="REC-001"
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
                onPress={saveExpense}
              >
                <Text style={styles.saveButtonText}>
                  {editingExpense ? 'Actualizar' : 'Guardar'}
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
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  categoryFilterChip: {
    marginRight: 8,
  },
  expensesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  expenseCard: {
    marginBottom: 12,
    elevation: 2,
  },
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  expenseInfo: {
    flex: 1,
  },
  expenseDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4057',
    marginBottom: 4,
  },
  expenseSupplier: {
    fontSize: 12,
    color: '#666',
  },
  expenseActions: {
    flexDirection: 'row',
  },
  expenseDetails: {
    marginTop: 8,
  },
  expenseAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E74C3C',
  },
  categoryChip: {
    height: 24,
  },
  expenseMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  expenseDate: {
    fontSize: 12,
    color: '#666',
  },
  paymentMethod: {
    fontSize: 12,
    color: '#666',
  },
  receipt: {
    fontSize: 12,
    color: '#666',
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
    backgroundColor: '#E74C3C',
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
    width: '90%',
    maxHeight: '80%',
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
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
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
    backgroundColor: '#E74C3C',
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

export default ExpensesScreen;
