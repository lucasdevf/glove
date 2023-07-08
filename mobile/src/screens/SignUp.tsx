import { isClerkAPIResponseError, useSignUp } from '@clerk/clerk-expo'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { z } from 'zod'
import logo from '../assets/logo.png'
import { Button } from '../components/Button'
import { Error } from '../components/Error'
import { Input } from '../components/Input'
import { AuthNavigatorRoutesProps } from '../routes/auth.routes'

const formSchema = z.object({
  name: z.string().nonempty('Campo obrigatório.'),
  email: z.string().nonempty('Campo obrigatório').email('E-mail inválido'),
  password: z
    .string()
    .nonempty('Campo obrigatório')
    .min(8, 'Deve ter no mínimo 8 caracteres'),
})

type FormType = z.infer<typeof formSchema>

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const { isLoaded, signUp } = useSignUp()

  const [error, setError] = useState('')

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  })

  const { handleSubmit } = form

  function separateFullName(name: string) {
    const splitName = name.split(' ')

    const firstName = splitName[0]

    splitName.shift() // @note: remove first name from splitName array

    const lastName = splitName.join(' ')

    return {
      firstName,
      lastName,
    }
  }

  async function handleSignUp(data: FormType) {
    if (!isLoaded) {
      return
    }

    try {
      const { name, email, password } = data

      const { firstName, lastName } = separateFullName(name)

      await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      navigation.navigate('verify-code-sign-up', {
        email,
      })
    } catch (err: any) {
      const isClerkError = isClerkAPIResponseError(err)

      if (isClerkError) {
        const firstError = err.errors[0]

        setError(firstError.message)
      } else {
        setError('Não foi possível criar sua conta')
      }
    }
  }

  function handleSignIn() {
    navigation.navigate('sign-in')
  }

  return (
    <View className="flex flex-1 items-center justify-center px-12 bg-white">
      <Image source={logo} alt="" />

      <Text className="text-xl font-heading mb-10 mt-5">Crie sua conta</Text>

      <FormProvider {...form}>
        <Input
          name="name"
          label="Nome"
          placeholder="Digite seu nome"
          classNameWrapper="mb-5"
        />

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

        {error && <Error error={error} />}

        <Button
          title="Criar conta"
          className="mt-5"
          onPress={handleSubmit(handleSignUp)}
        />
      </FormProvider>

      <View className="flex flex-row items-center gap-1 mt-8">
        <Text className="font-body">Já possui uma conta?</Text>

        <TouchableOpacity onPress={handleSignIn}>
          <Text className="font-heading text-primary">Clique aqui.</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
