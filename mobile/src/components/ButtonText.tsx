import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface ButtonTextProps extends TouchableOpacityProps {
  text: string
}

export function ButtonText({ text, ...rest }: ButtonTextProps) {
  return (
    <TouchableOpacity className={rest.className} {...rest}>
      <Text className="text-primary font-subtitle">{text}</Text>
    </TouchableOpacity>
  )
}
