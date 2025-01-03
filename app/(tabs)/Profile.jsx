import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React from "react";
import Colors from "../../constant/Colors";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const handleLogout = async () => {
    try {
      // Clear local storage
      await AsyncStorage.clear();
      router.push("login");
      // Show a confirmation alert (optional)
      Alert.alert("Logout", "You have been logged out successfully.");
    } catch (error) {
      console.error("Error clearing local storage:", error);
      Alert.alert("Error", "Something went wrong during logout.");
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    width: "100%",
    marginTop: 25,
  },
  buttonText: {
    fontSize: 17,
    color: "white",
    textAlign: "center",
  },
});
