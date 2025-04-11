import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import SvgIcon from '@_components/SvgIcon';
import { useNavigation } from '@react-navigation/native';
import CommonHeader from '@_components/helpview/header';
import { IconName } from '@_types/icon';

interface Item {
  icon: IconName; // <- string 말고 IconName
  text: string;
}
const HelpView2 = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">

<CommonHeader title="도움말" />


      <ScrollView className="flex-1 px-4 py-6 space-y-10">
        <Text className="text-[24px] mt-2 mb-10 font-bold leading-[36px] text-center text-gray90">
          SOS 구조 요청 버튼을 누르면 어떻게 되나요?
        </Text>

      
        <View className="w-full items-center px-4">
          <View className="w-full rounded-[8px] bg-main50 h-[260px] overflow-hidden items-center mb-5">
            <Image
              source={require("@_assets/images/img_sos_01.png")}
              style={{ width: 200, height: 220 }}
              resizeMode="contain"
            />
          </View>
        </View>

        <View className="items-center">
          <SvgIcon name="Arrow" size={56} color="#8E8E8E" style={{ marginTop: -1 }} />
        </View>

        <Text className="text-[21px] mt-6 mb-4 font-bold leading-[31.5px] text-center text-gray90]">
          119, 복지관 담당자와 비상 연락망에{"\n"}SOS 문자 메시지를 전송해요
        </Text>

      
        <View className="w-full items-center px-4 mb-6">
          <View className="w-full h-[180px] flex-row justify-around items-center rounded-[8px] bg-main50 px-4 py-4">
            {[
              { icon: 'SOS', label: '119' },
              { icon: 'Supervisor1', label: '복지관 담당자' },
              { icon: 'Supervisor2', label: '비상연락망' },
            ].map(({ icon, label }, index) => (
              <View key={index} className="items-center space-y-2">
                <View className="w-[64px] h-[64px] rounded-full bg-white justify-center items-center">
                  <SvgIcon name={icon as IconName}  size={32} color="#1A4470" />
                </View>
                <Text className="text-[15px] font-bold text-gray90">{label}</Text>
              </View>
            ))}
          </View>
        </View>

       
        <View className="w-full items-center px-4">
          <View className="w-full rounded-[8px] bg-gray5 px-4 py-6">
            <Text className="text-[19px] font-normal leading-[28.5px] text-center text-gray90">
              현재 사용자가 SOS 상태임을 알려{"\n"}
              위급한 상황에서 빠르게{"\n"}
              대처할 수 있도록 도움을 줍니다
            </Text>
          </View>
        </View>

        <Text className="text-[21px] mt-10 mb-6 font-bold leading-[31.5px] text-center text-gray90">
          어떤 정보가 보내지나요?
        </Text>

      
        <View className="w-full items-center px-4 mb-4">
          <View className="w-full rounded-[8px] bg-main50 h-[260px] overflow-hidden justify-end items-center">
            <Image
              source={require("@_assets/images/img_sos_02.png")}
              style={{ width: 200, height: 220 }}
              resizeMode="contain"
            />
          </View>
        </View>

  
        <View className="w-full items-center px-4 mb-10">
          <View className="w-full rounded-[8px] bg-gray5 px-4 py-6">
            <Text className="text-[19px] font-normal leading-[28.5px] text-center text-[#1D1D1D]">
              실시간 GPS(위치 정보)와{"\n"}
              마지막 접속 상태, 배터리 상태,{"\n"}
              온라인 접속 여부를 전송해요
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HelpView2;
