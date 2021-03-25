import { Service, Container } from "typedi";
import { EntityManager, getManager } from "typeorm";

import IConexao from "../IConexao";

@Service("conexao")
export default class Conexao implements IConexao {
  private gerenciador: EntityManager;

  constructor() {
    this.gerenciador = getManager();
  }

  getGerenciador(): EntityManager {
    if (!Container.has("transacao-conexao") )
      return this.gerenciador;

    let transactionalEntityManager: EntityManager = Container.get("transacao-conexao");

    if (transactionalEntityManager)
      return transactionalEntityManager;

    return this.gerenciador;
  }

}