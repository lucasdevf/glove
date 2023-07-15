import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view'
import { useMutation } from 'react-query'
import { z } from 'zod'
import { Button } from '../components/Button'
import { Error } from '../components/Error'
import { GoBackButton } from '../components/GoBackButton'
import { Input } from '../components/Input'
import { CreditCardDto } from '../dto/CreditCardDto'
import { AppError } from '../error/AppError'
import { api } from '../http/api'
import { AppNavigatorRoutesProps } from '../routes/app.routes'
import { bottomBarheight } from '../utils/bottom-bar-height'

const formSchema = z.object({
  number: z
    .string()
    .nonempty('Campo obrigatório')
    .regex(/^\w{4}\s\w{4}\s\w{4}\s\w{4}$/, 'Número inválido'),
  holderName: z.string().nonempty('Campo obrigatório'),
  validity: z
    .string()
    .nonempty('Campo obrigatório')
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Validade incorreta')
    .refine(
      (value) => {
        const month = parseInt(value.slice(0, 2))
        return month > 0 && month < 13
      },
      {
        message: 'Validade incorreta',
      },
    ),
  cvv: z.string().nonempty('Campo obrigatório').min(3, 'CVV inválido'),
})

type FormType = z.infer<typeof formSchema>

export function CreateCreditCard() {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  })

  const { handleSubmit, watch, setValue } = form

  const number = watch('number')

  const validity = watch('validity')

  function handleChangeNumber() {
    const cleanText = number.replace(/\s/g, '')

    const groups = cleanText.match(/.{1,4}/g)

    const formattedText = groups ? groups.join(' ') : ''

    setValue('number', formattedText)
  }

  function handleChangeValidity() {
    const cleanText = validity.replace(/\D/g, '')

    const groups = cleanText.match(/.{1,2}/g)

    const formattedText = groups ? groups.join('/') : ''

    setValue('validity', formattedText)
  }

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  async function createCreditCard(data: FormType) {
    const { number, holderName, validity, cvv } = data

    const validitySplit = validity.split('/')

    const javascriptMonth = Number(validitySplit[0]) + 1

    const year = validitySplit[1]

    const fullYear = Number(`20${year}`)

    const response = await api.post('/credit-cards', {
      number,
      holder_name: holderName,
      validity: new Date(fullYear, javascriptMonth, 1),
      cvv: Number(cvv),
    })

    return response.data
  }

  const { mutate, isLoading, error } = useMutation<
    CreditCardDto,
    AppError,
    FormType
  >('create-credit-card', createCreditCard, {
    onSuccess: () => {
      navigation.navigate('select-credit-card')
    },
  })

  function handleCreate(data: FormType) {
    mutate(data)
  }

  useEffect(() => {
    if (number) handleChangeNumber()
  }, [number])

  useEffect(() => {
    if (validity) handleChangeValidity()
  }, [validity])

  return (
    <View
      className="flex flex-col flex-1 pt-20 px-8"
      style={{ paddingBottom: bottomBarheight }}
    >
      <GoBackButton />

      <Text className="font-heading text-xl mt-7 mb-3">Cadastrar cartão</Text>

      <Text className="font-body text-lg text-gray-600">
        Preencha os dados do seu cartão
      </Text>

      <FormProvider {...form}>
        <KeyboardAvoidingScrollView className="mt-10">
          <Input
            name="number"
            label="Número do cartão"
            classNameWrapper="mb-5"
            placeholder="4242 4242 4242 4242"
            keyboardType="number-pad"
            maxLength={19}
          />

          <Input
            name="holderName"
            label="Nome no cartão"
            classNameWrapper="mb-5"
            placeholder="Digite seu nome"
          />

          <Input
            name="validity"
            label="Validade"
            classNameWrapper="mb-5"
            placeholder="08/26"
            keyboardType="number-pad"
          />

          <Input
            name="cvv"
            label="CVV"
            classNameWrapper="mb-1"
            placeholder="123"
            keyboardType="number-pad"
            maxLength={3}
          />

          {error && <Error error={error.message} />}

          <Button
            title="Cadastrar cartão"
            onPress={handleSubmit(handleCreate)}
            isLoading={isLoading}
            className="mt-5"
          />
        </KeyboardAvoidingScrollView>
      </FormProvider>
    </View>
  )
}
