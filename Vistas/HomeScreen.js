import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Network from 'expo-network';
import Constants from 'expo-constants';

export default function HomeScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [API_URL, setAPI_URL] = useState('http://localhost:3000/api');

  // Detectar IP automáticamente
  useEffect(() => {
    const setupAPI = async () => {
      try {
        const ip = (await Network.getIpAddressAsync()) || Constants.expoConfig?.hostUri?.split(':').shift();
        if (ip) {
          setAPI_URL(`http://${ip}:3000/api`);
          console.log('🌐 API URL configurada:', `http://${ip}:3000/api`);
        }
      } catch (err) {
        console.warn('⚠️ No se pudo detectar IP, usando localhost');
      }
    };
    setupAPI();
  }, []);

  // Redirigir si ya hay token guardado
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) navigation.replace('Calendario');
    };
    checkToken();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Complete todos los campos');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Error', data.message || 'Error al iniciar sesión');
        return;
      }

      await AsyncStorage.setItem('token', data.token);
      navigation.replace('Calendario');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="ejemplo@correo.com"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginTop: 10 }} onPress={() => navigation.navigate('Profile')}>
          <Text style={{ color: '#fff', textDecorationLine: 'underline' }}>
            ¿No tienes cuenta? Regístrate
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#DE8FBC', justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { backgroundColor: '#F2A9D0', padding: 20, borderRadius: 10, width: '90%', shadowColor: '#000', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 5, elevation: 4, alignItems: 'center' },
  label: { fontSize: 16, fontWeight: 'bold', color: '#C2185B', textAlign: 'center', marginTop: 10 },
  input: { backgroundColor: '#EAEAEA', width: '90%', padding: 10, borderRadius: 20, marginTop: 8, marginBottom: 15, textAlign: 'center', fontSize: 16 },
  button: { backgroundColor: '#F776D1', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 20, marginTop: 10, shadowColor: '#000', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 5, elevation: 3 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16, textTransform: 'lowercase' },
});
