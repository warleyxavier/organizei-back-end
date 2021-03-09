import { Service } from "typedi";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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

}