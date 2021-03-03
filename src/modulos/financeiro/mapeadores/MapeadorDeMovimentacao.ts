import Container from "typedi";
import MovimentacaoParaConsultaDto from "../dto/MovimentacaoParaConsultaDto";

import ReceitaParaInsercaoDto from "../dto/ReceitaParaInsercaoDto";
import IMovimentacao from "../entities/IMovimentacao";

export default class MapeadorDeMovimentacao {
  public paraEntidade(dto: ReceitaParaInsercaoDto): IMovimentacao {
    let movimentacao: IMovimentacao = Container.get<IMovimentacao>("movimentacao");
    movimentacao.Data = dto.data;
    movimentacao.Descricao = dto.descricao;
    movimentacao.Valor = dto.valor;
    return movimentacao;
  }

  public paraDto(movimentacao: IMovimentacao): MovimentacaoParaConsultaDto {
    let dto: MovimentacaoParaConsultaDto = new MovimentacaoParaConsultaDto();
    dto.codigo = movimentacao.Codigo;
    dto.descricao = movimentacao.Descricao;
    dto.valor = movimentacao.Valor;
    dto.data = movimentacao.Data;
    dto.categoria = {
      nome: movimentacao.Categoria.Nome,
      tipo: movimentacao.Categoria.Tipo
    };
    return dto;
  }
}