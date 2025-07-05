import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Vistas/HomeScreen';
import HomeProfile from './Vistas/HomeProfile';
import HomeInfo from './Vistas/HomeInfo';
const Mytabs = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Mytabs.Navigator>
        <Mytabs.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Inicio de la App' }}
        />
        <Mytabs.Screen
          name="Profile"
          component={HomeProfile}
          options={{ title: 'Mi perfil' }}
        />
        <Mytabs.Screen
          name="Info"
          component={HomeInfo}
          options={{ title: 'Información' }}
        />
      </Mytabs.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>

  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  
});
