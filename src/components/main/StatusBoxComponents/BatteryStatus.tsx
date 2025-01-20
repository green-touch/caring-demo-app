import React from 'react';
import { View, Text } from 'react-native';

import SvgIcon from '../../SvgIcon';

import { StatusDefaultProps } from '../../../types/statusBox';

function BatteryStatus({ icon, message, textColor }: StatusDefaultProps): React.JSX.Element {
  return (
    <View className="flex-[1] flex-row w-1/2 items-center justify-center ">
      <View className="w-4 h-4 mr-4 justify-center">
        <SvgIcon name={icon} size={24} />
      </View>
      <Text className={`font-bold text-center ${textColor}`}>{message}</Text>
    </View>
  );
}

export default BatteryStatus;
