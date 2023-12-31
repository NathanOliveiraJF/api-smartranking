import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria } from './interfaces/categoria.interface';
import { CriarCategoriaDto } from './dto/criar-categoria.dto';
import { AtualizarCategoriaDto } from './dto/atualizar-categoria.dto';
import { JogadoresService } from 'src/jogadores/jogadores.service';

@Injectable()
export class CategoriasService {
  constructor(@InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>, private readonly jogadoresService: JogadoresService) { }

  async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
    const { categoria } = criarCategoriaDto;

    const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();
    if (categoriaEncontrada) {
      throw new BadRequestException(`Categoria ${categoria} já cadastrada!`);
    }
    const categoriaCriada = new this.categoriaModel(criarCategoriaDto);
    return await categoriaCriada.save();
  }

  async consultarTodasCategorias(): Promise<Array<Categoria>> {
    return await this.categoriaModel.find().populate("jogadores").exec();
  }

  async consultarCategoriasPorId(_id: string): Promise<Categoria> {
    const categoriaEncontada = await this.categoriaModel.findById(_id).exec();
    if (!categoriaEncontada) {
      throw new NotFoundException("Categoria não existe!");
    }
    return categoriaEncontada;
  }
   async consultarCategoriaDoJogador(idJogador: any): Promise<Categoria> {

    /*
    Desafio
    Escopo da exceção realocado para o próprio Categorias Service
    Verificar se o jogador informado já se encontra cadastrado
    */

   //await this.jogadoresService.consultarJogadorPeloId(idJogador)                                   

   const jogadores = await this.jogadoresService.consultarTodosJogadores()

   const jogadorFilter = jogadores.filter( jogador => jogador._id == idJogador )

   if (jogadorFilter.length == 0) {
       throw new BadRequestException(`O id ${idJogador} não é um jogador!`)
   }

    return await this.categoriaModel.findOne().where('jogadores').in(idJogador).exec() 
  }


  async atualizarCategoria(categoriaId: string, atualizarCategoriaDto: AtualizarCategoriaDto): Promise<void> {
    const categoriaEncontrada = await this.categoriaModel.findById(categoriaId).exec();
    if (!categoriaEncontrada) {
      throw new NotFoundException(`Categoria ${categoriaId} não encontrada!`);
    }
    await this.categoriaModel.findOneAndUpdate({ categoriaId }, { $set: atualizarCategoriaDto }).exec();
  }

  async atribuirCategoriaJogador(params: string[]): Promise<void> {
    const idcategoria = params['categoria'];
    const idjogador = params['jogadorId'];
    const categoriaEncontrada = await this.categoriaModel.findOne({ categoria: idcategoria }).exec();
    const jogadorJaCadastradoCategoria = await this.categoriaModel.find({ categoria: idcategoria }).where('jogadores').in(idjogador).exec();
    const jogadorEncontrado = await this.jogadoresService.consultarJogadoresPorId(idjogador);
    if (!categoriaEncontrada) {
      throw new BadRequestException('Categoria não encontrada!');
    }
    if (jogadorJaCadastradoCategoria.length > 0) {
      throw new BadRequestException('jogador ja cadastrado na categoria');
    }
    categoriaEncontrada.jogadores.push(jogadorEncontrado)
    await this.categoriaModel.findOneAndUpdate({ categoria: idcategoria }, { $set: categoriaEncontrada }).exec();
  }
}
