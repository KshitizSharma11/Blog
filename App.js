import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home.js';
import MainScreen from './components/MainScreen.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0A1828',
          },
          headerTintColor: '#BFA181',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
          }}
        />
        <Stack.Screen
          name="Main_Content"
          component={MainScreen}
          options={{
            title: 'Blogs',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
