import ContaParaConsultaDto from "../dto/ContaParaConsultaDto";
import IConta from "../entities/IConta";

export default class MapeadorDeConta {

  public paraDto(conta: IConta): ContaParaConsultaDto {
    let dto = new ContaParaConsultaDto();
    dto.codigo = conta.Codigo;
    dto.nome = conta.Nome;
    dto.saldo = conta.Saldo;
    return dto;
  }

}