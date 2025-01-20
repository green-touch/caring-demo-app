import React from 'react';
import { View, Text } from 'react-native';

import SvgIcon from '../../SvgIcon';
import { StatusDefaultProps } from '../../../types/statusBox';

function NetworkStatus({ icon, message }: StatusDefaultProps): React.JSX.Element {
  return (
    <View className="flex-[1] flex-row w-1/2 items-center justify-center border-r border-gray10">
      <View className="w-4 h-4 mr-4 justify-center">
        <SvgIcon name={icon} size={24} />
      </View>
      <Text className="text-gray70 font-bold text-center">{message}</Text>
    </View>
  );
}

export default NetworkStatus;
