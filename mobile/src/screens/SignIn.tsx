import { Image, Text, TouchableOpacity, View } from 'react-native'

import logo from '../assets/logo.png'

import { Button } from '../components/Button'
import { Input } from '../components/Input'

export function SignIn() {
  return (
    <View className="flex flex-1 items-center justify-center px-12">
      <Image source={logo} alt="" />

      <Text className="text-xl font-heading mb-10 mt-5">Acesse sua conta</Text>

      <Input label="E-mail" placeholder="Digite seu e-mail" className="mb-5" />

      <Input label="Senha" placeholder="Digite sua senha" secureTextEntry />

      <View className="flex w-full items-end mt-5">
        <TouchableOpacity className="text-right">
          <Text className="text-primary font-body">Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>

      <Button title="Entrar" className="mt-10" />
    </View>
  )
}
