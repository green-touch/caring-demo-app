import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  SampleHome: undefined;
  MyInfo: undefined;
};

type SampleHomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SampleHome'>;
type MyInfoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MyInfo'>;
type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export interface SampleHomeScreenProps {
  navigation: SampleHomeScreenNavigationProp;
}

export interface MyInfoScreenProps {
  navigation: MyInfoScreenNavigationProp;
}

export interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

