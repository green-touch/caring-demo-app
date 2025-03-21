import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from '@_screens/MainScreen';
import HomeScreen from '@_screens/HomeScreen';
import TestScreen from '@_screens/TestScreen';
import SampleHomeScreen from '@_screens/SampleHomeScreen';
import MyInfoScreen from '@_screens/MyInfoScreen';
import LoginMain from '@_screens/login/LoginMain';
import FindInfo from '@_screens/login/FindInfo';
import Verification from '@_screens/login/Verification';


const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const AuthStackNavigator = () => (
  <AuthStack.Navigator initialRouteName="LoginMain" screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="LoginMain" component={LoginMain} />
    <AuthStack.Screen name="FindInfo" component={FindInfo} />
    <AuthStack.Screen name="Verification" component={Verification} />
  </AuthStack.Navigator>
);

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Test" component={TestScreen} />
        <Stack.Screen name="SampleHome" component={SampleHomeScreen} />
        <Stack.Screen name="MyInfo" component={MyInfoScreen} />
        <Stack.Screen name="Login" component={AuthStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
