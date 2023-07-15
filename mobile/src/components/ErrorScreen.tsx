import { WarningCircle } from 'phosphor-react-native'
import { Text, View } from 'react-native'
import { red } from 'tailwindcss/colors'

interface ErrorScreenProps {
  error: string
}

// @todo: choose a better name for the component
export function ErrorScreen({ error }: ErrorScreenProps) {
  return (
    <View className="flex justify-center items-center flex-col space-y-2 px-8 w-full">
      <WarningCircle size={32} weight="bold" color={red['500']} />

      <Text className="font-heading text-lg text-center">{error}</Text>
    </View>
  )
}
