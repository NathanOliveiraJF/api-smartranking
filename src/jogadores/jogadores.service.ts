import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name);
  constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) { }

  async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email } = criarJogadorDto;
    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
    if (jogadorEncontrado) {
      throw new BadRequestException(`Email ${email} ja cadastrado!`)
    }
    const jogadorCriado = new this.jogadorModel(criarJogadorDto);
    return await jogadorCriado.save();
  }

  async atualizarJogador(_id: string, criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findById(_id).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException('Jogador não encontrado!');
    }
    return await this.jogadorModel.findOneAndUpdate({ id: _id }, { $set: criarJogadorDto }).exec();
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }
  async consultarJogadoresPorId(_id: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findById(_id).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException("Jogador não encontrado!");
    }
    return jogadorEncontrado;
  }

  async deletarJogador(_id: string): Promise<void> {
    const jogadorEncontrado = await this.jogadorModel.findById(_id).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException("Jogador não encontrado!");
    }
    jogadorEncontrado.deleteOne();
  }
}
