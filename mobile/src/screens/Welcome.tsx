import { Image, Text, View } from 'react-native'

import logo from '../assets/logo.png'

import { useNavigation } from '@react-navigation/native'
import happyWoman from '../assets/happy-woman.png'
import { Button } from '../components/Button'
import { AuthNavigatorRoutesProps } from '../routes/auth.routes'

export function Welcome() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleStart() {
    navigation.navigate('sign-in')
  }

  return (
    <View className="flex flex-1 items-center justify-center space-y-10 px-12 bg-white">
      <Image source={logo} alt="" />

      <View>
        <View className="flex flex-row items-center gap-1">
          <Text className="text-center text-xl font-heading">
            Transforme seu crédito em
          </Text>
          <Text className="text-center text-xl font-heading text-primary">
            pix
          </Text>
        </View>

        <Text className="text-center text-xl font-heading">
          em poucos minutos
        </Text>
      </View>

      <Image source={happyWoman} alt="" className="w-96" />

      <Button title="Iniciar" onPress={handleStart} />
    </View>
  )
}
