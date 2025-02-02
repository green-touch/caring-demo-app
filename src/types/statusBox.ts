import { IconName } from './icon';

export interface StatusDefaultProps {
  icon: IconName;
  message: String;
  textColor?: String;
}
export interface StatusBaytteryAlertProps {
  icon: IconName;
  title: String;
  description: String;
}

export interface StatusIndicatorProps extends StatusDefaultProps {
  bgColor: String;
}
