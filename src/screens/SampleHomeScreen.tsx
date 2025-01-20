import React, { useState } from 'react';
import '../styles/global.css';
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native';

import Header from '../components/main/Header';
import WhiteBox from '../layout/WhiteBox';
import StatusBox from '../components/main/StatusBox';
import CallButton from '../components/main/CallButton';
import WelfareNew from '../components/main/WelfareNew';

import { SampleHomeScreenProps } from '../types/bottomBar';

function SampleHomeScreen({ navigation }: SampleHomeScreenProps): React.JSX.Element {
  const [name, setName] = useState<string>('홍길동');

  return (
    <>
      <SafeAreaView className="flex-1 bg-gray5">
        <Header />
        <ScrollView>
          <WhiteBox styleName="mt-4 items-center">
            <View className="w-16 h-16 mb-4">
              <Image className="w-full h-full" source={require('../assets/images/img_user.png')} />
            </View>
            <Text className="text-xl mb-6">{name}</Text>
            <StatusBox status="safe" />
            <CallButton />
            <Text className="text-gray50 mt-4">마지막 업데이트 : 2024.12.12 12:33</Text>
          </WhiteBox>
          <WhiteBox>
            <Text className="text-xl font-bold mb-6">복지관 소식</Text>
            <WelfareNew />
          </WhiteBox>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default SampleHomeScreen;
