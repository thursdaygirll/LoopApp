import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  ImageBackground,
} from "react-native";

import salud from "../assets/FrameYellow.png";
import higiene from "../assets/FrameBlue.png";
import nutricion from "../assets/FrameGreen.png";

const { width } = Dimensions.get("window");

export default function AddModal({ visible, onClose }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalViewCustom}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          {/* Title */}
          <Text style={styles.newHabitTitle}>New Habit</Text>
          {/* Habit Options */}
          <View style={styles.optionsContainer}>
            {/* Higiene */}
            <TouchableOpacity style={[styles.optionBox, styles.higieneBox]}>
              <View style={styles.optionContent}>
                <Text style={styles.optionText}>Higiene</Text>
                <Text style={styles.optionEmoji}>💧</Text>
              </View>
              <ImageBackground
                source={higiene}
                style={styles.waveOverlayBlue}
                resizeMode="cover"
              />
            </TouchableOpacity>
            {/* Salud */}
            <TouchableOpacity style={[styles.optionBox, styles.saludBox]}>
              <View style={styles.optionContent}>
                <Text style={styles.optionText}>Salud</Text>
                <Text style={styles.optionEmoji}>💊</Text>
              </View>
              <ImageBackground
                source={salud}
                style={styles.waveOverlayBlue}
                resizeMode="cover"
              />
            </TouchableOpacity>
            {/* Nutrición */}
            <TouchableOpacity style={[styles.optionBox, styles.nutricionBox]}>
              <View style={styles.optionContent}>
                <Text style={styles.optionText}>Nutrición</Text>
                <Text style={styles.optionEmoji}>🍴</Text>
              </View>
              <ImageBackground
                source={nutricion}
                style={styles.waveOverlayGreen}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const WAVE_HEIGHT = 60;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    // Animación: de transparente a este color después de 1s
    // Para animar este valor, usa Animated.View y Animated.timing en el componente
  },
  modalViewCustom: {
    height: "70%",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  closeButton: {
    position: "absolute",
    left: 24,
    top: 24,
    zIndex: 2,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 28,
    color: "#222",
    fontWeight: "400",
  },
  newHabitTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222",
    marginBottom: 28,
    textAlign: "center",
  },
  optionsContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 40,
    gap: 18,
  },
  optionBox: {
    width: width * 0.85,
    height: 100,
    borderRadius: 14,
    marginBottom: 0,
    justifyContent: "center",
    overflow: "hidden",
    marginVertical: 0,
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: "#eee",
    marginLeft: 0,
    marginRight: 0,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    zIndex: 2,
    height: "100%",
  },
  optionText: {
    alignSelf: "flex-start",
    paddingTop: 20,

    fontSize: 20,
    fontWeight: "600",
    color: "#222",
    zIndex: 2,
  },
  optionEmoji: {
    fontSize: 40,
    marginLeft: 10,
    alignSelf: "flex-end",
    paddingBottom: 15,
    zIndex: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  waveOverlayBlue: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  waveOverlayYellow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  waveOverlayGreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});
