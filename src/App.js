import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import PasswordList from './screens/PasswordList';
import PasswordForm from './screens/PasswordForm';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Password List') {
              iconName = 'list';
            } else if (route.name === 'Add Password') {
              iconName = 'plus-square';
            }

            return <Feather name={iconName} size={size} color={color} />;
          },
          "tabBarActiveTintColor":"tomato",
          "tabBarInactiveTintColor":"gray",
          "tabBarStyle":[
            {
                "display":"flex"
            },
            null
          ]

        })}
      >
        <Tab.Screen name="Password List" component={PasswordList} />
        <Tab.Screen name="Add Password" component={PasswordForm} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
