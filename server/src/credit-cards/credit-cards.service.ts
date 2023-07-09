import { HttpStatus, Injectable } from '@nestjs/common'
import { AppError } from 'src/errors/AppError'
import { PrismaService } from 'src/prisma.service'
import { CreateCreditCardDto } from './dto/create-credit-card.dto'
import { UpdateCreditCardArchivedDto } from './dto/update-credit-card-archived.dto'

@Injectable()
export class CreditCardsService {
  constructor(private prismaService: PrismaService) {}

  async create({
    number,
    holder_name,
    cvv,
    validity,
    user_id,
  }: CreateCreditCardDto) {
    /* @business-rule: a user cannot have the same card registered more than once  */
    const cardNumberAlreadyExists =
      await this.prismaService.creditCard.findFirst({
        where: {
          number,
          user_id,
        },
      })

    if (cardNumberAlreadyExists)
      throw new AppError(
        'credit-card-already-exists',
        'Credit card already exists',
        HttpStatus.CONFLICT,
      )

    /* create credit card */
    await this.prismaService.creditCard.create({
      data: {
        number,
        holder_name,
        cvv,
        validity,
        user_id,
      },
    })
  }

  findByUserId(userId: string) {
    return this.prismaService.creditCard.findMany({
      where: {
        user_id: userId,
      },
    })
  }

  async updateArchived(id: string, { archived }: UpdateCreditCardArchivedDto) {
    /* verify if credit card exists */
    const creditCard = await this.prismaService.creditCard.findUnique({
      where: {
        id,
      },
    })

    if (!creditCard)
      throw new AppError(
        'credit-card-not-found',
        'Credit card not found',
        HttpStatus.NOT_FOUND,
      )

    /* update archived property */
    await this.prismaService.creditCard.update({
      data: {
        archived,
      },
      where: {
        id,
      },
    })
  }
}
