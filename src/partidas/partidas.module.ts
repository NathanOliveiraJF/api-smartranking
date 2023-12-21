import { Module } from '@nestjs/common';
import { PartidasController } from './partidas.controller';
import { PartidasService } from './partidas.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { PartidaSchema } from './interfaces/partida.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Partida', schema: PartidaSchema }]), PartidasModule],
  controllers: [PartidasController],
  providers: [PartidasService]
})
export class PartidasModule { }
