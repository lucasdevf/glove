import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from '@react-navigation/native-stack'
import { Home } from '../screens/Home'
import { SignIn } from '../screens/SignIn'

type AuthRoutesScreens = {
  home: undefined
  'sign-in': undefined
}

export type AuthNavigatorRoutesProps =
  NativeStackNavigationProp<AuthRoutesScreens>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesScreens>()

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="home" component={Home} />

      <Screen name="sign-in" component={SignIn} />
    </Navigator>
  )
}
