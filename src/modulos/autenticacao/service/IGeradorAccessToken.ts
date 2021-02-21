export default interface IGeradorAccessToken {
  gerar(codigoUsuario: number): string;
}