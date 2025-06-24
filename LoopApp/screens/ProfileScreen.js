import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/lines.png")}
        style={styles.background}
      />
      {/* Header */}
      <Text style={styles.greeting}>Hi, Susana !</Text>
      {/* Profile Avatar */}
      <View style={styles.avatarContainer}>
        <Ionicons name="person-circle-outline" size={140} color="#B3D6F6" />
      </View>
      {/* Username */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#B0B0B0"
          editable={false}
          value="Username"
        />
      </View>
      {/* Email */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="name@domain.com"
          placeholderTextColor="#B0B0B0"
          editable={false}
          value="name@domain.com"
        />
      </View>
      {/* Password */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#B0B0B0"
          secureTextEntry
          editable={false}
          value="Password"
        />
      </View>
      {/* Emergency Alert */}
      <TouchableOpacity style={styles.emergencyButton} activeOpacity={0.8}>
        <Text style={styles.emergencyText}>Emergency Alert</Text>
        <Ionicons
          name="alert-circle-outline"
          size={22}
          color="#fff"
          style={{ marginLeft: 8 }}
        />
      </TouchableOpacity>
      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
        <Text style={styles.logoutText}>Logout</Text>
        <Ionicons
          name="log-out-outline"
          size={22}
          color="#222"
          style={{ marginLeft: 8 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "600",
    color: "#222",
    marginBottom: 18,
    marginTop: 32,
    textAlign: "center",
  },
  avatarContainer: {
    marginBottom: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  inputWrapper: {
    width: "100%",
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  input: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#222",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 0,
  },
  emergencyButton: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#F87171",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  emergencyText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    flex: 1,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  logoutText: {
    color: "#222",
    fontWeight: "600",
    fontSize: 16,
    flex: 1,
  },
});
