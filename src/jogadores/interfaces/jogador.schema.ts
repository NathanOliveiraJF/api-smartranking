import * as moogose from 'mongoose';

// this is equivalent to a table 
export const JogadorSchema = new moogose.Schema({
  telefoneCelular: { type: String, unique: true },
  email: { type: String, unique: true },
  nome: String,
  ranking: String,
  posicaoRanking: Number,
  urlFotoJogador: String,
}, {timestamps: true, collection: 'jogadores'})
