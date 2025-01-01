import { View, Image, Text } from "react-native";
import React from "react";

export default function EmptyState() {
  return (
    <View
      style={{
        marginTop: 80,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/images/medicine.png")}
        style={{
          width: 120,
          height: 120,
        }}
      />

      <Text
        style={{
          fontSize: 35,
          fontWeight: "bold",
          marginTop: 30,
        }}
      >
        No Medications!
      </Text>
      <Text>You have 0 medication setup, kindly setup a new one.</Text>
    </View>
  );
}
