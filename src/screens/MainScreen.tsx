import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';

import tw from 'tailwind-react-native-classnames';

import SvgIcon from '@_components/SvgIcon';

import SampleHomeScreen from '@_screens/SampleHomeScreen';
import MyInfoScreen from '@_screens/MyInfoScreen';

import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '@_types/main';


const Tab = createBottomTabNavigator<MainTabParamList>();

function MainScreen(): React.JSX.Element {
  return (
    <Tab.Navigator initialRouteName="홈">
      <Tab.Screen
        name="홈"
        component={SampleHomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <SvgIcon name={focused ? 'HomeActive' : 'HomeDisabled'} size={32} />
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
        
          headerLeft: () => {
            const tabNavigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
            return (
              <TouchableOpacity onPress={() => tabNavigation.navigate('홈')} className="ml-2">
                <SvgIcon name="Back" size={32} />
              </TouchableOpacity>
            );
          },
          tabBarIcon: ({ focused }) => (
            <SvgIcon name={focused ? 'AccountActive' : 'AccountDisabled'} size={32} />
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
