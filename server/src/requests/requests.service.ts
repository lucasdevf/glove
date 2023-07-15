import { Injectable } from '@nestjs/common'
import { calculateInstallments } from 'src/utils/calculate-installments'
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

    const paymentOptions = calculateInstallments({
      value,
      taxPercent,
      maxInstallments: 12,
      data: {
        request_id: request.id,
      },
    })

    await this.prisma.paymentOption.createMany({
      data: paymentOptions,
    })

    const paymentOptionsCreated = await this.prisma.paymentOption.findMany({
      where: {
        request_id: request.id,
      },
    })

    return { request, payment_options: paymentOptionsCreated }
  }
}
