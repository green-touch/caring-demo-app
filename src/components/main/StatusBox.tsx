import React from 'react';
import { View } from 'react-native';

import StatusIndicator from './StatusBoxComponents/StatusIndicator';
import NetworkStatus from './StatusBoxComponents/NetworkStatus';
import BatteryStatus from './StatusBoxComponents/BatteryStatus';
import BatteryAlert from './StatusBoxComponents/BatteryAlert';

import { StatusType } from '@_types/homeScreen';
import { IconName } from '@_types/icon';

function StatusBox({ status }: { status: StatusType }): React.JSX.Element {
  let iconConfig: IconName[] = ['AlertDefault', 'GlobeOn', 'Battery100Black', 'BatteryAlert'];

  // To. 나은
  // 배터리가 상당히 icon이 많아. 현재는 단순 배터리 값을 3개로 나누어서 사용하고 있지만, 세분화되어버렸어.
  // 문제는 배터리 상태와 네트워크를 따져야해. 그래서 이 부분을 어떻게 처리할지 고민이야.
  // 일단 status가 받아와지는 값이니깐 이거 측정되는 페이지에서 safe, warning, danger, notNetwork를 측정해서 받아와서.
  // 내가 생각하기에는 밑에 상태 값으로 나누고, 또 내부에서 if 문이나나 삼항 연산자로 네트워크 여부를 나누면 좋을 거 같아.
  // 나도 마땅히 생각나는 방법이 없어서 대충 바꿨는데, 좋은 방안이 있다면 한 번 알고리즘을 생각해서 바꿔봐.
  // 아래는 신경써야할 모든 상황을 적어둘게.

  /*
    1-1. 배터리가 0~5% 및 네트워크 연결시에는 배터리 아이콘 이름을 Battery0Red으로 표시해야해. 
    1-2. 배터리가 0~5% 및 네트워크 끊김시에는 배터리 아이콘 이름을 Battery0Off으로 표시해야해.
    2-1. 배터리가 5~15% 및 네트워크 연결시에는 배터리 아이콘 이름을 Battery15Yellow으로 표시해야해. 
    2-2. 배터리가 5~15% 및 네트워크 끊김시에는 배터리 아이콘 이름을 Battery15Off으로 표시해야해.
    3-1. 배터리가 16~35% 및 네트워크 연결시에는 배터리 아이콘 이름을 Battery35Black으로 표시해야해. 
    3-2. 배터리가 16~35% 및 네트워크 끊김시에는 배터리 아이콘 이름을 Battery35Off으로 표시해야해.
    4-1. 배터리가 36~65% 및 네트워크 연결시에는 배터리 아이콘 이름을 Battery65Black으로 표시해야해. 
    4-2. 배터리가 36~65% 및 네트워크 끊김시에는 배터리 아이콘 이름을 Battery65Off으로 표시해야해.
    5-1. 배터리가 66~85% 및 네트워크 연결시에는 배터리 아이콘 이름을 Battery85Black으로 표시해야해. 
    5-2. 배터리가 66~85% 및 네트워크 끊김시에는 배터리 아이콘 이름을 Battery85Off으로 표시해야해.
    6-1. 배터리가 86~100% 및 네트워크 연결시에는 배터리 아이콘 이름을 Battery100Black으로 표시해야해. 
    6-2. 배터리가 86~100% 및 네트워크 끊김시에는 배터리 아이콘 이름을 Battery100Off으로 표시해야해.
  */

  const statusConfig = {
    danger: {
      message: '위험 상태입니다!',
      bgColor: 'bg-red50',
      textColor: 'text-red900',
      network: { message: '연결중', textColor: 'text-gray70' },
      battery: { percentage: '0%', textColor: 'text-red800' },
      alert: {
        title: '휴대폰을 충전해 주세요!',
        description: '현재 배터리 잔량이 20% 미만입니다.',
      },
    },
    warning: {
      message: '경고 상태입니다!',
      bgColor: 'bg-yellow50',
      textColor: 'text-yellow900',
      network: { message: '연결중', textColor: 'text-gray70' },
      battery: { percentage: '5%', textColor: 'text-yellow800' },
      alert: {
        title: '휴대폰을 충전해 주세요!',
        description: '현재 배터리 잔량이 20% 미만입니다.',
      },
    },
    safe: {
      message: '안전한 상태입니다!',
      bgColor: 'bg-green50',
      textColor: 'text-green900',
      network: { message: '연결중', textColor: 'text-gray70' },
      battery: { percentage: '75%', textColor: 'text-gray70' },
      alert: {
        title: '',
        description: '',
      },
    },
    notNetwork: {
      message: '오프라인 상태입니다!',
      bgColor: 'bg-gray5',
      textColor: 'text-gray90',
      network: { message: '연결없음', textColor: 'text-gray50' },
      battery: { percentage: '30%', textColor: 'text-gray50' },
      alert: {
        title: '와이파이 또는 모바일 데이터에 연결해 주세요!',
        description: '현재 인터넷에 접속되어 있지 않습니다.',
      },
    },
  };

  if (status === 'safe') {
    iconConfig = ['AlertDefault', 'GlobeOn', 'Battery85Black', 'BatteryAlert'];
  } else if (status === 'warning') {
    iconConfig = ['AlertCircle', 'GlobeOn', 'Battery15Yellow', 'BatteryAlert'];
  } else if (status === 'danger') {
    iconConfig = ['AlertTriangle', 'GlobeOn', 'Battery0Red'];
  } else if (status === 'notNetwork') {
    iconConfig = ['Wifi', 'GlobeOff', 'Battery35Off', 'WifiOffAlert'];
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
      <View className="flex-1 flex-row items-center justify-center w-3/4 mx-auto mb-8">
        <NetworkStatus
          icon={iconConfig[1]}
          message={config.network.message}
          textColor={config.network.textColor}
        />
        <BatteryStatus
          icon={iconConfig[2]}
          message={config.battery.percentage}
          textColor={config.battery.textColor}
        />
      </View>
      {status === 'safe' ? (
        <></>
      ) : (
        <BatteryAlert
          icon={iconConfig[3]}
          title={config.alert.title}
          description={config.alert.description}
        />
      )}
    </>
  );
}

export default StatusBox;
