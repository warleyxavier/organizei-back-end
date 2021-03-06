import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "typedi";

import IUsuario from "../../../usuario/entities/IUsuario";
import Usuario from "../../../usuario/entities/impl/Usuario";

import { TipoCategoria } from "../../../financeiro/enums/TipoCategoria";
import ICategoria from "../ICategoria";

const TipoCategoriaTransformer = {
  to: (value: TipoCategoria) => typeof value === 'number' ? value : TipoCategoria[value],
  from: (value: number) => TipoCategoria[value]
}

@Service({id: "categoria", transient: true})
@Entity("categorias")
export default class Categoria implements ICategoria {
  
  @PrimaryGeneratedColumn({name: "id"})
  Codigo: number;

  @Column({name: "nome"})
  Nome: string;

  @Column({name: "valor_previsto"})
  ValorPrevisto: number;

  @Column({name: "porcentagem_prevista"})
  PorcentagemPrevista: number;

  @Column({name: "eh_padrao"})
  EhPadrao: boolean;
  
  @Column({name: "tipo", enum: TipoCategoria, transformer: TipoCategoriaTransformer})
  Tipo: TipoCategoria;

  @JoinColumn({name: "usuario_id", referencedColumnName: "Codigo"})
  @ManyToOne<Usuario>(() => Usuario, {eager: true})
  Usuario: IUsuario;

  public pertenceAoUsuario(codigoUsuario: number): boolean {
    return this.Usuario.Codigo == codigoUsuario;
  }

  public ehDespesa(): boolean {
   return TipoCategoria[this.Tipo] == '1' || this.Tipo == TipoCategoria.Despesa;
  }

}