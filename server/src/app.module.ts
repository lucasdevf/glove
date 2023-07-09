import { Module } from '@nestjs/common'
import { CreditCardsModule } from './credit-cards/credit-cards.module'
import { FeesModule } from './fees/fees.module'

@Module({
  imports: [CreditCardsModule, FeesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
