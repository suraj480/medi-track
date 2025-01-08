import React, { useEffect, useState } from "react";
import { Tabs, useRouter } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/FireBaseConfig";
import { getLocalStorage } from "../../service/Storage";
export default function TabLayout() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState();
  useEffect(() => {
    GetUserDetail();
  }, []);
  const GetUserDetail = async () => {
    const userInfo = await getLocalStorage("userDetail");
    if (!userInfo) {
      router.replace("/login");
    }
  };
  // //If user logedIn or not
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/auth.user
  //     const uid = user.uid;
  //     console.log(uid);
  //     setAuthenticated(true);
  //     // ...
  //   } else {
  //     router?.push("/login");
  //     setAuthenticated(false);
  //     // User is signed out
  //     // ...
  //   }
  // });

  // useEffect(() => {
  //   if (authenticated == false) {
  //     router.push("/login");
  //   }
  // }, [authenticated]);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="History"
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="plus-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
