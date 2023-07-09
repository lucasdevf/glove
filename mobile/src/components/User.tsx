import { useAuth, useSession, useUser } from '@clerk/clerk-expo'
import { SignOut } from 'phosphor-react-native'

import { Image, Text, TouchableOpacity, View } from 'react-native'
import { gray } from 'tailwindcss/colors'
import { ButtonText } from './ButtonText'

export function User() {
  const { user } = useUser()

  const { session } = useSession()

  const { signOut } = useAuth()

  async function getToken() {
    const token = await session?.getToken()

    console.log(token)
  }

  getToken()

  async function handleSignOut() {
    await signOut()
  }

  return (
    <View className="flex flex-row items-center justify-between">
      {user && (
        <TouchableOpacity className="flex flex-row items-center space-x-5">
          <Image
            source={{ uri: user?.profileImageUrl }}
            alt=""
            className="w-14 h-14 rounded-full"
          />

          <View className="flex flex-col">
            <Text className="font-heading mb-1 text-lg">{user?.fullName}</Text>

            <ButtonText text="Ver perfil" />
          </View>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={handleSignOut}>
        <SignOut color={gray['400']} size={28} />
      </TouchableOpacity>
    </View>
  )
}
