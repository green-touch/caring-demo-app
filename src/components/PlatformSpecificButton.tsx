import React from 'react';
import { Platform, TouchableOpacity, TouchableNativeFeedback, View } from 'react-native';

import { PlatformSpecificButtonProps } from '@_types/homeScreen';

const PlatformSpecificButton: React.FC<PlatformSpecificButtonProps> = ({ children, onPress, style = "", ...rest }) => {
  return Platform.select({
    ios: (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress} {...rest}>
        {children}
      </TouchableOpacity>
    ),
    android: (
      <View className={`${style} overflow-hidden`}>
        <TouchableNativeFeedback onPress={onPress} {...rest}>{children}</TouchableNativeFeedback>
      </View>
    ),
    default: <View className="overflow-hidden">{children}</View>, // `default`를 JSX로 설정
  })!;
};

export default PlatformSpecificButton;
