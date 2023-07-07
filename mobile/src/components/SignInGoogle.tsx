import { useOAuth } from '@clerk/clerk-expo'
import * as WebBrowser from 'expo-web-browser'
import { useCallback } from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'
import { useWarmUpBrowser } from '../hooks/useWarmUpBrowser'

WebBrowser.maybeCompleteAuthSession()

export function SignInGoogle() {
  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const handleSignIn = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow()

      if (createdSessionId) {
        setActive!({ session: createdSessionId })
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])

  return (
    <TouchableOpacity
      onPress={handleSignIn}
      className="flex flex-row items-center space-x-2 justify-center w-full mt-5 h-12 border border-gray-300 rounded-md"
    >
      <Image
        source={{
          uri: 'https://img.freepik.com/icones-gratis/procurar_318-265146.jpg',
        }}
        alt=""
        className="w-4 h-4"
      />

      <Text className="font-heading">Entrar com Google</Text>
    </TouchableOpacity>
  )
}
