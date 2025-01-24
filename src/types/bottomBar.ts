import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  SampleHome: undefined;
  MyInfo: undefined;
};

type SampleHomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SampleHome'>;

type MyInfoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MyInfo'>;

export interface SampleHomeScreenProps {
  navigation: SampleHomeScreenNavigationProp;
}

export interface MyInfoScreenProps {
  navigation: MyInfoScreenNavigationProp;
}
