import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import tw from 'tailwind-react-native-classnames';

import SvgIcon from '@_components/SvgIcon';
import SampleHomeScreen from './SampleHomeScreen';
import MyInfoScreen from './MyInfoScreen';
import { TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();

function MainScreen({ navigation }: any): React.JSX.Element {
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
          headerShown: true,
          headerTitle: '내 정보',
          headerTitleStyle: tw`text-lg`,
          headerTitleAlign: 'center',
          headerStyle: tw`h-14 border-b border-[#E4E4E4]`,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} className="ml-2">
              <SvgIcon name="Back32" size={32} />
            </TouchableOpacity>
          ),
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