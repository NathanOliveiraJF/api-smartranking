import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:9GjjuQJYoIe8ZL4w@cluster0.fbfce4z.mongodb.net/smartranking?retryWrites=true&w=majority'),
    JogadoresModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
