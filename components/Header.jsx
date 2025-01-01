import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getLocalStorage } from "../service/Storage";
import Feather from "@expo/vector-icons/Feather";
import  Colors  from "../constant/Colors";
export default function Header() {
  const [user, setUser] = useState();
  useEffect(() => {
    GetUserDetails();
  }, []);
  const GetUserDetails = async () => {
    const userInfo = await getLocalStorage("userDetail");
    setUser(userInfo);
  };
  return (
    <View
      style={{
        marginTop: 20,
        width: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        {console.log("user", user)}
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: 10,
            width: "100%",
          }}
        >
          <Image
            source={require("../assets/images/smiley.png")}
            style={{
              width: 45,
              height: 45,
            }}
          />
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            Hello {user?.displayName}👋
          </Text>
        </View>
        <Feather name="settings" size={24} color={Colors.DARK_GRAY} />
      </View>
    </View>
  );
}
