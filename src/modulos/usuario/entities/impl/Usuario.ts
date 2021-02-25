import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Service, ServiceMetadata } from "typedi";
import * as md5 from "md5";

import IUsuario from "../IUsuario";

@Service({id: "usuario", transient: true})
@Entity("usuarios")
export default class Usuario implements IUsuario {

  @PrimaryGeneratedColumn({name: "id"})
  Codigo: number;

  @Column({name: "nome_completo"})
  NomeCompleto: string;

  @Column({name: "email"})
  EMail: string;

  @Column({name: "senha"})
  private senha: string;

  public get Senha():string {
    return this.senha;
  }

  public atualizarSenha(senha: string): void {
    this.senha = this.criptografarSenha(senha);
  }

  public possuiASenha(senha: string): boolean {
    return this.senha.includes(this.criptografarSenha(senha));
  }

  private criptografarSenha(senha: string): string {
    return md5(senha);
  }

}