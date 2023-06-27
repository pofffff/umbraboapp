import { AppProvider, useAuth } from './src/context';
import { AuthSceneView, TabSceneView } from './src/components';
// import {
//   RobotoMono_200ExtraLight,
//   RobotoMono_400Regular,
//   RobotoMono_500Medium,
//   RobotoMono_700Bold,
//   useFonts as useRobotoMono,
// } from '@expo-google-fonts/roboto-mono';
// import {
//   SpaceMono_400Regular,
//   SpaceMono_700Bold,
//   useFonts as useSpaceMono,
// } from '@expo-google-fonts/space-mono';

import React from 'react';

const Main: React.FC = () => {
  const { authenticated } = useAuth();

  return authenticated ? <TabSceneView /> : <AuthSceneView />;
};

const App = () => {
  // const [spaceMono] = useSpaceMono({
  //   SpaceMono_400Regular,
  //   SpaceMono_700Bold,
  // });

  // const [robotoMono] = useRobotoMono({
  //   RobotoMono_200ExtraLight,
  //   RobotoMono_400Regular,
  //   RobotoMono_500Medium,
  //   RobotoMono_700Bold,
  // });

  // TODO Return SignInScreen if not authenticated

  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
};

export default App;
