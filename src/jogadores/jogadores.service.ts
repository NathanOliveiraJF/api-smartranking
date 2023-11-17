import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name);
  constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) {}
  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criarJogadorDto;
    const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();
    if (jogadorEncontrado) {
      this.atualizar(criarJogadorDto);
    }
    this.logger.log(`criaJogadorDto: ${JSON.stringify(criarJogadorDto)}`);
    this.criar(criarJogadorDto);
  }
  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }
  async consultarJogadoresPorEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({email: email}).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador não encontrado com o email ${email}`);
    }
    return jogadorEncontrado;
  }
  async deletarJogador(email: string): Promise<void> {
    const jogadorEncontrado = await this.jogadorModel.findOne({email: email}).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador não encontrado com o email ${email}`);
    }
    jogadorEncontrado.deleteOne();
  }
  private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const jogadorCriado = new this.jogadorModel(criarJogadorDto);
    return await jogadorCriado.save();
  }
  private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    return await this.jogadorModel.findOneAndUpdate({email: criarJogadorDto.email}, {$set: criarJogadorDto}).exec();
  }
}
