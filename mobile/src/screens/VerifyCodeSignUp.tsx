import { isClerkAPIResponseError, useSignUp } from '@clerk/clerk-expo'
import { useRoute } from '@react-navigation/native'
import { useRef, useState } from 'react'
import { Image, Text, TextInput, View } from 'react-native'
import logo from '../assets/logo.png'
import { Button } from '../components/Button'
import { Error } from '../components/Error'

export interface VerifyCodeSignUpProps {
  email: string
}

export function VerifyCodeSignUp() {
  const route = useRoute()

  const { email } = route.params as VerifyCodeSignUpProps

  const { isLoaded, signUp, setActive } = useSignUp()

  const [verificationCode, setVerificationCode] = useState<string[]>([
    '',
    '',
    '',
    '',
    '',
    '',
  ])

  const [error, setError] = useState('')

  const verificationCodeRefs = useRef<TextInput[]>([])

  function focusNextInput(index: number) {
    if (verificationCodeRefs.current[index + 1]) {
      verificationCodeRefs.current[index + 1].focus()
    }
  }

  function focusPrevInput(index: number) {
    if (verificationCodeRefs.current[index - 1]) {
      verificationCodeRefs.current[index - 1].focus()
    }
  }

  function handleChange(index: number, value: string) {
    const verificationCodeIndexHasValue = verificationCode[index]

    const lastInput = index === 5

    if (lastInput && verificationCode && value !== '') {
      return
    }

    setVerificationCode((prevCode) => {
      const updatedCode = [...prevCode]

      if (verificationCodeIndexHasValue !== '' && value && !lastInput) {
        updatedCode[index + 1] = value.substring(1, 2)
      } else {
        updatedCode[index] = value
      }

      return updatedCode
    })

    if (verificationCodeIndexHasValue !== '' && value && !lastInput) {
      focusNextInput(index)
    }

    if (!value) {
      focusPrevInput(index)
    }
  }

  async function handleVerify() {
    if (!isLoaded) {
      return
    }

    try {
      const code = verificationCode.join('')

      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      await setActive({ session: completeSignUp.createdSessionId })
    } catch (err: any) {
      const isClerkError = isClerkAPIResponseError(err)

      if (isClerkError) {
        const firstError = err.errors[0]

        setError(firstError.message)
      } else {
        setError('Não foi possível verificar sua conta')
      }
    }
  }

  return (
    <View className="flex flex-1 items-center pt-20 space-y-8 px-8 bg-white">
      <Image source={logo} alt="" />

      <View className="flex flex-col space-y-3">
        <Text className="font-heading text-xl">
          Digite o código que você recebeu no seu e-mail
        </Text>

        <Text className="font-subtitle text-gray-500 text-left text-lg">
          {email}
        </Text>
      </View>

      {error && <Error error={error} />}

      <View className="flex flex-row justify-between w-full">
        {verificationCode.map((verificationCode, index) => (
          <View
            key={index}
            className="flex items-center justify-center h-14 w-14 border border-gray-300 rounded-md relative overflow-hidden"
          >
            <TextInput
              keyboardType="number-pad"
              value={verificationCode}
              ref={(ref) => (verificationCodeRefs.current[index] = ref!)}
              onChangeText={(value) => handleChange(index, value)}
              autoFocus={index === 0}
            />

            {/* @note: View to block user from clicking on input */}
            <View className="flex items-center justify-center absolute top-0 right-0 bg-white w-full h-full">
              <Text>{verificationCode !== '' ? verificationCode : ''}</Text>
            </View>
          </View>
        ))}
      </View>

      {!verificationCode.some((item) => item === '') && (
        <Button title="Verificar" onPress={handleVerify} />
      )}
    </View>
  )
}
