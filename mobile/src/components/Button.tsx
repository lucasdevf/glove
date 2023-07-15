import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  isLoading?: boolean
}

export function Button({ title, isLoading, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      {...rest}
      disabled={rest.disabled ?? isLoading}
      className={twMerge(
        `flex items-center justify-center bg-primary px-4 w-full rounded h-12 ${
          isLoading && 'opacity-50'
        }`,
        rest.className,
      )}
    >
      {isLoading ? (
        <ActivityIndicator color="white" size={20} />
      ) : (
        <Text className="font-heading text-white">{title}</Text>
      )}
    </TouchableOpacity>
  )
}
