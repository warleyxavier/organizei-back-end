import Container from "typedi";
import categoriaParaAtualizacaoDto from "../dto/CategoriaParaAtualizacaoDto";
import CategoriaParaConsultaDto from "../dto/CategoriaParaConsultaDto";
import CategoriaParaInsercaoDto from "../dto/CategoriaParaInsercaoDto";
import ICategoria from "../entities/ICategoria";

export default class MapeadorDeCategoria {
  public paraEntidade(dto: CategoriaParaInsercaoDto): ICategoria {
    let categoria = Container.get<ICategoria>("categoria");
    categoria.Nome = dto.nome;
    categoria.ValorPrevisto = dto.valorPrevisto;
    categoria.PorcentagemPrevista = dto.porcentagemPrevista;
    categoria.Tipo = dto.tipo;
    return categoria;
  }

  public dtoAtualizacaoparaEntidade(dto: categoriaParaAtualizacaoDto): ICategoria {
    let categoria = Container.get<ICategoria>("categoria");
    categoria.Nome = dto.nome;
    categoria.ValorPrevisto = dto.valorPrevisto;
    categoria.PorcentagemPrevista = dto.porcentagemPrevista;
    return categoria;
  }

  public paraDto(categoria: ICategoria): CategoriaParaConsultaDto {
    let dto = new CategoriaParaConsultaDto();
    dto.codigo = categoria.Codigo;
    dto.nome = categoria.Nome;
    dto.valorPrevisto = categoria.ValorPrevisto;
    dto.porcentegmPrevista = categoria.PorcentagemPrevista;
    dto.tipo = categoria.Tipo;
    return dto;
  }

  public paraListaDto(categorias: ICategoria[]): CategoriaParaConsultaDto[] {
    return categorias.map(categoria => this.paraDto(categoria));
  }

}