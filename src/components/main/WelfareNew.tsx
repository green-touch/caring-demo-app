import React from 'react';
import { View, Text, Image } from 'react-native';

import SvgIcon from '../SvgIcon';
import PlatformSpecificButton from '../PlatformSpecificButton';

function WelfareNew(): React.JSX.Element {
  const handlePress = () => {
    console.log('복지관 소식 페이지 넘어가기');
  };

  return (
    <PlatformSpecificButton onPress={handlePress}>
      <View className="flex-row items-center py-3">
        <View className="w-3/12">
          <View className="w-16 h-16 mx-auto">
            <Image
              className="w-full h-full"
              source={require('../../assets/images/img_center_list.png')}
            />
          </View>
        </View>
        <View className="w-8/12">
          <Text className="text-lg font-bold text-gray90" numberOfLines={1}>
            10월 결핵 예방 교육 이용 이벤트
          </Text>
          <Text className="text-sm text-gray70" numberOfLines={1}>
            2024년 10월 27일
          </Text>
        </View>
        <SvgIcon name="ChevronRight32" size={32} className="w-1/12" />
      </View>
    </PlatformSpecificButton>
  );
}

export default WelfareNew;
