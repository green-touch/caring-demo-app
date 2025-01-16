import React from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';

function HomeScreen({ navigation }: any): React.JSX.Element {
  return (
    <SafeAreaView>
      <View>
        <Button title="SampleHome Screen" onPress={() => navigation.navigate('Main')}></Button>
        <Button title="Test Screen" onPress={() => navigation.navigate('Test')} />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
