import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";

import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const isSameDay = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const getDaysInMonth = (year, month) => {
  const days = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day);
    days.push({
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: day,
      fullDate: date,
    });
  }
  return days;
};

const getMonthsInYear = (year) => {
  const months = [];
  for (let month = 0; month < 12; month++) {
    const date = new Date(year, month, 1);
    months.push({
      month: month,
      name: date.toLocaleDateString("en-US", { month: "long" }),
      shortName: date.toLocaleDateString("en-US", { month: "short" }),
      fullDate: date,
    });
  }
  return months;
};

export default function HomeScreen({ navigation }) {
  const { user, loading } = useAuth();

  // Mientras se obtiene el usuario, podemos renderizar un placeholder
  if (loading || !user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Ya tenemos usuario seguro aquí

  const [habits, setHabits] = useState([]);
  const [monthProgress, setMonthProgress] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [filter, setFilter] = useState("All"); // Nuevo estado para el filtro

  useEffect(() => {
    if (!user?.uid) return;

    const loadMonthData = async () => {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth();
      const startOfMonth = new Date(year, month, 1).toISOString().split("T")[0];
      const endOfMonth = new Date(year, month + 1, 0)
        .toISOString()
        .split("T")[0];

      const monthProgress = await getDocs(
        query(
          collection(db, "habit_progress"),
          where("date", ">=", startOfMonth),
          where("date", "<=", endOfMonth),
          where("userId", "==", user.uid)
        )
      );

      setMonthProgress(monthProgress.docs.map((doc) => doc.data()));
    };

    loadMonthData();
  }, [selectedDate.getMonth(), selectedDate.getFullYear()]);

  useEffect(() => {
    const fetchHabits = async () => {
      if (!user?.uid) return; // Esperar a que el usuario esté disponible

      const habitsSnapshot = await getDocs(
        query(collection(db, "habits"), where("userId", "==", user.uid))
      );

      const habitsList = habitsSnapshot.docs.map((doc) => ({
        id: doc.id, // ✅ Incluir el ID del documento
        ...doc.data(),
      }));
      setHabits(habitsList);
    };
    fetchHabits();
  }, [user]);

  // Obtener progreso del día seleccionado
  const getTodayProgress = () => {
    const todayString = selectedDate.toISOString().split("T")[0];
    return monthProgress.filter((progress) => progress.date === todayString);
  };

  // Combinar hábitos con su progreso del día
  const getHabitsWithProgress = () => {
    const todayProgress = getTodayProgress();
    return habits.map((habit) => {
      const progress = todayProgress.find((p) => p.habitId === habit.id);
      return {
        ...habit,
        done: progress ? progress.done : false,
        completedAt: progress?.completedAt || null,
      };
    });
  };

  const markHabitAsCompleted = async (
    habitId,
    userId,
    source = "manual",
    deviceData = null
  ) => {
    const today = selectedDate.toISOString().split("T")[0];

    try {
      // 1. Buscar si ya existe progreso para hoy
      const progressQuery = query(
        collection(db, "habit_progress"),
        where("habitId", "==", habitId),
        where("date", "==", today),
        where("userId", "==", user.uid)
      );

      const existingProgress = await getDocs(progressQuery);

      if (existingProgress.empty) {
        // 2. No existe → Crear nuevo registro
        const newProgress = {
          habitId,
          date: today,
          done: true,
          completedAt: new Date(),
          method: source,
          deviceData: deviceData || null,
        };
        await addDoc(collection(db, "habit_progress"), newProgress);

        // 3. Actualizar estado local inmediatamente
        setMonthProgress((prev) => [...prev, newProgress]);
      } else {
        // 4. Ya existe → Actualizar (toggle)
        const progressDoc = existingProgress.docs[0];
        const currentData = progressDoc.data();
        const newDoneState = !currentData.done;

        await updateDoc(progressDoc.ref, {
          done: newDoneState,
          completedAt: new Date(),
          method: source,

          deviceData: deviceData || currentData.deviceData,
        });

        // 5. Actualizar estado local inmediatamente
        setMonthProgress((prev) =>
          prev.map((progress) =>
            progress.habitId === habitId && progress.date === today
              ? { ...progress, done: newDoneState, completedAt: new Date() }
              : progress
          )
        );
      }
    } catch (error) {
      console.error("Error updating habit progress:", error);
    }
  };

  const handleManualToggle = async (habitId) => {
    await markHabitAsCompleted(habitId, "manual");
  };

  // Función para filtrar la lista según el filtro seleccionado
  const getFilteredList = () => {
    const habitsWithProgress = getHabitsWithProgress();
    switch (filter) {
      case "Done":
        return habitsWithProgress.filter((item) => item.done === true);
      case "Pending":
        return habitsWithProgress.filter((item) => item.done === false);
      default:
        return habitsWithProgress;
    }
  };

  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth();
  const monthDays = getDaysInMonth(currentYear, currentMonth);
  const yearMonths = getMonthsInYear(currentYear);
  const monthName = selectedDate.toLocaleString("default", { month: "long" });

  const selectMonth = (month) => {
    const newDate = new Date(currentYear, month, 1);
    setSelectedDate(newDate);
    setShowMonthSelector(false);
  };

  const selectDay = (fullDate) => {
    setSelectedDate(fullDate);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#87CEEB" }}>
      <Text style={styles.screenTitle}>Loop</Text>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi!</Text>
        <TouchableOpacity
          onPress={() => setShowMonthSelector(!showMonthSelector)}
        >
          <Text style={styles.month}>{monthName} ▼</Text>
        </TouchableOpacity>

        {/* SELECTOR DE MES */}
        {showMonthSelector && (
          <View style={styles.monthSelector}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
            >
              {yearMonths.map((monthItem, idx) => {
                const isSelected = monthItem.month === currentMonth;
                return (
                  <TouchableOpacity
                    key={monthItem.month}
                    onPress={() => selectMonth(monthItem.month)}
                  >
                    <View
                      style={{
                        borderRadius: 12,
                        backgroundColor: isSelected ? "#6EC6F5" : "#E6F0FA",
                        marginRight: idx !== 11 ? 10 : 0,
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: isSelected ? "#fff" : "#3A7CA5",
                          fontWeight: isSelected ? "bold" : "500",
                          fontSize: 14,
                        }}
                      >
                        {monthItem.shortName}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* CALENDARIO CON TODOS LOS DÍAS DEL MES */}
        <View style={styles.calendar}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {monthDays.map((item, idx) => {
              const isSelected = isSameDay(item.fullDate, selectedDate);
              const isToday = isSameDay(item.fullDate, new Date());
              return (
                <TouchableOpacity
                  key={item.date}
                  onPress={() => selectDay(item.fullDate)}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 12,
                      backgroundColor: isSelected
                        ? "#6EC6F5"
                        : isToday
                        ? "#F5DEB3"
                        : "#E6F0FA",

                      marginRight: idx !== monthDays.length - 1 ? 10 : 0,
                      paddingVertical: 6,
                    }}
                  >
                    <View
                      style={{
                        borderRadius: 16,
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        minWidth: 48,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: isSelected ? "#fff" : "#3A7CA5",
                          fontWeight: isSelected ? "bold" : "500",
                          fontSize: 12,
                        }}
                      >
                        {item.day}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginTop: 6,
                        backgroundColor: "#fff",
                        borderRadius: 20,
                        width: 30,
                        height: 30,
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: isSelected ? 2 : 0,
                        borderColor: isSelected ? "#6EC6F5" : "transparent",
                        shadowColor: "#000",
                        shadowOpacity: 0.05,
                        shadowRadius: 2,
                        elevation: 2,
                      }}
                    >
                      <Text
                        style={{
                          color: "#3A7CA5",
                          fontWeight: "bold",
                          fontSize: 14,
                        }}
                      >
                        {item.date}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        {/* FIN CALENDARIO */}
      </View>
      {/* CONTENEDOR DE ABAJO RESTAURADO */}
      <View style={styles.container}>
        <View style={styles.containerButtons}>
          <TouchableOpacity
            style={[styles.button, filter === "All" && styles.activeButton]}
            onPress={() => setFilter("All")}
          >
            <Text
              style={[
                styles.buttonText,
                filter === "All" && styles.activeButtonText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, filter === "Done" && styles.activeButton]}
            onPress={() => setFilter("Done")}
          >
            <Text
              style={[
                styles.buttonText,
                filter === "Done" && styles.activeButtonText,
              ]}
            >
              Done
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, filter === "Pending" && styles.activeButton]}
            onPress={() => setFilter("Pending")}
          >
            <Text
              style={[
                styles.buttonText,
                filter === "Pending" && styles.activeButtonText,
              ]}
            >
              Pending
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContent}
          data={
            // Filtrar solo los hábitos programados para el día seleccionado
            getFilteredList()
              .filter((habit) => {
                // Determinar el día de la semana del selectedDate
                const weekDay = selectedDate.toLocaleDateString("en-US", {
                  weekday: "short",
                });
                // Si el hábito tiene días definidos, verificar si el día seleccionado está incluido
                if (habit.days && Array.isArray(habit.days)) {
                  return habit.days.includes(weekDay);
                }
                // Si no tiene días definidos, mostrarlo igual (por compatibilidad)
                return true;
              })
              .map((habit) => {
                // Buscar si el hábito está marcado como completado en el día seleccionado en monthProgress
                const selectedDateStr = selectedDate
                  .toISOString()
                  .split("T")[0];
                const progress = monthProgress.find(
                  (p) =>
                    p.habitId === habit.id &&
                    p.date === selectedDateStr &&
                    p.done === true
                );
                // Retornar el hábito con la propiedad done actualizada según habit_progress
                return {
                  ...habit,
                  done: !!progress,
                };
              })
          }
          renderItem={({ item }) => (
            <Item
              item={item}
              onToggleDone={() => handleManualToggle(item.id)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}

function Item({ item, onToggleDone }) {
  // Mapear los tipos a colores e iconos
  const getTypeStyle = (type) => {
    switch (type) {
      case "higiene":
        return { color: "#BFE3FA", icon: "💧" };
      case "salud":
        return { color: "#FFF6CC", icon: "💊" };
      case "nutricion":
        return { color: "#D6F5D6", icon: "🍴" };
      default:
        return { color: "#E6F0FA", icon: "📝" };
    }
  };

  const typeStyle = getTypeStyle(item.type);

  return (
    <View style={[styles.item, { backgroundColor: typeStyle.color }]}>
      <Text style={styles.icon}>{typeStyle.icon}</Text>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.hour}>{item.time}</Text>
      </View>
      <View style={styles.done}>
        <TouchableOpacity onPress={onToggleDone}>
          <View
            style={[
              {
                width: 32,
                height: 32,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: "transparent",
                backgroundColor: item.done ? "#fff" : "#f0f0f0", // gris ligero
                justifyContent: "center",
                alignItems: "center",
              },
              styles.doneText,
            ]}
          >
            {item.done ? (
              <Text
                style={{ fontSize: 16, color: "black", fontWeight: "bold" }}
              >
                ✓
              </Text>
            ) : null}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Title for the screen (Loop)
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    paddingTop: 50,
    textAlign: "center",
    fontFamily: "Poppins",
    marginTop: 10,
  },
  header: {
    flexDirection: "column",
    gap: 10,
    alignItems: "flex-start",
    paddingHorizontal: 0,
    paddingTop: 10,
    marginTop: 30,
  },
  greeting: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 20,
    color: "#fff",
    fontFamily: "Poppins",
  },
  month: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 20,
    color: "#fff",
    fontFamily: "Poppins",
  },

  monthSelector: {
    height: 40,
  },

  calendar: {
    height: 80,
    marginTop: 10,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginTop: 30,
    padding: 20,
  },

  containerButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },

  button: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5,
  },

  activeButton: {
    backgroundColor: "#87CEEB",
    borderColor: "#87CEEB",
    opacity: 1,
  },

  buttonText: {
    fontSize: 14,
    fontFamily: "Poppins",
    color: "#000",
    fontWeight: "500",
  },

  activeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  list: {
    marginTop: 20,
    marginHorizontal: 10,
  },

  listContent: {
    gap: 10,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 15,
  },

  itemContent: {
    flexDirection: "column",
    flex: 1,
    marginLeft: 10,
  },

  icon: {
    marginRight: 10,
    fontSize: 24,
  },

  // Style for the item title (task title)
  itemTitle: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "600",
    color: "#222",
    marginBottom: 2,
  },

  hour: {
    fontSize: 12,
    fontFamily: "Poppins",
    color: "#666",
  },
});
