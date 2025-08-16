import React from 'react';
import { Platform } from 'react-native';
import PowerToolsApp from './App';

// Wrapper para mejorar compatibilidad web
export default function WebApp() {
  if (Platform.OS === 'web') {
    // Configuración específica para web
    return (
      <div style={{ 
        width: '100%', 
        height: '100vh', 
        maxWidth: '100%',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <PowerToolsApp />
      </div>
    );
  }
  
  return <PowerToolsApp />;
}
