import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import SvgIcon from "@_components/SvgIcon";
import { useNavigation } from '@react-navigation/native';
import CommonHeader from '@_components/helpview/header';

import StatusSection from '@_components/helpview/statusSection';
import AlertBox from '@_components/helpview/AlertBox';

const HelpView1 = () => {
  const navigation = useNavigation<any>();

  return (
    <View className="flex-1 bg-white">
      <CommonHeader title="도움말" />

      <ScrollView className="flex-1 px-4 py-6 space-y-8">
        <Text className="text-[24px] mb-2 leading-[36px] font-bold text-black text-center">
          안전한 상태, 경고 상태,{"\n"}위험 상태가 뭐지 궁금해요!
        </Text>

        <StatusSection
          icon="AlertDefault"
          title="안전한 상태란?"
          items={[
            { icon: 'BatteryGreen', text: '배터리가 20% 이상일 때' },
            { icon: 'GlobeGreen', text: '인터넷에 연결중일 때' },
          ]}
        />

        <StatusSection
          icon="AlertCircle"
          title="경고 상태란?"
          items={[
            { icon: 'Battery15Yellow', text: '배터리가 20% 미만일 때' },
            { icon: 'GlobeYellow', text: '인터넷에 연결되지 않았을 때' },
          ]}
        />

        <Text className="text-[21px] mt-4 mb-5 font-bold leading-[31.5px] text-black text-center">
          경고상태가 되면 어떻게 되나요?
        </Text>

        <AlertBox
          
          items={[
            {
              title: '복지관 관리자 알림',
              description: '복지관 관리자에게 경고 상태에 대한\n 알림이 가요',
              colorClass: 'text-yellow-900'
            },
            {
              title: '배터리 충전 권장 알림',
              description: '사용자가 배터리를 충전할 수 있도록 \n알림을 보내요',
              colorClass: 'text-yellow-900'
            }
          ]}
        />

        <StatusSection
          icon="AlertTriangle"
          title="위험 상태란?"
          items={[
            { icon: 'Battery0Red', text: '배터리가 20% 미만일 때' },
            { icon: 'GlobeRed', text: '인터넷에 연결되지 않았을 때' },
          ]}
        />

        <Text className="text-[21px] mt-4 mb-5 font-bold leading-[31.5px] text-black text-center">
          위험 상태가 되면 어떻게 되나요?
        </Text>

        <AlertBox
          
          items={[
            {
              title: 'SOS 구조 요청',
              description: '위험 상태가 되면 자동으로 \nSOS 요청이 가게 돼요!',
              colorClass: 'text-red900'
            },
            {
              title: '실시간 나의 위치 공유',
              description: '119, 비상 연락망, 복지관 담당자에게\n 내 위치가 전송돼요!',
              colorClass: 'text-red900'
            }
          ]}
        />

        {/* SOS 구조 요청 안내 */}
        <View className="w-[328px] space-y-4 mt-10">
          <Text className="text-[24px] mb-4 leading-[36px] font-bold text-[#1A1A1A]">
            SOS 구조 요청 안내
          </Text>
          <TouchableOpacity
            className="w-[328px] mb-15 rounded-[8px] px-4 pt-6 pb-6 flex-row items-center justify-between bg-[#FFF5EA]"
            onPress={() => navigation.navigate("HelpView2")}
          >
            <Text className="text-[19px] leading-[28.5px] font-bold text-gray90 w-[85%]">
              SOS 구조 요청 버튼을 누르면 {"\n"}어떻게 되나요?
            </Text>
            <SvgIcon name="ChevronRightBlack" size={24} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default HelpView1;
