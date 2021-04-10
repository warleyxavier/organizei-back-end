import Container from "typedi";

import IConexao from "../config/IConexao";

export function Transaction(): MethodDecorator {
  const conexao = Container.get<IConexao>("conexao");

  return function (target: Object, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      return conexao.getGerenciador().transaction(async entityManager => {
        console.info("-- ABERTA TRANSAÇÃO");
        Container.set("transacao-conexao", entityManager);
        try {
          var result = await originalMethod.apply(this, [...args]);
        } finally {
          Container.set("transacao-conexao", null);
          console.info("-- CONEXÃO RESTAURADA");
        }
        console.info("-- TRANSAÇÃO COMMITADA");
        return result;
      });
    }
  }
}