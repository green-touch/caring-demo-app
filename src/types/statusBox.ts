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

export type AlertStatus = "danger" | "warning" | "default";

export const ALERT_ICONS: Record<AlertStatus, IconName> = {
  danger: "AlertTriangle",
  warning: "AlertCircle",
  default: "AlertDefault",
};

export type AlertMesssage ={
  title:string;
  description:string;
}