import { ClerkProvider } from '@clerk/clerk-expo'
import {
  Montserrat_400Regular as MontserratRegular /* @note: the names have been changed because camelcase rule from eslint */,
  Montserrat_500Medium as MontserratMedium,
  Montserrat_600SemiBold as MontserratSemiBold,
  useFonts
} from '@expo-google-fonts/montserrat'
import { StatusBar } from 'expo-status-bar'
import { Text } from 'react-native'
import { QueryClient, QueryClientProvider } from 'react-query'
import { tokenCache } from './src/auth/token-cache'
import { Routes } from './src/routes'

const queryClient = new QueryClient()

export default function App() {
  const [isFontsLoaded] = useFonts({
    Montserrat_400Regular: MontserratRegular,
    Montserrat_500Medium: MontserratMedium,
    Montserrat_600SemiBold: MontserratSemiBold,
  })

  const clerkPublishableKey =
    'pk_test_c291bmQtYm9hLTQ5LmNsZXJrLmFjY291bnRzLmRldiQ' // @todo: read variable from .env

  return (
    <QueryClientProvider client={queryClient}>
      {isFontsLoaded ? (
        <ClerkProvider
          tokenCache={tokenCache}
          publishableKey={clerkPublishableKey}
        >
          <StatusBar style="dark" backgroundColor="white" />

          <Routes />
        </ClerkProvider>
      ) : (
        <Text>Carregando</Text>
      )}
    </QueryClientProvider>
  )
}
