import React, { useState } from 'react';
import '../styles/global.css';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

import SvgIcon from '../components/SvgIcon';

function SampleHomeScreen({ navigation }: any): React.JSX.Element {
  const [welfareCenter, setWelfareCenter] = useState<string>('행복 복지관');

  const sosButton = (
    <View className="flex-row bg-[#A90000] items-center justify-center border-red-800 rounded-lg px-2.5 py-2">
      <View className="flex-row items-center">
        <View className="bg-[#F45454] rounded-full w-8 h-8 mr-2"></View>
        <Text className="text-xl font-bold text-white">SOS 긴급 도움 요청하기</Text>
      </View>
    </View>
  );

  return (
    <>
      <SafeAreaView className="flex-1 bg-[#F8F8F8]">
        <View className="flex-column bg-white h-32 border-b border-[#F0F0F0] px-4 justify-evenly">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <SvgIcon name="MapPin" />
              <Text className="text-sm font-bold text-gray-800">{welfareCenter} </Text>
              <Text className="text-sm font-regular text-gray-800">소속</Text>
            </View>
            <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
              <View>
                <Text className="text-sm font-bold text-helpBlue">도움말</Text>
              </View>
            </TouchableOpacity>
          </View>
          {Platform.select({
            ios: (
              <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
                {sosButton}
              </TouchableOpacity>
            ),
            android: (
              <View className="overflow-hidden">
                <TouchableNativeFeedback onPress={() => {}}>{sosButton}</TouchableNativeFeedback>
              </View>
            ),
          })}
        </View>
        <View className="flex-1 items-center justify-center">
          <Text className="text-3xl font-black text-red-600">Sample Home Screen</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

export default SampleHomeScreen;
