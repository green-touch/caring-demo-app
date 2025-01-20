import React, { useState } from 'react';
import '../styles/global.css';
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native';

import Header from '../components/main/Header';
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
          <View className="flex-1 items-center justify-center w-11/12 bg-gray0 mx-auto my-4 px-3.5 py-6 rounded-lg">
            <View className="w-16 h-16 mb-4">
              <Image className="w-full h-full" source={require('../assets/images/img_user.png')} />
            </View>
            <Text className="text-xl mb-6">{name}</Text>
            <StatusBox status="safe" />
            <CallButton />
            <Text className="text-gray50 mt-4">마지막 업데이트 : 2024.12.12 12:33</Text>
          </View>
          <View className="flex-1 justify-center w-11/12 bg-gray0 mx-auto px-4 py-6 rounded-lg mb-4 ">
            <Text className="text-xl font-bold mb-6">복지관 소식</Text>
            <WelfareNew />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default SampleHomeScreen;
