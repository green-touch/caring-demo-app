import React from 'react';
import { View, Text ,Linking} from 'react-native';

import PlatformSpecificButton from '@_components/PlatformSpecificButton';

function CallButton(): React.JSX.Element {
  const handlePress = () => {
    const phoneNumber = '01012345678';
    Linking.openURL(`tel:${phoneNumber}`).catch((err) => {
      console.error('전화 연결 실패:', err);
    });
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
