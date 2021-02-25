import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "typedi";

import IUsuario from "../../../usuario/entities/IUsuario";
import Usuario from "../../..//usuario/entities/impl/Usuario";

import IConta from "../IConta";

@Service({id: "conta", transient: true})
@Entity("contas")
export default class implements IConta { 
  
  @PrimaryGeneratedColumn({name: "id"})
  public Codigo: number;

  @Column({name: "nome"})
  public Nome: string;

  @Column({name: "saldo"})
  private saldo: number;
  
  @JoinColumn({name: "usuario_id", referencedColumnName: "Codigo"})
  @ManyToOne<Usuario>(() => Usuario)
  public Usuario: IUsuario;

  public get Saldo(): number {
    return this.saldo;
  }

}