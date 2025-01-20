import React from 'react';
import { View, Text } from 'react-native';

import SvgIcon from '../../SvgIcon';

function BatteryAlert(): React.JSX.Element {
  return (
    <View className="flex-1 items-center justify-center w-full bg-gray5 mx-auto mb-4 px-3 py-4 rounded-lg">
      <View className="w-8 h-8 mb-2">
        <SvgIcon name="BatteryAlert32" size={32} />
      </View>
      <Text className="text-xl font-bold text-red800">휴대폰을 충전해 주세요!</Text>
      <Text className="text-lg">현재 배터리 잔량이 20% 미만입니다.</Text>
    </View>
  );
}

export default BatteryAlert;
