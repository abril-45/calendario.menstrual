import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking,
  FlatList,
  ActivityIndicator,
} from "react-native";

export default function ApiHospitals() {
  const [direccion, setDireccion] = useState("");
  const [hospitales, setHospitales] = useState([]);
  const [loading, setLoading] = useState(false);

  const haversineKm = (lat1, lon1, lat2, lon2) => {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };


  const geocode = async () => {
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        direccion
      )}&limit=1`;

      const res = await fetch(url, {
        headers: { "User-Agent": "CalendarioMenstrualApp/1.0" },
      });

      const data = await res.json();
      if (!data.length) return null;

      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    } catch (error) {
      console.log("Error en geocode:", error);
      return null;
    }
  };

  // Función segura para llamar Overpass con reintentos
  const fetchOverpassSafe = async (query, retries = 5) => {
    const apiUrl = `https://overpass.kumi.systems/api/interpreter?data=${encodeURIComponent(
      query
    )}`;

    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(apiUrl);
        if (response.status === 429 || response.status === 504) {
          console.log("Servidor ocupado, reintentando...");
          await new Promise((r) => setTimeout(r, 1200));
          continue;
        }
        return await response.json();
      } catch (e) {
        console.log("Intento fallido:", i + 1);
        await new Promise((r) => setTimeout(r, 1000));
      }
    }

    return null;
  };


  // Buscar hospitales
  const fetchHospitals = async () => {
    if (loading) return; // evita doble-click
    if (!direccion.trim()) {
      alert("Por favor ingrese una dirección.");
      return;
    }

    setLoading(true);
    setHospitales([]);

    const coords = await geocode();
    if (!coords) {
      alert("No se encontró la dirección.");
      setLoading(false);
      return;
    }

    const query = `
      [out:json][timeout:30];
      (
        node["amenity"="hospital"](around:30000, ${coords.lat}, ${coords.lon});
        way["amenity"="hospital"](around:30000, ${coords.lat}, ${coords.lon});
        relation["amenity"="hospital"](around:30000, ${coords.lat}, ${coords.lon});
      );
      out center;
    `;

    const data = await fetchOverpassSafe(query);

    if (!data) {
      alert("El servidor está ocupado. Intenta de nuevo en unos segundos.");
      setLoading(false);
      return;
    }

    const lista = data.elements
      .map((h) => {
        const lat = h.lat || h.center?.lat;
        const lon = h.lon || h.center?.lon;
        if (!lat || !lon) return null;

        return {
          name: h.tags?.name || "Hospital sin nombre",
          lat,
          lon,
          distance: haversineKm(coords.lat, coords.lon, lat, lon),
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.distance - b.distance);

    setHospitales(lista);
    setLoading(false);
  };


  const abrirMaps = (lat, lon) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
    Linking.openURL(url);
  };

  
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDistance}>
        Distancia: {item.distance.toFixed(2)} km
      </Text>

      <TouchableOpacity
        style={styles.mapsButton}
        onPress={() => abrirMaps(item.lat, item.lon)}
      >
        <Text style={styles.mapsButtonText}>Abrir en Google Maps</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ej: Av. Mitre 750, Avellaneda, Buenos Aires"
        value={direccion}
        onChangeText={setDireccion}
      />

      <TouchableOpacity
        style={[styles.searchButton, loading && { opacity: 0.6 }]}
        onPress={fetchHospitals}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.searchButtonText}>Buscar</Text>
        )}
      </TouchableOpacity>

      <FlatList
        data={hospitales}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 40 }}
        style={{ width: "100%" }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    padding: 10,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    width: "100%",
    borderRadius: 10,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: "#F776D1",
    padding: 12,
    width: "100%",
    borderRadius: 10,
    marginBottom: 15,
  },
  searchButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  itemName: { fontWeight: "bold", fontSize: 16, marginBottom: 6 },
  itemDistance: { marginBottom: 10, color: "#333" },
  mapsButton: {
    backgroundColor: "#D81B60",
    padding: 10,
    borderRadius: 8,
  },
  mapsButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
