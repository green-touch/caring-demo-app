import React from 'react';
import { View, Text } from 'react-native';

import SvgIcon from '../../SvgIcon';
import { StatusIndicatorProps } from '../../../types/statusBox';

function StatusIndicator({
  icon,
  message,
  bgColor,
  textColor,
}: StatusIndicatorProps): React.JSX.Element {
  return (
    <View
      className={`flex-1 flex-row items-center justify-center w-2/3 ${bgColor} mx-auto px-3 py-1 mb-4 rounded-md`}>
      <View className="w-5 h-5 mr-3 justify-center">
        <SvgIcon name={icon} size={24} />
      </View>
      <Text className={`text-lg font-bold ${textColor}`}>{message}</Text>
    </View>
  );
}

export default StatusIndicator;
