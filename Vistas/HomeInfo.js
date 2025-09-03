import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Api from '../Api';

export default function HomeInfo({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información</Text>
      <Text style={styles.subtitle}>
        Este calendario menstrual busca brindar toda la información posible para que los usuarios se sientan cómodos y seguros al utilizar nuestra app.
      </Text>

      <Api />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#DE8FBC',
    alignItems: 'center',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'inria sans',
  },
  button: {
    backgroundColor: '#F776D1',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
