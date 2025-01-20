import React from 'react';
import { View, Text } from 'react-native';

import WhiteBox from '@_layouts/WhiteBox';

function MyInfoWhiteBox({
  title,
  content,
  styleName,
}: {
  title: string;
  content: string;
  styleName?: String;
}): React.JSX.Element {
  return (
    <WhiteBox styleName={styleName}>
      <Text className="font-bold text-xl mb-5">{title}</Text>
      <View className="items-center justify-center bg-gray5 p-4 rounded-lg">
        <Text className="text-lg text-center">{content}</Text>
      </View>
    </WhiteBox>
  );
}

export default MyInfoWhiteBox;
