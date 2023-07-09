import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common'
import { AuthUser, CurrentUser } from 'src/auth/current-user'
import { AuthGuard } from '../auth/auth-guards'
import { CreditCardsService } from './credit-cards.service'
import { CreateCreditCardDto } from './dto/create-credit-card.dto'
import { UpdateCreditCardArchivedDto } from './dto/update-credit-card-archived.dto'

@Controller('credit-cards')
@UseGuards(AuthGuard)
export class CreditCardsController {
  constructor(private readonly creditCardsService: CreditCardsService) {}

  @Post()
  create(
    @Body() createCreditCardDto: CreateCreditCardDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.creditCardsService.create({
      ...createCreditCardDto,
      user_id: user.id,
    })
  }

  @Get()
  findByUserId(@CurrentUser() user: AuthUser) {
    return this.creditCardsService.findByUserId(user.id)
  }

  @Patch('/:id/archived')
  updateArchived(
    @Param('id') id: string,
    @Body() updateArchivedDto: UpdateCreditCardArchivedDto,
  ) {
    return this.creditCardsService.updateArchived(id, updateArchivedDto)
  }
}
