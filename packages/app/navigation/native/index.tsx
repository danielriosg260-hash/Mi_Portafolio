import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from 'app/features/home/screen'
import { ProjectDetailScreen } from 'app/features/projects/project-detail-screen'

export type RootStackParamList = {
  home: undefined
  'project-detail': { id: string }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export function NativeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#04050a' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="project-detail" component={ProjectDetailScreen} />
    </Stack.Navigator>
  )
}
