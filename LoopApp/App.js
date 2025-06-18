import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

import LandingPage from "./screens/LandingPage";
import LoginPage from "./screens/LoginPage";
import SignUpPage from "./screens/SignUpPage";
import HomeScreen from "./screens/HomeScreen";

// Import other screens as you create them

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Componente para el botón central personalizado
function CustomTabButton({ children, onPress }) {
  return (
    <TouchableOpacity style={styles.customButton} onPress={onPress}>
      <View style={styles.customButtonInner}>{children}</View>
    </TouchableOpacity>
  );
}

function MainTabs() {
  return (
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
            <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
              +
            </Text>
          ),
          tabBarButton: (props) => <CustomTabButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={HomeScreen} // Cambia por tu componente Profile
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: 24 }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  customButton: {
    top: -30, // Eleva más el botón para crear el efecto de "corte"
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  customButtonInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#87CEEB", // Color azul del botón
    justifyContent: "center",
    alignItems: "center",

    shadowRadius: 6,
    elevation: 8,
    borderWidth: 4,
    borderColor: "transparent", // Borde blanco para crear separación
  },
});

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
        {/* Add more screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
