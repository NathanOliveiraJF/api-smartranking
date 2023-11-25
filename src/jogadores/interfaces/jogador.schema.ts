import * as moogose from 'mongoose';

// this is equivalent to a table, is a collection in the mongodb
export const JogadorSchema = new moogose.Schema({
  telefoneCelular: { type: String, unique: true },
  email: { type: String, unique: true },
  nome: String,
  ranking: String,
  posicaoRanking: Number,
  urlFotoJogador: String,
}, {timestamps: true, collection: 'jogadores'})
