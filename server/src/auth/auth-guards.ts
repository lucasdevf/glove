import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { verify } from 'jsonwebtoken'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()

    const response = context.switchToHttp().getResponse()

    const publicKey = process.env.CLERK_PEM_PUBLIC_KEY

    const token = request.headers.authorization

    if (token === undefined) {
      response.status(401).json({
        message: 'Not signed in',
      })

      return false
    }

    try {
      const decoded = verify(token, publicKey)

      request.user = {
        id: decoded.sub,
      }

      return true
    } catch (error) {
      response.status(400).json({
        error: 'Invalid Token',
      })
    }
  }
}
