import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function Metodos({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Métodos de Higiene Femenina</Text>

        <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
          <Text style={styles.label}>Durante la menstruación:</Text>
          <Text style={styles.text}>
            • Cambiá tu toalla o copa menstrual cada 4-6 horas.{"\n"}
            • Lavá la zona íntima con agua tibia y jabón neutro.{"\n"}
            • Evitá productos perfumados que alteren el pH.{"\n"}
            • Usá ropa interior de algodón y evitá la humedad.
          </Text>

          <Text style={styles.label}>Después de tener relaciones sexuales:</Text>
          <Text style={styles.text}>
            • Lavá suavemente la zona íntima con agua tibia.{"\n"}
            • No uses duchas vaginales ni jabones fuertes.{"\n"}
            • Oriná después del acto para prevenir infecciones.{"\n"}
            • Si hay molestias o flujo inusual, consultá a tu médico.
          </Text>
          

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.buttonText}>Volver</Text>
          </TouchableOpacity>
        </ScrollView>

        <Text style={styles.footer}>
          Recordá que una buena higiene es clave para cuidar tu salud íntima. 
          Si estás con medicación o anticonceptivos, consultá con tu médico.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DE8FBC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#F2A9D0',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    height: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C2185B',
    textAlign: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C2185B',
    marginTop: 10,
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  text: {
    fontSize: 15,
    color: '#333',
    marginVertical: 5,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#F776D1',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    marginTop: 10,
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
});
