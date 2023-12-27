import * as moongose from "mongoose";

export const PartidaSchema = new moongose.Schema({
  categoria: { type: String },
  jogadores: [{
    type: moongose.Schema.Types.ObjectId,
    ref: "Jogador"
  }],
  def: { type: moongose.Schema.Types.ObjectId, ref: "Jogador" },
  resultado: [
    { set: { type: String } }
  ]
}, { timestamps: true, collection: "partidas" })
