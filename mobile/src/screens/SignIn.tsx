import { Image, Text, View } from 'react-native'

import logo from '../assets/logo.png'

import { Button } from '../components/Button'
import { ButtonText } from '../components/ButtonText'
import { Input } from '../components/Input'
import { SignInGoogle } from '../components/SignInGoogle'
import { bottomBarheight } from '../utils/bottom-bar-height'

export function SignIn() {
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

        <Input
          label="E-mail"
          placeholder="Digite seu e-mail"
          className="mb-5"
          keyboardType="email-address"
        />

        <Input label="Senha" placeholder="Digite sua senha" secureTextEntry />

        <View className="flex w-full items-end mt-5">
          <ButtonText text="Esqueci minha senha" />
        </View>

        <Button title="Entrar" className="mt-10" />

        <SignInGoogle />
      </View>

      <ButtonText text="Termos de uso" />
    </View>
  )
}
