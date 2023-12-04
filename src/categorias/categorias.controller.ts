import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarCategoriaDto } from './dto/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDto } from './dto/atualizar-categoria.dto';

@Controller('api/v1/categorias')
export class CategoriasController {
    constructor(private readonly categoriaService: CategoriasService){}

    @Post()
    @UsePipes(ValidationPipe)
    async criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
        return await this.categoriaService.criarCategoria(criarCategoriaDto);
    }

    @Get()
    async consultarCategorias(): Promise<Array<Categoria>> {
        return await this.categoriaService.consultarTodasCategorias();
    }

    @Get('/:_id')
    async consultarCategoriasPorId(@Param('_id') _id: string): Promise<Categoria> {
        return await this.categoriaService.consultarCategoriasPorId(_id);
    }
    
    @Put('/:idCategoria')
    async atualizarCategoria(@Body() atualizarCategoriaDto: AtualizarCategoriaDto, @Param('categoriaId') categoriaId: string): Promise<void> {
      await this.categoriaService.atualizarCategoria(categoriaId, atualizarCategoriaDto);
    }
}
