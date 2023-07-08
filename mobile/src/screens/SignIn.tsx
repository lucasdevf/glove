import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { WarningCircle } from 'phosphor-react-native'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { red } from 'tailwindcss/colors'
import { z } from 'zod'

import logo from '../assets/logo.png'

import { Button } from '../components/Button'
import { ButtonText } from '../components/ButtonText'
import { Input } from '../components/Input'
import { SignInGoogle } from '../components/SignInGoogle'
import { AuthNavigatorRoutesProps } from '../routes/auth.routes'
import { bottomBarheight } from '../utils/bottom-bar-height'

const formSchema = z.object({
  email: z.string().nonempty('Campo obrigatório').email('E-mail inválido'),
  password: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .nonempty('Campo obrigatório'),
})

type FormType = z.infer<typeof formSchema>

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const { signIn, setActive, isLoaded } = useSignIn()

  const [error, setError] = useState('')

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  })

  const { handleSubmit } = form

  async function handleSignIn(data: FormType) {
    const { email, password } = data

    if (!isLoaded) {
      return
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
        strategy: 'password',
      })

      await setActive({ session: completeSignIn.createdSessionId })
    } catch (error: any) {
      const isClerkError = isClerkAPIResponseError(error)

      if (isClerkError) {
        const firstError = error.errors[0]

        setError(firstError.message)
      } else {
        setError('Não foi possível realizar login')
      }
    }
  }

  function handleSignUp() {
    navigation.navigate('sign-up')
  }

  return (
    <View
      className="flex flex-1 items-center justify-center px-12 bg-white"
      style={{ paddingBottom: bottomBarheight }}
    >
      <View className="flex flex-1 items-center justify-center w-full">
        <Image source={logo} alt="" />

        <Text className="text-xl font-heading mb-10 mt-5">
          Acesse sua conta
        </Text>

        <FormProvider {...form}>
          <Input
            name="email"
            label="E-mail"
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            classNameWrapper="mb-5"
          />

          <Input
            name="password"
            label="Senha"
            placeholder="Digite sua senha"
            secureTextEntry
          />

          <View className="flex w-full items-end mt-5">
            <ButtonText text="Esqueci minha senha" />
          </View>

          {error && (
            <View className="flex flex-row items-center gap-1 mt-5">
              <WarningCircle size={16} color={red['500']} weight="bold" />

              <Text className="text-red-500 font-subtitle">{error}</Text>
            </View>
          )}

          <Button
            title="Entrar"
            className="mt-5"
            onPress={handleSubmit(handleSignIn)}
          />
        </FormProvider>

        <SignInGoogle />

        <View className="flex flex-row items-center gap-1 mt-8">
          <Text className="font-body">Ainda não tem uma conta?</Text>

          <TouchableOpacity onPress={handleSignUp}>
            <Text className="font-heading text-primary">Clique aqui.</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ButtonText text="Termos de uso" />
    </View>
  )
}
