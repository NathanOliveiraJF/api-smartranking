import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Partida } from './interfaces/partida.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CriarPartidaDto } from './dto/criar-partida.dto';

@Injectable()
export class PartidasService {
    constructor(@InjectModel("Partida") private readonly partidamodel: Model<Partida>) { }

    async criarPartida(criarPartidaDto: CriarPartidaDto): Promise<Partida> {
        const novaPartida = new this.partidamodel(criarPartidaDto);
        return await novaPartida.save();
    }
}
