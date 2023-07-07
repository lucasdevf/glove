import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from '@react-navigation/native-stack'
import { SignIn } from '../screens/SignIn'
import { Welcome } from '../screens/Welcome'

type AuthRoutesScreens = {
  welcome: undefined
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
      <Screen name="welcome" component={Welcome} />

      <Screen name="sign-in" component={SignIn} />
    </Navigator>
  )
}
