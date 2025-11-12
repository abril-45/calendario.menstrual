import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Calendario({ navigation }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [periodHistory, setPeriodHistory] = useState([]);
  const [symptomsList, setSymptomsList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [symptomName, setSymptomName] = useState("");
  const [symptomDesc, setSymptomDesc] = useState("");

  // === Cargar datos guardados ===
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedPeriods =
          JSON.parse(await AsyncStorage.getItem("periodHistory")) || [];
        const storedSymptoms =
          JSON.parse(await AsyncStorage.getItem("symptomsList")) || [];
        setPeriodHistory(storedPeriods);
        setSymptomsList(storedSymptoms);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    loadData();
  }, []);

  // === Guardar datos ===
  useEffect(() => {
    AsyncStorage.setItem("periodHistory", JSON.stringify(periodHistory));
    AsyncStorage.setItem("symptomsList", JSON.stringify(symptomsList));
  }, [periodHistory, symptomsList]);

  // === Días del calendario ===
  const daysOfWeek = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  const isToday = (day, month, year) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const isPeriodDay = (date) =>
    periodHistory.some((p) => date >= p.start && date <= (p.end || p.start));

  const isSymptomDay = (date) =>
    symptomsList.some((s) => s.date === date);

  const getCalendarDays = () => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay() || 7;
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevLastDay = new Date(currentYear, currentMonth, 0).getDate();
    const days = [];

    // Días del mes anterior
    for (let x = firstDayIndex - 2; x >= 0; x--) {
      days.push({ label: prevLastDay - x, inactive: true });
    }

    // Días del mes actual
    for (let i = 1; i <= lastDay; i++) {
      const fullDate = `${currentYear}-${(currentMonth + 1)
        .toString()
        .padStart(2, "0")}-${i.toString().padStart(2, "0")}`;
      days.push({
        label: i,
        date: fullDate,
        today: isToday(i, currentMonth, currentYear),
        period: isPeriodDay(fullDate),
        symptom: isSymptomDay(fullDate),
        inactive: false,
      });
    }

    return days;
  };

  // === Funciones de manejo ===
  const markPeriodStart = () => {
    if (!selectedDate) return;
    setPeriodHistory([...periodHistory, { start: selectedDate, end: selectedDate }]);
    Alert.alert("Inicio registrado", `Periodo iniciado el ${selectedDate}`);
  };

  const markPeriodEnd = () => {
    if (!selectedDate || periodHistory.length === 0) return;
    const updated = [...periodHistory];
    updated[updated.length - 1].end = selectedDate;
    setPeriodHistory(updated);
    Alert.alert("Fin registrado", `Periodo finalizado el ${selectedDate}`);
  };

  const addSymptom = () => {
    if (!selectedDate || !symptomName.trim()) return;
    const newSymptom = {
      date: selectedDate,
      name: symptomName.trim(),
      description: symptomDesc.trim(),
    };
    setSymptomsList([...symptomsList, newSymptom]);
    setSymptomName("");
    setSymptomDesc("");
    Alert.alert("Síntoma añadido", `Registrado para el ${selectedDate}`);
  };

  const deletePeriod = (i) => {
    const updated = [...periodHistory];
    updated.splice(i, 1);
    setPeriodHistory(updated);
  };

  const deleteSymptom = (i) => {
    const updated = [...symptomsList];
    updated.splice(i, 1);
    setSymptomsList(updated);
  };

  const renderPrediction = () => {
    if (periodHistory.length < 2)
      return "Aún no hay suficientes datos para predecir.";

    const sorted = [...periodHistory].sort(
      (a, b) => new Date(a.start) - new Date(b.start)
    );
    const intervals = [];
    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(sorted[i - 1].start);
      const curr = new Date(sorted[i].start);
      intervals.push((curr - prev) / (1000 * 60 * 60 * 24));
    }
    const avgCycle = Math.round(
      intervals.reduce((a, b) => a + b, 0) / intervals.length
    );
    const lastPeriod = new Date(sorted[sorted.length - 1].start);
    const nextDate = new Date(lastPeriod);
    nextDate.setDate(lastPeriod.getDate() + avgCycle);
    return `Se estima que el próximo periodo iniciará el ${nextDate.toLocaleDateString(
      "es-ES"
    )}.`;
  };

  const calendarDays = getCalendarDays();

  // === Render ===
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🌸Ópalo🌸</Text>
      <Text style={styles.subtitle}>Calendario menstrual</Text>

      {/* Navegación de mes */}
      <View style={styles.monthHeader}>
        <TouchableOpacity
          onPress={() =>
            setCurrentDate(
              new Date(currentDate.setMonth(currentDate.getMonth() - 1))
            )
          }
        >
          <Text style={styles.navArrow}>◀</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.monthText}>
            {currentDate.toLocaleString("es-ES", { month: "long" })}
          </Text>
          <Text style={styles.yearText}>{currentDate.getFullYear()}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            setCurrentDate(
              new Date(currentDate.setMonth(currentDate.getMonth() + 1))
            )
          }
        >
          <Text style={styles.navArrow}>▶</Text>
        </TouchableOpacity>
      </View>

      {/* Días de la semana */}
      <View style={styles.weekRow}>
        {daysOfWeek.map((d) => (
          <Text key={d} style={styles.weekDay}>{d}</Text>
        ))}
      </View>

      {/* Días del calendario */}
      <View style={styles.daysGrid}>
        {calendarDays.map((d, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.day,
              d.inactive && styles.inactive,
              d.today && styles.today,
              d.period && styles.period,
              d.symptom && styles.symptom,
            ]}
            onPress={() => setSelectedDate(d.date)}
          >
            <Text style={styles.dayText}>{d.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botones para el día seleccionado */}
      {selectedDate && (
        <View style={styles.dayButtons}>
          <Text style={styles.selectedText}>📅 {selectedDate}</Text>
          <TouchableOpacity style={styles.btn} onPress={markPeriodStart}>
            <Text>🩸 Inicio del periodo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={markPeriodEnd}>
            <Text>🩸 Fin del periodo</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Predicción */}
      <View style={styles.prediction}>
        <Text style={styles.predTitle}>🔮 Próximo periodo estimado</Text>
        <Text style={styles.predText}>{renderPrediction()}</Text>
      </View>

      {/* Registro de síntomas */}
      <View style={styles.symptomsBox}>
        <Text style={styles.sectionTitle}>🌼 Registro de síntomas</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del síntoma"
          value={symptomName}
          onChangeText={setSymptomName}
        />
        <TextInput
          style={[styles.input, { height: 70 }]}
          placeholder="Descripción (opcional)"
          multiline
          value={symptomDesc}
          onChangeText={setSymptomDesc}
        />
        <TouchableOpacity style={styles.btn} onPress={addSymptom}>
          <Text>➕ Añadir síntoma</Text>
        </TouchableOpacity>

        {symptomsList.length === 0 ? (
          <Text>No hay síntomas registrados.</Text>
        ) : (
          symptomsList.map((s, i) => (
            <View key={i} style={styles.symptomItem}>
              <View>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>{s.date}</Text> - {s.name}
                </Text>
                <Text style={{ fontSize: 12 }}>{s.description}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteSymptom(i)}>
                <Text style={{ color: "red" }}>🗑️</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      {/* Historial */}
      <View style={styles.history}>
        <Text style={styles.sectionTitle}>🩸 Historial de periodos</Text>
        {periodHistory.length === 0 ? (
          <Text>No hay periodos registrados.</Text>
        ) : (
          periodHistory.map((p, i) => (
            <View key={i} style={styles.historyItem}>
              <Text>
                {p.start} → {p.end || "en curso"}
              </Text>
              <TouchableOpacity onPress={() => deletePeriod(i)}>
                <Text style={{ color: "red" }}>🗑️</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      
    </ScrollView>
  );
}

// === Estilos ===
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8bbd0", padding: 16 },
  title: { textAlign: "center", fontSize: 28, color: "#6a1b9a", fontWeight: "bold" },
  subtitle: { textAlign: "center", color: "#6a1b9a", marginBottom: 16 },
  monthHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  navArrow: { fontSize: 26, color: "#f06292" },
  monthText: { fontSize: 20, color: "#6a1b9a", textTransform: "capitalize" },
  yearText: { textAlign: "center", color: "#6a1b9a" },
  weekRow: { flexDirection: "row", justifyContent: "space-around" },
  weekDay: { color: "#6a1b9a", fontWeight: "bold" },
  daysGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", marginTop: 10 },
  day: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 3,
    backgroundColor: "#fce4ec",
  },
  inactive: { opacity: 0.3 },
  today: { backgroundColor: "#ad1457", borderColor: "#f06292", borderWidth: 2 },
  period: { backgroundColor: "#f06292" },
  symptom: { borderWidth: 2, borderColor: "#ffca28" },
  dayText: { color: "#6a1b9a" },
  dayButtons: { marginTop: 10, alignItems: "center" },
  selectedText: { fontWeight: "bold", marginBottom: 5 },
  btn: {
    backgroundColor: "#f06292",
    padding: 8,
    borderRadius: 8,
    marginVertical: 4,
  },
  prediction: {
    backgroundColor: "#fce4ec",
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
  },
  predTitle: { color: "#ad1457", textAlign: "center", marginBottom: 6 },
  predText: { textAlign: "center", color: "#6a1b9a" },
  symptomsBox: {
    backgroundColor: "#fce4ec",
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    marginBottom: 8,
    backgroundColor: "white",
  },
  symptomItem: {
    backgroundColor: "#fff8e1",
    borderLeftColor: "#ffca28",
    borderLeftWidth: 4,
    padding: 8,
    borderRadius: 8,
    marginBottom: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  history: {
    backgroundColor: "#fce4ec",
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
    marginBottom: 30,
  },
  sectionTitle: { color: "#ad1457", fontWeight: "bold", marginBottom: 8 },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderLeftColor: "#f06292",
    borderLeftWidth: 5,
    borderRadius: 8,
    padding: 8,
    marginBottom: 5,
  },
  backButton: {
    backgroundColor: "#f06292",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
