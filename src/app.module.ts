import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './typeorm/entities/users';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'aoao3737',
      database: 'nestjs_mysql_tutorial',
      entities: [User],
      synchronize: true, // Indicates if database schema should be auto created on every application launch.
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
