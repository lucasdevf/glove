import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreateRequestDto } from './dto/create-request.dto'

@Injectable()
export class RequestsService {
  constructor(private prisma: PrismaService) {}

  async create({ value, user_id }: CreateRequestDto) {
    const taxPercent = 2.5 / 100 // 2.5% @todo: add feature to add tax percent on admin interface

    const request = await this.prisma.request.create({
      data: {
        value,
        user_id,
        tax_percent: taxPercent,
      },
    })

    const paymentOptions = []

    let installment = 1

    while (installment < 13) {
      const taxValue = taxPercent * value * installment

      const totalValueWithTax = value + taxValue

      const installmentValue = totalValueWithTax / installment

      paymentOptions.push({
        quantity: installment,
        value: installmentValue,
        request_id: request.id,
      })

      installment += 1
    }

    await this.prisma.paymentOption.createMany({
      data: paymentOptions,
    })

    return request
  }
}
