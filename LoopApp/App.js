import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AddButton from "./components/AddButton";
import AddModal from "./components/AddModal";
import LandingPage from "./screens/LandingPage";
import LoginPage from "./screens/LoginPage";
import SignUpPage from "./screens/SignUpPage";
import HomeScreen from "./screens/HomeScreen";
import AddHabitScreen from "./screens/AddHabitScreen";
import ProfileScreen from "./screens/ProfileScreen";

// Import other screens as you create them

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const [isModalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const navigation = useNavigation();

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#87CEEB", // Color del tab activo (azul claro)
          tabBarInactiveTintColor: "#C0C0C0", // Color del tab inactivo (gris)
          tabBarStyle: {
            backgroundColor: "#FFFFFF", // Fondo blanco
            borderTopWidth: 0,
            height: 90, // Altura de la barra
            paddingBottom: 20,
            paddingTop: 10,
            elevation: 8, // Sombra en Android
            shadowOpacity: 0.1, // Sombra en iOS
            shadowRadius: 10,
            shadowOffset: { height: -5, width: 0 },
            position: "absolute",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
            marginTop: 5,
          },
          tabBarIconStyle: {
            marginBottom: -5,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: 24 }}>🏠</Text>
            ),
          }}
        />

        {/* Tab central con botón personalizado */}
        <Tab.Screen
          name="Add"
          component={HomeScreen} // Cambia por tu componente
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ focused }) => (
              <Text
                style={{ color: "white", fontSize: 30, fontWeight: "bold" }}
              >
                +
              </Text>
            ),
            tabBarButton: (props) => (
              <AddButton
                {...props}
                onPress={() => {
                  showModal();
                }}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen} // Cambia por tu componente Profile
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: 24 }}>👤</Text>
            ),
          }}
        />
      </Tab.Navigator>
      <AddModal
        visible={isModalVisible}
        onClose={hideModal}
        navigation={navigation}
      />
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Landing"
      >
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="SignUp" component={SignUpPage} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="AddHabitScreen" component={AddHabitScreen} />

        {/* Add more screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
