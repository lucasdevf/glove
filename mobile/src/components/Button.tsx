import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends TouchableOpacityProps {
  title: string
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      {...rest}
      className={twMerge(
        'flex items-center justify-center bg-primary px-4 w-full rounded h-12',
        rest.className,
      )}
    >
      <Text className="font-heading text-white">{title}</Text>
    </TouchableOpacity>
  )
}
