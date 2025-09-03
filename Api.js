import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

const Api = () => {
  const [feriados, setFeriados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await fetch('https://date.nager.at/api/v3/PublicHolidays/2025/US');
        if (!response.ok) throw new Error('Error en la solicitud');
        const data = await response.json();
        setFeriados(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    obtenerDatos();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando feriados...</Text>
      </View>
    );
  }

  return (
    <FlatList
  data={feriados}
  keyExtractor={(item, index) => `${item.date}-${item.localName}-${index}`}
  renderItem={({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.localName} ({item.name})</Text>
      <Text style={styles.subtitle}>Fecha: {item.date}</Text>
      <Text style={styles.type}>Tipo: {item.type}</Text>
    </View>
  )}
/>

  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#333',
    marginTop: 5,
  },
  type: {
    marginTop: 5,
    fontStyle: 'italic',
    color: '#666',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Api;
