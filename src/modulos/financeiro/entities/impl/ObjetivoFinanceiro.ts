import { Service } from "typedi";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import IUsuario from "../../../usuario/entities/IUsuario";
import Usuario from "../../../usuario/entities/impl/Usuario";
import IObjetivoFinanceiro from "../IObjetivoFinanceiro";
import ICategoria from "../ICategoria";
import Categoria from "./Categoria";

@Service({ id: "objetivoFinanceiro", transient: true })
@Entity("objetivos_financeiros")
export default class ObjetivoFinanceiro implements IObjetivoFinanceiro {

  @PrimaryGeneratedColumn({ name: "id" })
  Codigo: number;

  @Column({ name: "descricao" })
  Descricao: string;

  @Column({ name: "valor_da_meta" })
  ValorMeta: number;

  @Column({ name: "saldo" })
  private saldo: number = 0;

  @Column({ name: "prazo", type: "date" })
  Prazo: Date;

  @Column({ name: "arquivado" })
  Arquivado: boolean;

  @Column({ name: "usuario_id" })
  CodigoUsuario: number;

  @JoinColumn({ name: "usuario_id", referencedColumnName: "Codigo" })
  @ManyToOne<Usuario>(() => Usuario, { eager: true })
  private usuario: IUsuario;

  @JoinColumn({ name: "categoria_deposito_id", referencedColumnName: "Codigo" })
  @ManyToOne<Categoria>(() => Categoria, { eager: true })
  CategoriaDeposito: ICategoria;

  @JoinColumn({ name: "categoria_resgate_id", referencedColumnName: "Codigo" })
  @ManyToOne<Categoria>(() => Categoria, { eager: true })
  CategoriaResgate: ICategoria;

  public get Usuario() {
    return this.usuario;
  }

  public get Saldo() {
    return this.saldo;
  }

  public set Usuario(usuario: IUsuario) {
    this.CodigoUsuario = 0;
    this.usuario = usuario;

    if (this.usuario)
      this.CodigoUsuario = this.usuario.Codigo;
  }

  public pertenceAoUsuario(codigoUsuario: number): boolean {
    return this.CodigoUsuario == codigoUsuario;
  }

  public arquivar(): void {
    this.Arquivado = true;
  }

  public permiteResgateDeValor(valor: number): boolean {
    return (Number(this.Saldo) - Number(valor)) >= 0;
  }

  public debitar(valor: number): void {
    this.saldo = Number(this.Saldo) - Number(valor);
  }

  public creditar(valor: number): void {
    this.saldo = Number(this.Saldo) + Number(valor);
  }

}