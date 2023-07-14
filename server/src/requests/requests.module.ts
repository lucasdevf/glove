import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { RequestsController } from './requests.controller'
import { RequestsService } from './requests.service'

@Module({
  imports: [],
  controllers: [RequestsController],
  providers: [RequestsService, PrismaService],
})
export class RequestsModule {}
