import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";

const list = [
  {
    id: 1,
    icon: "💧",
    title: "Brush your teeth",
    hour: "07:35",
    done: true,
    color: "#E6F0FA", // light blue
  },
  {
    id: 2,
    icon: "💊",
    title: "Albuterol Pill",
    hour: "20:00",
    done: false,
    color: "#FFF6CC", // light yellow
  },
  {
    id: 3,
    icon: "🍴",
    title: "Eat some fruit",
    hour: "12:30",
    done: false,
    color: "#D6F5D6", // light green
  },
  {
    id: 4,
    icon: "💧",
    title: "Take a shower",
    hour: "07:10",
    done: true,
    color: "#E6F0FA", // light blue
  },
];

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
  const [listState, setListState] = useState(list);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [filter, setFilter] = useState("All"); // Nuevo estado para el filtro

  // Cambia el estado de done para el item con el id dado
  const toggleDone = (id) => {
    setListState((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  // Función para filtrar la lista según el filtro seleccionado
  const getFilteredList = () => {
    switch (filter) {
      case "Done":
        return listState.filter((item) => item.done === true);
      case "Pending":
        return listState.filter((item) => item.done === false);
      default:
        return listState;
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
        <Text style={styles.greeting}>Hi, Susana!</Text>
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
          data={getFilteredList()}
          renderItem={({ item }) => (
            <Item item={item} onToggleDone={() => toggleDone(item.id)} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}

function Item({ item, onToggleDone }) {
  return (
    <View style={[styles.item, { backgroundColor: item.color }]}>
      <Text style={styles.icon}>{item.icon}</Text>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.hour}>{item.hour}</Text>
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
            {item.done && (
              <Text
                style={{ fontSize: 16, color: "black", fontWeight: "bold" }}
              >
                ✓
              </Text>
            )}
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
