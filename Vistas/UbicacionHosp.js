import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ApiHospitals from "../ApiHospitals";

export default function UbicacionHosp({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Hospitales más cercanos</Text>

      <Text style={styles.subtitle}>
        En caso de embarazos o emergencias relacionadas al ciclo menstrual,
        si ingresa su dirección podrá encontrar los hospitales más cercanos a usted.
      </Text>

      {}
      <ApiHospitals />

      {}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#DE8FBC",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FFFFFF",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#F776D1",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
