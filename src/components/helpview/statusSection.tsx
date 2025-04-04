// components/helpview/StatusSection.tsx
import React from 'react';
import { View, Text } from 'react-native';
import SvgIcon from '@_components/SvgIcon';
import { IconName } from '@_types/icon';

interface StatusSectionProps {
    icon: IconName;
    title: string;
    items: { icon: IconName; text: string }[];
    iconColor?: string;
  }

const StatusSection: React.FC<StatusSectionProps> = ({ icon, title, items, iconColor = 'black' }) => {
  return (
    <View className="items-center space-y-4 mt-12">
      <View className="items-center">
        <SvgIcon name={icon} size={32} color={iconColor} />
        <Text className="text-[24px] font-bold leading-[36px] text-black text-center mt-2">{title}</Text>
      </View>

      <View className="w-full items-center px-4">
        <View className="w-full bg-[#F8F8F8] rounded-lg px-4 py-6 space-y-4 mt-4 items-center">
          {items.map((item, idx) => (
            <View key={idx} className="flex-row items-center space-x-2">
              <View className="w-[32px] mb-3 h-[32px] rounded-[5.33px] justify-center items-center">
                <SvgIcon name={item.icon} size={20} />
              </View>
              <Text className="text-[19px] mb-3 leading-[28.5px] text-[#1D1D1D] font-normal">{item.text}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default StatusSection;
