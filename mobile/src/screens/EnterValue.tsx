import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View
} from 'react-native'
import { useMutation } from 'react-query'
import { Button } from '../components/Button'
import { Error } from '../components/Error'
import { GoBackButton } from '../components/GoBackButton'
import { PaymentOptionDto } from '../dto/PaymentOptionDto'
import { RequestDto } from '../dto/RequestDto'
import { AppError } from '../error/AppError'
import { api } from '../http/api'
import { AppNavigatorRoutesProps } from '../routes/app.routes'
import { uesNewRequestStore } from '../stores/useNewRequestStore'

interface MutationCreateRequest {
  request: RequestDto
  payment_options: PaymentOptionDto[]
}

export function EnterValue() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const {
    setValue: setStoreValue,
    setPaymentOptions,
    setRequestId,
  } = uesNewRequestStore()

  const [value, setValue] = useState('0')

  async function createRequest() {
    const response = await api.post('/requests', {
      value: Number(value),
    })

    return response.data
  }

  const { mutate, isLoading, error } = useMutation<
    MutationCreateRequest,
    AppError
  >('create-request', createRequest, {
    onSuccess: ({ request, payment_options: paymentOptions }) => {
      setRequestId(request.id)

      setPaymentOptions(paymentOptions)

      setStoreValue(value)

      navigation.navigate('select-payment')
    },
  })

  function handleContinue() {
    mutate()
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
      className="flex flex-col"
    >
      <View className="flex flex-1 justify-between pt-20">
        <View className="px-8">
          <GoBackButton />

          <Text className="mt-5 font-heading text-xl">
            Qual valor você deseja receber?
          </Text>

          <View className="border-b border-gray-300 mt-5 p-4 ">
            <Text className="font-body mb-2">R$</Text>

            <TextInput
              className="text-3xl font-body"
              keyboardType="number-pad"
              autoFocus
              defaultValue="0"
              value={value} // @todo: implements mask
              onChangeText={setValue}
            />
          </View>

          {error && <Error error={error.message} />}
        </View>

        {value !== '' && value !== '0' && (
          <Button
            title="Continuar"
            className="rounded-none"
            onPress={handleContinue}
            isLoading={isLoading}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  )
}
