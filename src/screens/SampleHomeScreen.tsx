import React, { useState } from 'react';
import '../styles/global.css';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

import SvgIcon from '../components/SvgIcon';
import Header from '../components/main/Header';
import StatusBox from '../components/main/StatusBox';

function SampleHomeScreen({ navigation }: any): React.JSX.Element {
  const [name, setName] = useState<string>('홍길동');

  const callButton = (
    <View className="w-full bg-main900 rounded-lg px-16 py-3">
      <Text className="text-lg text-gray0 text-center">담당 복지사에게 전화</Text>
    </View>
  );

  const welfareNew = (
    <View className="flex-row items-center py-3">
      <View className="w-1/4">
        <View className="w-16 h-16 mx-auto">
          <Image
            className="w-full h-full"
            source={require('../assets/images/img_center_list.png')}
          />
        </View>
      </View>
      <View className="w-3/4 pr-8">
        <Text className="text-lg font-bold text-gray90" numberOfLines={1}>
          10월 결핵 예방 교육 이용 이벤트
        </Text>
        <Text className="text-sm text-gray70" numberOfLines={1}>
          2024년 10월 27일
        </Text>
        <SvgIcon name="ChevronRight32" size={32} />
      </View>
    </View>
  );

  return (
    <>
      <SafeAreaView className="flex-1 bg-gray5">
        <Header />
        <ScrollView>
          <View className="flex-1 items-center justify-center w-11/12 bg-gray0 mx-auto my-4 px-3.5 py-6 rounded-lg">
            <View className="w-16 h-16 mb-4">
              <Image className="w-full h-full" source={require('../assets/images/img_user.png')} />
            </View>
            <Text className="text-xl font-normal mb-6">{name}</Text>
            <StatusBox status="danger" />
            {Platform.select({
              ios: (
                <TouchableOpacity activeOpacity={0.5} onPress={() => {}} className="mb-6">
                  {callButton}
                </TouchableOpacity>
              ),
              android: (
                <View className="overflow-hidden mb-6">
                  <TouchableNativeFeedback onPress={() => {}}>{callButton}</TouchableNativeFeedback>
                </View>
              ),
            })}
            <Text className="text-gray50">마지막 업데이트: 2024.12.12 12:33</Text>
          </View>
          <View className="flex-1 justify-center w-11/12 bg-gray0 mx-auto px-4 py-6 rounded-lg mb-4">
            <Text className="text-xl font-bold mb-6">복지관 소식</Text>
            {Platform.select({
              ios: (
                <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
                  {welfareNew}
                </TouchableOpacity>
              ),
              android: (
                <View className="overflow-hidden">
                  <TouchableNativeFeedback onPress={() => {}}>{welfareNew}</TouchableNativeFeedback>
                </View>
              ),
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default SampleHomeScreen;
