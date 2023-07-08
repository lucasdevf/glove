import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from '@react-navigation/native-stack'
import { SignIn } from '../screens/SignIn'
import { SignUp } from '../screens/SignUp'
import {
  VerifyCodeSignUp,
  VerifyCodeSignUpProps
} from '../screens/VerifyCodeSignUp'
import { Welcome } from '../screens/Welcome'

type AuthRoutesScreens = {
  welcome: undefined
  'sign-in': undefined
  'sign-up': undefined
  'verify-code-sign-up': VerifyCodeSignUpProps
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

      <Screen name="sign-up" component={SignUp} />

      <Screen name="verify-code-sign-up" component={VerifyCodeSignUp} />
    </Navigator>
  )
}
