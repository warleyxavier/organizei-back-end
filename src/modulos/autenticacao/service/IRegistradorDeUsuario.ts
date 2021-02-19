import DadosDeRegistroDto from "../dto/DadosDeRegistroDto";

export default interface IRegistradorDeUsuario {
  registrar(dadosRegistro: DadosDeRegistroDto): Promise<void>;
}