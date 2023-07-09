import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreditCardsController } from './credit-cards.controller'
import { CreditCardsService } from './credit-cards.service'

@Module({
  controllers: [CreditCardsController],
  providers: [CreditCardsService, PrismaService],
})
export class CreditCardsModule {}
