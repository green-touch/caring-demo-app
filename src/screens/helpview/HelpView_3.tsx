import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import SvgIcon from '@_components/SvgIcon';
import { useNavigation } from '@react-navigation/native';
import CommonHeader from '@_components/helpview/header';
const HelpView3 = () => {
  const navigation = useNavigation<any>();

  return (
    <View className="flex-1 bg-white">
      <CommonHeader title="도움말" />


      <ScrollView className="flex-1 px-4 py-6 space-y-10">

        <Text className="text-[24px] font-bold leading-[36px] text-center text-gray90 mt-2 mb-10">
          개인정보를 어떻게 바꾸나요?
        </Text>

        <View className="items-center space-y-4">

          <View className="w-[48px] h-[48px] rounded-full bg-main50 justify-center items-center">
            <SvgIcon name="AccountActive" size={32} color="#1A4470" />
          </View>

       
          <Text className="text-[21px] mt-2 mb-4 font-bold leading-[31.5px] text-center text-gray90">
            회원번호를 바꾸고 싶어요!
          </Text>

          <View className="w-full items-center px-4">
            <View className="w-full rounded-[8px] bg-gray5 px-4 py-6">
              <Text className="text-[19px] font-normal leading-[28.5px] text-center text-gray90">
                회원번호는 복지관에서 배정하기 {'\n'}때문에
                <Text className="font-bold">{' '}변경할 수 없습니다!</Text>
              </Text>
            </View>
          </View>

        </View>

      
        <View className="items-center space-y-4">
          <View className="w-[48px] h-[48px] mt-10 mb-2 rounded-full bg-main50 justify-center items-center">
            <SvgIcon name="LockFilled" size={32} color="#1A4470" />
          </View>

         
          <Text className="text-[21px] mb-4  font-bold leading-[31.5px] text-center text-gray90">
            비밀번호를 바꾸고 싶어요!
          </Text>
          <View className="w-full items-center px-4">
            <TouchableOpacity
              className="w-full h-[77px] bg-main50 rounded-[8px] px-[16px] py-[24px] flex-row items-center justify-center"
              onPress={() => {
                navigation.navigate('ChangePassword');
              }}
            >
              <Text className="text-[19px] font-bold leading-[28.5px] text-gray90">
                비밀번호 변경 페이지로 가기
              </Text>
              <View className="ml-[4px]">
                <SvgIcon name="ChevronRightBlack" size={24} />
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

export default HelpView3;
