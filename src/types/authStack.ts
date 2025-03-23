import { InfoType } from "./findInfo";

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
    mode : Extract<InfoType, 'password'>;
  }
};
