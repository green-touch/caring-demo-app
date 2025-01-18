import React from 'react';
import { View, Text } from 'react-native';
import SvgIcon from '../SvgIcon';

export default function StatusBox({ status }: { status: string }): React.JSX.Element {
  return (
    <>
      {status === 'danger' ? (
        <>
          <View className="flex-1 flex-row items-center justify-center w-2/3 bg-red50 mx-auto px-3 py-1 mb-4 rounded-md">
            <View className="w-5 h-5 mr-3 justify-center">
              <SvgIcon name="AlertTriangle24" size={24} />
            </View>
            <Text className="text-lg font-bold text-red900 ">위험 상태입니다!</Text>
          </View>
          <View className="flex-1 flex-row items-center justify-center w-3/4 mx-auto mb-6">
            <View className="flex-[1] flex-row w-1/2 items-center justify-center border-r border-gray10">
              <View className="w-4 h-4 mr-4 justify-center">
                <SvgIcon name="GlobeOff24" size={24} />
              </View>
              <Text className="text-gray70 font-bold text-center">연결 실패</Text>
            </View>
            <View className="flex-[1] flex-row w-1/2 items-center justify-center ">
              <View className="w-4 h-4 mr-4 justify-center">
                <SvgIcon name="BatteryOffRed24" size={24} />
              </View>
              <Text className="text-red800 font-bold text-center">0%</Text>
            </View>
          </View>
          <View className="flex-1 items-center justify-center w-full bg-gray5 mx-auto mb-4 px-3 py-4 rounded-lg">
            <View className="w-8 h-8 mb-2">
              <SvgIcon name="BatteryAlert32" size={32} />
            </View>
            <Text className="text-xl font-bold text-red800">휴대폰을 충전해 주세요!</Text>
            <Text className="text-lg">현재 배터리 잔량이 20% 미만입니다.</Text>
          </View>
        </>
      ) : status === 'warning' ? (
        <>
          <View className="flex-1 flex-row items-center justify-center w-2/3 bg-yellow50 mx-auto px-3 py-1 mb-4 rounded-md">
            <View className="w-5 h-5 mr-3 justify-center">
              <SvgIcon name="AlertCircle24" size={24} />
            </View>
            <Text className="text-lg font-bold text-yellow900">경고 상태입니다!</Text>
          </View>
          <View className="flex-1 flex-row items-center justify-center w-3/4 mx-auto mb-6">
            <View className="flex-[1] flex-row w-1/2 items-center justify-center border-r border-gray10">
              <View className="w-4 h-4 mr-4 justify-center">
                <SvgIcon name="GlobeOn24" size={24} />
              </View>
              <Text className="text-gray70 font-bold text-center">연결중</Text>
            </View>
            <View className="flex-[1] flex-row w-1/2 items-center justify-center ">
              <View className="w-4 h-4 mr-4 justify-center">
                <SvgIcon name="BatteryYellow24" size={24} />
              </View>
              <Text className="text-yellow800 font-bold text-center">5%</Text>
            </View>
          </View>
          <View className="flex-1 items-center justify-center w-full bg-gray5 mx-auto mb-4 px-3 py-4 rounded-lg">
            <View className="w-8 h-8 mb-2">
              <SvgIcon name="BatteryAlert32" size={32} />
            </View>
            <Text className="text-xl font-bold text-red800">휴대폰을 충전해 주세요!</Text>
            <Text className="text-lg">현재 배터리 잔량이 20% 미만입니다.</Text>
          </View>
        </>
      ) : (
        <>
          <View className="flex-1 flex-row items-center justify-center w-2/3 bg-green50 mx-auto px-3 py-1 mb-4 rounded-md">
            <View className="w-5 h-5 mr-3 justify-center">
              <SvgIcon name="AlertDefault24" size={24} />
            </View>
            <Text className="text-lg font-bold text-green900">안전한 상태입니다!</Text>
          </View>
          <View className="flex-1 flex-row items-center justify-center w-3/4 mx-auto mb-6">
            <View className="flex-[1] flex-row w-1/2 items-center justify-center border-r border-gray10">
              <View className="w-4 h-4 mr-4 justify-center">
                <SvgIcon name="GlobeOn24" size={24} />
              </View>
              <Text className="text-gray70 font-bold text-center">연결중</Text>
            </View>
            <View className="flex-[1] flex-row w-1/2 items-center justify-center ">
              <View className="w-4 h-4 mr-4 justify-center">
                <SvgIcon name="BatteryBlack24" size={24} />
              </View>
              <Text className="text-gray70 font-bold text-center">75%</Text>
            </View>
          </View>
        </>
      )}
    </>
  );
}
