import { InfoType } from "./findInfo";
import ResetPassword from '../screens/login/ResetPassword';

export type AuthStackParamList = {
  LoginMain: undefined;
  FindInfo: {
    mode : InfoType;
  };
  Verification: {
    mode : InfoType;
  };
  HelpResult : {
    mode : InfoType;
  }
  ResetPassword: {
    mode : Omit<'id',InfoType>;
  }
};
