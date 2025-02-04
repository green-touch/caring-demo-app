export type StatusType = 'danger' | 'warning' | 'safe' | 'notNetwork';

export interface PlatformSpecificButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}
