import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SvgIcon from '@_components/SvgIcon';
import { useNavigation } from '@react-navigation/native';

interface CommonHeaderProps {
  title: string;
}

const CommonHeader: React.FC<CommonHeaderProps> = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View className="w-full h-[56px] flex-row items-center justify-between px-4 bg-white border-b border-gray-300">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <SvgIcon name="Back" size={24} color="black" />
      </TouchableOpacity>
      <Text className="text-lg text-black">{title}</Text>
      <SvgIcon name="Menu" size={24} color="black" />
    </View>
  );
};

export default CommonHeader;
