import { Service } from "typedi";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import IUsuario from "../../../usuario/entities/IUsuario";
import Usuario from "../../../usuario/entities/impl/Usuario";
import IObjetivoFinanceiro from "../IObjetivoFinanceiro";

@Service({id: "objetivoFinanceiro", transient: true})
@Entity("objetivos_financeiros")
export default class ObjetivoFinanceiro implements IObjetivoFinanceiro {
  
  @PrimaryGeneratedColumn({name: "id"})
  Codigo: number;

  @Column({name: "descricao"})
  Descricao: string;

  @Column({name: "valor_da_meta"})
  ValorMeta: number;

  @Column({name: "saldo"})
  Saldo: number;

  @Column({name: "prazo"})
  Prazo: Date;

  @Column({name: "arquivado"})
  Arquivado: boolean;

  @JoinColumn({name: "usuario_id", referencedColumnName: "Codigo"})
  @ManyToOne<Usuario>(() => Usuario, {eager: true})
  Usuario: IUsuario;

}