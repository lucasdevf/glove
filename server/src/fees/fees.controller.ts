import { Controller, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth-guards'

@Controller()
@UseGuards(AuthGuard)
export class FeesController {
  async findAll() {
    return {
      per_installment: 0.2,
    }
  }
}
