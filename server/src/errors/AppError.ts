import { HttpException, HttpStatus } from '@nestjs/common'

export class AppError extends HttpException {
  constructor(code: string, message: string, statusCode: HttpStatus) {
    super(message, statusCode, {
      description: code,
    })
  }
}
