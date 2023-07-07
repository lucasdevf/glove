import { View } from 'react-native'
import { ButtonText } from '../components/ButtonText'
import { EmptyList } from '../components/EmptyList'
import { User } from '../components/User'
import { bottomBarheight } from '../utils/bottom-bar-height'

export function Home() {
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
          />
        </View>
      </View>

      <ButtonText text="Como funciona?" className="mx-auto" />
    </View>
  )
}
