import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { randomUUID } from 'crypto';
@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);
  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criarJogadorDto;
    const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email);
    if (jogadorEncontrado) {
      this.atualizar(jogadorEncontrado, criarJogadorDto);
    }
    this.logger.log(`criaJogadorDto: ${JSON.stringify(criarJogadorDto)}`);
    this.criar(criarJogadorDto);
  }
  async consultarTodosJogadores(): Promise<Jogador[]> {
    return this.jogadores;
  }
  async consultarJogadoresPorEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email);
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador não encontrado com o email ${email}`);
    }
    return jogadorEncontrado;
  }
  async deletarJogador(email: string): Promise<void> {
    const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email);
    this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email);
  }
  private criar(criarJogadorDto: CriarJogadorDto): void {
    const { nome, telefoneCelular, email} = criarJogadorDto;
    const jogador: Jogador = {
      _id: randomUUID(),
      nome,
      telefoneCelular, 
      email,
      ranking: "A",
      posicaoRanking: 1,
      urlFotoJogador: "foto.png"
    }
    this.jogadores.push(jogador);
  }
  private atualizar(jogadorEncontrado: Jogador, criaJogadorDto: CriarJogadorDto): void {
    const { nome } = criaJogadorDto;
    jogadorEncontrado.nome = nome;
  }
}
