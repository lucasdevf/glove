export interface CalculateInstallmentsProps {
  taxPercent: number
  value: number
  maxInstallments: number
  data?: object
}

export function calculateInstallments({
  taxPercent,
  value,
  maxInstallments,
  data,
}: CalculateInstallmentsProps) {
  const paymentOptions = []

  let installment = 1

  while (installment <= maxInstallments) {
    const taxValue = taxPercent * value * installment

    const totalValueWithTax = value + taxValue

    const installmentValue = totalValueWithTax / installment

    paymentOptions.push({
      quantity: installment,
      value: installmentValue,
      ...data,
    })

    installment += 1
  }

  return paymentOptions
}
