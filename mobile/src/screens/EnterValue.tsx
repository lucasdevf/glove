import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View
} from 'react-native'
import { Button } from '../components/Button'
import { GoBackButton } from '../components/GoBackButton'

export function EnterValue() {
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
            />
          </View>
        </View>

        <Button title="Continuar" className="rounded-none" />
      </View>
    </KeyboardAvoidingView>
  )
}
