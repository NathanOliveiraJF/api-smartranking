import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria } from './interfaces/categoria.interface';
import { CriarCategoriaDto } from './dto/criar-categoria.dto';
import { AtualizarCategoriaDto } from './dto/atualizar-categoria.dto';

@Injectable()
export class CategoriasService {
    constructor(@InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>){}

    async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
        const { categoria } = criarCategoriaDto;

        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec();
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

    async atualizarCategoria(categoriaId: string, atualizarCategoriaDto: AtualizarCategoriaDto): Promise<void> {
      const categoriaEncontrada = await this.categoriaModel.findById(categoriaId).exec();
      if (!categoriaEncontrada) {
        throw new NotFoundException(`Categoria ${categoriaId} não encontrada!`);
      }
      await this.categoriaModel.findOneAndUpdate({categoriaId}, {$set: atualizarCategoriaDto}).exec();
    }
    
    async atribuirCategoriaJogador(params: string[]): Promise<void> {
      const idcategoria = params['_id'];
      const idjogador   = params['jogadorId'];
      const categoriaEncontrada = await this.categoriaModel.findById(idcategoria).exec();
      if (!categoriaEncontrada) {
        throw new BadRequestException('Categoria não encontrada!');
      }
      categoriaEncontrada.jogadores.push(idjogador);
      await this.categoriaModel.findOneAndUpdate({idcategoria}, {$set: categoriaEncontrada}).exec();
    }

}
