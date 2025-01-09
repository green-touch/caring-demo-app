/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import './src/styles/global.css';
import tw from 'tailwind-react-native-classnames';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  NativeModules,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Netinfo, { useNetInfo } from "@react-native-community/netinfo";
import { useScreenStatus } from './src/hooks/useScreenStatus';
import { useBatteryLevel } from './src/hooks/useBatteryLevel';


type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text style={tw`text-3xl font-black text-red-600`}>{title}</Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const screenStatus=useScreenStatus();
  const batteryLevel=useBatteryLevel();
  const netinfo=useNetInfo();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        >
          <Section title="Screen Status">
            {screenStatus !== null ? (
              <Text style={tw`text-xl font-bold text-blue-600`}>
                Screen Status: {screenStatus}
              </Text>
            ) : (
              <Text style={tw`text-xl text-red-600`}>Loading screen status...</Text>
            )}
          </Section>
  
          <Section title="Battery Level Test">
            {batteryLevel ? (
              <Text style={tw`text-xl font-bold text-green-600`}>
                Battery Level: {batteryLevel}
              </Text>
            ) : (
              <Text style={tw`text-xl text-red-600`}>Loading battery level...</Text>
            )}
          </Section>
  
          <Section title="Network Status Test">
            {netinfo ? (
              <>
                <Text style={tw`text-lg`}>
                  Type: {netinfo.type}
                </Text>
                <Text style={tw`text-lg`}>
                  , Connected: {netinfo.isConnected ? 'Connected' : 'Disconnected'}
                </Text>
              </>
            ) : (
              <Text style={tw`text-lg text-red-600`}>Checking network status...</Text>
            )}
          </Section>
  
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}  

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
