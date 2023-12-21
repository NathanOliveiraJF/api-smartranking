import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Partida } from './interfaces/partida.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PartidasService {
    constructor(@InjectModel("Partida") private readonly partidamodel: Model<Partida>) { }
}
