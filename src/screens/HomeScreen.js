import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Card, Title, Paragraph, Surface } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LineChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = ({ navigation }) => {
  const [stats, setStats] = useState({
    totalProducts: 156,
    totalSales: 25680,
    monthlyGrowth: 12.5,
    pendingQuotations: 8,
    lowStock: 12,
    monthlyExpenses: 8450,
  });

  // Datos para el gráfico de ventas
  const salesData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        data: [12000, 15000, 18000, 22000, 25000, 25680],
        color: (opacity = 1) => `rgba(255, 107, 53, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  // Datos para el gráfico de categorías
  const categoryData = [
    {
      name: 'Taladros',
      population: 35,
      color: '#FF6B35',
      legendFontColor: '#2E4057',
      legendFontSize: 12,
    },
    {
      name: 'Llaves',
      population: 25,
      color: '#00A8CC',
      legendFontColor: '#2E4057',
      legendFontSize: 12,
    },
    {
      name: 'Martillos',
      population: 20,
      color: '#2E4057',
      legendFontColor: '#2E4057',
      legendFontSize: 12,
    },
    {
      name: 'Otros',
      population: 20,
      color: '#95A5A6',
      legendFontColor: '#2E4057',
      legendFontSize: 12,
    },
  ];

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 107, 53, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(46, 64, 87, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#FF6B35',
    },
  };

  const QuickActionCard = ({ title, icon, onPress, color = '#FF6B35' }) => (
    <TouchableOpacity onPress={onPress} style={[styles.quickAction, { borderLeftColor: color }]}>
      <View style={styles.quickActionContent}>
        <Ionicons name={icon} size={24} color={color} />
        <Text style={styles.quickActionText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

  const StatCard = ({ title, value, icon, color = '#FF6B35', subtitle }) => (
    <Card style={styles.statCard}>
      <Card.Content>
        <View style={styles.statHeader}>
          <Ionicons name={icon} size={24} color={color} />
          <Text style={styles.statValue}>{value}</Text>
        </View>
        <Text style={styles.statTitle}>{title}</Text>
        {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header de bienvenida */}
      <Surface style={styles.welcomeCard}>
        <View style={styles.welcomeContent}>
          <View>
            <Text style={styles.welcomeText}>¡Bienvenido a</Text>
            <Text style={styles.brandText}>PowerTools!</Text>
            <Text style={styles.subtitleText}>Gestiona tu negocio de herramientas</Text>
          </View>
          <Ionicons name="construct" size={48} color="#FF6B35" />
        </View>
      </Surface>

      {/* Estadísticas principales */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Resumen del Negocio</Text>
        <View style={styles.statsRow}>
          <StatCard
            title="Productos"
            value={stats.totalProducts}
            icon="cube"
            color="#FF6B35"
          />
          <StatCard
            title="Ventas del Mes"
            value={`$${stats.totalSales.toLocaleString()}`}
            icon="trending-up"
            color="#00A8CC"
          />
        </View>
        <View style={styles.statsRow}>
          <StatCard
            title="Crecimiento"
            value={`+${stats.monthlyGrowth}%`}
            icon="arrow-up"
            color="#27AE60"
            subtitle="vs mes anterior"
          />
          <StatCard
            title="Stock Bajo"
            value={stats.lowStock}
            icon="warning"
            color="#E74C3C"
            subtitle="productos"
          />
        </View>
      </View>

      {/* Gráfico de ventas */}
      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Tendencia de Ventas</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <LineChart
            data={salesData}
            width={screenWidth - 40}
            height={200}
            chartConfig={chartConfig}
            style={styles.chart}
          />
        </ScrollView>
      </View>

      {/* Distribución por categorías */}
      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Inventario por Categoría</Text>
        <PieChart
          data={categoryData}
          width={screenWidth - 40}
          height={200}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          style={styles.chart}
        />
      </View>

      {/* Acciones rápidas */}
      <View style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
        <View style={styles.quickActionsGrid}>
          <QuickActionCard
            title="Agregar Producto"
            icon="add-circle"
            onPress={() => navigation.navigate('Inventario')}
            color="#FF6B35"
          />
          <QuickActionCard
            title="Nueva Cotización"
            icon="document-text"
            onPress={() => navigation.navigate('Cotizaciones')}
            color="#00A8CC"
          />
          <QuickActionCard
            title="Registrar Venta"
            icon="cash"
            onPress={() => navigation.navigate('Ventas')}
            color="#27AE60"
          />
          <QuickActionCard
            title="Añadir Gasto"
            icon="wallet"
            onPress={() => navigation.navigate('Gastos')}
            color="#9B59B6"
          />
        </View>
      </View>

      {/* Alertas y notificaciones */}
      <View style={styles.alertsContainer}>
        <Text style={styles.sectionTitle}>Alertas</Text>
        <Card style={[styles.alertCard, { borderLeftColor: '#E74C3C' }]}>
          <Card.Content style={styles.alertContent}>
            <Ionicons name="warning" size={20} color="#E74C3C" />
            <View style={styles.alertTextContainer}>
              <Text style={styles.alertTitle}>Stock Bajo</Text>
              <Text style={styles.alertText}>
                {stats.lowStock} productos necesitan reabastecimiento
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={[styles.alertCard, { borderLeftColor: '#F39C12' }]}>
          <Card.Content style={styles.alertContent}>
            <Ionicons name="time" size={20} color="#F39C12" />
            <View style={styles.alertTextContainer}>
              <Text style={styles.alertTitle}>Cotizaciones Pendientes</Text>
              <Text style={styles.alertText}>
                {stats.pendingQuotations} cotizaciones esperan respuesta
              </Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  welcomeCard: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
  },
  welcomeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  brandText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginVertical: 4,
  },
  subtitleText: {
    fontSize: 14,
    color: '#888',
  },
  statsContainer: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4057',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4057',
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
  },
  statSubtitle: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  chartContainer: {
    margin: 16,
  },
  chart: {
    borderRadius: 12,
    marginVertical: 8,
  },
  quickActionsContainer: {
    margin: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAction: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    elevation: 2,
  },
  quickActionContent: {
    alignItems: 'center',
  },
  quickActionText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
    color: '#2E4057',
    textAlign: 'center',
  },
  alertsContainer: {
    margin: 16,
    marginBottom: 32,
  },
  alertCard: {
    marginBottom: 8,
    borderLeftWidth: 4,
    elevation: 1,
  },
  alertContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4057',
  },
  alertText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});

export default HomeScreen;
