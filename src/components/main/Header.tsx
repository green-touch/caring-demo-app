import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SvgIcon from '@_components/SvgIcon';

export default function Header(): React.JSX.Element {
  const [welfareCenter, setWelfareCenter] = useState<string>('행복 복지관');
  const navigation = useNavigation<any>();

  const sosButton = (
    <View className="flex-row bg-red700 items-center justify-center rounded-lg px-2.5 py-2">
      <View className="flex-row items-center">
        <View className=" mr-2">
          <SvgIcon name="Bell" size={32} />
        </View>
        <Text className="text-xl font-bold text-gray0">SOS 긴급 구조 요청하기</Text>
      </View>
    </View>
  );

  return (
    <View className="flex-column bg-gray0 h-32 border-b border-gray10 px-4 justify-evenly">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="mr-2">
            <SvgIcon name="MapLine" size={18} />
          </View>
          <Text className="text-sm font-bold text-gray70">{welfareCenter} </Text>
          <Text className="text-sm font-regular text-gray70">소속</Text>
        </View>
        
        
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('HelpStack')}>
          <Text className="text-sm font-bold text-main700">도움말</Text>
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
  );
}
