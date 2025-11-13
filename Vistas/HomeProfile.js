import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Network from 'expo-network';
import Constants from 'expo-constants';

export default function HomeProfile({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [API_URL, setAPI_URL] = useState('http://localhost:3000/api');

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

  const handleRegister = async () => {
    if (!nombre || !email || !password) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }

    try {
      const registerResponse = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password }),
      });

      const registerData = await registerResponse.json();

      if (!registerResponse.ok) {
        Alert.alert('Error', registerData.message || 'Error al registrar');
        return;
      }

      // Inicia sesión automáticamente tras registrarse
      const loginResponse = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        Alert.alert('Error', loginData.message || 'Error al iniciar sesión');
        return;
      }

      await AsyncStorage.setItem('token', loginData.token);
      Alert.alert('Éxito', 'Usuario registrado correctamente');
      navigation.replace('Calendario');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su nombre"
          placeholderTextColor="#999"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="ejemplo@correo.com"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginTop: 10 }} onPress={() => navigation.navigate('Home')}>
          <Text style={{ color: '#fff', textDecorationLine: 'underline' }}>
            ¿Ya tienes cuenta? Inicia sesión
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
