import { Text, View } from 'react-native'
import { Button } from './Button'

interface EmptyListProps {
  title: string
  buttonTitle: string
  onClickButton: () => void
}

export function EmptyList({
  title,
  buttonTitle,
  onClickButton,
}: EmptyListProps) {
  return (
    <View className="flex flex-1 justify-center flex-col items-center">
      <Text className="text-center text-xl font-subtitle mb-5">{title}</Text>

      <Button title={buttonTitle} className="w-64" onPress={onClickButton} />
    </View>
  )
}
