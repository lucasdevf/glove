import { create } from 'zustand'
import { PaymentOptionDto } from '../dto/PaymentOptionDto'

interface NewRequestStore {
  requestId: string
  setRequestId: (newRequestId: string) => void

  paymentOptions: PaymentOptionDto[]
  setPaymentOptions: (newPaymentOptions: PaymentOptionDto[]) => void
  selectPaymentOption: (paymentOptionId: string) => void

  value: string
  setValue: (newValue: string) => void

  reset: () => void
}

export const uesNewRequestStore = create<NewRequestStore>((set, get) => ({
  requestId: '',
  setRequestId: (newRequestId) => set({ requestId: newRequestId }),

  paymentOptions: [],
  setPaymentOptions: (newPaymentOptions) =>
    set({ paymentOptions: newPaymentOptions }),

  selectPaymentOption: (paymentOptionId) =>
    set({
      paymentOptions: get().paymentOptions.map((paymentOption) => {
        const paymentOptionMatch = paymentOption.id === paymentOptionId

        paymentOption.selected = paymentOptionMatch

        return paymentOption
      }),
    }),

  value: '',
  setValue: (newValue) => set({ value: newValue }),

  reset: () => {
    set({
      value: '',
    })
  },
}))
