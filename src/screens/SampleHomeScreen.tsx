import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native';

import Header from '@_components/main/Header';
import WhiteBox from '@_layouts/WhiteBox';
import StatusBox from '@_components/main/StatusBox';
import CallButton from '@_components/main/CallButton';
import WelfareNew from '@_components/main/WelfareNew';

import { SampleHomeScreenProps } from '@_types/bottomBar';

function SampleHomeScreen({ navigation }: SampleHomeScreenProps): React.JSX.Element {
  const [name, setName] = useState<string>('홍길동');

  return (
    <>
      <SafeAreaView className="flex-1 bg-gray5">
        <Header />
        <ScrollView>
          <WhiteBox styleName="mt-4 items-center">
            <View className="w-16 h-16 mb-4">
              <Image className="w-full h-full" source={require('@_assets/images/img_user.png')} />
            </View>
            <Text className="text-2xl mb-6 text-gray90">{name}</Text>
            <StatusBox status="notNetwork" />
            <CallButton />
            <Text className="text-gray50 mt-4">마지막 업데이트 : 2024.12.12 12:33</Text>
          </WhiteBox>
          <WhiteBox>
            <Text className="text-xl font-bold mb-6 text-gray100">복지관 소식</Text>
            <WelfareNew />
          </WhiteBox>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default SampleHomeScreen;
