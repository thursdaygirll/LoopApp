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
  ScrollView,
  Modal,
} from "react-native";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUpPage({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleSignUp = async () => {
    setError(null);
    if (!username || !email || !password) {
      setError("Please fill in all fields");
      setShowErrorModal(true);
      return;
    }

    try {
      // Intenta crear el usuario
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // Opcional: Actualiza el perfil del usuario con el username
      await user.updateProfile({ displayName: username });

      // Opcional: Navega a la pantalla principal o de login
      navigation.replace("Login");
    } catch (error) {
      // Mensajes amigables según el error de Firebase
      let friendlyMessage = "An error occurred. Please try again.";
      if (
        error.code === "auth/invalid-email" ||
        error.message?.toLowerCase().includes("invalid-email")
      ) {
        friendlyMessage = "The email address is not valid.";
      } else if (
        error.code === "auth/email-already-in-use" ||
        error.message?.toLowerCase().includes("email-already-in-use")
      ) {
        friendlyMessage = "This email is already in use. Please use another.";
      } else if (
        error.code === "auth/weak-password" ||
        error.message?.toLowerCase().includes("weak-password")
      ) {
        friendlyMessage = "Password should be at least 6 characters.";
      }
      setError(friendlyMessage);
      setShowErrorModal(true);
      console.log("Sign up error:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/lines.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={40}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Welcome! Sign up using Google or insert your information below.
            </Text>
            <TouchableOpacity style={styles.googleButton}>
              <Image
                source={require("../assets/googleicon.png")}
                style={styles.googleIcon}
              />
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#b0b0b0"
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#b0b0b0"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#b0b0b0"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
              <Text style={styles.loginText}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.switchText}>
                Already have an account? Log in
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* Modal de error amigable */}
        <Modal
          visible={showErrorModal && !!error}
          transparent
          animationType="fade"
          onRequestClose={() => setShowErrorModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Oops!</Text>
              <Text style={styles.modalMessage}>{error}</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowErrorModal(false)}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 24,
    paddingTop: 90,
  },
  title: {
    fontSize: 32,
    fontWeight: "semibold",
    color: "#4a90e2",
    marginBottom: 12,
    marginTop: 18,
    textAlign: "center",
  },
  subtitle: {
    color: "#555",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  googleButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    marginTop: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  googleIcon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 32,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  loginButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 60,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
    marginTop: 8,
  },
  loginText: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  switchText: {
    color: "#4a90e2",
    fontSize: 15,
    marginTop: 15,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 28,
    alignItems: "center",
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#e57373",
    marginBottom: 10,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 16,
    color: "#333",
    marginBottom: 18,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#4a90e2",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
