import React from 'react';
import { View, Text, ScrollView, Image ,TouchableOpacity} from 'react-native';
import SvgIcon from "@_components/SvgIcon";

import { useNavigation } from '@react-navigation/native';

const HelpView_1 = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
      {/* 헤더 */}
      <View className="w-full h-[56px] flex-row items-center justify-between px-4 bg-white border-b border-gray-300">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgIcon name="Back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg text-black">도움말</Text>
        <View className="w-6" />
      </View>

      {/* 본문 */}
      <ScrollView className="flex-1 px-4 py-6 space-y-8">
      <Text className="text-[24px] leading-[36px] font-bold text-black text-center">
  안전한 상태, 경고 상태,{"\n"}위험 상태가 뭔지 궁금해요!
</Text>

    
      </ScrollView>
    </View>
  );
};

export default HelpView_1;
