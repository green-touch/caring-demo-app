import React from 'react';
import { View, Text } from 'react-native';

import { FamilyInfo } from '@_types/familyInfo';

function FamilyInfoBox({ name, relationship, phoneNumber }: FamilyInfo): React.JSX.Element {
  return (
    <View className="flex-row p-4 rounded-lg">
      <View className="w-1/2 flex-row items-baseline mr-2">
        <Text className="w-1/2 text-lg font-bold" numberOfLines={1} ellipsizeMode="clip">
          {name}
        </Text>
        <Text className="w-1/2 text-base text-gray50" numberOfLines={1}>
          {relationship}
        </Text>
      </View>
      <Text className="w-1/2 text-lg">{phoneNumber}</Text>
    </View>
  );
}

export default FamilyInfoBox;
