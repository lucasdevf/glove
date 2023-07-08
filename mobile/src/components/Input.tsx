import { Controller, useFormContext } from 'react-hook-form'
import { Text, TextInput, TextInputProps, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

interface InputProps extends TextInputProps {
  label: string
  name: string
  classNameWrapper?: string
}

export function Input({ label, name, classNameWrapper, ...rest }: InputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]

  return (
    <View className={twMerge('flex flex-col w-full', classNameWrapper)}>
      <Text className="font-subtitle mb-2">{label}</Text>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            {...rest}
            className="h-12 bg-gray-200 rounded p-4"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name={name}
        defaultValue=""
      />

      {error && (
        <Text className="text-red-500 mt-2 font-subtitle">
          {error.message as string}
        </Text>
      )}
    </View>
  )
}
