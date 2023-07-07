import { useNavigation } from '@react-navigation/native'
import { CaretLeft } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'
import { gray } from 'tailwindcss/colors'

export function GoBackButton() {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <TouchableOpacity onPress={handleGoBack}>
      <CaretLeft size={28} weight="bold" color={gray['400']} />
    </TouchableOpacity>
  )
}
