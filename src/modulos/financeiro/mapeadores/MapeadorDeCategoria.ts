import Container from "typedi";
import CategoriaAlteradaDto from "../dto/CategoriaAlteradaDto";
import CategoriaParaInsercaoDto from "../dto/CategoriaParaInsercaoDto";
import ICategoria from "../entities/ICategoria";

export default class MapeadorDeCategoria {
  public paraEntidade(dto: CategoriaParaInsercaoDto): ICategoria {
    let categoria = Container.get<ICategoria>("categoria");
    categoria.Nome = dto.nome;
    categoria.ValorPrevisto = dto.valorPrevisto;
    categoria.Tipo = dto.tipo;
    return categoria;
  }

  public paraDto(categoria: ICategoria): CategoriaAlteradaDto {
    let dto = new CategoriaAlteradaDto();
    dto.codigo = categoria.Codigo;
    dto.nome = categoria.Nome;
    dto.valorPrevisto = categoria.ValorPrevisto;
    dto.tipo = categoria.Tipo;
    return dto;
  }
}