import React from 'react';
import HomeScreen from './screens/HomeScreen';
import UserLoginScreen from './screens/UserLoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyTabs from './components/MyTabs';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* navigator contains the screens to be navigated between */}
      <MyTabs />
    </NavigationContainer>
  );
}
