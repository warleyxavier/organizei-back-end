import { Service } from "typedi";
import { EntityManager, getManager } from "typeorm";

import IConexao from "../IConexao";

@Service("conexao")
export default class Conexao implements IConexao {

  private gerenciador: EntityManager;

  constructor() {
    this.gerenciador = getManager();
  }

  getGerenciador(): EntityManager {
    return this.gerenciador;
  }

}