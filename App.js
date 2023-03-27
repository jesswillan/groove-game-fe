import {StyleSheet} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserLoginScreen} from './screens/UserLoginScreen';

// function UserLoginScreen() {
//   <Text>Login</Text>
// }

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Groove Game'}}
        />
        <Stack.Screen
          name="UserLogin"
          component={UserLoginScreen}
          options={{title: 'Groove Game'}}
       />
      </Stack.Navigator>
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
