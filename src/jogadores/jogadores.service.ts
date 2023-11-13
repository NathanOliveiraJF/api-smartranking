import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { randomUUID } from 'crypto';
@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);
  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    this.logger.log(`criaJogadorDto: ${JSON.stringify(criarJogadorDto)}`);
    this.criar(criarJogadorDto);
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
}
