import {
  ACTIVITIES_SCREEN,
  ARCHIVE_SCREEN,
  colors,
  font,
  fontSize
} from '../variables';
import { ActivitiesScreen, ArchiveScreen } from '../screens';
import { FC, useState } from 'react';
import {
  NavigationState,
  SceneRendererProps,
  TabBar,
  TabView
} from 'react-native-tab-view';

import { Icon } from './_icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useWindowDimensions } from 'react-native';

interface RenderSceneProps {
  route: { key: string };
  jumpTo(scene: string): void;
}

type Route = {
  key: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  tabBar: boolean;
};

type State = NavigationState<Route>;

const renderScene: FC<RenderSceneProps> = ({ route }) => {
  switch (route.key) {
    case ACTIVITIES_SCREEN:
      return <ActivitiesScreen />;
    case ARCHIVE_SCREEN:
      return <ArchiveScreen />;

    default:
      return null;
  }
};

export const TabSceneView = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState<Route[]>([
    {
      key: ACTIVITIES_SCREEN,
      icon: 'format-list-bulleted-square',
      tabBar: true
    },
    { key: ARCHIVE_SCREEN, icon: 'archive-outline', tabBar: true }
  ]);

  const renderIcon = ({ route }: { route: Route; color: string }) => (
    <Icon name={route.icon} size={24} />
  );

  const renderTabBar = (
    props: SceneRendererProps & { navigationState: State }
  ) => (
    <TabBar
      {...props}
      renderIcon={renderIcon}
      style={{ backgroundColor: colors.$plainWhite }}
      labelStyle={{
        color: colors.$black,
        fontFamily: font.$primary__regular,
        letterSpacing: 1,
        fontSize: fontSize.$xs
      }}
      indicatorStyle={{ backgroundColor: colors.$black }}
    />
  );
  // https://github.com/satya164/react-native-tab-view/blob/main/example/src/TabBarIconExample.tsx
  return (
    <TabView
      navigationState={{
        index,
        routes
      }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width, height: layout.height }}
      tabBarPosition={'bottom'}
      renderTabBar={renderTabBar}
    />
  );
};
