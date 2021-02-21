export default interface IUsuario {
  Codigo: number;
  NomeCompleto: string;
  EMail: string;
  Senha: string;

  atualizarSenha(senha: string): void;
  possuiASenha(senha: string): boolean;
  
}