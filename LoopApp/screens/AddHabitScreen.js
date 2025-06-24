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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

  const handleTimeChange = (event, selectedDate) => {
    setShowTimePicker(false);
    if (selectedDate) setTime(selectedDate);
  };

  const handleAdd = () => {
    navigation.goBack();
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

        {/* Time */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Set a time for your task</Text>
          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => setShowTimePicker(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.timeButtonText}>{formatTime(time)}</Text>
          </TouchableOpacity>
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

  timeButton: {
    margin: "auto",
    width: "50%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  timeButtonText: {
    fontSize: 32,
    color: "#222",
    fontWeight: "500",
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
