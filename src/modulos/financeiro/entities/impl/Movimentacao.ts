import { Service } from "typedi";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import ICategoria from "../ICategoria";
import Categoria from "./Categoria";
import IConta from "../IConta";
import Conta from "./Conta";
import IMovimentacao from "../IMovimentacao";

@Service({id: "movimentacao", transient: true})
@Entity("movimentacoes")
export default class Movimentacao implements IMovimentacao {

  @PrimaryGeneratedColumn({name: "id"})
  Codigo: number;

  @Column({name: "descricao"})
  Descricao: string;

  @Column({name: "valor"})
  Valor: number;

  @Column({name: "data"})
  Data: Date;

  @Column({name: "ordem"})
  Ordem: number;

  @Column({name: "conta_id"})
  CodigoConta: number;

  @JoinColumn({name: "conta_id", referencedColumnName: "Codigo"})
  @ManyToOne<Conta>(() => Conta)
  Conta: IConta;
  
  @JoinColumn({name: "categoria_id", referencedColumnName: "Codigo"})
  @ManyToOne<Categoria>(() => Categoria, {eager: true})
  Categoria: ICategoria;
}