import React from 'react';
import { View, Text } from 'react-native';

interface AlertItem {
  title: string;
  description: string;
  colorClass: string; // text-yellow-900, text-red900 등
}

interface AlertBoxProps {
  items: AlertItem[];
}

const AlertBox: React.FC<AlertBoxProps> = ({ items }) => {
  return (
    <View className="w-full items-center px-4">
      <View className="w-full bg-gray5 rounded-lg px-4 py-6 space-y-6 items-center">
        {items.map((item, index) => (
          <View key={index} className="w-[296px] items-center space-y-1">
            <Text className={`text-[19px] mt-3 mb-2 font-bold leading-[28.5px] ${item.colorClass} text-center`}>
              {item.title}
            </Text>
            <Text className="text-[17px] mb-4 font-normal leading-[25.5px] text-black text-center">
              {item.description}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default AlertBox;