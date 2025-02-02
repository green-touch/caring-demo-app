import { IconName } from './icon';

export interface StatusDefaultProps {
  icon: IconName;
  message: string;
  textColor?: string;
}
export interface StatusBatteryAlertProps {
  icon: IconName;
  title: string;
  description: string;
}

export interface StatusIndicatorProps extends StatusDefaultProps {
  bgColor: string;
}
