import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:9GjjuQJYoIe8ZL4w@cluster0.fbfce4z.mongodb.net/smartranking?retryWrites=true&w=majority'),
    JogadoresModule,
    CategoriasModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
