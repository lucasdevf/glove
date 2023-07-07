import { Text, TouchableOpacity } from 'react-native'

interface ButtonTextProps {
  text: string
}

export function ButtonText({ text }: ButtonTextProps) {
  return (
    <TouchableOpacity className="text-right">
      <Text className="text-primary font-subtitle">{text}</Text>
    </TouchableOpacity>
  )
}
