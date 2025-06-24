import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function AddButton({ children, onPress }) {
  return (
    <TouchableOpacity style={styles.customButton} onPress={onPress}>
      <View style={styles.customButtonInner}>{children}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  customButton: {
    top: -30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  customButtonInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#87CEEB",
    justifyContent: "center",
    alignItems: "center",
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 4,
    borderColor: "transparent",
  },
});
