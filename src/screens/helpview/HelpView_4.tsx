import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import SvgIcon from '@_components/SvgIcon';
import { useNavigation } from '@react-navigation/native';
import CommonHeader from '@_components/helpview/header';
const HelpView4 = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
      <CommonHeader title="도움말" />

      <ScrollView className="flex-1 px-4 py-6 space-y-8">

        <Text className="text-[24px] mt-2 mb-10 font-bold leading-[36px] text-center text-gray90">
          앱 사용을 중지하고 싶어요!
        </Text>


        <View className="items-center">
          <SvgIcon name="LogoSymbol" size={48} color="#1A4470" />
        </View>


        <Text className="mt-4 mb-5 text-[21px] font-bold leading-[31.5px] text-center text-gray90">
          케어링은 ‘노인맞춤돌봄서비스’{"\n"}신청자를 대상으로 운영되고 있습니다
        </Text>


        <View className="w-full  items-center px-4">
          <View className="w-full max-w-[344px] rounded-[8px] bg-gray5 px-4 py-6">
            <Text className="text-[19px] font-normal leading-[28.5px] text-center text-gray90">
              케어링은 사용자를 보호하기 위한{"\n"}
              모니터링 서비스, 자동 SOS 신고{"\n"}
              서비스를 제공하고 있습니다
            </Text>

          </View>
        </View>


        <Text className="mt-10 mb-5 text-[21px] font-bold leading-[31.5px] text-center text-gray90">
          서비스 중단을 원하는 경우,{"\n"}복지관 담당자에게 연락해주세요
        </Text>
        <View className="w-full items-center px-4">
          <TouchableOpacity
            className="w-full max-w-[344px] h-[77px] bg-main50 rounded-[8px] px-4 flex-row items-center justify-center space-x-2"
            onPress={() => {
              console.log('복지사에게 전화하기');
            }}
          >
            <SvgIcon name="PhoneFilledBlue" size={24} />
            <Text className="ml-2 text-[19px] font-bold leading-[28.5px] text-gray90">
              담당 복지사에게 전화하기
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default HelpView4;
