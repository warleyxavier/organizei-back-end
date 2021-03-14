import { Service } from "typedi";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { TipoMovimentacaoObjetivo } from "../../enums/TipoMovimentacaoObjetivo";
import IConta from "../IConta";
import Conta from "./Conta";
import IMovimentacaoObjetivo from "../IMovimentacaoObjetivo";

const TipoMovimentacaoTransformer = {
  to: (value: TipoMovimentacaoObjetivo) => typeof value === 'number' ? value : TipoMovimentacaoObjetivo[value],
  from: (value: any) => typeof value === 'number' ? TipoMovimentacaoObjetivo[value] : TipoMovimentacaoObjetivo   
}

@Service({id: "movimentacaoObjetivo", transient: true})
@Entity("movimentacoes_objetivos")
export default class MovimentacaoObjetivo implements IMovimentacaoObjetivo {

  @PrimaryGeneratedColumn({name: "id"})
  Codigo: number;

  @Column({name: "tipo", transformer: TipoMovimentacaoTransformer})
  Tipo: TipoMovimentacaoObjetivo;

  @Column({name: "valor"})
  Valor: number;

  @Column({name: "data", type: "date"})
  Data: Date;

  @Column({name: "objetivo_id"})
  CodigoObjetivo: number;

  @JoinColumn({ name: "conta_id", referencedColumnName: "Codigo" })
  @ManyToOne<Conta>(() => Conta, { eager: true })  
  Conta: IConta;

}