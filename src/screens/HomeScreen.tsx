import React from 'react';
import { View, Button, SafeAreaView } from 'react-native';

function HomeScreen({ navigation }: any): React.JSX.Element {
  return (
    <SafeAreaView>
      <View>
        <Button title="SampleHome Screen" onPress={() => navigation.navigate('Main')}></Button>
        <Button title="Test Screen" onPress={() => navigation.navigate('Test')}></Button>
        <Button title="WelfareCenterScreen" onPress={()=>navigation.navigate('Find')}></Button>
        <Button title="Login Screen" onPress={() => navigation.navigate('Login')}></Button>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
