import { Service } from "typedi";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { TipoMovimentacaoObjetivo } from "../../enums/TipoMovimentacaoObjetivo";
import ICategoria from "../ICategoria";
import Categoria from "./Categoria";
import IConta from "../IConta";
import Conta from "./Conta";
import IMovimentacaoObjetivo from "../IMovimentacaoObjetivo";

const TipoMovimentacaoTransformer = {
  to: (value: TipoMovimentacaoObjetivo) => typeof value === 'number' ? value : TipoMovimentacaoObjetivo[value],
  from: (value: number) => TipoMovimentacaoObjetivo[value]
}

@Service({id: "movimentacaoObjetivo", transient: true})
@Entity("movimentacoes_objetivos")
export default class MovimentacaoObjetivo implements IMovimentacaoObjetivo {

  @PrimaryGeneratedColumn({name: "id"})
  Codigo: number;

  @Column({name: "tipo", enum: TipoMovimentacaoObjetivo, transformer: TipoMovimentacaoTransformer})
  Tipo: TipoMovimentacaoObjetivo;

  @Column({name: "valor"})
  Valor: number;

  @Column({name: "data"})
  Data: Date;

  @Column({name: "objetivo_id"})
  CodigoObjetivo: number;

  @JoinColumn({ name: "categoria_id", referencedColumnName: "Codigo" })
  @ManyToOne<Categoria>(() => Categoria, { eager: true })
  Categoria: ICategoria;

  @JoinColumn({ name: "conta_id", referencedColumnName: "Codigo" })
  @ManyToOne<Conta>(() => Conta, { eager: true })  
  Conta: IConta;

}