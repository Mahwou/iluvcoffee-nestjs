import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from './coffees/infrastructure/coffee.modules';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CoffeeModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'iluvcoffee',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    autoLoadEntities: true,
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
