export default interface IValidadorAccessToken {
  validar(token: string): number;
}