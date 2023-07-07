import { ClerkProvider } from '@clerk/clerk-expo'
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  useFonts
} from '@expo-google-fonts/montserrat'
import { StatusBar } from 'expo-status-bar'
import { Text } from 'react-native'
import { tokenCache } from './src/auth/token-cache'
import { Routes } from './src/routes'

export default function App() {
  const [isFontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
  })

  const clerkPublishableKey =
    'pk_test_c291bmQtYm9hLTQ5LmNsZXJrLmFjY291bnRzLmRldiQ'

  console.log(clerkPublishableKey)

  return isFontsLoaded ? (
    <ClerkProvider tokenCache={tokenCache} publishableKey={clerkPublishableKey}>
      <StatusBar style="dark" backgroundColor="white" />

      <Routes />
    </ClerkProvider>
  ) : (
    <Text>Carregando</Text>
  )
}
