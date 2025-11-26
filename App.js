import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './Vistas/HomeScreen';
import HomeProfile from './Vistas/HomeProfile';
import Metodos from './Vistas/MetodoHigene';
import Calendario from './Vistas/Calendario';
import MetodosAnticon from './Vistas/MetodosAnticon';
import UbicacionHosp from './Vistas/UbicacionHosp';

const Mytabs = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Mytabs.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#f06292',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopColor: '#eee',
            borderTopWidth: 1,
            height: 92,
            paddingBottom: 5,
          },
          
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = 'heart-circle-outline';
                break;
              case 'Profile':
                iconName = 'person-circle-outline';
                break;
              case 'Calendario':
                iconName = 'calendar-outline';
                break;
              case 'Metodos':
                iconName = 'water-outline';
                break;
              case 'Info':
                iconName = 'information-circle-outline';
                break;
              default:
                iconName = 'ellipse-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Mytabs.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Login' }}
        />
        <Mytabs.Screen
          name="Profile"
          component={HomeProfile}
          options={{ title: 'Registrarse' }}
        />
        <Mytabs.Screen
          name="Calendario"
          component={Calendario}
          options={{ title: 'Calendario' }}
        />
        <Mytabs.Screen
          name="Metodos"
          component={Metodos}
          options={{ title: 'Métodos de Higiene' }}
        />
        <Mytabs.Screen
          name="MetodosAnticon"
          component={MetodosAnticon}
          options={{ title: 'Metodos Anticonpectivos' }}
        />
         <Mytabs.Screen
          name="UbicacionHosp"
          component={UbicacionHosp}
          options={{ title: 'Hospitales' }}
        />
      </Mytabs.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
