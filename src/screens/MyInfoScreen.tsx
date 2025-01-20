import React, { useState } from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';

import { MyInfoScreenProps } from '../types/bottomBar';

import SvgIcon from '../components/SvgIcon';

function MyInfoScreen({ navigation }: MyInfoScreenProps): React.JSX.Element {
  const [name, setName] = useState<string>('홍길동');
  const [welfareName, setWelfareName] = useState<string>('행복 복지관');
  const [address, setAddress] = useState<string>(
    `서울특별시 종로구 세종대로 23길 \n 희망아파트 A동 B호`,
  );

  return (
    <SafeAreaView className="flex-1 bg-gray5">
      <View className="w-full bg-gray0 px-4 py-6 flex-row">
        <View className="w-1/5 mr-3 items-center justify-center">
          <Image
            className="w-16 h-16 rounded-full"
            source={require('../assets/images/img_user.png')}
          />
        </View>
        <View className="justify-center w-4/5">
          <Text className="text-xl mb-1">{name}</Text>
          <View className="flex-row">
            <SvgIcon name="MapPinFilled18" size={18} />
            <Text className="text-gray70 font-bold text-sm ml-1">{welfareName}</Text>
            <Text className="text-gray70 text-sm"> 소속</Text>
          </View>
        </View>
      </View>
      <View className="justify-c5enter w-11/12 bg-gray0 mx-auto my-4 p-4 rounded-lg">
        <Text className="font-bold text-xl mb-5">거주지</Text>
        <View className="items-center justify-center bg-gray5 p-4 rounded-lg">
          <Text className="text-gray70 text-center">{address}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default MyInfoScreen;
