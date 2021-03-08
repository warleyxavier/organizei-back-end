import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "typedi";

import IUsuario from "../../../usuario/entities/IUsuario";
import Usuario from "../../..//usuario/entities/impl/Usuario";

import IConta from "../IConta";

@Service({id: "conta", transient: true})
@Entity("contas")
export default class Conta implements IConta {
  
  @PrimaryGeneratedColumn({name: "id"})
  public Codigo: number;
  
  @Column({name: "nome"})
  public Nome: string;
  
  @Column({name: "saldo"})
  private saldo: number;
  
  @Column({name: "eh_padrao"})
  EhPadrao: boolean; 
  
  @JoinColumn({name: "usuario_id", referencedColumnName: "Codigo"})
  @ManyToOne<Usuario>(() => Usuario, {eager: true})
  public Usuario: IUsuario;
  
  public get Saldo(): number {
    return this.saldo;
  }
  
  public debitar(valor: number): void {
    this.saldo = Number(this.saldo) - Number(valor);
  }

  public creditar(valor: number): void {
    this.saldo = Number(this.saldo) + Number(valor);
  }
}