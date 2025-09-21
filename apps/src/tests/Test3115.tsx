import React, { useEffect, useState } from 'react';

import { enableFreeze, TabBarControllerMode } from 'react-native-screens';
import ConfigWrapperContext, {
  type Configuration,
  DEFAULT_GLOBAL_CONFIGURATION,
} from '../shared/gamma/containers/bottom-tabs/ConfigWrapperContext';
import {
  BottomTabsContainer,
  type TabConfiguration,
} from '../shared/gamma/containers/bottom-tabs/BottomTabsContainer';
import { CenteredLayoutView } from '../shared/CenteredLayoutView';
import { Text } from 'react-native';
import { Button } from '../shared';

enableFreeze(true);

function makeTab(title: string) {
  return function Tab() {
    const [tick, setTick] = useState(false);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setTick(t => !t);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }, []);

    useEffect(() => {
      setCounter(c => c + 1);
    }, [tick]);

    return (
      <CenteredLayoutView>
        <Text>{title}</Text>
        <Text
          style={{
            color: tick ? 'white' : 'black',
            backgroundColor: tick ? 'black' : 'white',
          }}>
          Counter: {counter}
        </Text>
      </CenteredLayoutView>
    );
  };
}

const TAB_CONFIGS: TabConfiguration[] = [
  {
    tabScreenProps: {
      tabKey: 'Tab1',
      title: 'Tab 1',
      freezeContents: false,
      icon: {
        sfSymbolName: 'sun.max',
      },
      iconResourceName: 'sunny',
    },
    component: makeTab('Tab 1'),
  },
  {
    tabScreenProps: {
      tabKey: 'Tab2',
      title: 'Tab 2',
      icon: {
        sfSymbolName: 'snow',
      },
      iconResourceName: 'mode_cool',
    },
    component: makeTab('Tab 2'),
  },
];

function App() {
  const [config, setConfig] = React.useState<Configuration>(
    DEFAULT_GLOBAL_CONFIGURATION,
  );

  const [controllerMode, setControllerMode] =
    useState<TabBarControllerMode>('automatic');

  return (
    <ConfigWrapperContext.Provider
      value={{
        config,
        setConfig,
      }}>
      <Button
        title={`Change mode (currently ${controllerMode})`}
        onPress={() => {
          switch (controllerMode) {
            case 'automatic':
              setControllerMode('tabBar');
              break;
            case 'tabBar':
              setControllerMode('tabSidebar');
              break;
            default:
              setControllerMode('automatic');
              break;
          }
        }}
      />
      <BottomTabsContainer
        tabConfigs={TAB_CONFIGS}
        tabBarControllerMode={controllerMode}
      />
    </ConfigWrapperContext.Provider>
  );
}

export default App;
