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

const InventoryScreen = () => {
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Taladro Inalámbrico DeWalt',
      category: 'Taladros',
      price: 150.00,
      stock: 12,
      minStock: 5,
      supplier: 'DeWalt Corp',
      barcode: '123456789012',
      description: 'Taladro inalámbrico de 18V con batería incluida',
    },
    {
      id: '2',
      name: 'Martillo de Garra Stanley',
      category: 'Martillos',
      price: 25.50,
      stock: 8,
      minStock: 10,
      supplier: 'Stanley Tools',
      barcode: '123456789013',
      description: 'Martillo de garra de 16oz con mango antideslizante',
    },
    {
      id: '3',
      name: 'Juego de Llaves Combinadas',
      category: 'Llaves',
      price: 45.99,
      stock: 15,
      minStock: 8,
      supplier: 'Craftsman',
      barcode: '123456789014',
      description: 'Juego de 12 llaves combinadas métricas',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    minStock: '',
    supplier: '',
    barcode: '',
    description: '',
  });

  const categories = ['Todos', 'Taladros', 'Martillos', 'Llaves', 'Destornilladores', 'Sierras'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: '',
      price: '',
      stock: '',
      minStock: '',
      supplier: '',
      barcode: '',
      description: '',
    });
    setModalVisible(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      minStock: product.minStock.toString(),
      supplier: product.supplier,
      barcode: product.barcode,
      description: product.description,
    });
    setModalVisible(true);
  };

  const saveProduct = () => {
    if (!formData.name || !formData.price || !formData.stock) {
      Alert.alert('Error', 'Por favor completa los campos obligatorios');
      return;
    }

    const productData = {
      name: formData.name,
      category: formData.category || 'Sin categoría',
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      minStock: parseInt(formData.minStock) || 0,
      supplier: formData.supplier,
      barcode: formData.barcode,
      description: formData.description,
    };

    if (editingProduct) {
      // Editar producto existente
      setProducts(products.map(p => 
        p.id === editingProduct.id ? { ...p, ...productData } : p
      ));
      Alert.alert('Éxito', 'Producto actualizado correctamente');
    } else {
      // Agregar nuevo producto
      const newProduct = {
        ...productData,
        id: Date.now().toString(),
      };
      setProducts([...products, newProduct]);
      Alert.alert('Éxito', 'Producto agregado correctamente');
    }

    setModalVisible(false);
  };

  const deleteProduct = (productId) => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de que quieres eliminar este producto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setProducts(products.filter(p => p.id !== productId));
            Alert.alert('Éxito', 'Producto eliminado');
          },
        },
      ]
    );
  };

  const getStockStatus = (stock, minStock) => {
    if (stock <= minStock) return { color: '#E74C3C', text: 'Stock Bajo' };
    if (stock <= minStock * 1.5) return { color: '#F39C12', text: 'Stock Medio' };
    return { color: '#27AE60', text: 'Stock OK' };
  };

  const ProductCard = ({ product }) => {
    const stockStatus = getStockStatus(product.stock, product.minStock);

    return (
      <Card style={styles.productCard}>
        <Card.Content>
          <View style={styles.productHeader}>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productCategory}>{product.category}</Text>
            </View>
            <View style={styles.productActions}>
              <IconButton
                icon="pencil"
                size={20}
                onPress={() => openEditModal(product)}
              />
              <IconButton
                icon="delete"
                size={20}
                iconColor="#E74C3C"
                onPress={() => deleteProduct(product.id)}
              />
            </View>
          </View>

          <View style={styles.productDetails}>
            <View style={styles.priceStock}>
              <View>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                <Text style={styles.supplier}>{product.supplier}</Text>
              </View>
              <View style={styles.stockInfo}>
                <Text style={styles.stockNumber}>{product.stock} unidades</Text>
                <Chip
                  mode="flat"
                  style={[styles.stockChip, { backgroundColor: stockStatus.color + '20' }]}
                  textStyle={{ color: stockStatus.color, fontSize: 12 }}
                >
                  {stockStatus.text}
                </Chip>
              </View>
            </View>
            
            {product.description && (
              <Text style={styles.description}>{product.description}</Text>
            )}
            
            {product.barcode && (
              <Text style={styles.barcode}>Código: {product.barcode}</Text>
            )}
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Buscar productos..."
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
            style={styles.categoryChip}
          >
            {category}
          </Chip>
        ))}
      </ScrollView>

      {/* Lista de productos */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
        style={styles.productsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="cube-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No se encontraron productos</Text>
          </View>
        }
      />

      {/* Botón flotante para agregar */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={openAddModal}
      />

      {/* Modal para agregar/editar producto */}
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
                {editingProduct ? 'Editar Producto' : 'Agregar Producto'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nombre del producto *</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.name}
                  onChangeText={(text) => setFormData({...formData, name: text})}
                  placeholder="Ej: Taladro inalámbrico"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Categoría</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.category}
                  onChangeText={(text) => setFormData({...formData, category: text})}
                  placeholder="Ej: Taladros"
                />
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.inputLabel}>Precio *</Text>
                  <TextInput
                    style={styles.textInput}
                    value={formData.price}
                    onChangeText={(text) => setFormData({...formData, price: text})}
                    placeholder="0.00"
                    keyboardType="numeric"
                  />
                </View>

                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.inputLabel}>Stock *</Text>
                  <TextInput
                    style={styles.textInput}
                    value={formData.stock}
                    onChangeText={(text) => setFormData({...formData, stock: text})}
                    placeholder="0"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Stock mínimo</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.minStock}
                  onChangeText={(text) => setFormData({...formData, minStock: text})}
                  placeholder="5"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Proveedor</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.supplier}
                  onChangeText={(text) => setFormData({...formData, supplier: text})}
                  placeholder="Nombre del proveedor"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Código de barras</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.barcode}
                  onChangeText={(text) => setFormData({...formData, barcode: text})}
                  placeholder="123456789012"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Descripción</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={formData.description}
                  onChangeText={(text) => setFormData({...formData, description: text})}
                  placeholder="Descripción del producto"
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
                onPress={saveProduct}
              >
                <Text style={styles.saveButtonText}>
                  {editingProduct ? 'Actualizar' : 'Guardar'}
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
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  categoryChip: {
    marginRight: 8,
  },
  productsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  productCard: {
    marginBottom: 12,
    elevation: 2,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4057',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  productActions: {
    flexDirection: 'row',
  },
  productDetails: {
    marginTop: 8,
  },
  priceStock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  supplier: {
    fontSize: 12,
    color: '#666',
  },
  stockInfo: {
    alignItems: 'flex-end',
  },
  stockNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E4057',
    marginBottom: 4,
  },
  stockChip: {
    height: 24,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  barcode: {
    fontSize: 10,
    color: '#999',
    fontFamily: 'monospace',
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
  textArea: {
    height: 80,
    textAlignVertical: 'top',
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

export default InventoryScreen;
