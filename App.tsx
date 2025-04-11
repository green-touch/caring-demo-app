import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from '@_screens/MainScreen';
import HomeScreen from '@_screens/HomeScreen';
import TestScreen from '@_screens/TestScreen';
import SampleHomeScreen from '@_screens/SampleHomeScreen';
import MyInfoScreen from '@_screens/MyInfoScreen';
import WelfareCenterScreen from '@_screens/Find_Welfare_Center';
import WelfareCenterDetail from '@_screens/WelfareCenterDetail';
import LoginMain from '@_screens/login/LoginMain';
import FindInfo from '@_screens/login/FindInfo';
import Verification from '@_screens/login/Verification';
import ResetPassword from '@_screens/login/ResetPassword';
import HelpResult from '@_screens/login/HelpResult';


import Helpview_Screen from '@_screens/helpview/HelpView_Screen';
import HelpStatusInfo from '@_screens/helpview/HelpStatusInfo';
import HelpSOSInfo from '@_screens/helpview/HelpSOSInfo';
import HelpPrivacyPolicy from '@_screens/helpview/HelpPrivacyPolicy';
import HelpUsageStopGuide from '@_screens/helpview/HelpUsageStopGuide';

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const HelpStack =createNativeStackNavigator();

const AuthStackNavigator = () => (
  <AuthStack.Navigator initialRouteName="LoginMain" screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="LoginMain" component={LoginMain} />
    <AuthStack.Screen name="FindInfo" component={FindInfo} />
    <AuthStack.Screen name="Verification" component={Verification} />
    <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
    <AuthStack.Screen name="HelpResult" component={HelpResult} />

  </AuthStack.Navigator>
);

const HelpStackNavigator = () => (
  <HelpStack.Navigator initialRouteName="Help" screenOptions={{ headerShown: false }}>
    <HelpStack.Screen name="Help" component={Helpview_Screen} />
    <HelpStack.Screen name="HelpStatusInfo" component={HelpStatusInfo} />
    <HelpStack.Screen name="HelpSOSInfo" component={HelpSOSInfo} />
    <HelpStack.Screen name="HelpPrivacyPolicy" component={HelpPrivacyPolicy} />
    <HelpStack.Screen name="HelpUsageStopGuide" component={HelpUsageStopGuide} />
  </HelpStack.Navigator>
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
        <Stack.Screen name="Find" component={WelfareCenterScreen} />
        <Stack.Screen name="Detail" component={WelfareCenterDetail} />
        <Stack.Screen name="Login" component={AuthStackNavigator} />
        <Stack.Screen name="HelpStack" component={HelpStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
