import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from '@react-navigation/native-stack'
import { CreateCreditCard } from '../screens/CreateCreditCard'
import { EnterValue } from '../screens/EnterValue'
import { Home } from '../screens/Home'
import { SelectCreditCard } from '../screens/SelectCreditCard'
import { SelectPayment } from '../screens/SelectPayment'

type AppRoutesScreens = {
  home: undefined
  'enter-value': undefined
  'select-payment': undefined
  'select-credit-card': undefined
  'create-credit-card': undefined
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

      <Screen name="enter-value" component={EnterValue} />

      <Screen name="select-payment" component={SelectPayment} />

      <Screen name="select-credit-card" component={SelectCreditCard} />

      <Screen name="create-credit-card" component={CreateCreditCard} />
    </Navigator>
  )
}
