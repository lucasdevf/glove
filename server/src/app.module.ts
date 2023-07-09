import { Module } from '@nestjs/common'
import { CreditCardsModule } from './credit-cards/credit-cards.module'

@Module({
  imports: [CreditCardsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
