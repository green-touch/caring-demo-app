import React from 'react';
import { View } from 'react-native';

import StatusIndicator from './StatusBoxComponents/StatusIndicator';
import NetworkStatus from './StatusBoxComponents/NetworkStatus';
import BatteryStatus from './StatusBoxComponents/BatteryStatus';
import BatteryAlert from './StatusBoxComponents/BatteryAlert';

import { StatusType } from '@_types/homeScreen';
import { IconName } from '@_types/icon';

function StatusBox({ status }: { status: StatusType }): React.JSX.Element {
  let iconConfig: IconName[] = ['AlertDefault24', 'GlobeOn24', 'BatteryBlack24'];
  const statusConfig = {
    danger: {
      message: '위험 상태입니다!',
      bgColor: 'bg-red50',
      textColor: 'text-red900',
      network: { message: '연결안됨' },
      battery: { percentage: '0%', textColor: 'text-red800' },
      alert: {
        icon: 'BatteryAlert32',
        title: '휴대폰을 충전해 주세요!',
        description: '현재 배터리 잔량이 20% 미만입니다.',
      },
    },
    warning: {
      message: '경고 상태입니다!',
      bgColor: 'bg-yellow50',
      textColor: 'text-yellow900',
      network: { message: '연결중' },
      battery: { percentage: '5%', textColor: 'text-yellow800' },
      alert: {
        icon: 'BatteryAlert32',
        title: '휴대폰을 충전해 주세요!',
        description: '현재 배터리 잔량이 20% 미만입니다.',
      },
    },
    safe: {
      message: '안전한 상태입니다!',
      bgColor: 'bg-green50',
      textColor: 'text-green900',
      network: { message: '연결중' },
      battery: { percentage: '75%', textColor: 'text-gray70' },
    },
  };

  if (status === 'safe') {
    iconConfig = ['AlertDefault24', 'GlobeOn24', 'BatteryBlack24'];
  } else if (status === 'warning') {
    iconConfig = ['AlertCircle24', 'GlobeOn24', 'BatteryYellow24'];
  } else if (status === 'danger') {
    iconConfig = ['AlertTriangle24', 'GlobeOff24', 'BatteryOffRed24'];
  }

  const config = statusConfig[status] || null;
  if (!config) return <></>;

  return (
    <>
      <StatusIndicator
        icon={iconConfig[0]}
        message={config.message}
        bgColor={config.bgColor}
        textColor={config.textColor}
      />
      <View className="flex-1 flex-row items-center justify-center w-3/4 mx-auto mb-6">
        <NetworkStatus icon={iconConfig[1]} message={config.network.message} />
        <BatteryStatus
          icon={iconConfig[2]}
          message={config.battery.percentage}
          textColor={config.battery.textColor}
        />
      </View>
      <BatteryAlert />
    </>
  );
}

export default StatusBox;
