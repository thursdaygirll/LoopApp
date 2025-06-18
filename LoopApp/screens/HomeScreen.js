import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  Platform,
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

export default function HomeScreen({ navigation }) {
  const [listState, setListState] = useState(list);

  // Cambia el estado de done para el item con el id dado
  const toggleDone = (id) => {
    setListState((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#87CEEB" }}>
      <Text style={styles.title}>Loop</Text>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi, Susana!</Text>
        <Text style={styles.month}>May</Text>
        {/* AQUI FALTA EL CALENDARIO */}
      </View>
      <View style={styles.container}>
        <View style={styles.containerButtons}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Pending</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContent}
          data={listState}
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
        <Text style={styles.title}>{item.title}</Text>
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
  title: {
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
    alignItems: "start",
    paddingHorizontal: 25,
    paddingTop: 10,
    marginTop: 30,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Poppins",
  },
  month: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Poppins",
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

  title: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "semibold",
  },

  hour: {
    fontSize: 12,

    fontFamily: "Poppins",
  },
});
