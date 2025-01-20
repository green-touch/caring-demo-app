import { StatusType } from './homeScreen';
import { IconName } from './icon';

export interface StatusDefaultProps {
  icon: IconName;
  message: String;
  textColor?: String;
}

export interface StatusIndicatorProps extends StatusDefaultProps {
  bgColor: String;
}
