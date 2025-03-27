import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import SvgIcon from "@_components/SvgIcon";
import { useNavigation } from '@react-navigation/native';

const Helpview_Screen = () => {
  const navigation = useNavigation();

  const serviceItems = [
    {
      title: '안전한 상태, 경고 상태,\n위험 상태가 무엇인가요?',
      bg: 'bg-main50',
      screen:'HelpView_1'
    },
    {
      title: 'SOS 구조 요청 버튼을 누르면 \n 어떻게 되나요?',
      bg: 'bg-[#FFF5EA]',
      screen:'HelpView_2'
    },
  ];

  const privacyItems = [
    {
      title: '개인정보를 어떻게 바꾸나요?',
      bg: 'bg-yellow-100',
      screen:'HelpView_3'
    },
    {
      title: '앱 사용을 중지하고 싶어요!',
      bg: 'bg-red-100',
      screen:'HelpView_4'
    },
  ];

  const renderItem = (item: { title: string; bg: string }, index: number) => (
    <TouchableOpacity
      key={index}
      className={`w-[328px] rounded-[8px] px-4 pt-8 pb-8 flex-row items-center justify-between ${item.bg}`}
      onPress={() => {
        // TODO: 각 항목별 navigation 연결
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
      {/* 헤더 */}
      <View className="w-full h-[56px] flex-row items-center justify-between px-4 bg-white border-b border-gray-300">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgIcon name="Back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg text-black">도움말</Text>
        <View className="w-6" />
      </View>

      {/* 본문 */}
      <ScrollView className="flex-1 px-4 py-6">
        {/* 제목 */}
        <Text className="text-[32px] leading-[48px] font-bold tracking-[0.32px] text-black mb-6">
          케어링 서비스 이용{"\n"}설명서
        </Text>

        {/* 서비스 이용 관련 섹션 */}
        <View className="w-[328px] space-y-6 mb-10">
          <Text className="text-[24px] leading-[36px] font-bold text-[#1A1A1A] mb-3">
            서비스 이용 관련
          </Text>
          <View className="flex flex-col gap-4">
            {serviceItems.map(renderItem)}
          </View>
        </View>

        {/* 개인정보 관련 섹션 */}
        <View className="w-[328px] space-y-6 mb-12">
          <Text className="text-[24px] leading-[36px] font-bold text-[#1A1A1A] mb-6">
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
