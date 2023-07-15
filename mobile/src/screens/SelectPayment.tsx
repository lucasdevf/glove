import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Button } from '../components/Button'
import { ButtonText } from '../components/ButtonText'
import { GoBackButton } from '../components/GoBackButton'
import { PaymentOptionDto } from '../dto/PaymentOptionDto'
import { AppNavigatorRoutesProps } from '../routes/app.routes'
import { uesNewRequestStore } from '../stores/useNewRequestStore'
import { bottomBarheight } from '../utils/bottom-bar-height'
import { moneyFormatter } from '../utils/formatter'

export function SelectPayment() {
  const { paymentOptions, selectPaymentOption } = uesNewRequestStore()

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const [viewMore, setViewMore] = useState(false)

  const [paymentOptionId, setPaymentOptionId] = useState('')

  function handleViewMore() {
    setViewMore(true)
  }

  function handleSelect(paymentOption: PaymentOptionDto) {
    setPaymentOptionId(paymentOption.id)
  }

  function handleContinue() {
    navigation.navigate('select-credit-card')

    selectPaymentOption(paymentOptionId)
  }

  return (
    <View
      className="flex flex-col flex-1 pt-20 px-8"
      style={{ paddingBottom: bottomBarheight }}
    >
      <GoBackButton />

      <Text className="font-heading text-xl mt-7 mb-5">
        Selecione a opção de pagamento
      </Text>

      <ScrollView>
        {paymentOptions
          .filter((_, index) => (!viewMore ? index <= 5 : index >= 0))
          .map((paymentOption) => (
            <TouchableOpacity
              key={paymentOption.id}
              className="flex flex-row items-center space-x-3 mb-5"
              onPress={() => handleSelect(paymentOption)}
            >
              <View className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-300">
                {paymentOption.id === paymentOptionId && (
                  <View className="w-3 h-3 bg-primary rounded-full" />
                )}
              </View>

              <Text className="text-lg">
                {paymentOption.quantity}x de R${' '}
                {moneyFormatter.format(paymentOption.value)}
              </Text>
            </TouchableOpacity>
          ))}

        {!viewMore && (
          <ButtonText
            text="Ver mais opções"
            className="mt-3"
            onPress={handleViewMore}
          />
        )}
      </ScrollView>

      {paymentOptionId && <Button title="Continuar" onPress={handleContinue} />}
    </View>
  )
}
