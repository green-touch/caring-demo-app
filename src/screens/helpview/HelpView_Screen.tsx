import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import SvgIcon from "@_components/SvgIcon";
import { useNavigation,NavigationProp } from '@react-navigation/native';
import CommonHeader from '@_components/helpview/header';
import { HelpItem,RootStackParamList,serviceItems, privacyItems  } from '@_types/helpview';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


const Helpview_Screen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderItem = (item: HelpItem, index: number) => (
    <TouchableOpacity
      key={index}
      className={`w-[328px] rounded-[8px] px-4 pt-8 pb-8 flex-row items-center justify-between ${item.bg}`}
      onPress={() => { navigation.navigate(item.screen);
      
      }}
    >
      <Text className="text-[19px] leading-[28.5px] font-bold text-gray90 w-[85%]">
        {item.title}
      </Text>
      <SvgIcon name="ChevronRightBlack" size={24} />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
    <CommonHeader title="도움말" />

      <ScrollView className="flex-1 px-4 py-6">
        
        <Text className="text-[32px] leading-[48px] font-bold tracking-[0.32px] text-black mb-6">
          케어링 서비스 이용{"\n"}설명서
        </Text>

   
        <View className="w-[328px] space-y-6 mb-10">
          <Text className="text-[24px] leading-[36px] font-bold text-gray90 mb-6">
            서비스 이용 관련
          </Text>
          <View className="flex flex-col gap-4">
            {serviceItems.map(renderItem)}
          </View>
        </View>

  
        <View className="w-[328px] space-y-6 mb-12">
          <Text className="text-[24px] leading-[36px] font-bold text-gray90 mb-6">
            개인정보 관련
          </Text>
          <View className="flex flex-col gap-4">
            {privacyItems.map(renderItem)}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Helpview_Screen;
