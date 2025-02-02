import React from 'react';
import { View, Text } from 'react-native';

import { FamilyInfo } from '@_types/familyInfo';

function FamilyInfoBox({ name, relationship, phoneNumber }: FamilyInfo): React.JSX.Element {
  return (
   <View className="flex-row rounded-lg py-4 px-2 w-full justify-between"> 
     <View className="flex-row items-baseline space-x-2">
        <Text className=" text-lg font-bold text-gray100" numberOfLines={1} ellipsizeMode="clip">
          {name}
        </Text>
        <Text className=" text-base text-gray50" numberOfLines={1}>
          {relationship}
        </Text>
      </View>
      <View className=" flex-row">
        <Text className="text-lg text-center text-gray100">{phoneNumber}</Text>
      </View>
    </View>
  );
}

export default FamilyInfoBox;
