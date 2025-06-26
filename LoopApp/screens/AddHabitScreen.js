import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
  Modal,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

// Puedes cambiar estos datos para hacerlo dinámico según la categoría seleccionada
const habitTypes = {
  higiene: {
    label: "Higiene",
    emoji: "💧",
    color: "#BFE3FA",
    icon: require("../assets/FrameBlue.png"),
    subtitle: "Nueva tarea",
    backgroundColor: "#BFE3FA",
  },
  salud: {
    label: "Salud",
    emoji: "💊",
    color: "#FFF6CC",
    icon: require("../assets/FrameYellow.png"),
    subtitle: "Nueva tarea",
    backgroundColor: "#FFF6CC",
  },

  nutricion: {
    label: "Nutrición",
    emoji: "🍴",
    color: "#D6F5D6",
    icon: require("../assets/FrameGreen.png"),
    subtitle: "Nueva tarea",
    backgroundColor: "#D6F5D6",
  },
};

const weekDays = [
  { key: "Mon", label: "Mon" },
  { key: "Tue", label: "Tue" },
  { key: "Wed", label: "Wed" },
  { key: "Thu", label: "Thu" },
  { key: "Fri", label: "Fri" },
  { key: "Sat", label: "Sat" },
  { key: "Sun", label: "Sun" },
];

export default function AddHabitScreen({ route, navigation }) {
  const habitType = route?.params?.type;
  const habit = habitTypes[habitType];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDays, setSelectedDays] = useState(["Mon"]);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDayPress = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  // Cambia el tiempo y cierra el picker
  const handleTimeChange = (event, selectedDate) => {
    if (event.type === "set" && selectedDate) {
      setTime(selectedDate);
    }
    setShowTimePicker(false);
  };

  const handleAdd = async () => {
    if (!name || !description || !selectedDays.length || !time) {
      Alert.alert("Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "habits"), {
        name,
        description,
        type: habitType,
        days: selectedDays,
        time: time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        createdAt: new Date(),
      });

      navigation.navigate("MainTabs", {
        screen: "Home",
      });
    } catch (error) {
      console.error("Error adding habit: ", error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  const handleDelete = () => {
    navigation.goBack();
  };

  // Helper to format time as HH:MM
  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <View
      style={[styles.container, { backgroundColor: habit.backgroundColor }]}
    >
      {/* Close Button */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <View style={styles.closeButtonCircle}>
          <Text style={styles.closeButtonText}>×</Text>
        </View>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Icon */}
        <Text style={styles.icon}>{habit.emoji}</Text>
        {/* Title */}
        <Text style={styles.title}>{habit.label}</Text>
        <Text style={styles.subtitle}>{habit.subtitle}</Text>

        {/* Name Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#B0B0B0"
          />
          <View
            style={{
              position: "relative",
              bottom: 12,
              left: 0,
              right: 0,
              height: 1,
              backgroundColor: "#B0B0B0",
              marginTop: 0,
              marginHorizontal: 16,
              opacity: 0.7,
            }}
          />
        </View>

        {/* Description Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, styles.inputDescription]}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            placeholderTextColor="#B0B0B0"
            multiline
          />
          <View
            style={{
              position: "relative",
              bottom: 12,
              left: 0,
              right: 0,
              height: 1,
              backgroundColor: "#B0B0B0",
              marginTop: 0,
              marginHorizontal: 16,
              opacity: 0.7,
            }}
          />
        </View>

        {/* Cycle */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Set a cycle for your task</Text>
          <View style={styles.daysRow}>
            {weekDays.map((day) => (
              <TouchableOpacity
                key={day.key}
                style={[
                  styles.dayButton,
                  selectedDays.includes(day.key) && styles.dayButtonSelected,
                ]}
                onPress={() => handleDayPress(day.key)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    selectedDays.includes(day.key) && { color: "#222" },
                    styles.dayButtonText,
                    selectedDays.includes(day.key) &&
                      styles.dayButtonTextSelected,
                  ]}
                >
                  {day.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Time Picker estilo iPhone */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Set a time for your task</Text>
          <TouchableOpacity
            style={styles.timeDisplayButton}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={styles.timeDisplayText}>{formatTime(time)}</Text>
          </TouchableOpacity>

          {/* DateTimePicker estilizado en un modal centrado */}
          <Modal
            visible={showTimePicker}
            transparent
            animationType="fade"
            onRequestClose={() => setShowTimePicker(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.customTimePickerBox}>
                <Text style={styles.timePickerLabel}>Select time</Text>
                <DateTimePicker
                  value={time}
                  mode="time"
                  is24Hour={true}
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={handleTimeChange}
                  style={styles.nativeTimePicker}
                  textColor="#222"
                  accentColor="#FFD59A"
                  themeVariant="light"
                />
                <TouchableOpacity
                  style={styles.timePickerDoneButton}
                  onPress={() => setShowTimePicker(false)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.timePickerDoneText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        {/* Add & Delete Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAdd}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
            activeOpacity={0.8}
          >
            <Ionicons name="trash-outline" size={28} color="#222" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden",
  },
  closeButton: {
    position: "absolute",
    top: 60,
    left: 24,
    zIndex: 10,
  },
  closeButtonCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F5F8FA",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  closeButtonText: {
    fontSize: 32,
    color: "#222",
    fontWeight: "400",
    marginTop: -2,
  },
  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: "center",
  },
  icon: {
    fontSize: 48,
    marginBottom: 8,
    marginTop: 8,
    textAlign: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    marginBottom: 2,
    marginTop: 2,
  },
  subtitle: {
    fontSize: 12,
    color: "#6A6A6A",
    textAlign: "center",
    marginBottom: 18,
    fontWeight: "400",
  },
  inputWrapper: {
    width: "100%",
    marginBottom: 14,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  input: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#222",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 0,
  },
  inputDescription: {
    minHeight: 44,
    maxHeight: 80,
    textAlignVertical: "top",
  },

  daysRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 12,
  },

  dayButton: {
    width: 36,
    height: 36,
    borderRadius: 16,
    backgroundColor: "#F5F8FA",
    justifyContent: "center",
    alignItems: "center",
  },
  dayButtonSelected: {
    backgroundColor: "#FFD59A", // naranja pastel
  },
  dayButtonTextSelected: {
    color: "#222",
  },

  sectionBox: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 15,
    color: "#222",
    fontWeight: "500",
  },

  timeDisplayButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F8FA",
    marginTop: 8,
    marginBottom: 8,
  },

  timeDisplayText: {
    fontSize: 32,
    color: "#222",
    fontWeight: "500",
    letterSpacing: 2,
  },

  // Modal overlay for the picker
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },

  customTimePickerBox: {
    width: 320,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },

  timePickerLabel: {
    fontSize: 18,
    color: "#222",
    fontWeight: "500",
    marginBottom: 12,
  },

  nativeTimePicker: {
    width: 220,
    height: 120,
    backgroundColor: "#fff",
    marginBottom: 12,
  },

  timePickerDoneButton: {
    marginTop: 8,
    backgroundColor: "#FFD59A",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FFD59A",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },

  timePickerDoneText: {
    fontSize: 20,
    color: "#222",
    fontWeight: "600",
    letterSpacing: 1,
  },

  buttonRow: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 16,
  },

  addButton: {
    width: "50%",
    backgroundColor: "#fff",
    shadowColor: "#000",

    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 24,
    color: "#222",
    fontWeight: "500",
  },

  deleteButton: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
