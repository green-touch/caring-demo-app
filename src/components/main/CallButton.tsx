import React from 'react';
import { View, Text } from 'react-native';

import PlatformSpecificButton from '@_components/PlatformSpecificButton';

function CallButton(): React.JSX.Element {
  const handlePress = () => {
    console.log('담당 복지관에 대해 전화 걸기');
  };

  return (
    <PlatformSpecificButton onPress={handlePress}>
      <View className="w-full bg-main900 rounded-lg px-16 py-3">
        <Text className="text-lg text-gray0 text-center">담당 복지사에게 전화하기</Text>
      </View>
    </PlatformSpecificButton>
  );
}

export default CallButton;
