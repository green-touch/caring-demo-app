import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import '../styles/global.css';
import tw from 'tailwind-react-native-classnames';

import SvgIcon from '../components/SvgIcon';
import SampleHomeScreen from './SampleHomeScreen';
import MyInfoScreen from './MyInfoScreen';

const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator initialRouteName="홈">
      <Tab.Screen
        name="홈"
        component={SampleHomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <SvgIcon name={focused ? 'HomeActive32' : 'HomeDisabled32'} size={32} />
          ),
          tabBarStyle: tw`h-16`,
          tabBarLabelStyle: tw`mt-1 text-sm`,
          tabBarActiveTintColor: '#234A7C',
          tabBarInactiveTintColor: '#8E8E8E',
        }}
      />
      <Tab.Screen
        name="내 정보"
        component={MyInfoScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <SvgIcon name={focused ? 'AccountActive32' : 'AccountDisabled32'} size={32} />
          ),
          tabBarStyle: tw`h-16`,
          tabBarLabelStyle: tw`mt-1 text-sm`,
          tabBarActiveTintColor: '#234A7C',
          tabBarInactiveTintColor: '#8E8E8E',
        }}
      />
    </Tab.Navigator>
  );
}

export default MainScreen;
