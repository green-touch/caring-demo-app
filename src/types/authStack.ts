import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { InfoType } from "./findInfo";

export type AuthStackParamList = {
  LoginMain: undefined;
  FindInfo: {
    mode : InfoType;
  };
  Verification: undefined;
};
