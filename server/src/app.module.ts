import { Module } from '@nestjs/common'
import { CreditCardsModule } from './credit-cards/credit-cards.module'
import { RequestsModule } from './requests/requests.module'

@Module({
  imports: [CreditCardsModule, RequestsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
