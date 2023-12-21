import { Document } from "mongoose";
import { Jogador } from "src/jogadores/interfaces/jogador.interface";

export interface Partida extends Document {
    categoria: string,
    resultado: Array<string>
    jogadores: Array<Jogador>
}