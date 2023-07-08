import { WarningCircle } from 'phosphor-react-native'
import { Text, View } from 'react-native'
import { red } from 'tailwindcss/colors'

interface ErrorProps {
  error: string
}

export function Error({ error }: ErrorProps) {
  return (
    <View className="flex flex-row items-center gap-1 mt-5">
      <WarningCircle size={16} color={red['500']} weight="bold" />

      <Text className="text-red-500 font-subtitle">{error}</Text>
    </View>
  )
}
