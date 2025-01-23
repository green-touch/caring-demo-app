import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  NativeModules,
} from 'react-native';

const { ForegroundServiceModule } = NativeModules; // 네이티브 모듈 직접 호출

function App(): React.JSX.Element {
  // Foreground Service 시작
  const startForegroundService = async () => {
    try {
      await ForegroundServiceModule.startService();
      Alert.alert('Foreground Service', 'Service has started!');
    } catch (error) {
      console.error('Error starting service:', error);
      Alert.alert('Error', 'Failed to start the service.');
    }
  };

  // Foreground Service 종료
  const stopForegroundService = async () => {
    try {
      await ForegroundServiceModule.stopService();
      Alert.alert('Foreground Service', 'Service has stopped!');
    } catch (error) {
      console.error('Error stopping service:', error);
      Alert.alert('Error', 'Failed to stop the service.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Foreground Service Demo</Text>

      <View style={styles.buttonContainer}>
        <Button title="Start Service" onPress={startForegroundService} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Stop Service" onPress={stopForegroundService} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    width: 200,
  },
});

export default App;
