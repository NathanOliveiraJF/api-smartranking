import { ArrayMinSize, IsArray, IsNotEmpty, IsString, isArray } from "class-validator";

export class CriarPartidaDto {

    @IsString()
    @IsNotEmpty()
    categoria: string;

    @IsArray()
    @ArrayMinSize(1)
    jogadores: Array<string>;

    @IsArray()
    @ArrayMinSize(1)
    resultado: Array<string>;
}