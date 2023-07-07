import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import { ButtonText } from '../components/ButtonText'
import { EmptyList } from '../components/EmptyList'
import { User } from '../components/User'
import { AppNavigatorRoutesProps } from '../routes/app.routes'
import { bottomBarheight } from '../utils/bottom-bar-height'

export function Home() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleNewTransaction() {
    navigation.navigate('enter-value')
  }

  return (
    <View
      className="flex-1 pt-20 px-8 bg-white"
      style={{ paddingBottom: bottomBarheight }}
    >
      <View className="flex-1">
        <User />

        <View className="flex-1 justify-center">
          <EmptyList
            title="Você ainda não tem nenhuma movimentação"
            buttonTitle="Nova movimentação"
            onClickButton={handleNewTransaction}
          />
        </View>
      </View>

      <ButtonText text="Como funciona?" className="mx-auto" />
    </View>
  )
}
