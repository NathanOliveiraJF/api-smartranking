import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PartidasService } from './partidas.service';
import { Partida } from './interfaces/partida.interface';
import { CriarPartidaDto } from './dto/criar-partida.dto';

@Controller('api/v1/partidas')
export class PartidasController {
    constructor(private readonly partidasService: PartidasService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarPartida(@Body() criarPartidaDto: CriarPartidaDto): Promise<Partida> {
        return await this.partidasService.criarPartida(criarPartidaDto);
    }
}
