import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthUser, CurrentUser } from 'src/auth/current-user'
import { AuthGuard } from '../auth/auth-guards'
import { CreateRequestDto } from './dto/create-request.dto'
import { RequestsService } from './requests.service'

@Controller('requests')
@UseGuards(AuthGuard)
export class RequestsController {
  constructor(private requestsService: RequestsService) {}

  @Post()
  async create(
    @Body() createRequestBody: CreateRequestDto,
    @CurrentUser() user: AuthUser,
  ) {
    const { value } = createRequestBody

    const request = await this.requestsService.create({
      value,
      user_id: user.id,
    })

    return request
  }
}
