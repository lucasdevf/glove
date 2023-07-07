import { Text, TextInput, TextInputProps, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

interface InputProps extends TextInputProps {
  label: string
}

export function Input({ label, ...rest }: InputProps) {
  return (
    <View className={twMerge('flex flex-col space-y-2 w-full', rest.className)}>
      <Text className="font-subtitle">{label}</Text>

      <TextInput {...rest} className="h-12 bg-gray-200 rounded p-4" />
    </View>
  )
}
