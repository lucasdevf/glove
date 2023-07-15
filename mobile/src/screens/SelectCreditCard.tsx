import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import { EmptyList } from '../components/EmptyList'
import { GoBackButton } from '../components/GoBackButton'
import { PaymentOptionDto } from '../dto/PaymentOptionDto'
import { AppNavigatorRoutesProps } from '../routes/app.routes'
import { uesNewRequestStore } from '../stores/useNewRequestStore'
import { bottomBarheight } from '../utils/bottom-bar-height'
import { moneyFormatter } from '../utils/formatter'

export function SelectCreditCard() {
  const paymentOptionSelected = uesNewRequestStore((state) =>
    state.paymentOptions.find((paymentOption) => paymentOption.selected),
  ) as PaymentOptionDto

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleCreateCreditCard() {
    navigation.navigate('create-credit-card')
  }

  return (
    <View
      className="flex flex-col flex-1 pt-20 px-8"
      style={{ paddingBottom: bottomBarheight }}
    >
      <GoBackButton />

      <Text className="font-heading text-xl mt-7 mb-3">
        Selecione a opção de pagamento
      </Text>

      <Text className="font-body text-lg text-gray-600">
        Você precisará de{' '}
        {moneyFormatter.format(
          paymentOptionSelected?.quantity * paymentOptionSelected?.value,
        )}{' '}
        disponíveis no cartão de crédito
      </Text>

      <EmptyList
        title="Você ainda não tem nenhum cartão de crédito cadastrado"
        buttonTitle="Cadastrar cartão"
        onClickButton={handleCreateCreditCard}
      />
    </View>
  )
}
