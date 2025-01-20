export type StatusType = 'danger' | 'warning' | 'safe';

export interface PlatformSpecificButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}
