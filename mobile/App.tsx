import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  useFonts
} from '@expo-google-fonts/montserrat'
import { StatusBar } from 'expo-status-bar'
import { Text } from 'react-native'

import { Home } from './src/screens/Home'

export default function App() {
  const [isFontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
  })

  return isFontsLoaded ? (
    <>
      <StatusBar style="dark" backgroundColor="white" />

      <Home />
    </>
  ) : (
    <Text>Carregando</Text>
  )
}
