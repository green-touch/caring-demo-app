import React from 'react';
import { View } from 'react-native';

function WhiteBox({
  children,
  styleName,
}: {
  children: React.ReactNode;
  styleName?: String;
}): React.JSX.Element {
  return (
    <View
      className={`justify-center w-11/12 bg-gray0 mx-auto mb-4 px-3.5 py-6 rounded-lg ${styleName}`}>
      {children}
    </View>
  );
}

export default WhiteBox;
