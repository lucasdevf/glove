import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const PORT = 3333

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  await app
    .listen(PORT)
    .then(() => console.log(`Server is running on PORT ${PORT}`))
    .catch((error) => console.log(`Error to start server: ${error}`))
}
bootstrap()
