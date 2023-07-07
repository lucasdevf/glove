import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from '@react-navigation/native-stack'
import { Home } from '../screens/Home'

type AppRoutesScreens = {
  home: undefined
}

export type AppNavigatorRoutesProps =
  NativeStackNavigationProp<AppRoutesScreens>

const { Navigator, Screen } = createNativeStackNavigator<AppRoutesScreens>()

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="home" component={Home} />
    </Navigator>
  )
}
