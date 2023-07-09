import { Module } from '@nestjs/common'
import { FeesController } from './fees.controller'

@Module({
  controllers: [FeesController],
  providers: [],
})
export class FeesModule {}
