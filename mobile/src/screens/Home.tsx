import { Image, Text, View } from 'react-native'

import logo from '../assets/logo.png'

import happyWoman from '../assets/happy-woman.png'
import { Button } from '../components/Button'

export function Home() {
  return (
    <View className="flex flex-1 items-center justify-center space-y-10 px-12">
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

      <Button title="Iniciar" />
    </View>
  )
}
